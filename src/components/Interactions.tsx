import { useEffect } from 'react';

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Premium interaction layer — additive, framework-light, and decoupled from
 * the GSAP class hooks in AnimationsInit. Handles:
 *   • cursor-tracked spotlight borders ([data-spotlight] / .spotlight)
 *   • animated count-up stats ([data-count])
 *   • a top scroll-progress bar (--scroll on :root)
 *   • subtle magnetic CTAs ([data-magnetic])
 *   • eyebrow leading-rule reveal on scroll (.eyebrow-rule)
 */
export default function Interactions() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // ── Scroll progress ───────────────────────────────────────────────
    const root = document.documentElement;
    let rafScroll = 0;
    const onScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        const max = root.scrollHeight - root.clientHeight;
        root.style.setProperty('--scroll', max > 0 ? String(window.scrollY / max) : '0');
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    // ── Cursor-tracked spotlight cards ────────────────────────────────
    let rafSpot = 0;
    let lastSpot: { el: HTMLElement; x: number; y: number } | null = null;
    const onPointerMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement)?.closest<HTMLElement>('[data-spotlight]');
      if (!card) return;
      const r = card.getBoundingClientRect();
      lastSpot = { el: card, x: e.clientX - r.left, y: e.clientY - r.top };
      if (rafSpot) return;
      rafSpot = requestAnimationFrame(() => {
        rafSpot = 0;
        if (!lastSpot) return;
        lastSpot.el.style.setProperty('--mx', `${lastSpot.x}px`);
        lastSpot.el.style.setProperty('--my', `${lastSpot.y}px`);
      });
    };
    if (!REDUCED) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));
    }

    // ── Magnetic CTAs ─────────────────────────────────────────────────
    if (!REDUCED) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const strength = 0.28;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * strength;
          const dy = (e.clientY - (r.top + r.height / 2)) * strength;
          el.style.setProperty('--mx-pull', `${dx}px`);
          el.style.setProperty('--my-pull', `${dy}px`);
        };
        const reset = () => {
          el.style.setProperty('--mx-pull', '0px');
          el.style.setProperty('--my-pull', '0px');
        };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', reset);
        cleanups.push(() => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', reset);
        });
      });
    }

    // ── Count-up stats ────────────────────────────────────────────────
    // Parses "$48B", "1,200+", "10 yrs", "¥2,847,500,000" into
    // prefix / number / suffix and animates the numeric part on first view.
    const animateCount = (el: HTMLElement) => {
      const raw = el.dataset.count ?? el.textContent ?? '';
      const m = raw.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/s);
      if (!m) return;
      const [, prefix, numStr, suffix] = m;
      const hasComma = numStr.includes(',');
      const decimals = (numStr.split('.')[1] ?? '').length;
      const target = parseFloat(numStr.replace(/,/g, ''));
      if (!isFinite(target)) return;

      const format = (v: number) => {
        const fixed = v.toFixed(decimals);
        const out = hasComma ? Number(fixed).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) : fixed;
        return `${prefix}${out}${suffix}`;
      };

      if (REDUCED) { el.textContent = format(target); return; }

      const duration = 1400;
      let start = 0;
      el.textContent = format(0);
      const tick = (t: number) => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
        el.textContent = format(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = format(target);
      };
      requestAnimationFrame(tick);
    };

    const counters = document.querySelectorAll<HTMLElement>('[data-count]');
    if (counters.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target as HTMLElement);
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // ── Eyebrow leading-rule reveal ───────────────────────────────────
    const rules = document.querySelectorAll<HTMLElement>('.eyebrow-rule');
    if (rules.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      rules.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
