import { useT } from '@/i18n';

export default function ClosingCTA() {
  const { t } = useT();

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div
          data-spotlight
          className="spotlight rounded-[20px] py-24 px-12 text-center relative overflow-hidden"
          style={{ background: 'var(--gradient-soft)' }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div
              className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(var(--secondary-rgb),0.12), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(var(--shadow-rgb),0.08), transparent 70%)' }}
            />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="eyebrow-rule justify-center text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.closing.eyebrow}</div>
            <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-7">{t.closing.sub}</div>
            <h2
              className="font-serif text-[44px] lg:text-[60px] leading-[1.1] font-medium text-slate-900 tracking-[-0.015em] mb-6"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {t.closing.title}
            </h2>
            <p className="font-jp text-[16px] leading-[1.85] text-slate-700 mb-4 tracking-wide">
              {t.closing.tagline}
            </p>
            <p className="text-[16px] leading-[1.7] text-slate-600 mb-10 max-w-xl mx-auto">
              {t.closing.body}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                data-magnetic
                className="cta-primary px-8 py-4 rounded-sm text-[12px] font-bold tracking-[0.14em]"
              >
                {t.closing.ctaPrimary}
              </button>
              <button data-magnetic className="px-8 py-4 rounded-sm text-[12px] font-bold tracking-[0.14em] text-[#0ABAB5] transition-all hover:bg-[#0ABAB5]/5 border border-[#0ABAB5]">
                {t.closing.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-12">
        <div className="text-[11px] font-semibold tracking-[0.28em] mb-2 text-slate-400 text-center">{t.closing.regulatedTitle}</div>
        <div className="font-jp text-[12px] tracking-[0.16em] text-slate-400 mb-10 text-center">{t.closing.regulatedSub}</div>
        <div className="flex items-center justify-center flex-wrap gap-3 lg:gap-4">
          {t.closing.regulators.map((r) => (
            <div key={r.code} data-spotlight className="spotlight px-6 py-4 bg-white rounded-md border border-slate-200 flex items-center gap-4 hover:border-slate-300 hover:-translate-y-0.5 transition-all">
              <div className="font-serif text-[22px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>{r.code}</div>
              <div className="border-l border-slate-200 pl-4">
                <div className="text-[12px] font-medium text-slate-700 leading-tight">{r.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{r.region}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div className="border-t border-slate-100 pt-12 grid md:grid-cols-3 gap-8">
          {t.closing.recognition.map((r) => (
            <div key={r.award} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(var(--secondary-rgb),0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" style={{ stroke: 'var(--secondary)' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-[16px] font-semibold text-slate-900 leading-tight">{r.award}</div>
                <div className="text-[12px] text-slate-500 mt-1">{r.pub} · {r.yr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
