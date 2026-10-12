CREATE TABLE IF NOT EXISTS ks_shared_state (
  scope TEXT PRIMARY KEY,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  version BIGINT NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT
);

CREATE INDEX IF NOT EXISTS ks_shared_state_updated_at_idx ON ks_shared_state (updated_at DESC);
