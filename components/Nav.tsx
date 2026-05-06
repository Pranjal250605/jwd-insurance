'use client';

import { useState } from 'react';

const MENUS: Record<string, string[]> = {
  Products: ['Forex', 'Indices', 'Commodities', 'Shares', 'Crypto', 'ETFs'],
  Platforms: ['JWD Pro', 'Web Trader', 'Mobile App', 'API Access'],
  Accounts: ['Standard', 'Premium', 'Institutional', 'Demo'],
  Insights: ['Market News', 'Analysis', 'Economic Calendar', 'Webinars'],
  Partners: ['Affiliate Program', 'Introducing Brokers', 'White Label'],
};

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="w-full bg-white sticky top-0 z-40 border-b border-slate-100">
      {/* utility bar */}
      <div className="border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-8 h-9 flex items-center justify-end gap-6 text-[13px] text-slate-600">
          <button className="flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            Sign in
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 9a3 3 0 1 1 4.5 2.6c-1 .5-1.5 1-1.5 2" />
              <circle cx="12" cy="17" r=".5" fill="currentColor" />
            </svg>
            Support
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            EN
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* main nav */}
      <div className="max-w-[1280px] mx-auto px-8 h-[72px] flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 select-none">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <span className="text-white font-bold text-[14px] tracking-tight">J</span>
          </div>
          <span className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>jwd</span>
          <span className="text-[11px] font-medium text-slate-400 tracking-[0.18em] mt-1">INVESTMENT</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
          {Object.entries(MENUS).map(([label, items]) => (
            <div key={label} className="relative" onMouseEnter={() => setOpenMenu(label)}>
              <button className="flex items-center gap-1 px-4 h-10 text-[15px] font-medium text-slate-700 hover:text-slate-900">
                {label}
                <svg
                  width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform ${openMenu === label ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openMenu === label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                  <div className="bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)] py-2">
                    {items.map((item) => (
                      <a key={item} href="#" className="block px-4 py-2 text-[14px] text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="#" className="px-4 h-10 flex items-center text-[15px] font-medium text-slate-700 hover:text-slate-900">
            About us
          </a>
        </nav>

        <button
          className="px-5 h-10 rounded-md text-[13px] font-bold tracking-[0.08em] text-slate-900 transition-all hover:brightness-95"
          style={{ background: 'var(--accent)' }}
        >
          START TRADING
        </button>
      </div>
    </div>
  );
}
