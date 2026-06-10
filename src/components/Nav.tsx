import { useState } from 'react';

const MENUS: Record<string, { items: string[]; jp: string }> = {
  Solutions: { jp: 'ソリューション', items: ['Wealth Management', 'Private Banking', 'Asset Management', 'Family Office', 'Corporate Advisory'] },
  Insights:  { jp: '市場洞察',         items: ['Market Outlook', 'Research Papers', 'Quarterly Letters', 'Economic Calendar', 'Webinars'] },
  About:     { jp: '会社情報',         items: ['Our Firm', 'Leadership', 'Our Process', 'Stewardship', 'Press'] },
  Clients:   { jp: 'クライアント',     items: ['Private Clients', 'Family Offices', 'Institutions', 'Endowments', 'Pensions'] },
};

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="w-full bg-white sticky top-0 z-40 border-b border-slate-100">
      <div className="border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-8 h-9 flex items-center justify-end gap-6 text-[12px] text-slate-500">
          <span className="hidden md:inline tracking-[0.18em] text-slate-400">REGULATED BY FCA · SEC · FSA · MAS</span>
          <button className="flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            Client Portal
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            EN / 日本語
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 h-[76px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: 'var(--logo-bg)' }}>
            <span className="text-white font-serif font-semibold text-[16px] tracking-tight">J</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[22px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>JWD</span>
            <span className="text-[9px] font-medium text-slate-500 tracking-[0.28em] mt-1">INVESTMENT</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
          {Object.entries(MENUS).map(([label, menu]) => (
            <div key={label} className="relative" onMouseEnter={() => setOpenMenu(label)}>
              <button className="flex items-center gap-1 px-4 h-10 text-[14px] font-medium text-slate-700 hover:text-slate-900">
                {label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform ${openMenu === label ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openMenu === label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                  <div className="bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)] py-3">
                    <div className="px-4 pb-2 mb-1 border-b border-slate-100">
                      <div className="text-[10px] font-bold tracking-[0.2em] text-slate-400">{label.toUpperCase()}</div>
                      <div className="text-[11px] font-jp text-slate-500 mt-0.5">{menu.jp}</div>
                    </div>
                    {menu.items.map((item) => (
                      <a key={item} href="#" className="block px-4 py-2 text-[13.5px] text-slate-700 hover:bg-slate-50 hover:text-slate-900">{item}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="#" className="px-4 h-10 flex items-center text-[14px] font-medium text-slate-700 hover:text-slate-900">Contact</a>
        </nav>

        <button className="cta-primary px-5 h-10 rounded-sm text-[12px] font-bold tracking-[0.14em]">
          SCHEDULE CONSULTATION
        </button>
      </div>
    </div>
  );
}
