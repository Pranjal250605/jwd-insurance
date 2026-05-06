'use client';

const LESSON_CARDS = [
  { title: 'The trend is your friend', sub: 'Beginner · 4 min read', color: 'rose', x: 40, y: 0, rot: -3 },
  { title: 'Trend Analysis 101', sub: 'Intermediate · 12 min', color: 'violet', x: 0, y: 80, rot: 1 },
  { title: 'Risk Management 101', sub: 'Essential · 18 min', color: 'emerald', x: -20, y: 170, rot: -2 },
];

const EXPLORE_CARDS = [
  {
    visual: (
      <div className="relative h-[200px] flex items-center justify-center">
        <div className="relative w-[110px] h-[180px] rounded-[28px] bg-slate-900 p-1.5 shadow-xl rotate-[-8deg]">
          <div className="w-full h-full rounded-[24px] bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 60 80" className="absolute inset-0 w-full h-full opacity-40">
              <polyline points="0,55 12,50 24,42 36,45 48,30 60,25" fill="none" stroke="oklch(0.78 0.13 180)" strokeWidth="1.5" />
            </svg>
            <div className="relative w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#f97316' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    title: 'Extra security',
    body: 'Two-step account verification, funds kept separate and fully-regulated across 6 global regions.',
    cta: 'Open an account',
  },
  {
    visual: (
      <div className="relative h-[200px] flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 rotate-[-4deg]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-lg overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, oklch(0.${75 + i * 2} 0.${5 + i} ${160 + i * 15}), oklch(0.${55 + i * 2} 0.${8 + i} ${180 + i * 10}))` }}
            >
              <div className="absolute inset-0 flex items-end justify-center pb-1">
                <div className="w-8 h-5 rounded-t-full bg-white/30" />
              </div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white/40" />
            </div>
          ))}
        </div>
      </div>
    ),
    title: 'Meet the team',
    body: 'Our global market experts are ready to help with dedicated support across 6 languages.',
    cta: 'About JWD',
  },
  {
    visual: (
      <div className="relative h-[200px] flex items-center justify-center">
        <div className="relative">
          {[
            { l: 'UK', x: -30, y: -20, rot: -8, c: 'linear-gradient(135deg, #1e3a8a, #be123c)' },
            { l: 'US', x: 30, y: -10, rot: 6, c: 'linear-gradient(135deg, oklch(0.85 0.13 180), oklch(0.65 0.13 180))' },
            { l: 'AU', x: -10, y: 30, rot: -2, c: 'linear-gradient(135deg, #1e293b, #334155)' },
            { l: '$', x: 40, y: 40, rot: 10, c: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
          ].map((card, i) => (
            <div
              key={i}
              className="absolute w-14 h-16 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-[14px]"
              style={{ background: card.c, transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rot}deg)` }}
            >
              {card.l}
            </div>
          ))}
          <div className="relative w-20 h-24 rounded-lg shadow-xl flex items-center justify-center bg-white border border-slate-200 rotate-[3deg]">
            <span className="text-[14px] font-black text-slate-900 tracking-tight">MAANG</span>
          </div>
        </div>
      </div>
    ),
    title: 'Trading products',
    body: 'Trade CFDs on forex, crypto, commodities, indices, shares and ETFs from one account.',
    cta: 'See products',
  },
];

function lessonBg(color: string) {
  if (color === 'rose') return 'linear-gradient(135deg, #fb7185, #e11d48)';
  if (color === 'violet') return 'linear-gradient(135deg, #a78bfa, #7c3aed)';
  return 'linear-gradient(135deg, oklch(0.78 0.13 180), oklch(0.55 0.13 180))';
}

export default function Explore() {
  return (
    <section className="bg-white">
      {/* Education */}
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="rounded-[28px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'var(--accent-deep)' }}>
              EDUCATION
            </div>
            <h2 className="text-[40px] lg:text-[48px] leading-[1.08] font-bold text-slate-900 tracking-[-0.02em] mb-6">
              Learn how to trade
            </h2>
            <p className="text-[16px] leading-[1.6] text-slate-600 mb-8 max-w-md">
              We&apos;ll teach you how to place trades, read market charts and develop a strategy. Free webinars, video courses and weekly market briefings.
            </p>
            <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              Explore eResources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="relative h-[340px]">
            {LESSON_CARDS.map((c, i) => (
              <div
                key={i}
                className="absolute right-0 bg-white rounded-xl shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18)] border border-slate-100 p-4 flex items-center gap-4 w-[400px]"
                style={{ transform: `translate(${c.x}px, ${c.y}px) rotate(${c.rot}deg)` }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-[22px]"
                  style={{ background: lessonBg(c.color) }}
                >
                  {c.color === 'rose' && '✦'}
                  {c.color === 'violet' && '◇'}
                  {c.color === 'emerald' && '↗'}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-slate-900 mb-1">{c.title}</div>
                  <div className="text-[12px] text-slate-500">{c.sub}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More to explore */}
      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <h2 className="text-[42px] lg:text-[52px] leading-[1.1] font-bold text-slate-900 tracking-[-0.02em] mb-12">
          There&apos;s more to explore
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {EXPLORE_CARDS.map((c, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all">
              <div className="bg-slate-50 border-b border-slate-100">{c.visual}</div>
              <div className="p-8">
                <h3 className="text-[22px] font-bold text-slate-900 mb-3 tracking-[-0.01em]">{c.title}</h3>
                <p className="text-[15px] leading-[1.55] text-slate-600 mb-6">{c.body}</p>
                <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                  {c.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
