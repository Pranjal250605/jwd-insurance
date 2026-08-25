/**
 * Vercel Edge Function recording who accepted the 08.18 information notice
 * (08.25 revision, item 5 — the client needs to be able to say *who* consented).
 *
 * Each acceptance is emailed to CONSENT_EMAIL_TO via Resend. Both of these must
 * be set in the Vercel project environment for that to happen:
 *
 *   RESEND_API_KEY    — from resend.com
 *   CONSENT_EMAIL_TO  — the inbox that should receive the records
 *   CONSENT_EMAIL_FROM (optional) — a verified sender on your domain;
 *                       defaults to Resend's onboarding sender, which works
 *                       immediately but is worth replacing with a JWD address.
 *
 * With the key or recipient missing the endpoint still answers 200 and writes
 * the same structured line to the platform log, so the reader is never blocked
 * by a mail problem — but nothing durable is kept. The response body reports
 * which of the two happened, so a failure to deliver is visible rather than
 * silent.
 */
export const config = { runtime: 'edge' };

interface ConsentBody {
  name?: string;
  kana?: string;
  phone?: string;
  email?: string;
  entity?: string;
  company?: string;
}

function clean(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** Escape before interpolating reader-supplied text into the HTML body. */
function esc(v: string): string {
  return v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  let body: ConsentBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid body.' }, { status: 400 });
  }

  const entry = {
    at: new Date().toISOString(),
    name: clean(body.name),
    kana: clean(body.kana),
    phone: clean(body.phone),
    email: clean(body.email),
    entity: clean(body.entity, 20),
    company: clean(body.company),
    // Helps disambiguate two records with the same name; not an identity.
    ip: request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null,
  };

  if (!entry.name || !entry.email) {
    return Response.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  // Always logged, so a mail outage never loses the fact of the acceptance.
  console.log(`consent-accepted ${JSON.stringify(entry)}`);

  const apiKey = process.env.RESEND_API_KEY ?? '';
  const to = process.env.CONSENT_EMAIL_TO ?? '';
  if (!apiKey || !to) {
    console.warn('consent-email-skipped: RESEND_API_KEY or CONSENT_EMAIL_TO is not set');
    return Response.json({ ok: true, delivered: false, reason: 'mail not configured' },
      { status: 200, headers: { 'cache-control': 'no-store' } });
  }

  const rows: [string, string][] = [
    ['お名前 / Name', entry.name],
    ['フリガナ / Kana', entry.kana],
    ['電話番号 / Phone', entry.phone],
    ['Eメール / Email', entry.email],
    ['法人・個人 / Entity', entry.entity],
    ['会社名 / Company', entry.company],
    ['同意日時 / Accepted at (UTC)', entry.at],
    ['IP', entry.ip ?? '—'],
  ];

  const html =
    '<h2 style="font-family:system-ui,sans-serif">資産運用情報の閲覧に関する同意 / Consent recorded</h2>' +
    '<table style="font-family:system-ui,sans-serif;border-collapse:collapse">' +
    rows.map(([k, v]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#555">${esc(k)}</td>` +
      `<td style="padding:6px 0"><strong>${esc(v || '—')}</strong></td></tr>`).join('') +
    '</table>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONSENT_EMAIL_FROM ?? 'JWD Investment <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject: `【同意記録】${entry.name}様 — ${entry.email}`,
        html,
        reply_to: entry.email,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
    return Response.json({ ok: true, delivered: true },
      { status: 200, headers: { 'cache-control': 'no-store' } });
  } catch (err) {
    // The acceptance is already in the log above, so this is reported, not fatal.
    console.error('consent-email-failed:', err);
    return Response.json({ ok: true, delivered: false, reason: 'mail failed' },
      { status: 200, headers: { 'cache-control': 'no-store' } });
  }
}
