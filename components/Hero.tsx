'use client';

interface HeroProps {
  eyebrow?: string;
  headline?: string;
}

function AssetChip({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute rounded-2xl shadow-[0_8px_32px_-8px_rgba(15,23,42,0.18)] flex items-center justify-center font-semibold ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function PhoneChart() {
  return (
    <div className="relative w-[260px] h-[520px] rounded-[42px] bg-slate-900 p-2 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)]">
      <div className="w-full h-full rounded-[36px] bg-white overflow-hidden flex flex-col">
        <div className="h-7 flex items-center justify-center">
          <div className="w-20 h-5 bg-slate-900 rounded-full" />
        </div>
        <div className="px-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-slate-900">EURUSD</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <span className="text-[11px] text-slate-400">Market Execution</span>
        </div>
        <div className="px-4 flex items-baseline gap-3 pb-2">
          <span className="text-[11px] font-medium text-emerald-500">+0.21</span>
          <span className="text-[10px] text-slate-400">+0.14%</span>
        </div>
        <div className="px-3 flex-1 relative">
          <svg viewBox="0 0 240 200" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.13 180)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="oklch(0.78 0.13 180)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="0" y1={i * 40 + 20} x2="240" y2={i * 40 + 20} stroke="#F1F5F9" strokeWidth="1" />
            ))}
            {Array.from({ length: 18 }).map((_, i) => {
              const up = Math.sin(i * 1.3) > 0;
              const h = 20 + Math.abs(Math.sin(i * 0.9)) * 40;
              const y = 80 + Math.cos(i * 0.7) * 30;
              return (
                <g key={i}>
                  <line x1={i * 13 + 8} y1={y - h / 2 - 8} x2={i * 13 + 8} y2={y + h / 2 + 8} stroke={up ? '#10b981' : '#ef4444'} strokeWidth="1" />
                  <rect x={i * 13 + 4} y={y - h / 2} width="8" height={h} fill={up ? '#10b981' : '#ef4444'} />
                </g>
              );
            })}
            <path d="M 0 120 Q 30 110 60 100 T 120 90 T 180 70 T 240 50" stroke="oklch(0.78 0.13 180)" strokeWidth="2" fill="none" />
            <path d="M 0 120 Q 30 110 60 100 T 120 90 T 180 70 T 240 50 L 240 200 L 0 200 Z" fill="url(#chartFill)" />
          </svg>
          <div className="absolute right-3 top-12 bg-slate-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">1.1253⁴</div>
          <div className="absolute right-3 top-24 bg-rose-500 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">1.1252⁰</div>
        </div>
        <div className="px-3 pb-3 flex gap-2">
          <button className="flex-1 h-9 rounded-lg bg-rose-500 text-white text-[11px] font-semibold flex items-center justify-center">
            Sell by Market
          </button>
          <button className="flex-1 h-9 rounded-lg bg-emerald-500 text-white text-[11px] font-semibold flex items-center justify-center">
            Buy by Market
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  eyebrow = 'AWARD-WINNING BROKER · EST. 2014',
  headline = 'Start trading online with leverage up to 1:2000',
}: HeroProps) {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 py-20 lg:py-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="relative z-10">
          <div className="text-[12px] font-bold tracking-[0.2em] mb-6" style={{ color: 'var(--accent-deep)' }}>
            {eyebrow}
          </div>
          <h1
            className="text-[56px] lg:text-[68px] leading-[1.05] font-bold text-slate-900 tracking-[-0.02em] mb-6"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {headline}
          </h1>
          <p className="text-[18px] leading-[1.6] text-slate-600 max-w-xl mb-10">
            Trade on your mobile, tablet or desktop with instant market access and dedicated local support from a globally regulated broker.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              className="px-7 h-12 rounded-md text-[13px] font-bold tracking-[0.08em] text-slate-900 transition-all hover:brightness-95"
              style={{ background: 'var(--accent)' }}
            >
              START TRADING
            </button>
            <button className="px-6 h-12 rounded-md text-[14px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-2">
              Open demo account
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="mt-14 flex items-center gap-8 flex-wrap">
            {[
              ['FCA', 'Regulated'],
              ['FSC', 'Licensed'],
              ['6', 'Global Offices'],
              ['190+', 'Countries'],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center gap-2.5">
                <div className="text-[20px] font-bold text-slate-900">{a}</div>
                <div className="text-[12px] text-slate-500 leading-tight">{b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="relative h-[560px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-[480px] h-[480px] rounded-full"
              style={{ background: 'radial-gradient(circle, oklch(0.78 0.13 180 / 0.18), transparent 60%)' }}
            />
          </div>
          <div className="relative">
            <PhoneChart />
            <AssetChip className="w-[88px] h-[88px] text-[18px] text-slate-900 -left-20 -top-2" style={{ background: 'oklch(0.95 0.04 180)' }}>
              AAPL
            </AssetChip>
            <AssetChip className="w-[100px] h-[100px] text-[18px] text-slate-900 -left-28 top-28" style={{ background: 'oklch(0.92 0.05 180)' }}>
              TSLA
            </AssetChip>
            <AssetChip className="w-[72px] h-[72px] -right-16 top-8 overflow-hidden" style={{ background: '#fff' }}>
              <div className="w-1/2 h-full bg-gradient-to-b from-blue-700 to-blue-900 flex items-center justify-center text-[8px] text-yellow-300">★★★</div>
              <div className="w-1/2 h-full flex flex-col">
                <div className="flex-1 flex">
                  <div className="w-1/3 bg-blue-700" />
                  <div className="flex-1 bg-white" />
                </div>
                <div className="flex-1 bg-red-500" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-red-500" />
              </div>
            </AssetChip>
            {/* gold bars */}
            <div className="absolute -left-12 bottom-4 flex gap-1 items-end">
              <div className="w-12 h-8 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-sm shadow-md" />
              <div className="w-14 h-10 bg-gradient-to-b from-yellow-200 to-yellow-500 rounded-sm shadow-md -ml-2" />
              <div className="w-12 h-7 bg-gradient-to-b from-slate-200 to-slate-400 rounded-sm shadow-md -ml-2" />
            </div>
            {/* oil barrels */}
            <div className="absolute -right-10 bottom-12 flex gap-1">
              <div className="w-10 h-14 bg-gradient-to-b from-slate-700 to-black rounded-md shadow-md relative">
                <div className="absolute inset-x-1 top-2 h-px bg-slate-500" />
                <div className="absolute inset-x-1 bottom-2 h-px bg-slate-500" />
              </div>
              <div className="w-12 h-16 bg-gradient-to-b from-slate-800 to-black rounded-md shadow-md relative">
                <div className="absolute inset-x-1 top-2 h-px bg-slate-500" />
                <div className="absolute inset-x-1 bottom-2 h-px bg-slate-500" />
              </div>
            </div>
            <AssetChip className="w-[64px] h-[64px] -right-4 -bottom-2 text-white text-[28px]" style={{ background: 'linear-gradient(135deg, #f7b500, #f59e0b)' }}>
              ₿
            </AssetChip>
            <AssetChip className="w-[52px] h-[52px] right-16 -bottom-6 text-slate-700 text-[22px]" style={{ background: '#fff' }}>
              Ł
            </AssetChip>
          </div>
        </div>
      </div>
    </section>
  );
}
