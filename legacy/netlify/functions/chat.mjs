import { getDatabase } from "@netlify/database";

const db = getDatabase();
const MAX_MESSAGE = 600;

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store, max-age=0",
      "x-content-type-options": "nosniff"
    }
  });
}

function cleanText(value, max) {
  return String(value ?? "").replace(/\0/g, "").trim().slice(0, max);
}

export default async (req) => {
  try {
    const url = new URL(req.url);
    // Keep shared chat lightweight and privacy-friendly: messages expire after 24 hours.
    await db.sql`DELETE FROM ks_office_chat WHERE created_at < NOW() - INTERVAL '24 hours'`;

    if (req.method === "GET") {
      const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit")) || 60));
      const rows = await db.sql`
        SELECT id, sender_id, sender_name, client_id, message, created_at
        FROM ks_office_chat
        ORDER BY id DESC
        LIMIT ${limit}
      `;
      const messages = [...rows].reverse().map(row => ({
        id: Number(row.id),
        senderId: row.sender_id == null ? null : Number(row.sender_id),
        senderName: row.sender_name,
        clientId: row.client_id || null,
        message: row.message,
        createdAt: row.created_at
      }));
      return json({ messages });
    }

    if (req.method === "POST") {
      let body;
      try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
      const message = cleanText(body?.message, MAX_MESSAGE);
      const senderName = cleanText(body?.senderName || "Office", 80) || "Office";
      const senderIdRaw = Number(body?.senderId);
      const senderId = Number.isFinite(senderIdRaw) && senderIdRaw > 0 ? Math.trunc(senderIdRaw) : null;
      const sourceClient = cleanText(body?.sourceClient || "chat", 120) || "chat";
      if (!message) return json({ error: "Message is required" }, 400);

      const rows = await db.sql`
        INSERT INTO ks_office_chat (sender_id, sender_name, client_id, message)
        VALUES (${senderId}, ${senderName}, ${sourceClient}, ${message})
        RETURNING id, sender_id, sender_name, client_id, message, created_at
      `;
      const row = rows[0];
      const eventTitle = `${senderName} · Chat message`;
      const eventMessage = message.slice(0, 220);
      const eventMeta = JSON.stringify({ chatId: Number(row.id), clientId: sourceClient });
      try {
        await db.sql`
          INSERT INTO ks_office_events (event_type, title, message, employee_id, metadata, dedupe_key, source_client)
          VALUES ('chat_message', ${eventTitle}, ${eventMessage}, ${senderId}, CAST(${eventMeta} AS jsonb), ${`chat:${Number(row.id)}`}, ${sourceClient})
          ON CONFLICT (dedupe_key) DO NOTHING
        `;
      } catch (eventError) {
        console.warn('chat event log unavailable', eventError);
      }
      return json({
        message: {
          id: Number(row.id),
          senderId: row.sender_id == null ? null : Number(row.sender_id),
          senderName: row.sender_name,
        clientId: row.client_id || null,
          message: row.message,
          createdAt: row.created_at
        }
      }, 201);
    }


    if (req.method === "DELETE") {
      const result = await db.sql`DELETE FROM ks_office_chat RETURNING id`;
      return json({ cleared: true, deleted: result.length });
    }

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: { allow: "GET, POST, DELETE, OPTIONS" } });
    return json({ error: "Method not allowed" }, 405);
  } catch (error) {
    console.error("chat function error", error);
    return json({ error: "Chat database unavailable" }, 503);
  }
};

export const config = { path: "/api/chat" };
