import { useT } from '@/i18n';

export default function RealEstate() {
  const { t } = useT();

  return (
    <section style={{ background: 'var(--surface-alt)' }}>
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 mb-12 items-end">
          <div>
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.realEstate.eyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.realEstate.sub}</div>
            <h2 className="font-serif text-[36px] lg:text-[44px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em]">
              {t.realEstate.title}
            </h2>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="text-[17px] leading-[1.65] text-slate-600 max-w-lg mb-4">
              {t.realEstate.intro}
            </p>
            <a href="#/properties" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              {t.realEstate.portfolioCta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.realEstate.items.map((r) => (
            <div key={r.tag} data-spotlight className="spotlight group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-[0_20px_55px_-16px_rgba(var(--shadow-rgb),0.25)] hover:-translate-y-1 transition-all">
              <div className="img-zoom relative h-[240px] overflow-hidden">
                <img src={r.image} alt={r.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(var(--photo-tint-rgb),0.45) 100%)' }} />
                <div className="absolute bottom-4 left-5">
                  <span className="text-[10px] font-bold tracking-[0.22em] px-3 py-1.5 rounded-full bg-white/90 backdrop-blur" style={{ color: 'var(--accent-deep)' }}>{r.tag}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-[26px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{r.name}</h3>
                <p className="text-[17px] leading-[1.6] text-slate-600 mb-7">{r.desc}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {r.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 h-11 rounded-full border-2 text-[15.5px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-10px_rgba(10,186,181,0.5)]"
                      style={{ color: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
                    >
                      {l.label}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M9 7h8v8" /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-slate-400 mt-5">{t.realEstate.note}</p>
      </div>
    </section>
  );
}
