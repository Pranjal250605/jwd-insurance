const OFFICES = [
  { city: 'Tokyo',     jp: '東京',         rot: -3,  x: -160, y: -40, lead: true },
  { city: 'London',    jp: 'ロンドン',     rot: 2,   x: 60,   y: -90 },
  { city: 'New York',  jp: 'ニューヨーク', rot: -2,  x: 120,  y: 20 },
  { city: 'Singapore', jp: 'シンガポール', rot: 4,   x: -80,  y: 90 },
  { city: 'Zürich',    jp: 'チューリッヒ', rot: -4,  x: 70,   y: 130 },
];

const PLATFORM_FEATURES = [
  { l: 'Performance reporting', jp: 'パフォーマンス報告' },
  { l: 'Tax-aware analytics',   jp: '税務分析' },
  { l: 'Secure document vault', jp: 'ドキュメント保管' },
];

export default function Money() {
  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="rounded-[20px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1.05fr] gap-14 items-center">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>GLOBAL REACH</div>
            <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-6">グローバル・リーチ</div>
            <h2 className="font-serif text-[40px] lg:text-[48px] leading-[1.08] font-medium text-slate-900 tracking-[-0.015em] mb-6">
              Local insight, global perspective
            </h2>
            <p className="text-[16px] leading-[1.65] text-slate-600 mb-4 max-w-md">
              Eleven offices across Asia, Europe and the Americas — each staffed by senior advisors who live in the markets they cover, supported by a single global research platform.
            </p>
            <p className="font-jp text-[14.5px] leading-[1.85] text-slate-600 mb-9 max-w-md tracking-wide">
              世界11拠点のチームが、お客様の地域に根ざした視点とグローバルな運用力をお届けします。
            </p>
            <a href="#" className="text-[13px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              View our office network
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>

          <div className="relative h-[440px] flex items-center justify-center">
            <div className="relative w-[340px] h-[340px] rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: 'radial-gradient(circle at 30% 30%, #1A2C4F, #0B1830)' }}>
              <svg viewBox="0 0 340 340" className="absolute inset-0 w-full h-full">
                {[60,120,180,240,300].map((y) => (
                  <ellipse key={y} cx="170" cy={y} rx="168" ry={Math.sqrt(170*170-(y-170)*(y-170))*0.28} fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="1" />
                ))}
                {[0,30,60,90,120,150].map((deg) => (
                  <ellipse key={deg} cx="170" cy="170" rx={Math.abs(Math.cos(deg*Math.PI/180))*168} ry="168" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="1" />
                ))}
                {[
                  { cx: 110, cy: 130, r: 4 },
                  { cx: 200, cy: 95,  r: 4 },
                  { cx: 230, cy: 170, r: 4 },
                  { cx: 145, cy: 215, r: 4 },
                  { cx: 195, cy: 235, r: 4 },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r={p.r + 4} fill="#B89968" fillOpacity="0.25" />
                    <circle cx={p.cx} cy={p.cy} r={p.r} fill="#B89968" />
                  </g>
                ))}
                <path d="M110 130 Q160 100 200 95" fill="none" stroke="#B89968" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M200 95 Q230 130 230 170" fill="none" stroke="#B89968" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M230 170 Q210 210 195 235" fill="none" stroke="#B89968" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M195 235 Q165 230 145 215" fill="none" stroke="#B89968" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M145 215 Q120 175 110 130" fill="none" stroke="#B89968" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
              </svg>
            </div>

            {OFFICES.map((o, i) => (
              <div key={o.city}
                className={`absolute bg-white rounded-lg shadow-[0_12px_30px_-12px_rgba(11,24,48,0.25)] px-4 py-2.5 ${o.lead ? 'border-l-2' : ''}`}
                style={{ transform: `translate(${o.x}px, ${o.y}px) rotate(${o.rot}deg)`, borderLeftColor: o.lead ? '#B89968' : undefined, zIndex: 10 + i }}>
                <div className="text-[10px] font-semibold tracking-[0.18em] text-slate-400">{o.lead ? 'HEADQUARTERS' : 'OFFICE'}</div>
                <div className="font-serif text-[15px] font-semibold text-slate-900 leading-tight">{o.city}</div>
                <div className="font-jp text-[10px] text-slate-500 tracking-wide">{o.jp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="rounded-[20px] p-12 lg:p-16 grid lg:grid-cols-[1fr_1fr] gap-12 items-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0B1830 0%, #1A2C4F 100%)' }}>
          <div className="relative z-10">
            <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: '#B89968' }}>CLIENT EXPERIENCE</div>
            <div className="font-jp text-[13px] tracking-[0.18em] mb-7 text-white/60">クライアント・エクスペリエンス</div>
            <h2 className="font-serif text-[36px] lg:text-[44px] leading-[1.1] font-medium text-white tracking-[-0.015em] mb-6">
              The JWD Client Portal — clarity, on every device
            </h2>
            <p className="text-[15px] leading-[1.65] text-slate-300 mb-3 max-w-md">
              A consolidated view of every account, position and document — with institutional-grade encryption and seamless access for principals, family members and authorised advisors.
            </p>
            <p className="font-jp text-[14px] leading-[1.85] text-slate-400 mb-9 max-w-md tracking-wide">
              すべての資産情報を一元管理。安全で直感的なクライアント・ポータル。
            </p>
            <div className="flex flex-col gap-3 max-w-sm">
              {PLATFORM_FEATURES.map((f) => (
                <div key={f.l} className="flex items-center gap-3 text-[14px] text-white/85">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B89968" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                  <span className="flex-1">{f.l}</span>
                  <span className="font-jp text-[11px] text-white/40">{f.jp}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[360px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=85&auto=format&fit=crop"
                alt="JWD Investment client portal — wealth management dashboard"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(11,24,48,0.5) 0%, transparent 60%)' }} />
              <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-semibold tracking-[0.2em] text-slate-400">TOTAL WEALTH</div>
                  <div className="font-serif text-[20px] font-semibold text-slate-900">$84.2M</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-semibold tracking-[0.2em] text-slate-400">QTR</div>
                  <div className="text-[14px] font-semibold text-emerald-700">+ 2.84%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
