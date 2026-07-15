import { useState } from 'react';
import { useT } from '@/i18n';

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { lang, setLang, t } = useT();

  return (
    <div className="w-full bg-white sticky top-0 z-40 border-b border-slate-100">
      <div className="border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-8 h-9 flex items-center justify-end gap-6 text-[12px] text-slate-500">
          <span className="hidden md:inline tracking-[0.18em] text-slate-400">{t.nav.regulated}</span>
          <button className="flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            {t.nav.portal}
          </button>
          <button
            onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
            aria-label={lang === 'en' ? '日本語に切り替え' : 'Switch to English'}
            className="flex items-center gap-1.5 hover:text-slate-900"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            <span className={lang === 'en' ? 'font-semibold text-slate-900' : ''}>EN</span>
            <span className="text-slate-300">/</span>
            <span className={lang === 'ja' ? 'font-semibold text-slate-900' : ''}>日本語</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 h-[76px] flex items-center justify-between">
        <a href="#" className="flex items-center select-none">
          <img src="/jwd-logo.png" alt="JWD Investment" className="h-9 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
          {Object.entries(t.nav.menus).map(([key, menu]) => (
            <div key={key} className="relative" onMouseEnter={() => setOpenMenu(key)}>
              <button className="flex items-center gap-1 px-4 h-10 text-[17px] font-medium text-slate-700 hover:text-slate-900">
                {menu.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform ${openMenu === key ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openMenu === key && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64">
                  <div className="bg-white border border-slate-100 rounded-xl shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)] py-3">
                    <div className="px-4 pb-2 mb-1 border-b border-slate-100">
                      <div className="text-[10px] font-bold tracking-[0.2em] text-slate-400">{menu.label.toUpperCase()}</div>
                      <div className="text-[11px] font-jp text-slate-500 mt-0.5">{menu.sub}</div>
                    </div>
                    {menu.items.map((item) => (
                      <a key={item} href="#" className="block px-4 py-2 text-[16px] text-slate-700 hover:bg-slate-50 hover:text-slate-900">{item}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="#" className="px-4 h-10 flex items-center text-[17px] font-medium text-slate-700 hover:text-slate-900">{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            {t.products.platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 h-10 rounded-full border text-[15px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-10px_rgba(10,186,181,0.5)]"
                style={{ color: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
              >
                {p.name === 'AIX Investment' ? 'AIX' : p.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </a>
            ))}
          </div>
          <button data-magnetic className="cta-primary px-5 h-10 rounded-sm text-[12px] font-bold tracking-[0.14em]">
            {t.nav.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
