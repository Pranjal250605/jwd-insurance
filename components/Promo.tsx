'use client';

export default function Promo() {
  return (
    <section className="bg-white">
      {/* Welcome bonus card */}
      <div className="max-w-[1280px] mx-auto px-8 pb-12">
        <div
          className="rounded-[28px] p-12 lg:p-16 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0F1C 0%, #111827 100%)' }}
        >
          <div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, oklch(0.78 0.13 180 / 0.5), transparent 70%)' }}
          />
          <div className="relative">
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'oklch(0.85 0.13 180)' }}>
              WELCOME BONUS
            </div>
            <h2 className="text-[36px] lg:text-[44px] leading-[1.1] font-bold text-white mb-3 tracking-[-0.01em]">
              Make your first deposit and<br />get 30% extra trading credit
            </h2>
            <p className="text-[14px] text-slate-400 mb-8">Terms and conditions apply. New live accounts only.</p>
            <button
              className="px-7 h-12 rounded-md text-[13px] font-bold tracking-[0.08em] text-slate-900 transition-all hover:brightness-95"
              style={{ background: 'var(--accent)' }}
            >
              OPEN ACCOUNT
            </button>
          </div>

          <div className="relative h-[260px] flex items-center justify-center">
            <div
              className="absolute w-[140px] h-[100px] rounded-2xl shadow-2xl rotate-[-12deg] -translate-x-20 translate-y-2"
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e40af)' }}
            >
              <div className="p-3 text-white/80 text-[10px]">VISA</div>
              <div className="px-3 text-white text-[20px]">$</div>
            </div>
            <div
              className="absolute w-[140px] h-[100px] rounded-2xl shadow-2xl rotate-[8deg] -translate-x-4 -translate-y-2"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
            >
              <div className="p-3">
                <div className="w-6 h-6 rounded-full border-2 border-white/60" />
              </div>
            </div>
            <div className="relative bg-white rounded-2xl shadow-2xl px-8 py-6 rotate-[3deg]">
              <div className="flex items-baseline">
                <span className="text-[88px] font-black text-slate-900 leading-none tracking-[-0.04em]">30</span>
                <span className="text-[36px] font-bold text-slate-900 leading-none">%</span>
              </div>
            </div>
            <div className="absolute w-[80px] h-[80px] rounded-xl bg-slate-800 shadow-2xl right-2 -translate-y-16 rotate-[12deg] p-2">
              <svg viewBox="0 0 60 40" className="w-full h-full">
                <polyline points="0,30 15,20 30,25 45,10 60,15" fill="none" stroke="oklch(0.78 0.13 180)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Why trade intro */}
      <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-10">
        <div className="text-[12px] font-bold tracking-[0.22em] mb-4" style={{ color: 'var(--accent-deep)' }}>
          WHY TRADE WITH JWD?
        </div>
        <h2 className="text-[42px] lg:text-[52px] leading-[1.1] font-bold text-slate-900 tracking-[-0.02em] max-w-3xl">
          All your online trading needs in one hi-tech dashboard
        </h2>
      </div>

      {/* 3 feature cards */}
      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((c, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all"
            >
              <div className="mb-8">{c.icon}</div>
              <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-[-0.01em]">{c.title}</h3>
              <p className="text-[15px] leading-[1.55] text-slate-600 mb-8">{c.body}</p>
              <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {c.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURE_CARDS = [
  {
    icon: <span className="text-[44px] font-light text-slate-900">%</span>,
    title: 'Costs kept low',
    body: '$0 platform fees, leverage up to 1:2000 and spreads from 0.0 pips on major pairs.',
    cta: 'Trading accounts',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-900">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <line x1="6" y1="6" x2="18" y2="6" />
        <line x1="6" y1="18" x2="18" y2="18" />
      </svg>
    ),
    title: 'Hi-tech trades',
    body: 'Trade confidently with professional-grade analysis on JWD Pro and our flagship terminal.',
    cta: 'JWD Pro Platform',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-900">
        <path d="M3 12a9 9 0 1 1 18 0v3a3 3 0 0 1-3 3h-1v-7h4M3 12v3a3 3 0 0 0 3 3h1v-7H3" />
      </svg>
    ),
    title: 'Extra perks',
    body: '24/6 customer support, on-hand market experts, eResources and live trading events.',
    cta: 'About JWD',
  },
];
