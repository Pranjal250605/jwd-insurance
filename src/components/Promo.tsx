import { useT } from '@/i18n';

const PILLAR_ICONS = [
  <svg key="shield" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 2l9 5v6c0 5-4 8-9 9-5-1-9-4-9-9V7l9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="clock" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>,
  <svg key="people" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 11l-3 3-2-2" />
  </svg>,
];

export default function Promo() {
  const { t } = useT();

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 pb-12">
        <div data-spotlight className="spotlight spotlight--wash rounded-[20px] p-12 lg:p-16 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center relative overflow-hidden"
          style={{ background: 'var(--gradient-dark)' }}>
          <div className="absolute top-0 right-0 w-[480px] h-[480px] opacity-[0.08] pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <pattern id="weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10h20M10 0v20" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#weave)" />
            </svg>
          </div>
          <div className="relative">
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-5" style={{ color: 'var(--secondary)' }}>{t.promo.advisoryEyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] mb-7 text-white/60">{t.promo.advisorySub}</div>
            <h2 className="font-serif text-[36px] lg:text-[44px] leading-[1.15] font-medium text-white mb-5 tracking-[-0.01em]">
              {t.promo.advisoryTitle}
            </h2>
            <p className="text-[18px] text-slate-300 leading-[1.65] mb-8 max-w-md">
              {t.promo.advisoryBody}
            </p>
            <button data-magnetic className="cta-secondary px-7 h-12 rounded-sm text-[12px] font-bold tracking-[0.14em]">
              {t.promo.advisoryCta}
            </button>
          </div>
          <div className="relative h-[320px] flex items-center justify-center">
            <div className="img-zoom relative w-full h-full rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85&auto=format&fit=crop"
                alt="Senior advisors meeting with private wealth client"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(var(--photo-tint-rgb),0.45) 0%, transparent 60%)' }} />
              <div className="equiti-card-rim absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-serif font-semibold text-[17px]" style={{ color: 'var(--accent-deep)' }}>HM</div>
                  <div className="flex-1">
                    <div className="text-[15.5px] font-semibold text-slate-900">{t.promo.advisorName}</div>
                    <div className="text-[11px] text-slate-500">{t.promo.advisorRole}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent-deep)' }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-10">
        <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.promo.whyEyebrow}</div>
        <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.promo.whySub}</div>
        <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] max-w-3xl">
          {t.promo.whyTitle}
        </h2>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {t.promo.pillars.map((p, i) => (
            <div key={i} data-spotlight className="spotlight group bg-white border border-slate-100 rounded-xl p-9 hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.18)] hover:-translate-y-0.5 transition-all">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-7 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6" style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}>
                {PILLAR_ICONS[i]}
              </div>
              <div className="font-jp text-[12px] tracking-[0.18em] text-slate-500 mb-1">{p.sub}</div>
              <h3 className="font-serif text-[24px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[18px] leading-[1.6] text-slate-600 mb-7">{p.body}</p>
              <a href="#" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {p.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
