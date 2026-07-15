const FOOTER_COLS = [
  { h: 'Solutions', jp: 'ソリューション', links: ['Wealth Management', 'Private Banking', 'Asset Management', 'Family Office', 'Corporate Advisory'] },
  { h: 'Insights',  jp: '市場洞察',       links: ['Market Outlook', 'Quarterly Letters', 'Research Papers', 'Webinars', 'Calendar'] },
  { h: 'About',     jp: '会社情報',       links: ['Our Firm', 'Leadership', 'Stewardship', 'Careers', 'Press'] },
  { h: 'Clients',   jp: 'クライアント',   links: ['Private Clients', 'Family Offices', 'Institutions', 'Endowments', 'Client Portal'] },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img src="/jwd-logo.png" alt="JWD Investment" className="h-10 w-auto" />
            </div>
            <p className="text-[13.5px] text-slate-600 leading-[1.7] max-w-xs mb-3">
              JWD Investment is an independently-owned wealth management and investment advisory firm, serving private clients, family offices and institutions across global markets since 2014.
            </p>
            <p className="font-jp text-[12.5px] text-slate-500 leading-[1.85] tracking-wide max-w-xs mb-7">
              世界の富裕層・機関投資家のための、独立系資産運用会社。
            </p>
            <div className="flex items-center gap-2">
              {[
                { label: 'LinkedIn', code: 'in' },
                { label: 'X',        code: 'X' },
                { label: 'YouTube',  code: '▶' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-900 transition"
                >
                  <span className="text-[11px] font-bold">{s.code}</span>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.h}>
              <h4 className="text-[11px] font-bold tracking-[0.22em] text-slate-900 uppercase">{col.h}</h4>
              <div className="font-jp text-[10px] tracking-[0.16em] text-slate-400 mt-1 mb-5">{col.jp}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="link-underline text-[13.5px] text-slate-600 hover:text-slate-900">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-200 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] tracking-[0.16em] text-slate-400">
            <span>FCA AUTHORISED</span>
            <span className="text-slate-200">·</span>
            <span>SEC REGISTERED INVESTMENT ADVISER</span>
            <span className="text-slate-200">·</span>
            <span>FSA LICENSED · 金融庁認可</span>
            <span className="text-slate-200">·</span>
            <span>FINMA SUPERVISED</span>
            <span className="text-slate-200">·</span>
            <span>MAS REGULATED</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between">
            <p className="text-[11.5px] text-slate-500 leading-[1.7] max-w-3xl">
              <strong className="text-slate-700">Important:</strong> This material is provided for informational purposes only and does not constitute investment, legal or tax advice, nor an offer to buy or sell securities. Investments involve risk, including possible loss of principal. Past performance is not indicative of future results. JWD Investment maintains separate legal entities in each jurisdiction and provides services to clients only through its locally regulated affiliates.
            </p>
            <div className="flex items-center gap-6 text-[12px] text-slate-500 flex-shrink-0">
              <a href="#" className="hover:text-slate-900">Legal</a>
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Cookies</a>
              <a href="#" className="hover:text-slate-900">Disclosures</a>
              <span className="text-slate-400">© 2026 JWD Investment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
