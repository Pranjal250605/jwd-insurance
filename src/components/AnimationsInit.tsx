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
      if (heroEyebrow) heroTl.from(heroEyebrow, { y: 20, opacity: 0, duration: 0.8 });
      if (heroH1)      heroTl.from(heroH1,      { y: 30, opacity: 0, duration: 1.0 }, '-=0.5');
      if (heroJP)      heroTl.from(heroJP,      { y: 20, opacity: 0, duration: 0.8 },  '-=0.6');
      if (heroBody)    heroTl.from(heroBody,    { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');

      const heroCTAs = document.querySelectorAll<HTMLElement>('section h1 ~ div.flex.items-center.gap-4 > *');
      if (heroCTAs.length) {
        heroTl.from(heroCTAs, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ...SNAP }, '-=0.5');
      }

      const heroStats = document.querySelectorAll<HTMLElement>('[data-anim="hero-stats"] > *');
      if (heroStats.length) {
        heroTl.from(heroStats, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ...SNAP }, '-=0.6');
      }

      // ── Hero visual entrance ─────────────────────────────────────────
      const heroVisual = document.querySelector<HTMLElement>('[data-anim="hero-visual"]');
      if (heroVisual) {
        heroTl.from(heroVisual, { y: 40, opacity: 0, duration: 1.2, ease: 'power4.out', clearProps: 'opacity,transform' }, 0.1);
      }

      // ── Floating idle on hero overlay cards ──────────────────────────
      // Only at `lg`+, where the cards are absolutely floated over the
      // photo — below that they sit in normal document flow (stacked under
      // the image), and bobbing a static-flow element up and down would
      // just look like a layout jitter rather than a premium float.
      if (window.matchMedia('(min-width: 1024px)').matches) {
        document.querySelectorAll<HTMLElement>('[data-anim="hero-cards"] > .equiti-card-rim').forEach((el, i) => {
          gsap.to(el, {
            y: `+=${5 + (i % 2) * 3}`,
            duration: 3.2 + i * 0.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: i * 0.3,
          });
        });
      }

      // ── Section text reveals ─────────────────────────────────────────
      document.querySelectorAll<HTMLElement>('section .max-w-\\[1280px\\]').forEach((panel, idx) => {
        if (idx === 0) return;
        const eyebrow = panel.querySelector<HTMLElement>('.tracking-\\[0\\.28em\\], .tracking-\\[0\\.22em\\]');
        const heading = panel.querySelector<HTMLElement>('h2');
        const body    = heading?.nextElementSibling as HTMLElement | null | undefined;
        const reveal  = [eyebrow, heading, body].filter((el): el is HTMLElement => el != null);
        if (!reveal.length) return;
        gsap.from(reveal, {
          scrollTrigger: { trigger: panel, start: 'top 80%', toggleActions: 'play none none reverse' },
          y: 30, opacity: 0, duration: 1.0, stagger: 0.12, ...SNAP,
        });
      });

      // ── Card grids (md:grid-cols-3 + md:grid-cols-2) ─────────────────
      document.querySelectorAll<HTMLElement>('.grid.md\\:grid-cols-3, .grid.md\\:grid-cols-2').forEach((grid) => {
        if (!grid.children.length) return;
        gsap.from(Array.from(grid.children), {
          scrollTrigger: { trigger: grid, start: 'top 82%', toggleActions: 'play none none reverse' },
          y: 40, opacity: 0, duration: 1.0, stagger: 0.12,
          ease: 'power4.out', clearProps: 'opacity,transform',
        });
      });

      // ── Rounded feature panels ───────────────────────────────────────
      document.querySelectorAll<HTMLElement>('section .rounded-\\[20px\\]').forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: { trigger: panel, start: 'top 84%', toggleActions: 'play none none reverse' },
          y: 30, opacity: 0, scale: 0.98, duration: 1.1,
          ease: 'power4.out', clearProps: 'opacity,transform',
        });
      });

      // ── Office cards (Money component globe markers) ─────────────────
      const officeCards = document.querySelectorAll<HTMLElement>('[data-anim="office-diagram"] > .absolute.bg-white.rounded-lg');
      if (officeCards.length) {
        gsap.from(officeCards, {
          scrollTrigger: { trigger: officeCards[0].parentElement!, start: 'top 78%', toggleActions: 'play none none reverse' },
          scale: 0.85, opacity: 0, duration: 0.9, stagger: 0.1,
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
          scrollTrigger: { trigger: researchCards[0].parentElement!, start: 'top 80%', toggleActions: 'play none none reverse' },
          x: 40, opacity: 0, duration: 1.0, stagger: 0.14,
          ease: 'power4.out', clearProps: 'opacity',
        });
      } else {
        const stackedResearchCards = document.querySelectorAll<HTMLElement>('[data-anim="research-cards"].flex > *');
        if (stackedResearchCards.length) {
          gsap.from(stackedResearchCards, {
            scrollTrigger: { trigger: stackedResearchCards[0].parentElement!, start: 'top 82%', toggleActions: 'play none none reverse' },
            y: 20, opacity: 0, duration: 0.8, stagger: 0.1,
            ease: 'power4.out', clearProps: 'opacity,transform',
          });
        }
      }

      // ── Language chips ────────────────────────────────────────────────
      const langChips = document.querySelectorAll<HTMLElement>('[data-anim="lang-chips"] > *');
      if (langChips.length) {
        gsap.from(langChips, {
          scrollTrigger: { trigger: langChips[0].parentElement!, start: 'top 82%', toggleActions: 'play none none reverse' },
          y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power4.out', clearProps: 'opacity,transform',
        });
      }

      // ── Regulator badges (closing CTA) ───────────────────────────────
      const regulatorBadges = document.querySelectorAll<HTMLElement>('.px-6.py-4.bg-white.rounded-md.border');
      if (regulatorBadges.length) {
        gsap.from(regulatorBadges, {
          scrollTrigger: { trigger: regulatorBadges[0].parentElement!, start: 'top 84%', toggleActions: 'play none none reverse' },
          y: 20, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power4.out', clearProps: 'opacity,transform',
        });
      }

      // ── Footer columns ────────────────────────────────────────────────
      const footerCols = document.querySelectorAll<HTMLElement>('footer .grid > div');
      if (footerCols.length) {
        gsap.from(footerCols, {
          scrollTrigger: { trigger: 'footer', start: 'top 85%', toggleActions: 'play none none reverse' },
          y: 24, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out', clearProps: 'opacity,transform',
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
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
    };
  }, []);

  return null;
}
