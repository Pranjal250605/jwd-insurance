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
export const config = { runtime: 'edge' };

const UPSTREAM = 'https://open.er-api.com/v6/latest/AED';

export default async function handler(): Promise<Response> {
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
