import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '@/i18n';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';
import { useScrollLock } from '@/hooks/useScrollLock';

/* Where each dropdown item goes. Keyed by menu and by position, because the
   two locales carry the same items in the same order but under different
   labels — an English-keyed table would leave the Japanese menu dead.
   External destinations are routed through the translate proxy for Japanese
   readers by jaOutbound, exactly as the rest of the site does. */
const MENU_LINKS: Record<string, string[]> = {
  Solutions: [
    '#properties-section',                        // Dubai Properties
    'https://theheartofeurope.emirates.expert/',  // Heart of Europe
    '#/consent',                                  // Investment Funds — notice first
    '#properties-section',                        // Japan Properties
    'https://new-jwd-office.vercel.app/',         // Family Office
  ],
  Insights: [
    '#markets',        // Why Dubai
    '#insights',       // Knowledge Center
    '#/properties',    // Investment Simulator
    '#chairman',       // Tomo's Stories
  ],
  About: [
    '#message',        // Company Overview
    '#message',        // Mission
    '#message',        // Vision
    '#reach',          // Leadership
    '#chairman',       // Tomo Kawana
  ],
  Clients: [
    '#solutions', '#solutions', '#solutions', '#solutions', '#solutions', '#solutions',
  ],
};

export const MENU_KEYS = ['Solutions', 'Insights', 'About', 'Clients'];

export const menuHref = (key: string, i: number) => MENU_LINKS[key]?.[i] ?? '#contact';

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const { lang, setLang, t } = useT();

  useScrollLock(mobileOpen);

  // Japanese labels run far wider than the English ones this row was sized
  // for (コンサルティング vs "Consulting"), which pushed the row past the
  // 1280px container and wrapped every item onto a second line. JA gets
  // tighter padding/type; nothing wraps in either language.
  const isJa = lang === 'ja';
  const navItem = `flex items-center h-10 whitespace-nowrap font-medium text-slate-700 hover:text-slate-900 ${
    isJa ? 'px-2 xl:px-3 text-[16px] xl:text-[17px]' : 'px-3 xl:px-4 text-[18.5px]'
  }`;

  // Close the drawer on Escape and on route change (hash nav).
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    const onHash = () => setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="w-full bg-white sticky top-0 z-40 border-b border-slate-100">
      <div className="border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-9 flex items-center justify-end gap-6 text-[13px] text-slate-500">
          <span className="hidden md:inline tracking-[0.18em] text-slate-400">{t.nav.regulated}</span>
          <button className="hidden sm:flex items-center gap-1.5 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            {t.nav.portal}
          </button>
          <button
            onClick={() => setLang(lang === 'en' ? 'ja' : 'en')}
            aria-label={lang === 'en' ? '日本語に切り替え' : 'Switch to English'}
            className="relative flex items-center gap-1.5 hover:text-slate-900 after:absolute after:content-[''] after:inset-[-13px]"
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

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
        <a href="#/" aria-label="JWD Investment" className="flex items-center select-none flex-shrink-0">
          <img src="/jwd-logo.png" alt="JWD Investment" className="h-[47px] w-auto" />
        </a>

        {/* px-3 (not px-4) below xl: at exactly 1024px the six nav items +
            the Equiti/AIX pills + CTA button don't quite fit at px-4,
            overflowing the header by a few px — this closes that gap.
            See `navItem` above for the per-language sizing. */}
        <nav className="hidden min-[1400px]:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
          {Object.entries(t.nav.menus).map(([key, menu]) => (
            <div key={key} className="relative flex-shrink-0" onMouseEnter={() => setOpenMenu(key)}>
              <button className={`${navItem} gap-1`}>
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
                      <div className="text-[11px] font-bold tracking-[0.2em] text-slate-400">{menu.label.toUpperCase()}</div>
                      <div className="text-[11.5px] font-jp text-slate-500 mt-0.5">{menu.sub}</div>
                    </div>
                    {menu.items.map((item, i) => {
                      const href = menuHref(key, i);
                      const ext = href.startsWith('http');
                      return (
                        <a
                          key={item}
                          href={ext ? jaOutbound(href, lang === 'ja') : href}
                          title={ext && lang === 'ja' ? JA_PROXY_NOTICE : undefined}
                          target={ext ? '_blank' : undefined}
                          rel={ext ? 'noopener noreferrer' : undefined}
                          onClick={() => setOpenMenu(null)}
                          className="block px-4 py-2 text-[17px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        >
                          {item}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          <a href="#/properties" className={`${navItem} flex-shrink-0`}>{t.nav.portfolio}</a>
          <a href="#contact" className={`${navItem} flex-shrink-0`}>{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* The six nav labels fill the row at lg in both languages, so the
              Equiti/AIX pills step aside for that band only — they return at
              xl, and below lg the desktop nav is hidden so there is room
              anyway. Previously the row still overflowed here and the logo
              (the one shrinkable child) was silently squashed to 0px wide.
              Both platforms are still linked from the hero and footer. */}
          <div className="hidden md:flex xl:flex items-center gap-2 flex-shrink-0">
            {t.products.platforms.map((p) => (
              <a
                key={p.name}
                href={jaOutbound(p.url, lang === 'ja')}
                title={lang === 'ja' ? JA_PROXY_NOTICE : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 h-11 rounded-full border text-[16px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-10px_rgba(10,186,181,0.5)]"
                style={{ color: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
              >
                {p.name === 'AIX Investment' ? 'AIX' : p.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </a>
            ))}
          </div>
          <a
            href="#contact"
            data-magnetic
            className={`hidden sm:inline-flex items-center justify-center cta-primary h-11 rounded-sm text-[13px] font-bold whitespace-nowrap ${
              isJa ? 'px-4 tracking-[0.06em]' : 'px-5 tracking-[0.14em]'
            }`}
          >
            {t.nav.cta}
          </a>

          {/* Hamburger — the only nav access point below lg (1024px); the
              desktop <nav> above is `hidden min-[1400px]:flex` with no other fallback. */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label={t.nav.openMenu}
            aria-expanded={mobileOpen}
            className="min-[1400px]:hidden flex items-center justify-center w-11 h-11 -mr-1.5 rounded-lg text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && createPortal(
        <div className="min-[1400px]:hidden fixed inset-0 z-[70] flex flex-col bg-white">
          {/* backdrop-equivalent: the drawer itself is opaque and full-screen,
              so there's no separate scrim to manage — it fully replaces the
              page, avoiding any transform/filter ancestor entirely (portal). */}
          <div className="pt-safe flex items-center justify-between px-5 h-[76px] border-b border-slate-100 flex-shrink-0">
            <a href="#/" aria-label="JWD Investment" onClick={closeMobile} className="flex items-center select-none">
              <img src="/jwd-logo.png" alt="JWD Investment" className="h-[42px] w-auto" />
            </a>
            <button
              onClick={closeMobile}
              aria-label={t.nav.closeMenu}
              className="flex items-center justify-center w-11 h-11 -mr-1.5 rounded-lg text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            <div className="flex flex-col">
              {Object.entries(t.nav.menus).map(([key, menu]) => {
                const isOpen = mobileAccordion === key;
                return (
                  <div key={key} className="border-b border-slate-100">
                    <button
                      onClick={() => setMobileAccordion(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between min-h-[56px] py-3 text-left"
                    >
                      <span>
                        <span className="block text-[20.5px] font-medium text-slate-900">{menu.label}</span>
                        <span className="block font-jp text-[13px] text-slate-400 mt-0.5">{menu.sub}</span>
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        className={`flex-shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="pb-3 flex flex-col">
                        {menu.items.map((item, i) => {
                          const href = menuHref(key, i);
                          const ext = href.startsWith('http');
                          return (
                            <a
                              key={item}
                              href={ext ? jaOutbound(href, lang === 'ja') : href}
                              target={ext ? '_blank' : undefined}
                              rel={ext ? 'noopener noreferrer' : undefined}
                              onClick={closeMobile}
                              className="min-h-[44px] flex items-center text-[17px] text-slate-600 hover:text-slate-900"
                            >
                              {item}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <a href="#/properties" onClick={closeMobile} className="min-h-[56px] flex items-center text-[20.5px] font-medium text-slate-900 border-b border-slate-100">
                {t.nav.portfolio}
              </a>
              <a href="#contact" onClick={closeMobile} className="min-h-[56px] flex items-center text-[20.5px] font-medium text-slate-900 border-b border-slate-100">
                {t.nav.contact}
              </a>

              <div className="flex flex-col gap-2.5 mt-6">
                <div className="text-[11.5px] font-bold tracking-[0.22em] text-slate-400">{t.hero.platformsLabel}</div>
                {t.products.platforms.map((p) => (
                  <a
                    key={p.name}
                    href={jaOutbound(p.url, lang === 'ja')}
                    title={lang === 'ja' ? JA_PROXY_NOTICE : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="flex items-center justify-between min-h-[52px] px-4 rounded-lg border text-[17px] font-bold"
                    style={{ color: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
                  >
                    {p.name}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M9 7h8v8" /></svg>
                  </a>
                ))}
              </div>

              <a href="#" onClick={closeMobile} className="flex items-center gap-2 min-h-[52px] mt-6 text-[17px] text-slate-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
                </svg>
                {t.nav.portal}
              </a>
            </div>
          </div>

          <div className="pb-safe flex-shrink-0 px-5 pt-3 pb-4 border-t border-slate-100">
            <a href="#contact" onClick={closeMobile} data-magnetic className="cta-primary w-full h-12 rounded-sm text-[13px] font-bold tracking-[0.14em] inline-flex items-center justify-center">
              {t.nav.cta}
            </a>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
