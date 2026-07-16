import { useT } from '@/i18n';

/* Stroke icons mirroring the lucide set used on jwd-web
   (candlestick, bar-chart, droplet, pie-chart, layers, bitcoin, shield) */
const MARKET_ICONS = [
  // forex — candlestick chart
  <svg key="fx" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M9 5v4" /><rect x="7" y="9" width="4" height="6" rx="1" /><path d="M9 15v4" />
    <path d="M17 3v2" /><rect x="15" y="5" width="4" height="8" rx="1" /><path d="M17 13v3" />
    <path d="M3 3v18h18" />
  </svg>,
  // indices — bar chart
  <svg key="idx" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M3 3v18h18" /><path d="M8 17v-6" /><path d="M13 17V7" /><path d="M18 17v-4" />
  </svg>,
  // commodities — droplet
  <svg key="com" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.4 0z" />
  </svg>,
  // shares — pie chart
  <svg key="sh" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M21.2 15.9A10 10 0 1 1 8 2.8" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>,
  // etfs — layers
  <svg key="etf" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l10 5.5L12 13 2 7.5 12 2z" /><path d="M2 12.5L12 18l10-5.5" /><path d="M2 17.5L12 23l10-5.5" />
  </svg>,
  // crypto — bitcoin
  <svg key="btc" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4h5a3 3 0 0 1 0 6H9zM9 10h6a3 3 0 0 1 0 6H9z" /><path d="M9 4v12" /><path d="M11 2v2M14 2v2M11 16v2M14 16v2" />
  </svg>,
  // gold options — shield
  <svg key="au" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6l8-4z" />
  </svg>,
];

export default function Markets() {
  const { t } = useT();

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 pt-4 pb-16">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 mb-12 items-end">
          <div>
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.markets.eyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.markets.sub}</div>
            <h2 className="font-serif text-[36px] lg:text-[44px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em]">
              {t.markets.title}
            </h2>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="text-[17px] leading-[1.65] text-slate-600 max-w-lg mb-4">{t.markets.intro}</p>
            <a
              href={t.markets.viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all"
              style={{ color: 'var(--accent-deep)' }}
            >
              {t.markets.viewAll}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.markets.items.map((m, i) => (
            <a
              key={m.url}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              data-spotlight
              className="spotlight group bg-white border border-slate-200 rounded-xl p-6 hover:border-transparent hover:shadow-[0_16px_45px_-14px_rgba(10,186,181,0.4)] hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110" style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}>
                  {MARKET_ICONS[i]}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: undefined }}>
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </div>
              <h3 className="font-serif text-[21.5px] font-semibold text-slate-900 mb-1.5 tracking-[-0.01em]">{m.name}</h3>
              <p className="text-[15.5px] leading-[1.55] text-slate-600">{m.desc}</p>
            </a>
          ))}

          {/* View-all card fills the 8th grid cell */}
          <a
            href={t.markets.viewAllUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[0_16px_45px_-14px_rgba(10,186,181,0.55)]"
            style={{ background: 'var(--gradient-dark)' }}
          >
            <span className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white transition-transform duration-500 ease-out group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </span>
            <span>
              <span className="block font-serif text-[21.5px] font-semibold text-white mb-1.5 tracking-[-0.01em]">Equiti</span>
              <span className="block text-[15.5px] leading-[1.55] text-white/70">{t.markets.viewAll} →</span>
            </span>
          </a>
        </div>

        <p className="text-[13px] text-slate-400 mt-5">{t.markets.note}</p>
      </div>
    </section>
  );
}
