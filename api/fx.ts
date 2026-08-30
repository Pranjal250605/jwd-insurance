/**
 * Vercel Edge Function serving the AED→JPY reference rate shown on the hero
 * chip. The upstream is called from the edge rather than the browser so the
 * provider sees one request per CDN region per hour instead of one per
 * visitor, and so swapping in a keyed provider later never touches the client.
 *
 * open.er-api.com is the free, keyless tier of exchangerate-api.com and
 * republishes once every 24h — see `next` in the payload. The cache headers
 * are set accordingly: a hard hour, then a day of stale-while-revalidate so a
 * provider outage degrades to a slightly old number rather than to nothing.
 */
import { corsHeaders, preflight } from './_cors';

export const config = { runtime: 'edge' };

const UPSTREAM = 'https://open.er-api.com/v6/latest/AED';

async function run(request: Request): Promise<Response> {
  try {
    const res = await fetch(UPSTREAM, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`upstream ${res.status}`);

    const data = await res.json();
    const jpy = data?.rates?.JPY;
    if (data?.result !== 'success' || typeof jpy !== 'number' || !isFinite(jpy)) {
      throw new Error('upstream payload missing rates.JPY');
    }

    return new Response(
      JSON.stringify({ jpy, updated: data.time_last_update_utc ?? null, next: data.time_next_update_utc ?? null }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          // The CDN holds the response; the browser is told nothing, so a
          // reader who reloads still gets whatever the edge currently has.
          'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch (err) {
    console.error('fx api error:', err);
    // The client keeps its fallback rate on a non-200, so there is nothing to
    // say here beyond "not now".
    return new Response(JSON.stringify({ error: 'Rate unavailable.' }), {
      status: 503,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    });
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
