import { useT } from '@/i18n';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';
import { menuHref, MENU_KEYS } from '@/components/Nav';

export default function Footer() {
  const { lang, t } = useT();

  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img src="/jwd-logo.png" alt="JWD Investment" className="h-[52px] w-auto" />
            </div>
            <p className="text-[17px] text-slate-600 leading-[1.7] max-w-xs mb-3">
              {t.footer.blurb}
            </p>
            <p className="font-jp text-[16px] text-slate-500 leading-[1.85] tracking-wide max-w-xs mb-7">
              {t.footer.blurb2}
            </p>
            <div className="flex flex-col gap-2 mb-7">
              {t.products.platforms.map((p) => (
                <a
                  key={p.name}
                  href={jaOutbound(p.url, lang === 'ja')}
                  title={lang === 'ja' ? JA_PROXY_NOTICE : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 text-[17px] font-medium text-slate-600 hover:text-slate-900 self-start"
                >
                  {p.name}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              ))}
            </div>
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
                  className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-slate-400 hover:text-slate-900 transition"
                >
                  <span className="text-[11.5px] font-bold">{s.code}</span>
                </a>
              ))}
            </div>
          </div>

          {t.footer.cols.map((col, ci) => (
            <div key={col.h}>
              <h4 className="text-[11.5px] font-bold tracking-[0.22em] text-slate-900 uppercase">{col.h}</h4>
              <div className="font-jp text-[11px] tracking-[0.16em] text-slate-400 mt-1 mb-5">{col.sub}</div>
              <ul className="space-y-3">
                {col.links.map((l, i) => {
                  const href = menuHref(MENU_KEYS[ci] ?? '', i);
                  const ext = href.startsWith('http');
                  return (
                    <li key={l}>
                      <a
                        href={ext ? jaOutbound(href, lang === 'ja') : href}
                        target={ext ? '_blank' : undefined}
                        rel={ext ? 'noopener noreferrer' : undefined}
                        className="link-underline text-[17px] text-slate-600 hover:text-slate-900"
                      >
                        {l}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-200 flex flex-col gap-6">
          <div>
            <h4 className="text-[11.5px] font-bold tracking-[0.22em] text-slate-900 uppercase">{t.footer.officesLabel}</h4>
            <div className="font-jp text-[11px] tracking-[0.16em] text-slate-400 mt-1 mb-6">{t.footer.officesSub}</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
              {t.footer.offices.map((o) => (
                <div key={o.name}>
                  <div className="text-[13.5px] font-medium text-slate-700 mb-1.5">{o.name}</div>
                  <address className="not-italic text-[12.5px] leading-[1.75] tracking-[0.04em] text-slate-500">
                    {o.lines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between">
            <p className="text-[15.5px] text-slate-500 leading-[1.7] max-w-3xl">
              <strong className="text-slate-700">{t.footer.importantLabel}</strong> {t.footer.disclaimer}
            </p>
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-500">
              {t.footer.links.map((l) => (
                <a key={l} href="#" className="hover:text-slate-900">{l}</a>
              ))}
              <span className="text-slate-400">{t.footer.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
