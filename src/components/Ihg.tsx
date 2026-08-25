import { useT } from '@/i18n';

/* 08.25 revision, item 4-①: a section giving the IHG brand its own prominence,
   placed between The World and the chairman's message, as the sheet marks it.

   The sheet renders it as a single tinted panel of copy with no imagery — IHG
   is a third party's brand, so nothing here reproduces their logo or
   photography; the section carries the client's own words about them. */

export default function Ihg() {
  const { t } = useT();
  const c = t.ihg;

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div
          data-spotlight
          className="spotlight rounded-[20px] px-6 py-10 sm:px-12 sm:py-14 lg:px-16"
          style={{ background: 'linear-gradient(135deg, var(--accent-soft) 0%, #ffffff 65%)' }}
        >
          <div className="eyebrow-rule text-[13px] font-semibold tracking-[0.28em] mb-5" style={{ color: 'var(--accent-deep)' }}>
            {c.eyebrow}
          </div>

          <h2 className="font-serif fluid-36-44 leading-[1.3] font-medium text-slate-900 tracking-[-0.015em] mb-2">
            {c.title}
          </h2>
          <p className="font-serif text-[24px] sm:text-[30px] leading-[1.35] font-medium mb-8" style={{ color: 'var(--accent-deep)' }}>
            {c.subtitle}
          </p>

          <div className="max-w-4xl space-y-4">
            {c.paragraphs.map((p, i) => (
              <p key={i} className="text-[18px] sm:text-[19.5px] leading-[1.9] text-slate-700">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
