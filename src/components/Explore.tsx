const RESEARCH_CARDS = [
  {
    tag: 'QUARTERLY OUTLOOK',
    jp: '四半期見通し',
    title: 'Navigating a higher-rate world',
    sub: 'Q2 2026 · 24 min read',
    accent: 'navy',
    x: 40, y: 0, rot: -2,
  },
  {
    tag: 'WHITE PAPER',
    jp: 'ホワイトペーパー',
    title: 'The case for global diversification',
    sub: 'Strategy · 16 min read',
    accent: 'gold',
    x: 0, y: 90, rot: 1,
  },
  {
    tag: 'MARKET LETTER',
    jp: 'マーケット・レター',
    title: 'Japan equities: a structural reawakening',
    sub: 'Regional · 12 min read',
    accent: 'slate',
    x: -20, y: 180, rot: -1.5,
  },
];

const accentBg = (a: string) => {
  if (a === 'gold')  return 'linear-gradient(135deg, #C9A961, #8B7340)';
  if (a === 'slate') return 'linear-gradient(135deg, #475569, #1E293B)';
  return 'linear-gradient(135deg, #1A2C4F, #0B1830)';
};

const accentMark = (a: string) => {
  if (a === 'gold')  return '◆';
  if (a === 'slate') return '✦';
  return '◇';
};

const FEATURE_CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80&auto=format&fit=crop',
    sub: 'STEWARDSHIP',
    jp: '受託者責任',
    title: 'Fiduciary by design',
    body: 'Independently owned and aligned with our clients — fee-only, transparent and free from product conflicts.',
    cta: 'Our principles',
  },
  {
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format&fit=crop',
    sub: 'LEADERSHIP',
    jp: 'リーダーシップ',
    title: 'A team you can trust',
    body: 'Senior portfolio managers averaging 22 years of experience, with deep regional and asset class expertise.',
    cta: 'Meet the team',
  },
  {
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80&auto=format&fit=crop',
    sub: 'INSTITUTIONAL',
    jp: '機関投資家',
    title: 'Trusted by institutions',
    body: 'Endowments, pensions and family offices entrust us with mandates measured in decades, not quarters.',
    cta: 'Institutional capabilities',
  },
];

export default function Explore() {
  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="rounded-[20px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>INSIGHTS & RESEARCH</div>
            <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-6">市場洞察・リサーチ</div>
            <h2 className="font-serif text-[40px] lg:text-[48px] leading-[1.08] font-medium text-slate-900 tracking-[-0.015em] mb-6">
              Considered thinking, delivered with discipline
            </h2>
            <p className="text-[16px] leading-[1.65] text-slate-600 mb-3 max-w-md">
              Our investment team publishes quarterly outlooks, market commentary and long-form research — written by the same professionals managing client portfolios.
            </p>
            <p className="font-jp text-[14.5px] leading-[1.85] text-slate-600 mb-9 max-w-md tracking-wide">
              運用チームが執筆する、信頼性の高い市場分析と長期的な視点の調査資料。
            </p>
            <a href="#" className="text-[13px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              View research library
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
          <div className="relative h-[380px]">
            {RESEARCH_CARDS.map((c, i) => (
              <div key={i} className="absolute right-0 bg-white rounded-xl shadow-[0_14px_40px_-12px_rgba(11,24,48,0.18)] border border-slate-100 p-4 flex items-center gap-4 w-[420px]"
                style={{ transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rot}deg)` }}>
                <div className="w-16 h-20 rounded-md flex-shrink-0 flex items-center justify-center text-white font-serif font-medium text-[24px]"
                  style={{ background: accentBg(c.accent) }}>
                  {accentMark(c.accent)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-semibold tracking-[0.22em] text-slate-400 mb-1">{c.tag}</div>
                  <div className="font-serif text-[16px] font-semibold text-slate-900 leading-tight mb-1 truncate">{c.title}</div>
                  <div className="text-[11px] text-slate-500">{c.sub} · <span className="font-jp">{c.jp}</span></div>
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
        <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>WHAT SETS US APART</div>
        <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-6">JWDの強み</div>
        <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.1] font-medium text-slate-900 tracking-[-0.015em] mb-14 max-w-3xl">
          A firm built on conviction
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((c, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-[0_16px_50px_-16px_rgba(11,24,48,0.16)] hover:-translate-y-0.5 transition-all">
              <div className="relative h-[220px] overflow-hidden">
                <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(11,24,48,0.35) 100%)' }} />
              </div>
              <div className="p-8">
                <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 mb-1">{c.sub}</div>
                <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mb-3">{c.jp}</div>
                <h3 className="font-serif text-[22px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{c.title}</h3>
                <p className="text-[14.5px] leading-[1.6] text-slate-600 mb-7">{c.body}</p>
                <a href="#" className="text-[13px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
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
