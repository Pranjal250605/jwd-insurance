'use client';

const FAN_CARDS = [
  { label: 'US 30', sub: 'INDICES', rotate: -28, x: -180, y: 30, bg: 'linear-gradient(160deg, #1e293b, #0f172a)', dark: true, chart: 'rose' },
  { label: 'EUR / USD', sub: 'FOREX', rotate: -14, x: -90, y: 0, bg: 'linear-gradient(160deg, #b91c1c, #7f1d1d)', dark: true, flag: 'eu' },
  { label: 'Gold', sub: 'COMMODITIES', rotate: 0, x: 0, y: -10, bg: 'linear-gradient(160deg, oklch(0.78 0.13 180), oklch(0.62 0.13 180))', dark: true, icon: 'gold' },
  { label: 'Oil', sub: 'COMMODITIES', rotate: 14, x: 90, y: 0, bg: 'linear-gradient(160deg, #334155, #1e293b)', dark: true, icon: 'oil' },
  { label: 'AAPL', sub: 'SHARES', rotate: 28, x: 175, y: 30, bg: 'linear-gradient(160deg, #fff, #f1f5f9)', dark: false, icon: 'apple' },
];

const STEPS = [
  {
    n: '01',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-900">
        <path d="M5 21l3-3 8-8 3 3-8 8H5v-3z" /><path d="M14 6l3 3" />
      </svg>
    ),
    title: 'Set up your account',
    body: 'Start trading online in a few quick steps — we\'ll ask for your contact details to begin.',
    cta: 'Apply now',
  },
  {
    n: '02',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-900">
        <path d="M12 16V4M6 10l6-6 6 6" /><path d="M3 18h18v3H3z" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Fund easily',
    body: 'Deposit and withdraw securely with credit cards, eWallets and trusted local solutions.',
    cta: 'Ways to pay',
  },
  {
    n: '03',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-900">
        <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />
      </svg>
    ),
    title: 'Start trading',
    body: 'Trade online with global client support, daily market updates and instant trade notifications.',
    cta: 'More on JWD Pro',
  },
];

export default function Products() {
  return (
    <section style={{ background: 'var(--surface-alt)' }}>
      {/* Asset fan */}
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="rounded-[28px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div>
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'var(--accent-deep)' }}>
              ONLINE TRADING PRODUCTS
            </div>
            <h2 className="text-[40px] lg:text-[48px] leading-[1.08] font-bold text-slate-900 tracking-[-0.02em] mb-6">
              Hundreds of reasons to trade, now let&apos;s find yours
            </h2>
            <p className="text-[16px] leading-[1.6] text-slate-600 mb-8 max-w-md">
              Explore global financial opportunities from one platform — we&apos;ve curated a huge range of products for you to trade on.
            </p>
            <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              All trading products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="relative h-[380px] flex items-center justify-center">
            {FAN_CARDS.map((card, i) => (
              <div
                key={i}
                className="absolute w-[120px] h-[180px] rounded-2xl shadow-[0_15px_40px_-12px_rgba(15,23,42,0.3)] p-3 flex flex-col justify-between"
                style={{
                  background: card.bg,
                  color: card.dark ? 'white' : '#0f172a',
                  transform: `translateX(${card.x}px) translateY(${card.y}px) rotate(${card.rotate}deg)`,
                }}
              >
                <div>
                  <div className="text-[9px] font-bold tracking-[0.15em] opacity-70">{card.sub}</div>
                  <div className="text-[18px] font-bold mt-1 tracking-tight">{card.label}</div>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  {card.icon === 'gold' && <div className="text-[32px]">★</div>}
                  {card.icon === 'oil' && (
                    <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
                      <rect x="6" y="6" width="28" height="40" rx="3" fill="#0f172a" stroke="#475569" />
                      <line x1="6" y1="14" x2="34" y2="14" stroke="#475569" />
                      <line x1="6" y1="38" x2="34" y2="38" stroke="#475569" />
                    </svg>
                  )}
                  {card.icon === 'apple' && (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 12.04c-.03-3.18 2.6-4.7 2.72-4.78-1.48-2.17-3.79-2.46-4.6-2.49-1.96-.2-3.83 1.15-4.82 1.15-1 0-2.53-1.13-4.16-1.1-2.14.03-4.12 1.24-5.22 3.15-2.23 3.86-.57 9.58 1.6 12.72 1.06 1.54 2.32 3.27 3.97 3.21 1.6-.07 2.2-1.03 4.13-1.03 1.93 0 2.47 1.03 4.16.99 1.72-.03 2.81-1.57 3.86-3.12 1.22-1.79 1.72-3.52 1.75-3.61-.04-.02-3.36-1.29-3.39-5.09zm-3.18-9.36c.88-1.07 1.48-2.55 1.32-4.03-1.27.05-2.81.85-3.73 1.91-.82.94-1.54 2.45-1.35 3.9 1.42.11 2.87-.72 3.76-1.78z" />
                    </svg>
                  )}
                  {card.flag === 'eu' && (
                    <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                      <div className="text-yellow-300 text-[10px] text-center leading-tight">★ ★ ★<br />★ &nbsp; ★<br />★ ★ ★</div>
                    </div>
                  )}
                  {card.chart === 'rose' && (
                    <svg width="60" height="80" viewBox="0 0 60 80">
                      <rect x="6" y="40" width="6" height="20" fill="#10b981" />
                      <rect x="18" y="20" width="6" height="40" fill="#10b981" />
                      <rect x="30" y="35" width="6" height="25" fill="#ef4444" />
                      <rect x="42" y="15" width="6" height="45" fill="#10b981" />
                    </svg>
                  )}
                </div>
                <div className="bg-emerald-500 text-white text-[11px] font-bold tracking-wider px-2 py-1.5 rounded text-center">BUY</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 24/6 support */}
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div
          className="rounded-[28px] p-12 lg:p-20 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0F1C 0%, #111827 100%)' }}
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, oklch(0.78 0.13 180 / 0.4), transparent 70%)' }}
            />
          </div>
          <div className="relative">
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'oklch(0.85 0.13 180)' }}>
              24 / 6 SUPPORT
            </div>
            <h2 className="text-[40px] lg:text-[56px] leading-[1.1] font-bold text-white tracking-[-0.02em] max-w-3xl mx-auto">
              Get help from market experts in 6 languages
            </h2>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              {['English', 'العربية', 'Español', 'Français', 'Português', '中文'].map((lang) => (
                <span key={lang} className="px-4 h-9 rounded-full bg-white/5 border border-white/10 text-white/80 text-[13px] flex items-center">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3-step account opening */}
      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="text-[12px] font-bold tracking-[0.22em] mb-4" style={{ color: 'var(--accent-deep)' }}>
          LIVE TRADING ACCOUNT
        </div>
        <h2 className="text-[42px] lg:text-[52px] leading-[1.1] font-bold text-slate-900 tracking-[-0.02em] mb-12 max-w-3xl">
          Open a JWD trading account in minutes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-8 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div>{s.icon}</div>
                <div className="text-[12px] font-bold tracking-[0.15em] text-slate-300">{s.n}</div>
              </div>
              <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-[-0.01em]">Step {parseInt(s.n)}: {s.title}</h3>
              <p className="text-[15px] leading-[1.55] text-slate-600 mb-8">{s.body}</p>
              <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {s.cta}
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
