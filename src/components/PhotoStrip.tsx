import { useEffect, useState } from 'react';
import { asset } from '@/lib/paths';
import { createPortal } from 'react-dom';
import { useT } from '@/i18n';
import { useScrollLock } from '@/hooks/useScrollLock';

/* Equiti field photography supplied 2026-08-15. The revision sheet asks for a
   band of photos travelling right to left, so the list is rendered twice and
   translated by exactly half its width — at the loop point the second copy sits
   where the first began, so the seam is invisible. Marquees are a motion
   trigger, so the animation is dropped entirely under prefers-reduced-motion
   and the row becomes a normal horizontally-scrollable strip.

   08.18 revision, page ③: clicking a photo enlarges it. The overlay keeps the
   index rather than the filename so the arrow keys can walk the set, and the
   marquee's duplicate row is excluded from the tab order so keyboard users
   don't meet all 33 photos twice. */

const PHOTOS = [
  'eq-3936.jpg', 'eq-3937.jpg', 'eq-3938.jpg', 'eq-3939.jpg', 'eq-3940.jpg',
  'eq-3941.jpg', 'eq-3942.jpg', 'eq-3943.jpg', 'eq-3944.jpg', 'eq-3945.jpg',
  'eq-3946.jpg', 'eq-3947.jpg', 'eq-3948.jpg', 'eq-3949.jpg', 'eq-3950.jpg',
  'eq-3951.jpg', 'eq-3952.jpg', 'eq-3953.jpg', 'eq-3954.jpg', 'eq-3955.jpg',
  'eq-3956.jpg', 'eq-3957.jpg', 'eq-3958.jpg', 'eq-3959.jpg', 'eq-3960.jpg',
  'eq-3961.jpg', 'eq-3962.jpg', 'eq-3963.jpg', 'eq-3964.jpg', 'eq-3965.jpg',
  'eq-3966.jpg', 'eq-3967.jpg', 'eq-3968.jpg',
];

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (delta: number) => void }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
    >
      <img
        src={asset(`/strip/${PHOTOS[index]}`)}
        alt=""
        onClick={(e) => e.stopPropagation()}
        /* 1.2× larger than the plain fit. The bounds are pulled in to
           match, so the scaled result still clears the viewport. */
        style={{ transform: 'scale(1.2)' }}
        className="max-h-[74vh] max-w-[74vw] object-contain rounded-lg shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)]"
      />

      {[-1, 1].map((delta) => (
        <button
          key={delta}
          type="button"
          aria-label={delta < 0 ? 'Previous photo' : 'Next photo'}
          onClick={(e) => { e.stopPropagation(); onStep(delta); }}
          className={`absolute top-1/2 -translate-y-1/2 ${delta < 0 ? 'left-2 sm:left-5' : 'right-2 sm:right-5'} w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={delta < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
          </svg>
        </button>
      ))}

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>,
    document.body,
  );
}

export default function PhotoStrip() {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white overflow-hidden pb-10 sm:pb-14">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-4">
        <div className="text-[13.5px] font-bold tracking-[0.22em] text-slate-400">{t.hero.stripLabel}</div>
      </div>

      <div className="photo-marquee relative">
        <div className="photo-marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="photo-marquee__row" aria-hidden={copy === 1}>
              {PHOTOS.map((src, i) => (
                <li key={src} className="flex-shrink-0">
                  <button
                    type="button"
                    tabIndex={copy === 1 ? -1 : 0}
                    onClick={() => setOpen(i)}
                    aria-label="Enlarge photo"
                    className="block cursor-zoom-in rounded-lg overflow-hidden transition-transform hover:scale-[1.04]"
                  >
                    <img
                      src={asset(`/strip/${src}`)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-[104px] sm:h-[132px] w-auto object-cover select-none"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
        {/* soften both ends into the page rather than cutting photos off hard */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent" />
      </div>

      {open !== null && (
        <Lightbox
          index={open}
          onClose={() => setOpen(null)}
          onStep={(d) => setOpen((i) => (i === null ? i : (i + d + PHOTOS.length) % PHOTOS.length))}
        />
      )}
    </section>
  );
}
