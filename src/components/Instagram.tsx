import { useT } from '@/i18n';
import { asset } from '@/lib/paths';

/* The Instagram band asked for across the 09.07 and 09.08 sheets: six posts
   from the Heart of Europe, Côte d'Azur Monaco and the Floating Villas, each
   opening its post on Instagram.

   The tiles are the client's own stills, lifted from the revision PDF rather
   than pulled from Instagram — their thumbnails are not ours to hotlink, the
   URLs behind them rotate, and a story's image disappears with the story.
   These sit in /instagram and stay put.

   The section is the target of the Instagram chip in the closing band, so it
   carries id="instagram". */

export default function Instagram() {
  const { t } = useT();
  const c = t.instagram;

  return (
    <section id="instagram" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow-rule text-[13px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>
            {c.eyebrow}
          </div>
          <div className="font-jp text-[16.5px] tracking-[0.18em] text-slate-500 mb-5">{c.sub}</div>
          <h2 className="font-serif fluid-36-44 leading-[1.2] font-medium text-slate-900 tracking-[-0.015em] mb-4">
            {c.title}
          </h2>
          <p className="text-[19px] leading-[1.75] text-slate-600">{c.body}</p>
        </div>

        {/* Two rows of four at desktop, matching the 09.10 sheet, which adds an
            eighth tile; two across on a phone, where four portrait tiles would
            each be thumbnail-sized, and three at tablet width.
            Capped width on purpose: these are 9:16 story frames, and uncapped
            at 1280px they render nearly 1000px tall and swamp the page. The cap
            rises with the extra column so each tile stays about the size the
            sheet draws it. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-[1160px]">
          {c.items.map((item) => (
            <a
              key={item.id + item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="img-zoom relative rounded-xl overflow-hidden bg-slate-900 aspect-[9/16]">
                <img
                  src={asset(`/instagram/${item.id}.jpg`)}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-slate-900/10 transition-colors group-hover:bg-slate-900/0" />

                {/* Instagram glyph, drawn rather than imported: it marks where
                    the tile goes without shipping their brand asset. */}
                <span className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/85 backdrop-blur flex items-center justify-center transition-transform group-hover:scale-105">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" style={{ color: 'var(--accent-deep)' }}>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="text-[16px] sm:text-[17px] font-bold text-slate-900 leading-snug">{item.title}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                  className="flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: 'var(--accent-deep)' }}>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-[14.5px] leading-[1.7] text-slate-500">{c.note}</p>
      </div>
    </section>
  );
}
