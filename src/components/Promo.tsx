import { useT } from '@/i18n';

const PILLAR_ICONS = [
  <svg key="shield" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 2l9 5v6c0 5-4 8-9 9-5-1-9-4-9-9V7l9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="clock" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>,
  <svg key="people" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 11l-3 3-2-2" />
  </svg>,
];

export default function Promo() {
  const { lang, t } = useT();
  const c = t.promo.chairman;

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-12">
        {/* Chairman's message. The portrait floats into the running text at
            lg+ (as in the approved layout) and stacks above it below that. */}
        <div
          data-spotlight
          className="spotlight rounded-[20px] p-6 sm:p-10 lg:p-14 relative overflow-hidden"
          style={{ background: 'var(--gradient-soft)' }}
        >
          <div className="relative">
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>
              {c.eyebrow}
            </div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-7">{c.sub}</div>
            <h2 className="font-serif fluid-36-44 leading-[1.25] font-medium text-slate-900 mb-8 tracking-[-0.01em] max-w-3xl" style={{ textWrap: 'balance' } as React.CSSProperties}>
              {c.title}
            </h2>

            <figure className="lg:float-left lg:w-[340px] lg:mr-10 lg:mb-8 mb-8 m-0">
              <div className="img-zoom relative rounded-xl overflow-hidden aspect-[4/5]">
                <img
                  src="/tomo-kawana.jpg"
                  alt={`${c.name}, ${c.role}, ${c.company}`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(var(--photo-tint-rgb),0.72) 100%)' }} />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white/70 text-[11px] tracking-[0.12em] mb-1.5">{c.company}</div>
                  <div className="text-white font-serif text-[19px] font-semibold leading-tight">{c.name}</div>
                  <div className="text-white/80 text-[12.5px] mt-0.5">{c.role}</div>
                </figcaption>
              </div>
            </figure>

            <p className="text-[18px] leading-[1.75] font-medium text-slate-800 mb-6">{c.lead}</p>

            {c.blocks.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h3 className="text-[16.5px] font-semibold text-slate-900 mt-8 mb-4">{block.heading}</h3>
                )}
                {block.paragraphs.map((p, j) => (
                  <p key={j} className="text-[16.5px] leading-[1.9] text-slate-600 mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="clear-both flex justify-end pt-10">
              <img
                src={lang === 'ja' ? '/signature-ja.png' : '/signature-en.png'}
                alt={c.name}
                className={lang === 'ja' ? 'h-[68px] w-auto' : 'h-[46px] w-auto'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-8 sm:pb-10">
        <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.promo.whyEyebrow}</div>
        <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.promo.whySub}</div>
        <h2 className="font-serif fluid-40-52 leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] max-w-3xl">
          {t.promo.whyTitle}
        </h2>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {t.promo.pillars.map((p, i) => (
            <div key={i} data-spotlight className="spotlight group bg-white border border-slate-100 rounded-xl p-6 sm:p-9 hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.18)] hover:-translate-y-0.5 transition-all">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-7 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6" style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}>
                {PILLAR_ICONS[i]}
              </div>
              <div className="font-jp text-[12px] tracking-[0.18em] text-slate-500 mb-1">{p.sub}</div>
              <h3 className="font-serif text-[24px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[18px] leading-[1.6] text-slate-600 mb-7">{p.body}</p>
              <a href="#" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {p.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
