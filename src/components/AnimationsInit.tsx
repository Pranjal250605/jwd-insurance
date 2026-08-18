import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SNAP = { ease: 'power4.out', clearProps: 'opacity,transform' } as const;

export default function AnimationsInit() {
  useEffect(() => {
    // GSAP's .from() sets the "from" state (opacity:0, etc.) via inline
    // style the instant it's called — independent of whether the
    // ScrollTrigger/timeline ever actually plays. A reduced-motion user's
    // content must already be visible at rest, so skip entrance animations
    // entirely rather than trying to instantly-complete them: this is the
    // only way to guarantee nothing is ever set to opacity:0 for them.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // ── Hero cascade ─────────────────────────────────────────────────
      const heroSection = document.querySelector<HTMLElement>('section');
      const heroEyebrow = heroSection?.querySelector<HTMLElement>('.tracking-\\[0\\.22em\\]');
      const heroH1      = heroSection?.querySelector<HTMLElement>('h1');
      const heroJP      = heroSection?.querySelector<HTMLElement>('h1 + p');
      const heroBody    = heroJP?.nextElementSibling as HTMLElement | null;

      const heroTl = gsap.timeline({ defaults: { ...SNAP } });
      if (heroEyebrow) heroTl.from(heroEyebrow, { y: 20, opacity: 0, duration: 0.5 });
      if (heroH1)      heroTl.from(heroH1,      { y: 30, opacity: 0, duration: 0.6 }, '-=0.5');
      if (heroJP)      heroTl.from(heroJP,      { y: 20, opacity: 0, duration: 0.5 },  '-=0.6');
      if (heroBody)    heroTl.from(heroBody,    { y: 20, opacity: 0, duration: 0.5 }, '-=0.6');

      const heroCTAs = document.querySelectorAll<HTMLElement>('section h1 ~ div.flex.items-center.gap-4 > *');
      if (heroCTAs.length) {
        heroTl.from(heroCTAs, { y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ...SNAP }, '-=0.5');
      }

      const heroStats = document.querySelectorAll<HTMLElement>('[data-anim="hero-stats"] > *');
      if (heroStats.length) {
        heroTl.from(heroStats, { y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ...SNAP }, '-=0.6');
      }

      // ── Hero visual entrance ─────────────────────────────────────────
      const heroVisual = document.querySelector<HTMLElement>('[data-anim="hero-visual"]');
      if (heroVisual) {
        heroTl.from(heroVisual, { y: 40, opacity: 0, duration: 1.2, ease: 'power4.out', clearProps: 'opacity,transform' }, 0.1);
      }

      // The hero cards used to bob on an idle float. They now sit in normal
      // document flow at every width (see Hero.tsx), and bobbing a static-flow
      // element up and down reads as layout jitter rather than a premium
      // float, so the idle animation is gone.

      // ── Section text reveals ─────────────────────────────────────────
      document.querySelectorAll<HTMLElement>('section .max-w-\\[1280px\\]').forEach((panel, idx) => {
        if (idx === 0) return;
        const eyebrow = panel.querySelector<HTMLElement>('.tracking-\\[0\\.28em\\], .tracking-\\[0\\.22em\\]');
        const heading = panel.querySelector<HTMLElement>('h2');
        const body    = heading?.nextElementSibling as HTMLElement | null | undefined;
        const reveal  = [eyebrow, heading, body].filter((el): el is HTMLElement => el != null);
        if (!reveal.length) return;
        gsap.from(reveal, {
          scrollTrigger: { trigger: panel, start: 'top 90%', once: true },
          y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ...SNAP,
        });
      });

      // ── Card grids (md:grid-cols-3 + md:grid-cols-2) ─────────────────
      document.querySelectorAll<HTMLElement>('.grid.md\\:grid-cols-3, .grid.md\\:grid-cols-2').forEach((grid) => {
        if (!grid.children.length) return;
        gsap.from(Array.from(grid.children), {
          scrollTrigger: { trigger: grid, start: 'top 90%', once: true },
          y: 40, opacity: 0, duration: 0.6, stagger: 0.06,
          ease: 'power4.out', clearProps: 'opacity,transform',
        });
      });

      // ── Rounded feature panels ───────────────────────────────────────
      document.querySelectorAll<HTMLElement>('section .rounded-\\[20px\\]').forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: { trigger: panel, start: 'top 92%', once: true },
          y: 30, opacity: 0, scale: 0.98, duration: 0.65,
          ease: 'power4.out', clearProps: 'opacity,transform',
        });
      });

      // ── Office cards (Money component globe markers) ─────────────────
      const officeCards = document.querySelectorAll<HTMLElement>('[data-anim="office-diagram"] > .absolute.bg-white.rounded-lg');
      if (officeCards.length) {
        gsap.from(officeCards, {
          scrollTrigger: { trigger: officeCards[0].parentElement!, start: 'top 90%', once: true },
          scale: 0.85, opacity: 0, duration: 0.55, stagger: 0.05,
          ease: 'back.out(1.2)', clearProps: 'opacity,transform',
        });
      }

      // ── Research / lesson cards (Explore) ────────────────────────────
      // Only the lg+ absolute cascade gets the slide-in; the mobile stacked
      // list uses the generic card-grid-style reveal below instead (it
      // isn't a `.grid`, so it needs its own rule).
      const researchCards = document.querySelectorAll<HTMLElement>('[data-anim="research-cards"] > .absolute.right-0.bg-white.rounded-xl');
      if (researchCards.length) {
        gsap.from(researchCards, {
          scrollTrigger: { trigger: researchCards[0].parentElement!, start: 'top 90%', once: true },
          x: 40, opacity: 0, duration: 0.6, stagger: 0.14,
          ease: 'power4.out', clearProps: 'opacity',
        });
      } else {
        const stackedResearchCards = document.querySelectorAll<HTMLElement>('[data-anim="research-cards"].flex > *');
        if (stackedResearchCards.length) {
          gsap.from(stackedResearchCards, {
            scrollTrigger: { trigger: stackedResearchCards[0].parentElement!, start: 'top 90%', once: true },
            y: 20, opacity: 0, duration: 0.5, stagger: 0.05,
            ease: 'power4.out', clearProps: 'opacity,transform',
          });
        }
      }

      // ── Language chips ────────────────────────────────────────────────
      const langChips = document.querySelectorAll<HTMLElement>('[data-anim="lang-chips"] > *');
      if (langChips.length) {
        gsap.from(langChips, {
          scrollTrigger: { trigger: langChips[0].parentElement!, start: 'top 90%', once: true },
          y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power4.out', clearProps: 'opacity,transform',
        });
      }

      // ── Regulator badges (closing CTA) ───────────────────────────────
      const regulatorBadges = document.querySelectorAll<HTMLElement>('.px-6.py-4.bg-white.rounded-md.border');
      if (regulatorBadges.length) {
        gsap.from(regulatorBadges, {
          scrollTrigger: { trigger: regulatorBadges[0].parentElement!, start: 'top 92%', once: true },
          y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power4.out', clearProps: 'opacity,transform',
        });
      }

      // ── Footer columns ────────────────────────────────────────────────
      const footerCols = document.querySelectorAll<HTMLElement>('footer .grid > div');
      if (footerCols.length) {
        gsap.from(footerCols, {
          scrollTrigger: { trigger: 'footer', start: 'top 92%', once: true },
          y: 24, opacity: 0, duration: 0.55, stagger: 0.05, ease: 'power4.out', clearProps: 'opacity,transform',
        });
      }

      setTimeout(() => ScrollTrigger.refresh(), 300);
    });

    // Rotating the device changes the viewport outright, which can leave
    // ScrollTrigger's cached trigger positions stale. Re-sync on that —
    // but NOT on every 'resize', because iOS Safari fires 'resize'
    // continuously while its address bar collapses/expands during normal
    // scrolling (a height-only change, width unchanged). A naive
    // resize->refresh() listener turns that into a feedback loop — refresh()
    // can itself perturb layout enough to fire more resize events — that
    // pegs the main thread and gets the tab killed by Safari's "a problem
    // repeatedly occurred" watchdog. So: only refresh when the WIDTH
    // actually changes (real rotation/resize), and debounce on top of that
    // as a second guard. (Declared outside gsap.context because it's a
    // plain DOM listener, not a GSAP tween — ctx.revert() only tracks the
    // latter, so this needs its own cleanup.)
    // The photo band and the eight video posters load lazily, landing after
    // first paint and changing the page height. That leaves ScrollTrigger's
    // cached trigger positions stale, and a trigger that never fires would
    // strand its content at the opacity:0 that .from() applies up front —
    // permanently blank. Re-sync once everything has loaded, with a couple of
    // late passes to cover slow media.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const lateRefreshes = [800, 2000, 4000].map((t) => setTimeout(refresh, t));

    let lastWidth = window.innerWidth;
    let debounceId: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return; // height-only (toolbar) change — ignore
      lastWidth = window.innerWidth;
      clearTimeout(debounceId);
      debounceId = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    const onOrientation = () => {
      clearTimeout(debounceId);
      debounceId = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrientation);

    return () => {
      ctx.revert();
      clearTimeout(debounceId);
      lateRefreshes.forEach(clearTimeout);
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
    };
  }, []);

  return null;
}
