import { useT } from '@/i18n';

const OFFICE_POS = [
  { rot: -3, x: -160, y: -40, lead: true },
  { rot: 2, x: 60, y: -90 },
  { rot: -2, x: 120, y: 20 },
  { rot: 4, x: -80, y: 90 },
  { rot: -4, x: 70, y: 130 },
];

export default function Money() {
  const { t } = useT();

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div data-spotlight className="spotlight rounded-[20px] bg-white border border-slate-100 p-12 lg:p-16 grid lg:grid-cols-[1fr_1.05fr] gap-14 items-center">
          <div>
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.money.reachEyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.money.reachSub}</div>
            <h2 className="font-serif text-[40px] lg:text-[48px] leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-6">
              {t.money.reachTitle}
            </h2>
            <p className="text-[19px] leading-[1.65] text-slate-600 mb-4 max-w-md">
              {t.money.reachBody}
            </p>
            <p className="font-jp text-[17.5px] leading-[1.85] text-slate-600 mb-9 max-w-md tracking-wide">
              {t.money.reachBody2}
            </p>
            <a href="#" className="link-underline text-[15.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              {t.money.reachCta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>

          <div className="relative h-[440px] flex items-center justify-center">
            <div className="relative w-[340px] h-[340px] rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: 'var(--gradient-radial-dark)' }}>
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
                    <circle cx={p.cx} cy={p.cy} r={p.r + 4} style={{ fill: 'var(--secondary)' }} fillOpacity="0.25" />
                    <circle cx={p.cx} cy={p.cy} r={p.r} style={{ fill: 'var(--secondary)' }} />
                  </g>
                ))}
                <path d="M110 130 Q160 100 200 95" fill="none" style={{ stroke: 'var(--secondary)' }} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M200 95 Q230 130 230 170" fill="none" style={{ stroke: 'var(--secondary)' }} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M230 170 Q210 210 195 235" fill="none" style={{ stroke: 'var(--secondary)' }} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M195 235 Q165 230 145 215" fill="none" style={{ stroke: 'var(--secondary)' }} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
                <path d="M145 215 Q120 175 110 130" fill="none" style={{ stroke: 'var(--secondary)' }} strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
              </svg>
            </div>

            {t.money.offices.map((o, i) => (
              <div key={i}
                className={`absolute bg-white rounded-lg shadow-[0_12px_30px_-12px_rgba(var(--shadow-rgb),0.25)] px-4 py-2.5 ${OFFICE_POS[i].lead ? 'border-l-2' : ''}`}
                style={{ transform: `translate(${OFFICE_POS[i].x}px, ${OFFICE_POS[i].y}px) rotate(${OFFICE_POS[i].rot}deg)`, borderLeftColor: OFFICE_POS[i].lead ? 'var(--secondary)' : undefined, zIndex: 10 + i }}>
                <div className="text-[10px] font-semibold tracking-[0.18em] text-slate-400">{OFFICE_POS[i].lead ? t.money.hq : t.money.office}</div>
                <div className="font-serif text-[18px] font-semibold text-slate-900 leading-tight">{o.city}</div>
                <div className="font-jp text-[10px] text-slate-500 tracking-wide">{o.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div data-spotlight className="spotlight spotlight--wash rounded-[20px] p-12 lg:p-16 grid lg:grid-cols-[1fr_1fr] gap-12 items-center relative overflow-hidden"
          style={{ background: 'var(--gradient-dark)' }}>
          <div className="relative z-10">
            <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--secondary)' }}>{t.money.portalEyebrow}</div>
            <div className="font-jp text-[15.5px] tracking-[0.18em] mb-7 text-white/60">{t.money.portalSub}</div>
            <h2 className="font-serif text-[36px] lg:text-[44px] leading-[1.15] font-medium text-white tracking-[-0.015em] mb-6">
              {t.money.portalTitle}
            </h2>
            <p className="text-[18px] leading-[1.65] text-slate-300 mb-3 max-w-md">
              {t.money.portalBody}
            </p>
            <p className="font-jp text-[17px] leading-[1.85] text-slate-400 mb-9 max-w-md tracking-wide">
              {t.money.portalBody2}
            </p>
            <div className="flex flex-col gap-3 max-w-sm">
              {t.money.features.map((f) => (
                <div key={f.l} className="flex items-center gap-3 text-[17px] text-white/85">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--secondary)' }} strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
                  <span className="flex-1">{f.l}</span>
                  <span className="font-jp text-[11px] text-white/40">{f.sub}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[360px] flex items-center justify-center">
            <div className="img-zoom relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=85&auto=format&fit=crop"
                alt="JWD Investment client portal — wealth management dashboard"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(var(--photo-tint-rgb),0.5) 0%, transparent 60%)' }} />
              <div className="equiti-card-rim absolute top-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-semibold tracking-[0.2em] text-slate-400">{t.money.totalWealth}</div>
                  <div data-count="$84.2M" className="font-serif text-[20px] font-semibold text-slate-900">$84.2M</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-semibold tracking-[0.2em] text-slate-400">{t.money.qtr}</div>
                  <div className="text-[17px] font-semibold text-emerald-700">+ 2.84%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
