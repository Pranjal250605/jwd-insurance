/**
 * Vercel Edge Function for the consultation form at the foot of the page.
 *
 * Emails the enquiry to CONSENT_EMAIL_TO (the same inbox the consent records
 * go to) via Resend. Unlike api/consent.ts this reports failure to the caller:
 * someone who has just written a message needs to know whether it was sent.
 *
 * Env (shared with api/consent.ts):
 *   RESEND_API_KEY, CONSENT_EMAIL_TO, CONSENT_EMAIL_FROM (optional)
 */
import { corsHeaders, preflight } from './_cors';

export const config = { runtime: 'edge' };

function clean(v: unknown, max = 4000): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function esc(v: string): string {
  return v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

async function run(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid body.' }, { status: 400 });
  }

  const name = clean(body.name, 200);
  const email = clean(body.email, 200);
  const message = clean(body.message);
  if (!name || !email) {
    return Response.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const at = new Date().toISOString();
  console.log(`contact-enquiry ${JSON.stringify({ at, name, email, hasMessage: Boolean(message) })}`);

  const apiKey = process.env.RESEND_API_KEY ?? '';
  const to = process.env.CONSENT_EMAIL_TO ?? '';
  if (!apiKey || !to) {
    // Nothing was delivered, and the sender is told so — a silent 200 here
    // would leave someone believing they had made contact when they had not.
    console.warn('contact-email-skipped: RESEND_API_KEY or CONSENT_EMAIL_TO is not set');
    return Response.json({ error: 'Mail is not configured.' }, { status: 503 });
  }

  const html =
    '<h2 style="font-family:system-ui,sans-serif">個別相談のお申し込み / Consultation request</h2>' +
    '<table style="font-family:system-ui,sans-serif;border-collapse:collapse">' +
    ([['お名前 / Name', name], ['メール / Email', email], ['受信日時 / Received (UTC)', at]] as [string, string][])
      .map(([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#555">${esc(k)}</td>` +
        `<td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join('') +
    '</table>' +
    (message ? `<p style="font-family:system-ui,sans-serif;white-space:pre-wrap;margin-top:16px">${esc(message)}</p>` : '');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONSENT_EMAIL_FROM ?? 'JWD Investment <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject: `【個別相談】${name}様 — ${email}`,
        html,
        reply_to: email,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
    return Response.json({ ok: true }, { status: 200, headers: { 'cache-control': 'no-store' } });
  } catch (err) {
    console.error('contact-email-failed:', err);
    return Response.json({ error: 'Could not send.' }, { status: 502 });
  }
}

/* Answer the preflight, then stamp the real response. Rebuilt rather than
   mutated so a streamed body (the advisor) passes through untouched. */
export default async function handler(request: Request): Promise<Response> {
  const pre = preflight(request);
  if (pre) return pre;

  const res = await run(request);
  const cors = corsHeaders(request);
  if (Object.keys(cors).length === 0) return res;

  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}
