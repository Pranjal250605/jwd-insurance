import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SNAP = { ease: 'power4.out', clearProps: 'opacity,transform' } as const;

export default function AnimationsInit() {
  useEffect(() => {
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

      const heroStats = document.querySelectorAll<HTMLElement>('section .mt-16.pt-10 > *');
      if (heroStats.length) {
        heroTl.from(heroStats, { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ...SNAP }, '-=0.6');
      }

      // ── Hero visual entrance ─────────────────────────────────────────
      const heroVisual = document.querySelector<HTMLElement>('section .relative.h-\\[620px\\]');
      if (heroVisual) {
        heroTl.from(heroVisual, { y: 40, opacity: 0, duration: 1.2, ease: 'power4.out', clearProps: 'opacity,transform' }, 0.1);
      }

      // ── Floating idle on hero overlay cards ──────────────────────────
      document.querySelectorAll<HTMLElement>('section .relative.h-\\[620px\\] .absolute.bg-white.rounded-xl').forEach((el, i) => {
        gsap.to(el, {
          y: `+=${5 + (i % 2) * 3}`,
          duration: 3.2 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

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
      const officeCards = document.querySelectorAll<HTMLElement>('section .relative.h-\\[440px\\] > .absolute.bg-white.rounded-lg');
      if (officeCards.length) {
        gsap.from(officeCards, {
          scrollTrigger: { trigger: officeCards[0].parentElement!, start: 'top 78%', toggleActions: 'play none none reverse' },
          scale: 0.85, opacity: 0, duration: 0.9, stagger: 0.1,
          ease: 'back.out(1.2)', clearProps: 'opacity,transform',
        });
      }

      // ── Research / lesson cards (Explore) ────────────────────────────
      const researchCards = document.querySelectorAll<HTMLElement>('section .rounded-\\[20px\\] .absolute.right-0.bg-white.rounded-xl');
      if (researchCards.length) {
        gsap.from(researchCards, {
          scrollTrigger: { trigger: researchCards[0].parentElement!, start: 'top 80%', toggleActions: 'play none none reverse' },
          x: 40, opacity: 0, duration: 1.0, stagger: 0.14,
          ease: 'power4.out', clearProps: 'opacity',
        });
      }

      // ── Language chips ────────────────────────────────────────────────
      const langChips = document.querySelectorAll<HTMLElement>('section .px-5.h-10.rounded-full');
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

    return () => ctx.revert();
  }, []);

  return null;
}
