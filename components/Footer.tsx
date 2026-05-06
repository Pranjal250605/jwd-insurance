'use client';

const FOOTER_COLS = [
  { h: 'Products', links: ['Forex', 'Indices', 'Commodities', 'Shares', 'Crypto', 'ETFs'] },
  { h: 'Platforms', links: ['JWD Pro', 'Web Trader', 'Mobile App', 'API Access'] },
  { h: 'Company', links: ['About JWD', 'Careers', 'Press', 'Contact', 'Partners'] },
  { h: 'Resources', links: ['Education', 'Market News', 'Calendar', 'Glossary', 'Help Center'] },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <span className="text-white font-bold text-[14px]">J</span>
              </div>
              <span className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>jwd</span>
              <span className="text-[11px] font-medium text-slate-400 tracking-[0.18em] mt-1">INVESTMENT</span>
            </div>
            <p className="text-[14px] text-slate-600 leading-[1.6] max-w-xs mb-6">
              JWD Investment is a globally regulated multi-asset broker delivering institutional-grade trading to retail clients since 2014.
            </p>
            <div className="flex items-center gap-3">
              {['F', 'T', 'L', 'Y'].map((letter, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-900 transition"
                >
                  <span className="text-[12px] font-bold">{letter}</span>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.h}>
              <h4 className="text-[13px] font-bold tracking-[0.15em] text-slate-900 mb-5 uppercase">{col.h}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-slate-600 hover:text-slate-900">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <p className="text-[12px] text-slate-500 leading-[1.6] max-w-3xl">
            Risk warning: Trading derivatives carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. Please ensure you fully understand the risks involved.
          </p>
          <div className="flex items-center gap-6 text-[12px] text-slate-500">
            <a href="#" className="hover:text-slate-900">Legal</a>
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Cookies</a>
            <span>© 2026 JWD Investment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
