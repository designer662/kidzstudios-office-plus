import { getDatabase } from "@netlify/database";

const db = getDatabase();
const MAX_BYTES = 450_000;
const SCOPE_RE = /^[a-z0-9:_()\-.]{1,120}$/i;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store, max-age=0",
      "x-content-type-options": "nosniff"
    }
  });
}

function normalizePayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

export default async (req) => {
  try {
    const url = new URL(req.url);
    if (req.method === "GET") {
      const scope = (url.searchParams.get("scope") || "").trim();
      if (!SCOPE_RE.test(scope)) return json({ error: "Invalid scope" }, 400);
      const rows = await db.sql`SELECT scope, payload, version, updated_at FROM ks_shared_state WHERE scope = ${scope} LIMIT 1`;
      if (!rows.length) return json({ error: "Not found", scope }, 404);
      const row = rows[0];
      return json({ scope: row.scope, payload: row.payload || {}, version: Number(row.version || 0), updatedAt: row.updated_at });
    }

    if (req.method === "PUT" || req.method === "POST") {
      const raw = await req.text();
      if (raw.length > MAX_BYTES) return json({ error: "Payload too large" }, 413);
      let body;
      try { body = JSON.parse(raw || "{}"); } catch { return json({ error: "Invalid JSON" }, 400); }
      const scope = String(body.scope || "").trim();
      if (!SCOPE_RE.test(scope)) return json({ error: "Invalid scope" }, 400);
      const payload = normalizePayload(body.payload);
      const payloadJson = JSON.stringify(payload);
      if (payloadJson.length > MAX_BYTES) return json({ error: "Payload too large" }, 413);
      const updatedBy = String(body.clientId || "web").slice(0, 120);
      const rows = await db.sql`
        INSERT INTO ks_shared_state (scope, payload, updated_by)
        VALUES (${scope}, CAST(${payloadJson} AS jsonb), ${updatedBy})
        ON CONFLICT (scope) DO UPDATE SET
          payload = EXCLUDED.payload,
          version = ks_shared_state.version + 1,
          updated_at = NOW(),
          updated_by = EXCLUDED.updated_by
        RETURNING scope, payload, version, updated_at
      `;
      const row = rows[0];
      return json({ scope: row.scope, payload: row.payload || {}, version: Number(row.version || 0), updatedAt: row.updated_at });
    }

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { "allow": "GET, PUT, POST, OPTIONS" } });
    return json({ error: "Method not allowed" }, 405);
  } catch (error) {
    console.error("state function error", error);
    return json({ error: "Database unavailable" }, 503);
  }
};

export const config = {
  path: "/api/state"
};
