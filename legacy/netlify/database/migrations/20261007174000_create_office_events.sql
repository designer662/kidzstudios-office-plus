CREATE TABLE IF NOT EXISTS ks_office_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  employee_id BIGINT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  dedupe_key TEXT UNIQUE,
  source_client TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ks_office_events_created_at_idx ON ks_office_events (created_at DESC);
CREATE INDEX IF NOT EXISTS ks_office_events_type_idx ON ks_office_events (event_type, created_at DESC);
