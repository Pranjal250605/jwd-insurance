import { useT } from '@/i18n';

const RESEARCH_POS = [
  { accent: 'navy', x: 40, y: 0, rot: -2 },
  { accent: 'gold', x: 0, y: 90, rot: 1 },
  { accent: 'slate', x: -20, y: 180, rot: -1.5 },
];

const accentBg = (a: string) => {
  if (a === 'gold')  return 'linear-gradient(135deg, var(--secondary), var(--accent-deep))';
  if (a === 'slate') return 'linear-gradient(135deg, #475569, #1E293B)';
  return 'var(--gradient-dark)';
};

const accentMark = (a: string) => {
  if (a === 'gold')  return '◆';
  if (a === 'slate') return '✦';
  return '◇';
};

const FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80&auto=format&fit=crop',
];

export default function Explore() {
  const { t } = useT();

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div data-spotlight className="spotlight rounded-[20px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div>
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.explore.insightsEyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.explore.insightsSub}</div>
            <h2 className="font-serif text-[40px] lg:text-[48px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-6">
              {t.explore.insightsTitle}
            </h2>
            <p className="text-[19px] leading-[1.65] text-slate-600 mb-3 max-w-md">
              {t.explore.insightsBody}
            </p>
            <p className="font-jp text-[17.5px] leading-[1.85] text-slate-600 mb-9 max-w-md tracking-wide">
              {t.explore.insightsBody2}
            </p>
            <a href="#" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              {t.explore.insightsCta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <div className="relative h-[380px]">
            {t.explore.research.map((c, i) => (
              <div key={i} data-spotlight className="spotlight absolute right-0 bg-white rounded-xl shadow-[0_14px_40px_-12px_rgba(var(--shadow-rgb),0.18)] border border-slate-100 p-4 flex items-center gap-4 w-[420px] hover:shadow-[0_22px_55px_-14px_rgba(var(--shadow-rgb),0.28)] transition-shadow"
                style={{ transform: `translate(${RESEARCH_POS[i].x}px, ${RESEARCH_POS[i].y}px) rotate(${RESEARCH_POS[i].rot}deg)` }}>
                <div className="w-16 h-20 rounded-md flex-shrink-0 flex items-center justify-center text-white font-serif font-medium text-[24px]"
                  style={{ background: accentBg(RESEARCH_POS[i].accent) }}>
                  {accentMark(RESEARCH_POS[i].accent)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-semibold tracking-[0.22em] text-slate-400 mb-1">{c.tag}</div>
                  <div className="font-serif text-[19px] font-semibold text-slate-900 leading-tight mb-1 truncate">{c.title}</div>
                  <div className="text-[11px] text-slate-500">{c.meta} · <span className="font-jp">{c.sub}</span></div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 flex-shrink-0">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.explore.apartEyebrow}</div>
        <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.explore.apartSub}</div>
        <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-14 max-w-3xl">
          {t.explore.apartTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.explore.features.map((c, i) => (
            <div key={i} data-spotlight className="spotlight group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.16)] hover:-translate-y-0.5 transition-all">
              <div className="img-zoom relative h-[220px] overflow-hidden">
                <img src={FEATURE_IMAGES[i]} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(var(--photo-tint-rgb),0.35) 100%)' }} />
              </div>
              <div className="p-8">
                <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 mb-1">{c.tag}</div>
                <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mb-3">{c.sub}</div>
                <h3 className="font-serif text-[22px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{c.title}</h3>
                <p className="text-[17.5px] leading-[1.6] text-slate-600 mb-7">{c.body}</p>
                <a href="#" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                  {c.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
