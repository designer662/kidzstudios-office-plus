-- Associate each chat message with the browser's locally saved PC identifier.
-- This is attribution, not authentication or a hardware fingerprint.
ALTER TABLE ks_office_chat
  ADD COLUMN IF NOT EXISTS client_id TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS ks_office_chat_client_id_idx ON ks_office_chat (client_id, id DESC);
