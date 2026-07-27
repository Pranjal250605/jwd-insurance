import { useEffect, useState } from 'react';

/**
 * SSR-safe, resize-aware matchMedia hook. Used to pick responsive pixel
 * values in components that can't express their layout as pure CSS (e.g.
 * canvas/SVG coordinate math for the office-network diagram and research
 * card cascade), so those elements shrink for real at narrow viewports
 * instead of just being visually scaled while still overflowing.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Below Tailwind's `sm` breakpoint (640px). */
export const useIsPhone = () => useMediaQuery('(max-width: 639px)');
/** Below Tailwind's `lg` breakpoint (1024px) — where the desktop nav collapses. */
export const useIsBelowLg = () => useMediaQuery('(max-width: 1023px)');
