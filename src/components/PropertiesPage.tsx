import { useMemo, useRef, useState } from 'react';
import { useT } from '@/i18n';
import { LISTINGS, APPRECIATION, PURCHASE_COST, EXIT_COST, OPEX_PER_SQFT, HOLD, irr, fmtAed, type Listing } from '@/data/properties';

const LINE = 'var(--accent-deep)';

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

        <p className="text-[13.5px] leading-[1.7] text-slate-400 max-w-4xl">{t.propsPage.disclaimer}</p>
      </div>
    </main>
  );
}
