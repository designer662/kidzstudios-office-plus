CREATE TABLE IF NOT EXISTS ks_office_chat (
  id BIGSERIAL PRIMARY KEY,
  sender_id BIGINT,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ks_office_chat_created_at_idx ON ks_office_chat (created_at DESC);
