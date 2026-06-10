interface HeroProps {
  eyebrow?: string;
  headline?: string;
}

export default function Hero({
  eyebrow = 'JWD INVESTMENT · TRUSTED SINCE 2014',
  headline = 'Building lasting wealth, generation after generation',
}: HeroProps) {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="glow-orb glow-orb--cyan" style={{ width: 560, height: 560, top: -200, right: -120 }} />
      <div className="glow-orb glow-orb--aqua" style={{ width: 420, height: 420, bottom: -140, left: -100 }} />

      {/* Abstract flowing line art — top right */}
      <svg
        aria-hidden="true"
        className="absolute top-0 right-0 w-[720px] h-[680px] pointer-events-none"
        viewBox="0 0 720 680"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-wave-tr" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#40E0D0" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0ABAB5" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0ABAB5" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 26 }).map((_, i) => {
          const offset = i * 14;
          return (
            <path
              key={i}
              d={`M ${720 - offset} ${-40 + offset * 0.4}
                  C ${520 - offset * 0.6} ${120 + offset * 0.5},
                    ${360 - offset * 0.4} ${260 + offset * 0.6},
                    ${180 - offset * 0.2} ${420 + offset * 0.7}
                  S ${-40} ${640 + offset * 0.3},
                    ${-120 - offset} ${720}`}
              stroke="url(#hero-wave-tr)"
              strokeWidth="1"
              fill="none"
              opacity={0.85 - i * 0.025}
            />
          );
        })}
      </svg>

      {/* Abstract flowing line art — bottom left */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[560px] h-[420px] pointer-events-none"
        viewBox="0 0 560 420"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-wave-bl" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#40E0D0" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#0ABAB5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0ABAB5" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 22 }).map((_, i) => {
          const offset = i * 12;
          return (
            <path
              key={i}
              d={`M ${-40 - offset * 0.2} ${420 - offset * 0.6}
                  C ${120 + offset * 0.4} ${340 - offset * 0.5},
                    ${280 + offset * 0.5} ${240 - offset * 0.4},
                    ${440 + offset * 0.6} ${120 - offset * 0.3}
                  S ${620 + offset} ${-40},
                    ${720} ${-120 - offset}`}
              stroke="url(#hero-wave-bl)"
              strokeWidth="1"
              fill="none"
              opacity={0.75 - i * 0.025}
            />
          );
        })}
      </svg>

      <div className="relative max-w-[1280px] mx-auto px-8 py-20 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div className="relative z-10">
          <div className="text-[12px] font-semibold tracking-[0.22em] mb-7" style={{ color: 'var(--accent-deep)' }}>{eyebrow}</div>
          <h1 className="font-serif text-[52px] lg:text-[64px] leading-[1.05] font-medium text-slate-900 tracking-[-0.015em] mb-5" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {headline}
          </h1>
          <p className="font-jp text-[18px] leading-[1.7] text-slate-700 mb-7 max-w-xl tracking-wide">
            次世代へつなぐ、確かな資産運用を。
          </p>
          <p className="text-[17px] leading-[1.65] text-slate-600 max-w-xl mb-10">
            Comprehensive wealth management and investment advisory for institutions, family offices and private clients across global markets — guided by disciplined process and long-term conviction.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="cta-primary px-7 h-12 rounded-sm text-[12px] font-bold tracking-[0.14em]">
              SCHEDULE A CONSULTATION
            </button>
            <button className="px-2 h-12 text-[14px] font-medium text-slate-700 hover:text-slate-900 flex items-center gap-2 group">
              Download capabilities brochure
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              ['$48B', 'Assets under management'],
              ['1,200+', 'Client relationships'],
              ['11', 'Global offices'],
              ['10 yrs', 'Median tenure'],
            ].map(([a, b]) => (
              <div key={a}>
                <div className="font-serif text-[28px] font-medium tracking-tight" style={{ color: 'var(--accent-deep)' }}>{a}</div>
                <div className="text-[12px] text-slate-500 leading-tight mt-1">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[620px] flex items-center justify-center">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(var(--shadow-rgb),0.4)]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop"
              alt="JWD Investment global headquarters — modern corporate office"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(var(--photo-tint-rgb),0.55) 0%, rgba(var(--photo-tint-rgb),0.15) 50%, transparent 100%)' }} />

            <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
              <div className="text-white">
                <div className="text-[10px] font-semibold tracking-[0.22em] opacity-80 mb-1">FLAGSHIP STRATEGY</div>
                <div className="font-serif text-[22px] font-medium leading-tight">Global Balanced Composite</div>
              </div>
              <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-[11px] font-semibold tracking-wider" style={{ color: 'var(--accent-deep)' }}>SINCE 2014</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: '5Y Return', v: '+9.4%', s: 'annualised' },
                  { l: 'Sharpe', v: '1.18',   s: 'net of fees' },
                  { l: 'Drawdown', v: '−7.2%', s: '5y maximum' },
                ].map((m) => (
                  <div key={m.l} className="bg-white/95 backdrop-blur rounded-lg p-3">
                    <div className="text-[9px] font-semibold tracking-[0.18em] text-slate-500 uppercase">{m.l}</div>
                    <div className="font-serif text-[20px] font-semibold tracking-tight text-slate-900 mt-0.5">{m.v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{m.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="equiti-card-rim absolute -left-6 top-24 bg-white rounded-xl shadow-[0_16px_40px_-12px_rgba(var(--shadow-rgb),0.18)] p-4 w-[220px] z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-soft)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: 'var(--accent-deep)' }}>
                  <path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 6-6" />
                </svg>
              </div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-500">PORTFOLIO</div>
            </div>
            <div className="font-serif text-[24px] font-semibold tracking-tight text-slate-900">¥2,847,500,000</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[12px] font-semibold text-emerald-700">+ ¥38.4M</span>
              <span className="text-[11px] text-slate-500">YTD · +1.36%</span>
            </div>
          </div>

          <div className="equiti-card-rim absolute -right-4 bottom-32 bg-white rounded-xl shadow-[0_16px_40px_-12px_rgba(var(--shadow-rgb),0.18)] p-4 w-[220px] z-10">
            <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-2">ASSET ALLOCATION</div>
            {[
              { k: 'Global Equities',  v: 52, c: 'var(--accent-deep)' },
              { k: 'Fixed Income',     v: 28, c: '#5C7BA8' },
              { k: 'Alternatives',     v: 14, c: 'var(--secondary)' },
              { k: 'Cash',             v: 6,  c: '#CBD5E1' },
            ].map((row) => (
              <div key={row.k} className="mb-2 last:mb-0">
                <div className="flex items-center justify-between text-[11px] mb-0.5">
                  <span className="text-slate-700">{row.k}</span>
                  <span className="font-mono font-semibold text-slate-900">{row.v}%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${row.v}%`, background: row.c }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
