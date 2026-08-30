/**
 * CORS for the static build hosted off-Vercel.
 *
 * When the site is served from the WordPress host, the browser calls these
 * functions cross-origin and will refuse the response unless the function says
 * that origin is allowed. Only origins named in ALLOWED_ORIGINS are echoed
 * back — never '*', because /api/contact and /api/consent accept POSTs and a
 * wildcard invites every page on the web to submit through them.
 *
 * ALLOWED_ORIGINS is a comma-separated list, e.g.
 *   https://groupjwd.com,https://www.groupjwd.com
 *
 * Same-origin requests (the Vercel deployment itself) send no Origin header on
 * navigation and are unaffected either way.
 *
 * Note this is a browser-side control, not a security boundary: it stops other
 * websites using these endpoints from a visitor's browser, but not a script
 * posting directly. Rate limiting would be the answer to that if it becomes a
 * problem.
 */

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  if (!origin) return {};
  const allowed = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!allowed.includes(origin)) return {};
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
}

/** Answer the browser's preflight. Returns null when this isn't one. */
export function preflight(request: Request): Response | null {
  if (request.method !== 'OPTIONS') return null;
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}
