import { useEffect, useState } from 'react';
import { useT } from '@/i18n';

/* 08.18 revision, page ①: "Use the below photos for the Main images." The
   sheet supplies ten Dubai photographs rather than one, so the hero's visual
   column cross-fades through them instead of holding a single frame. The
   first is eager — it is the largest thing above the fold — and the rest load
   lazily as the rotation reaches them.

   Auto-advance is motion, so prefers-reduced-motion holds on the first frame
   and the reader can still step through with the dots — and the slide itself
   is dropped there too, so stepping jumps rather than travels. */

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

const INTERVAL = 4000;

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
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The frames sit in one full-width track that slides by whole viewport
          widths, rather than cross-fading in place: the client asked for a
          slide. overflow-hidden on the wrapper crops everything but the
          current frame. */}
      <div
        className="absolute inset-0 flex h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${i * 100}%)` }}
      >
        {IMAGES.map((src, n) => (
          <img
            key={src}
            src={src}
            alt={n === i ? `${t.hero.mainImages[n].name}, ${t.hero.mainImages[n].area}` : ''}
            aria-hidden={n !== i}
            loading={n === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Page ① shows the photograph clean — no caption plate, no tint. The
          dots are the one thing kept: with ten frames and no other control,
          a reader holding on prefers-reduced-motion would otherwise be stuck
          on the first image forever. */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-1.5 z-10 rounded-full bg-slate-900/30 backdrop-blur-sm px-2.5 py-1.5">
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
