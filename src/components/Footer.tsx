import { useT } from '@/i18n';

export default function Footer() {
  const { t } = useT();

  return (
    <footer className="bg-slate-50 border-t border-slate-100">
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <img src="/jwd-logo.png" alt="JWD Investment" className="h-10 w-auto" />
            </div>
            <p className="text-[13.5px] text-slate-600 leading-[1.7] max-w-xs mb-3">
              {t.footer.blurb}
            </p>
            <p className="font-jp text-[12.5px] text-slate-500 leading-[1.85] tracking-wide max-w-xs mb-7">
              {t.footer.blurb2}
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

          {t.footer.cols.map((col) => (
            <div key={col.h}>
              <h4 className="text-[11px] font-bold tracking-[0.22em] text-slate-900 uppercase">{col.h}</h4>
              <div className="font-jp text-[10px] tracking-[0.16em] text-slate-400 mt-1 mb-5">{col.sub}</div>
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
            {t.footer.regLine.map((r, i) => (
              <span key={r} className="contents">
                {i > 0 && <span className="text-slate-200">·</span>}
                <span>{r}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between">
            <p className="text-[11.5px] text-slate-500 leading-[1.7] max-w-3xl">
              <strong className="text-slate-700">{t.footer.importantLabel}</strong> {t.footer.disclaimer}
            </p>
            <div className="flex items-center gap-6 text-[12px] text-slate-500 flex-shrink-0">
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
