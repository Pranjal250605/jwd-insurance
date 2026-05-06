'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AnimationsInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Hero cascade ────────────────────────────────────────────────
    const heroEyebrow = document.querySelector<HTMLElement>('section .text-\\[12px\\]');
    const heroH1 = document.querySelector<HTMLElement>('section h1');
    const heroP = document.querySelector<HTMLElement>('section h1 + p');

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'opacity,transform' } });
    if (heroEyebrow) heroTl.from(heroEyebrow, { y: 14, opacity: 0, duration: 0.6 });
    if (heroH1) heroTl.from(heroH1, { y: 30, opacity: 0, duration: 0.9 }, '-=0.4');
    if (heroP) heroTl.from(heroP, { y: 20, opacity: 0, duration: 0.7 }, '-=0.6');

    const heroCTAs = document.querySelectorAll<HTMLElement>('section h1 ~ div.flex.items-center.gap-4 > *');
    if (heroCTAs.length) {
      heroTl.from(heroCTAs, { y: 14, opacity: 0, duration: 0.6, stagger: 0.08, clearProps: 'opacity,transform' }, '-=0.5');
    }

    const heroTrust = document.querySelectorAll<HTMLElement>('section .mt-14.flex.items-center.gap-8 > *');
    if (heroTrust.length) {
      heroTl.from(heroTrust, { y: 12, opacity: 0, duration: 0.5, stagger: 0.06, clearProps: 'opacity,transform' }, '-=0.4');
    }

    // Floating idle on hero chips
    document.querySelectorAll<HTMLElement>('.absolute.rounded-2xl.shadow-\\[0_8px_32px_-8px_rgba\\(15\\,23\\,42\\,0\\.18\\)\\]').forEach((el, i) => {
      gsap.to(el, {
        y: '+=' + (8 + (i % 3) * 4),
        duration: 2.4 + i * 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.15,
      });
    });

    // ── Section reveals ─────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('section .max-w-\\[1280px\\]').forEach((panel, idx) => {
      if (idx === 0) return;
      const eyebrow = panel.querySelector<HTMLElement>('.tracking-\\[0\\.22em\\], .tracking-\\[0\\.2em\\]');
      const heading = panel.querySelector<HTMLElement>('h2');
      const body = heading?.nextElementSibling as HTMLElement | null;
      const reveal = [eyebrow, heading, body].filter((el): el is HTMLElement => el != null);
      if (!reveal.length) return;
      gsap.from(reveal, {
        scrollTrigger: { trigger: panel, start: 'top 82%', toggleActions: 'play none none reverse' },
        y: 32, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        clearProps: 'opacity,transform',
      });
    });

    // ── Card grids ──────────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('.grid.md\\:grid-cols-3').forEach((grid) => {
      if (!grid.children.length) return;
      gsap.from(Array.from(grid.children), {
        scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        clearProps: 'opacity,transform',
      });
    });

    // ── Rounded panels ──────────────────────────────────────────────
    document.querySelectorAll<HTMLElement>('section .rounded-\\[28px\\]').forEach((panel) => {
      gsap.from(panel, {
        scrollTrigger: { trigger: panel, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, scale: 0.98, duration: 0.9, ease: 'power3.out',
        clearProps: 'opacity,transform',
      });
    });

    // ── Asset card fan ──────────────────────────────────────────────
    const fanCards = document.querySelectorAll<HTMLElement>('section .rounded-\\[28px\\] .absolute.w-\\[120px\\].h-\\[180px\\]');
    if (fanCards.length) {
      gsap.from(fanCards, {
        scrollTrigger: { trigger: fanCards[0].parentElement!, start: 'top 75%', toggleActions: 'play none none reverse' },
        y: 60, opacity: 0, rotation: '-=20', duration: 0.9, stagger: 0.08,
        ease: 'back.out(1.3)', clearProps: 'opacity',
      });
    }

    // ── Education lesson cards ──────────────────────────────────────
    const lessonCards = document.querySelectorAll<HTMLElement>('section .rounded-\\[28px\\] .absolute.right-0.bg-white.rounded-xl');
    if (lessonCards.length) {
      gsap.from(lessonCards, {
        scrollTrigger: { trigger: lessonCards[0].parentElement!, start: 'top 80%', toggleActions: 'play none none reverse' },
        x: 80, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        clearProps: 'opacity',
      });
    }

    // ── Language chips ──────────────────────────────────────────────
    const langChips = document.querySelectorAll<HTMLElement>('section .px-4.h-9.rounded-full');
    if (langChips.length) {
      gsap.from(langChips, {
        scrollTrigger: { trigger: langChips[0].parentElement!, start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 16, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        clearProps: 'opacity,transform',
      });
    }

    // ── Payment chips ───────────────────────────────────────────────
    const payChips = document.querySelectorAll<HTMLElement>('.h-12.px-6.bg-white.rounded-xl.border');
    if (payChips.length) {
      gsap.from(payChips, {
        scrollTrigger: { trigger: payChips[0].parentElement!, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        clearProps: 'opacity,transform',
      });
    }

    // ── Footer columns ──────────────────────────────────────────────
    const footerCols = document.querySelectorAll<HTMLElement>('footer .grid > div');
    if (footerCols.length) {
      gsap.from(footerCols, {
        scrollTrigger: { trigger: 'footer', start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        clearProps: 'opacity,transform',
      });
    }

    setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
