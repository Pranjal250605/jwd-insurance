'use client';

export default function Money() {
  return (
    <section className="bg-white">
      {/* Easy money management */}
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="rounded-[28px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div>
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'var(--accent-deep)' }}>
              FUND SECURELY
            </div>
            <h2 className="text-[40px] lg:text-[48px] leading-[1.08] font-bold text-slate-900 tracking-[-0.02em] mb-6">
              Easy money management
            </h2>
            <p className="text-[16px] leading-[1.6] text-slate-600 mb-8 max-w-md">
              Deposit instantly and manage your funds effortlessly within our seamless dashboard. Multi-currency wallets, instant FX conversion, segregated client funds.
            </p>
            <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              All deposit methods
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="relative h-[380px] flex items-center justify-center">
            {/* Globe */}
            <div
              className="relative w-[280px] h-[280px] rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, oklch(0.85 0.13 180), oklch(0.65 0.13 180))' }}
            >
              <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="globeShade" cx="0.7" cy="0.3">
                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.2" />
                  </radialGradient>
                </defs>
                <circle cx="140" cy="140" r="140" fill="url(#globeShade)" />
                {[60, 100, 140, 180, 220].map((y) => (
                  <ellipse
                    key={y} cx="140" cy={y}
                    rx="138" ry={Math.sqrt(140 * 140 - (y - 140) * (y - 140)) * 0.3}
                    fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1"
                  />
                ))}
                {[0, 30, 60, 90, 120, 150].map((deg) => (
                  <ellipse
                    key={deg} cx="140" cy="140"
                    rx={Math.abs(Math.cos((deg * Math.PI) / 180)) * 138} ry="138"
                    fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1"
                  />
                ))}
                <path d="M50 100 Q80 80 110 90 Q140 100 130 130 Q120 150 90 145 Q60 140 50 100 Z" fill="oklch(0.45 0.08 160)" fillOpacity="0.6" />
                <path d="M150 60 Q190 50 220 80 Q230 110 200 120 Q170 110 160 90 Q150 80 150 60 Z" fill="oklch(0.45 0.08 160)" fillOpacity="0.6" />
                <path d="M130 170 Q170 160 200 180 Q210 210 180 220 Q140 215 130 195 Q125 180 130 170 Z" fill="oklch(0.45 0.08 160)" fillOpacity="0.6" />
                <g transform="translate(120, 120)">
                  <rect x="0" y="12" width="40" height="32" rx="4" fill="#f97316" />
                  <path d="M8 12 V8 a12 12 0 0 1 24 0 V12" fill="none" stroke="#f97316" strokeWidth="4" />
                  <circle cx="20" cy="28" r="3" fill="#fff" />
                </g>
                <path d="M40 80 Q140 30 240 100" fill="none" stroke="white" strokeWidth="2" strokeDasharray="2 4" />
              </svg>
            </div>

            {/* currency chips */}
            <div className="absolute left-2 bottom-12 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-7 h-5 rounded-sm bg-gradient-to-b from-red-500 via-white to-red-500 border border-slate-200 relative">
                <div className="absolute top-0 left-0 w-3 h-2.5 bg-blue-700" />
              </div>
              <span className="font-bold text-slate-900 text-[14px]">USD</span>
            </div>
            <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-yellow-300 text-[8px]">★</div>
              <span className="font-bold text-slate-900 text-[14px]">EUR</span>
            </div>
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-lg flex items-center justify-center text-yellow-900 font-bold">$</div>
            <div className="absolute right-12 bottom-4 w-9 h-9 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 shadow-lg flex items-center justify-center text-slate-700 font-bold text-[14px]">€</div>
            <div className="absolute left-16 top-4 w-8 h-8 rounded-full bg-gradient-to-b from-yellow-200 to-yellow-400 shadow-lg flex items-center justify-center text-yellow-800 font-bold text-[12px]">¥</div>
          </div>
        </div>
      </div>

      {/* Trade anywhere dark band */}
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div
          className="rounded-[28px] p-12 lg:p-16 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0F1C 0%, #111827 100%)' }}
        >
          <div className="relative">
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'oklch(0.85 0.13 180)' }}>
              TRADING PLATFORM
            </div>
            <h2 className="text-[40px] lg:text-[48px] leading-[1.08] font-bold text-white tracking-[-0.02em] mb-6">
              Trade anywhere, the power&apos;s in your hands
            </h2>
            <p className="text-[16px] leading-[1.6] text-slate-400 mb-8 max-w-md">
              Use desktop, tablet and mobile to trade on JWD Pro — a powerful global platform with professional market analytics.
            </p>
            <a href="#" className="text-[14px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'oklch(0.85 0.13 180)' }}>
              JWD Pro Platform
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="relative h-[280px] flex items-center justify-center">
            {/* left candlesticks */}
            <div className="absolute inset-0 flex items-end justify-center gap-2.5 pb-8">
              {[{ h: 80, c: 'emerald' }, { h: 120, c: 'emerald' }, { h: 60, c: 'rose' }].map((b, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-px opacity-50" style={{ height: 20, background: b.c === 'emerald' ? '#10b981' : '#ef4444' }} />
                  <div className="w-3 rounded-sm" style={{ height: b.h, background: b.c === 'emerald' ? '#10b981' : '#ef4444' }} />
                  <div className="w-px opacity-50" style={{ height: 12, background: b.c === 'emerald' ? '#10b981' : '#ef4444' }} />
                </div>
              ))}
            </div>
            {/* platform tile */}
            <div
              className="relative w-[180px] h-[180px] rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.78 0.13 220), oklch(0.55 0.13 220))' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 opacity-30">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
              <div
                className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center"
                style={{ background: 'conic-gradient(from 0deg, #f59e0b, #10b981, #3b82f6, #f59e0b)' }}
              >
                <div className="w-[88px] h-[88px] rounded-full bg-white flex items-center justify-center">
                  <span className="text-[44px] font-black text-slate-900 tracking-[-0.05em]">P</span>
                </div>
              </div>
            </div>
            {/* right candlesticks */}
            <div className="absolute inset-0 flex items-end justify-center gap-2.5 pb-8 translate-x-44">
              {[{ h: 100, c: 'emerald' }, { h: 70, c: 'rose' }, { h: 90, c: 'emerald' }].map((b, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-px opacity-50" style={{ height: 16, background: b.c === 'emerald' ? '#10b981' : '#ef4444' }} />
                  <div className="w-3 rounded-sm" style={{ height: b.h, background: b.c === 'emerald' ? '#10b981' : '#ef4444' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
