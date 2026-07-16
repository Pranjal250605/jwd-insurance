import { useMemo, useRef, useState } from 'react';
import { useT } from '@/i18n';
import {
  LISTINGS, APPRECIATION, PURCHASE_COST, EXIT_COST, OPEX_PER_SQFT, HOLD,
  FX_JPY, JP_CGT, AREA_SHORT, SERIES_COLORS, AREA_PRICES,
  irr, fmtAed, type Listing,
} from '@/data/properties';

const LINE = 'var(--accent-deep)';
const JAPAN_LINE = '#5C7BA8';

const oku = (n: number) => `¥${(n / 1e8).toFixed(2)}億`;

/* ── Portfolio allocation donut (categorical: one slice per asset) ── */
function AllocationDonut() {
  const { lang, t } = useT();
  const ja = lang === 'ja';
  const [active, setActive] = useState<number | null>(null);

  const total = LISTINGS.reduce((s, p) => s + p.priceAed, 0);
  const cx = 90, cy = 90, r0 = 52, r1 = 84;
  const polar = (r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  let angle = -Math.PI / 2;
  const slices = LISTINGS.map((p, i) => {
    const frac = p.priceAed / total;
    const a0 = angle;
    const a1 = (angle += frac * Math.PI * 2);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1);
    const [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0);
    return {
      i, frac,
      short: AREA_SHORT[p.area]?.[ja ? 'ja' : 'en'] ?? p.area,
      value: p.priceAed,
      color: SERIES_COLORS[i],
      d: `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`,
    };
  });
  const focus = active != null ? slices[active] : null;

  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-7 h-full">
      <div className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-1" style={{ color: 'var(--accent-deep)' }}>{t.propsPage.alloc.kicker}</div>
      <h3 className="font-serif text-[22px] font-semibold text-slate-900 mb-6 tracking-[-0.01em]">{t.propsPage.alloc.title}</h3>
      <div className="flex items-center gap-8 flex-wrap">
        <div className="relative flex-shrink-0">
          <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Portfolio allocation by asset">
            {slices.map((s) => (
              <path
                key={s.i}
                d={s.d}
                fill={s.color}
                stroke="white"
                strokeWidth="2"
                opacity={active == null || active === s.i ? 1 : 0.35}
                style={{ transition: 'opacity 200ms ease', cursor: 'pointer' }}
                onMouseEnter={() => setActive(s.i)}
                onMouseLeave={() => setActive(null)}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            {focus ? (
              <>
                <span className="text-[18px] font-bold text-slate-900 leading-none">{(focus.frac * 100).toFixed(1)}%</span>
                <span className="text-[11px] text-slate-500 mt-1 max-w-[90px] leading-tight">{focus.short}</span>
              </>
            ) : (
              <>
                <span className="text-[15px] font-bold text-slate-900 leading-none">AED {fmtAed(total / 1e6)}M</span>
                <span className="text-[10.5px] text-slate-500 mt-1">{t.propsPage.alloc.total}</span>
              </>
            )}
          </div>
        </div>
        {/* legend doubles as the table view */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-2.5">
          {slices.map((s) => (
            <div
              key={s.i}
              className="flex items-center gap-3 cursor-pointer rounded-md px-2 py-1 -mx-2 transition-colors"
              style={{ background: active === s.i ? 'var(--accent-soft)' : 'transparent' }}
              onMouseEnter={() => setActive(s.i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: s.color }} />
              <span className="flex-1 text-[14.5px] text-slate-700">{s.short}</span>
              <span className="text-[13.5px] text-slate-500">AED {fmtAed(s.value)}</span>
              <span className="text-[14px] font-semibold text-slate-900 w-12 text-right">{(s.frac * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[12.5px] text-slate-400 mt-5">{t.propsPage.alloc.note}</p>
    </div>
  );
}

/* ── Price per sq ft by area — horizontal bars, direct-labeled ── */
function AreaBars() {
  const { lang, t } = useT();
  const ja = lang === 'ja';
  const max = Math.max(...AREA_PRICES.map((a) => a.value));

  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-7 h-full">
      <div className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-1" style={{ color: 'var(--accent-deep)' }}>{t.propsPage.areas.kicker}</div>
      <h3 className="font-serif text-[22px] font-semibold text-slate-900 mb-6 tracking-[-0.01em]">{t.propsPage.areas.title}</h3>
      <div className="flex flex-col gap-4">
        {AREA_PRICES.map((a) => (
          <div key={a.en} className="grid grid-cols-[110px_1fr_74px] items-center gap-3">
            <span className="text-[14px] text-slate-600 truncate">{ja ? a.ja : a.en}</span>
            <div className="h-5 rounded-r-[4px] relative" style={{ width: `${(a.value / max) * 100}%`, background: 'var(--accent-deep)', opacity: a.highlight ? 1 : 0.45 }}>
              {a.highlight && (
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-wider whitespace-nowrap px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}>
                  {t.propsPage.areas.highlight}
                </span>
              )}
            </div>
            <span className="text-[14px] font-semibold text-slate-900 text-right">{a.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <p className="text-[12.5px] text-slate-400 mt-6">{t.propsPage.areas.note}</p>
    </div>
  );
}

/* ── Growth simulator — ported from jwd-web PropertySimulator ── */
function Slider({ label, value, display, min, max, step, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] text-slate-600">{label}</span>
        <span className="text-[15px] font-semibold text-slate-900">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200"
        style={{ accentColor: '#07807C' }}
      />
    </div>
  );
}

function GrowthSimulator() {
  const { lang, t } = useT();
  const ja = lang === 'ja';
  const s = t.propsPage.sim;

  const [idx, setIdx] = useState(0);
  const [years, setYears] = useState(10);
  const [dubaiApp, setDubaiApp] = useState(APPRECIATION * 100);
  const [japanRet, setJapanRet] = useState(1.5);

  const p = LISTINGS[idx];
  const netRentAed = Math.max((p.priceAed * p.yieldPct) / 100 - p.sizeSqft * OPEX_PER_SQFT, 0);

  const sim = useMemo(() => {
    const initJpy = p.priceAed * FX_JPY;
    const jpAfter = (japanRet / 100) * (1 - JP_CGT);
    const dubai: number[] = [];
    const japan: number[] = [];
    for (let ti = 0; ti <= years; ti++) {
      dubai.push((p.priceAed * Math.pow(1 + dubaiApp / 100, ti) + netRentAed * ti) * FX_JPY);
      japan.push(initJpy * Math.pow(1 + jpAfter, ti));
    }
    return { dubai, japan };
  }, [years, dubaiApp, japanRet, p, netRentAed]);

  const dFinal = sim.dubai[years];
  const jFinal = sim.japan[years];
  const gap = dFinal - jFinal;

  const all = [...sim.dubai, ...sim.japan];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const W = 100, H = 42, pad = 3;
  const toXY = (arr: number[]) => arr.map((v, i) => {
    const x = pad + (i / years) * (W - pad * 2);
    const y = pad + (1 - (v - min) / (max - min || 1)) * (H - pad * 2);
    return [x, y] as const;
  });
  const path = (pts: ReadonlyArray<readonly [number, number]>) =>
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const dPts = toXY(sim.dubai);
  const jPts = toXY(sim.japan);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-1" style={{ color: 'var(--accent-deep)' }}>{s.kicker}</div>
          <h3 className="font-serif text-[26px] font-semibold text-slate-900 tracking-[-0.01em]">{s.title}</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[13.5px] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          {s.fxNote}
        </span>
      </div>

      {/* property selector */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {LISTINGS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => setIdx(i)}
            className="px-4 h-9 rounded-full border text-[13.5px] font-semibold transition-all"
            style={idx === i
              ? { background: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', color: 'white' }
              : { background: 'white', borderColor: '#CBD5E1', color: '#475569' }}
          >
            {AREA_SHORT[l.area]?.[ja ? 'ja' : 'en'] ?? l.area}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-4">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: 260 }} aria-label="Simulated growth: this property vs keeping capital in Japan">
            <defs>
              <linearGradient id="sim-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#07807C" stopOpacity={0.16} />
                <stop offset="100%" stopColor="#07807C" stopOpacity={0} />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1={pad} x2={W - pad} y1={pad + f * (H - pad * 2)} y2={pad + f * (H - pad * 2)} stroke="#0f172a" strokeOpacity="0.06" strokeWidth="0.3" />
            ))}
            <path d={`${path(dPts)} L${dPts[years][0]} ${H} L${dPts[0][0]} ${H} Z`} fill="url(#sim-fill)" />
            <path d={path(jPts)} fill="none" stroke={JAPAN_LINE} strokeDasharray="2 1.6" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
            <path d={path(dPts)} fill="none" stroke={LINE} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
          </svg>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 text-[13.5px] text-slate-700">
              <span className="h-1.5 w-5 rounded-full" style={{ background: 'var(--accent-deep)' }} /> {s.legendDubai}
            </span>
            <span className="inline-flex items-center gap-2 text-[13.5px] text-slate-700">
              <span className="h-1.5 w-5 rounded-full" style={{ background: JAPAN_LINE, opacity: 0.7 }} /> {s.legendJapan}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-500">{s.assumptions}</span>
          <Slider label={s.years} value={years} display={`${years}${s.yrsSuffix}`} min={3} max={25} step={1} onChange={setYears} />
          <Slider label={s.dubaiApp} value={dubaiApp} display={`${dubaiApp.toFixed(1)}%`} min={0} max={12} step={0.1} onChange={setDubaiApp} />
          <Slider label={s.japanRet} value={japanRet} display={`${japanRet.toFixed(1)}%`} min={0} max={6} step={0.1} onChange={setJapanRet} />
        </div>
      </div>

      {/* result cards */}
      <div className="mt-8 grid sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-slate-200 bg-slate-200">
        <div className="bg-white p-5">
          <div className="text-[11.5px] uppercase tracking-[0.14em] text-slate-500 mb-1">{s.resThis} · {years}{s.yrsSuffix}</div>
          <div className="font-serif text-[26px] font-medium" style={{ color: 'var(--accent-deep)' }}>{oku(dFinal)}</div>
          <div className="text-[13px] text-slate-500 mt-0.5">AED {fmtAed(dFinal / FX_JPY)}</div>
        </div>
        <div className="bg-white p-5">
          <div className="text-[11.5px] uppercase tracking-[0.14em] text-slate-500 mb-1">{s.resJapan} · {years}{s.yrsSuffix}</div>
          <div className="font-serif text-[26px] font-medium" style={{ color: JAPAN_LINE }}>{oku(jFinal)}</div>
          <div className="text-[13px] text-slate-500 mt-0.5">{s.afterTax}</div>
        </div>
        <div className="p-5" style={{ background: 'var(--accent-soft)' }}>
          <div className="text-[11.5px] uppercase tracking-[0.14em] text-slate-500 mb-1">{s.resDiff}</div>
          <div className="font-serif text-[26px] font-medium" style={{ color: gap >= 0 ? 'var(--accent-deep)' : JAPAN_LINE }}>
            {gap >= 0 ? '+' : ''}{oku(gap)}
          </div>
          <div className="text-[13px] text-slate-500 mt-0.5">
            {jFinal > 0 ? `+${((dFinal / jFinal - 1) * 100).toFixed(0)}% ${s.more}` : '—'}
          </div>
        </div>
      </div>

      <p className="mt-6 text-[13.5px] leading-[1.7] text-slate-400">{s.disclaimer}</p>
    </div>
  );
}

interface Point { label: string; value: number; projected: boolean }

/* Modelled price/sqft series: 5 years history + 5 years projection (as jwd-web). */
function buildSeries(p: Listing): Point[] {
  return Array.from({ length: 11 }, (_, i) => {
    const offset = i - 5; // -5 … +5 around "now" ('26)
    return {
      label: `'${String(26 + offset).padStart(2, '0')}`,
      value: (p.priceAed / p.sizeSqft) * Math.pow(1 + APPRECIATION, offset),
      projected: offset > 0,
    };
  });
}

/* ── Single-series price chart with crosshair + tooltip ── */
function PriceChart({ listing, series }: { listing: Listing; series: Point[] }) {
  const { t } = useT();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const W = 100, H = 38, pad = 3;
  const vals = series.map((s) => s.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const xy = series.map((s, i) => {
    const x = pad + (i / (series.length - 1)) * (W - pad * 2);
    const y = pad + (1 - (s.value - min) / (max - min || 1)) * (H - pad * 2);
    return [x, y] as const;
  });
  const nowIdx = series.reduce((acc, s, i) => (s.projected ? acc : i), 0);
  const histPts = xy.slice(0, nowIdx + 1);
  const projPts = xy.slice(nowIdx);
  const line = (pts: ReadonlyArray<readonly [number, number]>) =>
    pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
  const nowX = xy[nowIdx][0];

  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const frac = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    setHover(Math.round(frac * (series.length - 1)));
  };

  const h = hover != null ? series[hover] : null;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">{t.propsPage.chartTitle}</span>
      </div>
      <div
        ref={wrapRef}
        className="relative cursor-crosshair"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full" style={{ height: 190 }} aria-label={`${listing.area} price per square foot, history and projection`}>
          <defs>
            <linearGradient id={`pf-${listing.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#07807C" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#07807C" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* recessive horizontal grid */}
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={pad} x2={W - pad} y1={pad + f * (H - pad * 2)} y2={pad + f * (H - pad * 2)} stroke="#0f172a" strokeOpacity="0.06" strokeWidth="0.3" />
          ))}
          {/* now divider */}
          <line x1={nowX} y1={pad} x2={nowX} y2={H - pad} stroke={LINE} strokeWidth={0.4} strokeDasharray="1 1.5" opacity={0.5} />
          {/* area + history line + projection line */}
          <path d={`${line(histPts)} L${histPts[histPts.length - 1][0]} ${H} L${histPts[0][0]} ${H} Z`} fill={`url(#pf-${listing.id})`} />
          <path d={line(histPts)} fill="none" stroke={LINE} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} />
          <path d={line(projPts)} fill="none" stroke={LINE} strokeDasharray="2 1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2 }} opacity={0.7} />
          <circle cx={nowX} cy={xy[nowIdx][1]} r={1.2} fill={LINE} />
          {/* crosshair */}
          {hover != null && (
            <>
              <line x1={xy[hover][0]} y1={pad} x2={xy[hover][0]} y2={H - pad} stroke="#0f172a" strokeOpacity="0.25" strokeWidth="0.3" />
              <circle cx={xy[hover][0]} cy={xy[hover][1]} r={1.4} fill="white" stroke={LINE} strokeWidth={0.6} />
            </>
          )}
        </svg>
        {h != null && hover != null && (
          <div
            className="absolute -translate-x-1/2 pointer-events-none bg-slate-900 text-white rounded-md px-3 py-2 shadow-lg z-10"
            style={{ left: `${(xy[hover][0] / W) * 100}%`, top: -8 }}
          >
            <div className="text-[11px] font-semibold whitespace-nowrap">
              {h.label} {h.projected && '·'} {h.projected ? '→' : ''} AED {fmtAed(h.value)}/sqft
            </div>
            <div className="text-[10px] text-white/70 whitespace-nowrap">≈ AED {fmtAed(h.value * listing.sizeSqft)}</div>
          </div>
        )}
      </div>
      <div className="flex justify-between text-[11px] text-slate-400 mt-1">
        {series.filter((_, i) => i % 2 === 0).map((s, i) => <span key={`${s.label}-${i}`}>{s.label}</span>)}
      </div>
      <p className="text-[12.5px] text-slate-400 italic mt-2">{t.propsPage.chartNote}</p>
    </div>
  );
}

export default function PropertiesPage() {
  const { lang, t } = useT();
  const ja = lang === 'ja';

  const rows = useMemo(() => LISTINGS.map((p) => {
    const series = buildSeries(p);
    const grossRent = p.priceAed * (p.yieldPct / 100);
    const opex = p.sizeSqft * OPEX_PER_SQFT;
    const netRent = Math.max(grossRent - opex, 0);
    const netYield = (netRent / p.priceAed) * 100;
    const invested = p.priceAed * (1 + PURCHASE_COST);
    const exitPrice = p.priceAed * Math.pow(1 + APPRECIATION, HOLD);
    const saleNet = exitPrice * (1 - EXIT_COST);
    const cf = [-invested, ...Array(HOLD - 1).fill(netRent), netRent + saleNet];
    const irrPct = irr(cf) * 100;
    const roi5 = ((HOLD * netRent + (exitPrice - p.priceAed)) / invested) * 100;
    const payback = invested / netRent;
    const historical = series.filter((s) => !s.projected);
    const valueHistory = historical.map((s, i) => {
      const value = s.value * p.sizeSqft;
      const prev = i > 0 ? historical[i - 1].value * p.sizeSqft : null;
      return { year: s.label, value, yoy: prev ? ((value - prev) / prev) * 100 : null, now: i === historical.length - 1 };
    });
    const totalGrowth = ((historical[historical.length - 1].value - historical[0].value) / historical[0].value) * 100;
    return { p, series, netYield, exitPrice, irrPct, roi5, payback, valueHistory, totalGrowth };
  }), []);

  const totalValue = LISTINGS.reduce((s, p) => s + p.priceAed, 0);
  const avgYield = LISTINGS.reduce((s, p) => s + p.yieldPct, 0) / LISTINGS.length;
  const growthPct = (Math.pow(1 + APPRECIATION, 5) - 1) * 100;

  return (
    <main className="bg-white">
      {/* page header */}
      <div className="max-w-[1280px] mx-auto px-8 pt-16 pb-12">
        <div className="mb-10">
          <a href="#" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-slate-500 hover:text-slate-900">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            {t.propsPage.backHome}
          </a>
        </div>
        <div className="eyebrow-rule text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.propsPage.eyebrow}</div>
        <div className="font-jp text-[15.5px] tracking-[0.18em] text-slate-500 mb-6">{t.propsPage.sub}</div>
        <h1 className={`font-serif ${ja ? 'text-[38px] lg:text-[48px] leading-[1.2]' : 'text-[44px] lg:text-[56px] leading-[1.1]'} font-medium text-slate-900 tracking-[-0.015em] mb-6 max-w-3xl`}>
          {t.propsPage.title}
        </h1>
        <p className="text-[18px] leading-[1.65] text-slate-600 max-w-2xl mb-12">{t.propsPage.intro}</p>

        {/* summary stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-slate-200 bg-slate-200">
          {[
            [String(LISTINGS.length), t.propsPage.summary.assets],
            [`AED ${fmtAed(totalValue)}`, t.propsPage.summary.value],
            [`${avgYield.toFixed(1)}%`, t.propsPage.summary.avgYield],
            [`+${growthPct.toFixed(0)}%`, t.propsPage.summary.growth],
          ].map(([v, l]) => (
            <div key={l} className="bg-white p-6">
              <div className="font-serif text-[30px] font-medium tracking-tight" style={{ color: 'var(--accent-deep)' }}>{v}</div>
              <div className="text-[13px] text-slate-500 mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* portfolio-level charts: allocation donut + area price bars */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <AllocationDonut />
          <AreaBars />
        </div>
      </div>

      {/* property cards */}
      <div className="max-w-[1280px] mx-auto px-8 pb-16 flex flex-col gap-10">
        {rows.map(({ p, series, netYield, exitPrice, irrPct, roi5, payback, valueHistory, totalGrowth }) => (
          <article key={p.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
            <div className="grid lg:grid-cols-[1fr_1.15fr]">
              {/* left: photo + facts */}
              <div>
                <div className="img-zoom relative h-[260px] overflow-hidden">
                  <img src={p.image} alt={ja ? p.nameJa : p.nameEn} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(var(--photo-tint-rgb),0.5) 100%)' }} />
                  <div className="absolute top-4 left-5">
                    <span className="text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/90 backdrop-blur" style={{ color: 'var(--accent-deep)' }}>{t.propsPage.acquired}</span>
                  </div>
                  <div className="absolute bottom-4 left-5 text-white">
                    <div className="text-[11px] font-semibold tracking-[0.2em] opacity-85 uppercase">{p.area}</div>
                    <div className="font-serif text-[24px] font-semibold leading-tight">{ja ? p.nameJa : p.nameEn}</div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-4 flex-wrap mb-4 text-[14px] text-slate-500">
                    <span>{ja ? p.typeJa : p.typeEn}</span><span className="text-slate-300">·</span>
                    <span>{p.beds}</span><span className="text-slate-300">·</span>
                    <span>{p.sizeSqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-end justify-between gap-4 mb-5">
                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-1">{ja ? '取得価格' : 'Acquisition price'}</div>
                      <div className="font-serif text-[28px] font-semibold tracking-tight text-slate-900">AED {fmtAed(p.priceAed)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-1">{t.propsPage.metrics.grossYield}</div>
                      <div className="font-serif text-[28px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>{p.yieldPct.toFixed(1)}%</div>
                    </div>
                  </div>
                  <p className="text-[16px] leading-[1.65] text-slate-600 mb-6">{ja ? p.descJa : p.descEn}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {[{ label: 'Bayut', url: p.bayut }, { label: 'Property Finder', url: p.pf }].map((l) => (
                      <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 h-10 rounded-full border text-[14px] font-bold transition-all hover:-translate-y-0.5"
                        style={{ color: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}>
                        {l.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M7 17L17 7M9 7h8v8" /></svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* right: chart + metrics */}
              <div className="p-7 lg:border-l border-t lg:border-t-0 border-slate-100 flex flex-col gap-7">
                <PriceChart listing={p} series={series} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                  {[
                    [`${p.yieldPct.toFixed(1)}%`, t.propsPage.metrics.grossYield],
                    [`${netYield.toFixed(1)}%`, t.propsPage.metrics.netYield],
                    [`${roi5.toFixed(0)}%`, t.propsPage.metrics.roi],
                    [Number.isFinite(irrPct) ? `${irrPct.toFixed(1)}%` : '—', t.propsPage.metrics.irr],
                    [`AED ${fmtAed(exitPrice)}`, t.propsPage.metrics.projected],
                    [`${payback.toFixed(1)} ${t.propsPage.metrics.yrs}`, t.propsPage.metrics.payback],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-white p-4">
                      <div className="font-serif text-[19px] font-semibold tracking-tight text-slate-900">{v}</div>
                      <div className="text-[11.5px] text-slate-500 mt-0.5 leading-tight">{l}</div>
                    </div>
                  ))}
                </div>

                {/* value history (table view of the chart) */}
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'var(--accent-deep)' }}>{t.propsPage.valueHistory}</span>
                    <span className="text-[13px] text-slate-500">{t.propsPage.since} <b style={{ color: 'var(--accent-deep)' }}>+{totalGrowth.toFixed(0)}%</b></span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-px rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
                    {valueHistory.map((v) => (
                      <div key={v.year} className="p-3" style={{ background: v.now ? 'var(--accent-soft)' : 'white' }}>
                        <div className="text-[11px] text-slate-500">{v.year}{v.now ? ` ${t.propsPage.now}` : ''}</div>
                        <div className="text-[12px] font-semibold text-slate-900 mt-0.5 break-words">AED {fmtAed(v.value)}</div>
                        {v.yoy != null
                          ? <div className="text-[11px] mt-0.5" style={{ color: 'var(--accent-deep)' }}>▲ {Math.abs(v.yoy).toFixed(1)}%</div>
                          : <div className="text-[11px] text-slate-400 mt-0.5">{t.propsPage.base}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* interactive growth simulator */}
        <GrowthSimulator />

        {/* risks & hedges */}
        <div className="border border-slate-200 rounded-2xl bg-white p-8 lg:p-10">
          <div className="text-[11px] font-semibold tracking-[0.24em] uppercase mb-6" style={{ color: 'var(--accent-deep)' }}>{t.propsPage.risksTitle}</div>
          <div className="grid md:grid-cols-2 gap-4">
            {t.propsPage.risks.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  <span className="text-[15px] font-semibold text-slate-900">{r.risk}</span>
                </div>
                <div className="mt-2 flex items-start gap-2.5 pl-4">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--accent-deep)' }} />
                  <span className="text-[14.5px] leading-[1.6] text-slate-600">{r.hedge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[13.5px] leading-[1.7] text-slate-400 max-w-4xl">{t.propsPage.disclaimer}</p>
      </div>
    </main>
  );
}
