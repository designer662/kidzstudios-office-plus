-- KIDZSTUDIOS V86.54-CPU1 (2026-10-19)
-- Non-destructive, idempotent RPC hotfix for PostgREST 14.
-- The historical migration raises SQLSTATE 40001 for stale-version conflicts;
-- PostgREST 14 may retry those transactions, generating excessive load.
-- Use PT409 (HTTP Conflict) to reject stale writes without automatic retries.
-- IMPORTANT: GitHub Pages does not execute this migration. Run manually in
-- Supabase SQL Editor once; if using Supabase CLI apply only through
-- your normal migration process. It does not reset or delete any data.

BEGIN;
SET LOCAL lock_timeout = '10s';
SET LOCAL statement_timeout = '60s';

DO $check$
BEGIN
  IF to_regclass('public.ks_shared_state') IS NULL
     OR to_regprocedure('public.ks_is_office_member()') IS NULL
     OR to_regprocedure('public.ks_save_shared_state(text,jsonb,text,bigint)') IS NULL THEN
    RAISE EXCEPTION 'Missing Office Plus objects; do not apply CPU1 migration to an uninitialized database';
  END IF;
END;
$check$;

CREATE OR REPLACE FUNCTION public.ks_save_shared_state(
  p_scope TEXT,
  p_payload JSONB,
  p_client_id TEXT DEFAULT 'web',
  p_expected_version BIGINT DEFAULT NULL
) RETURNS public.ks_shared_state LANGUAGE plpgsql SECURITY INVOKER SET search_path = public
AS $$
DECLARE r public.ks_shared_state;
BEGIN
  IF NOT public.ks_is_office_member() THEN RAISE EXCEPTION 'Access denied' USING ERRCODE='42501'; END IF;
  IF p_scope !~ '^[a-zA-Z0-9:_().-]{1,120}$' OR jsonb_typeof(p_payload) <> 'object'
    THEN RAISE EXCEPTION 'Invalid state scope or payload' USING ERRCODE='22023'; END IF;
  IF length(p_payload::TEXT) > 450000 THEN RAISE EXCEPTION 'Payload too large' USING ERRCODE='22023'; END IF;
  INSERT INTO public.ks_shared_state(scope,payload,updated_by)
  VALUES (p_scope,p_payload,left(coalesce(p_client_id,'web'),120))
  ON CONFLICT (scope) DO UPDATE SET
    payload=EXCLUDED.payload,
    updated_by=EXCLUDED.updated_by,
    version=public.ks_shared_state.version+1,
    updated_at=now()
  WHERE p_expected_version IS NULL OR public.ks_shared_state.version=p_expected_version
  RETURNING * INTO r;
  IF r.scope IS NULL THEN RAISE EXCEPTION 'State was changed by another user' USING ERRCODE='PT409'; END IF;
  RETURN r;
END; $$;

-- Preserve grants/security model: CREATE OR REPLACE does not change grants.
DO $verify$
BEGIN
  IF pg_get_functiondef(
    to_regprocedure('public.ks_save_shared_state(text,jsonb,text,bigint)')
  ) NOT LIKE '%PT409%' THEN
    RAISE EXCEPTION 'CPU1: version conflict patch verification failed';
  END IF;
END;
$verify$;

COMMIT;

-- Read-only verification: expect TRUE.
SELECT
  pg_get_functiondef(
    to_regprocedure('public.ks_save_shared_state(text,jsonb,text,bigint)')
  ) LIKE '%PT409%' AS pt409_installed;
