import { getDatabase } from "@netlify/database";

const db = getDatabase();
const MAX_TEXT = 500;
const MAX_METADATA_BYTES = 20_000;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store, max-age=0",
      "x-content-type-options": "nosniff"
    }
  });
}

function clean(value, max = MAX_TEXT) {
  return String(value ?? "").replace(/\0/g, "").trim().slice(0, max);
}

function normalizeRow(row) {
  return {
    id: Number(row.id),
    eventType: row.event_type,
    title: row.title,
    message: row.message || "",
    employeeId: row.employee_id == null ? null : Number(row.employee_id),
    metadata: row.metadata || {},
    dedupeKey: row.dedupe_key || "",
    sourceClient: row.source_client || "",
    createdAt: row.created_at
  };
}

export default async (req) => {
  try {
    const url = new URL(req.url);

    if (req.method === "GET") {
      const after = Math.max(0, Number(url.searchParams.get("after")) || 0);
      const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit")) || 50));
      let rows;
      if (after > 0) {
        rows = await db.sql`
          SELECT id, event_type, title, message, employee_id, metadata, dedupe_key, source_client, created_at
          FROM ks_office_events
          WHERE id > ${after}
          ORDER BY id ASC
          LIMIT ${limit}
        `;
      } else {
        rows = await db.sql`
          SELECT id, event_type, title, message, employee_id, metadata, dedupe_key, source_client, created_at
          FROM ks_office_events
          ORDER BY id DESC
          LIMIT ${limit}
        `;
        rows = [...rows].reverse();
      }
      return json({ events: rows.map(normalizeRow) });
    }

    if (req.method === "POST") {
      let body;
      try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      const eventType = clean(body?.eventType, 80);
      const title = clean(body?.title, 180);
      const message = clean(body?.message, MAX_TEXT);
      const employeeIdRaw = Number(body?.employeeId);
      const employeeId = Number.isFinite(employeeIdRaw) && employeeIdRaw > 0 ? Math.trunc(employeeIdRaw) : null;
      const dedupeKey = clean(body?.dedupeKey, 220) || null;
      const sourceClient = clean(body?.sourceClient, 140) || null;
      const metadata = body?.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata) ? body.metadata : {};
      const metadataJson = JSON.stringify(metadata);
      if (!eventType || !title) return json({ error: "eventType and title are required" }, 400);
      if (metadataJson.length > MAX_METADATA_BYTES) return json({ error: "Metadata too large" }, 413);

      let rows;
      if (dedupeKey) {
        rows = await db.sql`
          INSERT INTO ks_office_events (event_type, title, message, employee_id, metadata, dedupe_key, source_client)
          VALUES (${eventType}, ${title}, ${message}, ${employeeId}, CAST(${metadataJson} AS jsonb), ${dedupeKey}, ${sourceClient})
          ON CONFLICT (dedupe_key) DO UPDATE SET dedupe_key = EXCLUDED.dedupe_key
          RETURNING id, event_type, title, message, employee_id, metadata, dedupe_key, source_client, created_at
        `;
      } else {
        rows = await db.sql`
          INSERT INTO ks_office_events (event_type, title, message, employee_id, metadata, source_client)
          VALUES (${eventType}, ${title}, ${message}, ${employeeId}, CAST(${metadataJson} AS jsonb), ${sourceClient})
          RETURNING id, event_type, title, message, employee_id, metadata, dedupe_key, source_client, created_at
        `;
      }
      return json({ event: normalizeRow(rows[0]) }, 201);
    }

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { allow: "GET, POST, OPTIONS" } });
    return json({ error: "Method not allowed" }, 405);
  } catch (error) {
    console.error("events function error", error);
    return json({ error: "Events database unavailable" }, 503);
  }
};

export const config = { path: "/api/events" };
