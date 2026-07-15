import { useT } from '@/i18n';

const SOLUTION_META = [
  { image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80&auto=format&fit=crop', aum: '$18.4B' },
  { image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop', aum: '$11.2B' },
  { image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop', aum: '$9.6B' },
  { image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80&auto=format&fit=crop', aum: '$5.8B' },
];

const LANG_CHIPS = ['English', '日本語', '中文', 'Deutsch', 'Français', 'Español'];

export default function Products() {
  const { t } = useT();

  return (
    <section style={{ background: 'var(--surface-alt)' }}>
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-16 items-end">
          <div>
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.products.eyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.products.sub}</div>
            <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em]">
              {t.products.title}
            </h2>
          </div>
          <p className="text-[19px] leading-[1.65] text-slate-600 max-w-lg lg:justify-self-end">
            {t.products.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.products.solutions.map((s, i) => (
            <div key={i} data-spotlight className="spotlight group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.16)] hover:-translate-y-0.5 transition-all">
              <div className="grid grid-cols-[1fr_180px]">
                <div className="p-8">
                  <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 mb-2">{s.tag}</div>
                  <h3 className="font-serif text-[24px] font-semibold text-slate-900 mb-1 tracking-[-0.01em]">{s.label}</h3>
                  <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mb-4">{s.sub2}</div>
                  <p className="text-[17px] leading-[1.6] text-slate-600 mb-6">{s.body}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">{t.products.aumLabel}</div>
                      <div className="font-serif text-[21.5px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>{SOLUTION_META[i].aum}</div>
                    </div>
                    <a href="#" className="link-underline text-[12px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                      {t.products.detailCta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>
                <div className="img-zoom relative">
                  <img src={SOLUTION_META[i].image} alt={s.label} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.products.platformsEyebrow}</div>
        <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.products.platformsSub}</div>
        <h2 className="font-serif text-[36px] lg:text-[44px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-10 max-w-3xl">
          {t.products.platformsTitle}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.products.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-spotlight
              className="spotlight group bg-white border-2 rounded-xl p-9 shadow-[0_10px_35px_-14px_rgba(10,186,181,0.35)] hover:shadow-[0_20px_55px_-16px_rgba(10,186,181,0.55)] hover:-translate-y-1 transition-all block"
              style={{ borderColor: 'var(--accent-deep)' }}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-[10px] font-semibold tracking-[0.22em] px-3 py-1.5 rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}>{p.tag}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-slate-300 transition-all group-hover:text-slate-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </div>
              <h3 className="font-serif text-[26px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{p.name}</h3>
              <p className="text-[17px] leading-[1.6] text-slate-600 mb-7">{p.desc}</p>
              <span className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 group-hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {t.products.platformsVisit}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </a>
          ))}
        </div>
        <p className="text-[13px] text-slate-400 mt-5">{t.products.platformsNote}</p>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div data-spotlight className="spotlight spotlight--wash rounded-[20px] p-12 lg:p-20 text-center relative overflow-hidden"
          style={{ background: 'var(--gradient-dark)' }}>
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(var(--photo-tint-rgb), 0.92), rgba(var(--photo-tint-rgb), 0.85))' }} />
          </div>
          <div className="relative">
            <div className="eyebrow-rule justify-center text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--secondary)' }}>{t.products.langEyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] mb-7 text-white/60">{t.products.langSub}</div>
            <h2 className="font-serif text-[36px] lg:text-[52px] leading-[1.15] font-medium text-white tracking-[-0.015em] max-w-3xl mx-auto">
              {t.products.langTitle}
            </h2>
            <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
              {LANG_CHIPS.map((l) => (
                <span key={l} className="px-5 h-10 rounded-full bg-white/5 border border-white/10 text-white/85 text-[15.5px] flex items-center font-medium transition-all duration-300 hover:bg-white/12 hover:border-white/30 hover:text-white hover:-translate-y-0.5 cursor-default">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.products.stepsEyebrow}</div>
        <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.products.stepsSub}</div>
        <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-14 max-w-3xl">
          {t.products.stepsTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.products.steps.map((s, i) => (
            <div key={i} data-spotlight className="spotlight group bg-white border border-slate-100 rounded-xl p-9 hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.16)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-7">
                <div className="font-serif text-[40px] font-medium leading-none transition-transform duration-500 ease-out group-hover:scale-110 origin-left" style={{ color: 'var(--accent-deep)' }}>{`0${i + 1}`}</div>
                <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-300">{t.products.stepLabel}</div>
              </div>
              <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mb-1">{s.sub}</div>
              <h3 className="font-serif text-[22px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[17.5px] leading-[1.6] text-slate-600 mb-8">{s.body}</p>
              <a href="#" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {s.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
