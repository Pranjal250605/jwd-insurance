import { useT } from '@/i18n';

/* Equiti field photography supplied 2026-08-15. The revision sheet asks for a
   band of photos travelling right to left, so the list is rendered twice and
   translated by exactly half its width — at the loop point the second copy sits
   where the first began, so the seam is invisible. Marquees are a motion
   trigger, so the animation is dropped entirely under prefers-reduced-motion
   and the row becomes a normal horizontally-scrollable strip. */

const PHOTOS = [
  'eq-3936.jpg', 'eq-3937.jpg', 'eq-3938.jpg', 'eq-3939.jpg', 'eq-3940.jpg',
  'eq-3941.jpg', 'eq-3942.jpg', 'eq-3943.jpg', 'eq-3944.jpg', 'eq-3945.jpg',
  'eq-3946.jpg', 'eq-3947.jpg', 'eq-3948.jpg', 'eq-3949.jpg', 'eq-3950.jpg',
  'eq-3951.jpg', 'eq-3952.jpg', 'eq-3953.jpg', 'eq-3954.jpg', 'eq-3955.jpg',
  'eq-3956.jpg', 'eq-3957.jpg', 'eq-3958.jpg', 'eq-3959.jpg', 'eq-3960.jpg',
  'eq-3961.jpg', 'eq-3962.jpg', 'eq-3963.jpg', 'eq-3964.jpg', 'eq-3965.jpg',
  'eq-3966.jpg', 'eq-3967.jpg', 'eq-3968.jpg',
];

export default function PhotoStrip() {
  const { t } = useT();

  return (
    <section className="bg-white overflow-hidden pb-10 sm:pb-14">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-4">
        <div className="text-[11px] font-bold tracking-[0.22em] text-slate-400">{t.hero.stripLabel}</div>
      </div>

      <div className="photo-marquee relative">
        <div className="photo-marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="photo-marquee__row" aria-hidden={copy === 1}>
              {PHOTOS.map((src) => (
                <li key={src} className="flex-shrink-0">
                  <img
                    src={`/strip/${src}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-[104px] sm:h-[132px] w-auto rounded-lg object-cover select-none pointer-events-none"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
        {/* soften both ends into the page rather than cutting photos off hard */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
