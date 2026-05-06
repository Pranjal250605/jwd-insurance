'use client';

const PAYMENT_METHODS = [
  { name: 'VISA', style: 'italic font-black text-[22px] tracking-tighter text-blue-900' },
  { name: 'mastercard', style: 'font-bold text-[14px] text-slate-700', icon: 'mc' },
  { name: 'crypto', style: 'font-semibold text-[14px] text-slate-700', icon: 'btc' },
  { name: 'Apple Pay', style: 'font-medium text-[16px] text-slate-900', icon: 'apple' },
  { name: 'G Pay', style: 'font-medium text-[16px] text-slate-700', icon: 'gpay' },
  { name: 'SWIFT', style: 'font-bold text-[15px] tracking-widest text-slate-700' },
  { name: 'Skrill', style: 'italic font-bold text-[18px] text-purple-700' },
];

export default function ClosingCTA() {
  return (
    <section className="bg-white">
      {/* Closing CTA band */}
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div
          className="rounded-[28px] py-20 px-12 text-center relative overflow-hidden border border-slate-100"
          style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFB 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <div
              className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, oklch(0.78 0.13 180 / 0.18), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, oklch(0.78 0.13 180 / 0.12), transparent 70%)' }}
            />
          </div>
          <div className="relative">
            <div className="text-[12px] font-bold tracking-[0.22em] mb-5" style={{ color: 'var(--accent-deep)' }}>
              GLOBAL BROKER
            </div>
            <h2
              className="text-[44px] lg:text-[60px] leading-[1.05] font-bold text-slate-900 tracking-[-0.02em] mb-10 max-w-3xl mx-auto"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Start trading online with JWD
            </h2>
            <button
              className="px-8 py-4 rounded-md text-[13px] font-bold tracking-[0.08em] text-slate-900 transition-all hover:brightness-95"
              style={{ background: 'var(--accent)' }}
            >
              START TRADING
            </button>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-10">
          {PAYMENT_METHODS.map((p) => (
            <div key={p.name} className="h-12 px-6 bg-white rounded-xl border border-slate-100 flex items-center gap-2 hover:shadow-md transition-all">
              {p.icon === 'mc' && (
                <span className="flex">
                  <span className="w-5 h-5 rounded-full bg-red-500 -mr-1.5 opacity-90" />
                  <span className="w-5 h-5 rounded-full bg-yellow-400 opacity-90" />
                </span>
              )}
              {p.icon === 'btc' && (
                <span className="w-6 h-6 rounded-full bg-gradient-to-b from-yellow-300 to-orange-500 text-white text-[12px] font-bold flex items-center justify-center">₿</span>
              )}
              {p.icon === 'apple' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                  <path d="M17.05 12.04c-.03-3.18 2.6-4.7 2.72-4.78-1.48-2.17-3.79-2.46-4.6-2.49-1.96-.2-3.83 1.15-4.82 1.15-1 0-2.53-1.13-4.16-1.1-2.14.03-4.12 1.24-5.22 3.15-2.23 3.86-.57 9.58 1.6 12.72 1.06 1.54 2.32 3.27 3.97 3.21 1.6-.07 2.2-1.03 4.13-1.03 1.93 0 2.47 1.03 4.16.99 1.72-.03 2.81-1.57 3.86-3.12 1.22-1.79 1.72-3.52 1.75-3.61-.04-.02-3.36-1.29-3.39-5.09zm-3.18-9.36c.88-1.07 1.48-2.55 1.32-4.03-1.27.05-2.81.85-3.73 1.91-.82.94-1.54 2.45-1.35 3.9 1.42.11 2.87-.72 3.76-1.78z" />
                </svg>
              )}
              {p.icon === 'gpay' && (
                <span className="flex gap-0.5 text-[14px] font-bold">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </span>
              )}
              <span className={p.style}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
