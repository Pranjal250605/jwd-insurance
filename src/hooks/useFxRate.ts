import { useEffect, useState } from 'react';
import { apiUrl } from '@/lib/paths';
import { NO_BACKEND } from '@/lib/runtime';

/* AED→JPY for the hero chip. The number ships with a fallback baked in so the
   chip is never blank and never shifts layout on arrival: the fallback renders
   immediately, and the live rate replaces it once /api/fx answers. A failed or
   slow request therefore costs the reader nothing.

   `live` lets the caller tell the two apart — a stale constant should not be
   presented as though it were today's rate. */

export const FALLBACK_AED_JPY = 43.5;

export interface FxRate {
  jpy: number;
  live: boolean;
  updated: string | null;
}

export function useFxRate(): FxRate {
  const [rate, setRate] = useState<FxRate>({ jpy: FALLBACK_AED_JPY, live: false, updated: null });

  useEffect(() => {
    // Nothing to ask on a static host; the fallback rate already renders, so
    // the request would only produce a 404 on every page load.
    if (NO_BACKEND) return;

    const ac = new AbortController();

    fetch(apiUrl('/api/fx'), { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => {
        if (typeof d?.jpy === 'number' && isFinite(d.jpy)) {
          setRate({ jpy: d.jpy, live: true, updated: d.updated ?? null });
        }
      })
      .catch(() => {
        /* Keep the fallback. A missing FX rate is not worth a console error on
           a marketing page, and AbortError on unmount is expected. */
      });

    return () => ac.abort();
  }, []);

  return rate;
}
