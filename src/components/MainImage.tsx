import { useEffect, useState } from 'react';
import { useT } from '@/i18n';

/* 08.18 revision, page ①: "Use the below photos for the Main images." The
   sheet supplies ten Dubai photographs rather than one, so the hero's visual
   column cross-fades through them instead of holding a single frame. The
   first is eager — it is the largest thing above the fold — and the rest load
   lazily as the rotation reaches them.

   Auto-advance is motion, so prefers-reduced-motion holds on the first frame
   and the reader can still step through with the dots. */

/* Order matches t.hero.mainImages, which carries the caption for each frame —
   the overlay label has to track the photo, or the reader is told they are
   looking at something they are not. */
const IMAGES = [
  '/main/burj-khalifa.jpg',
  '/main/atlantis.jpg',
  '/main/burj-al-arab.jpg',
  '/main/difc-gate.jpg',
  '/main/villa-pool.jpg',
  '/main/floating-villa.jpg',
  '/main/heart-island.jpg',
  '/main/aquarium.jpg',
  '/main/tower.jpg',
  '/main/palm-jumeirah.jpg',
];

const INTERVAL = 5000;

export default function MainImage() {
  const { t } = useT();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % IMAGES.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {IMAGES.map((src, n) => (
        <img
          key={src}
          src={src}
          alt={n === i ? `${t.hero.mainImages[n].name}, ${t.hero.mainImages[n].area}` : ''}
          aria-hidden={n !== i}
          loading={n === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: n === i ? 1 : 0 }}
        />
      ))}

      {/* Photo caption + area badge, replacing the fixed "flagship project"
          label the single stock photo used to carry. */}
      <div className="absolute top-5 left-5 right-5 sm:top-6 sm:left-6 sm:right-6 flex items-start justify-between gap-3 z-10">
        <div className="text-white min-w-0">
          <div className="text-[10px] font-semibold tracking-[0.22em] opacity-80 mb-1">{t.hero.mainLabel}</div>
          <div className="font-serif text-[19px] sm:text-[22px] font-medium leading-tight">{t.hero.mainImages[i].name}</div>
        </div>
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex-shrink-0">
          <span className="text-[11px] font-semibold tracking-wider" style={{ color: 'var(--accent-deep)' }}>{t.hero.mainImages[i].area}</span>
        </div>
      </div>

      {/* Dots sit clear of the metric cards along the bottom edge. */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[128px] sm:bottom-[150px] flex gap-1.5 z-10 rounded-full bg-slate-900/30 backdrop-blur-sm px-2.5 py-1.5">
        {IMAGES.map((src, n) => (
          <button
            key={src}
            type="button"
            aria-label={t.hero.mainImages[n].name}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={`h-1.5 rounded-full transition-all ${n === i ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
}
