import { useEffect } from 'react';

let lockCount = 0;
let savedScrollY = 0;

/**
 * Locks background scroll while `active` is true and restores the exact
 * scroll position on release. Uses the `position: fixed` + negative
 * `top` offset technique (not just `overflow: hidden`) because iOS Safari
 * still allows the page to rubber-band/scroll behind a full-screen overlay
 * with plain overflow:hidden — this is the pattern that actually holds
 * there. Reference-counted so nested/overlapping overlays (e.g. opening the
 * chat while the mobile nav drawer is open) don't unlock each other early.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      document.body.style.top = `-${savedScrollY}px`;
      document.body.classList.add('scroll-locked');
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.classList.remove('scroll-locked');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [active]);
}
