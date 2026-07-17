/**
 * Vercel Edge Function backing the AI advisor chat (ported from jwd-web's
 * app/api/advisor/route.ts). Streams simple `data: {"text"}` SSE events.
 * Requires GROQ_API_KEY in the Vercel project environment.
 */
import {
  MAX_MESSAGES,
  sanitizeMessages,
  groqStream,
  transformGroqSse,
} from '../shared/advisor-core.mjs';

export const config = { runtime: 'edge' };

// Best-effort per-instance rate limit (blunts casual scripted abuse).
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): number | null {
  const now = Date.now();
  if (hits.size > 5000) for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  const e = hits.get(ip);
  if (!e || now > e.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return null;
  }
  if (e.count >= RATE_LIMIT) return Math.ceil((e.resetAt - now) / 1000);
  e.count++;
  return null;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }
  const apiKey = process.env.GROQ_API_KEY ?? '';
  if (!apiKey) {
    return Response.json(
      { error: 'AI advisor is not configured. Set GROQ_API_KEY in the environment.' },
      { status: 503 },
    );
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const retry = rateLimited(ip);
  if (retry !== null) {
    return Response.json(
      { error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(retry) } },
    );
  }

  let body: { messages?: unknown; locale?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const raw = body?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return Response.json({ error: 'Messages are required.' }, { status: 400 });
  }
  if (raw.length > MAX_MESSAGES) {
    return Response.json({ error: 'Too many messages. Please start a new session.' }, { status: 400 });
  }
  const messages = sanitizeMessages(raw);
  if (messages.length === 0) {
    return Response.json({ error: 'No valid messages.' }, { status: 400 });
  }

  try {
    const upstream = await groqStream(apiKey, messages, body.locale === 'ja' ? 'ja' : 'en');
    if (!upstream.ok || !upstream.body) {
      console.error('Groq error:', upstream.status, await upstream.text().catch(() => ''));
      return Response.json({ error: 'The advisor is unavailable right now. Please try again.' }, { status: 502 });
    }
    return new Response(transformGroqSse(upstream.body), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Advisor API error:', err);
    return Response.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
