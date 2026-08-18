import { useT } from '@/i18n';
import VideoTiles from '@/components/VideoTiles';
import MainImage from '@/components/MainImage';

interface HeroProps {
  eyebrow?: string;
  headline?: string;
}

export default function Hero({ eyebrow, headline }: HeroProps) {
  const { lang, t } = useT();
  // Tweaks-panel overrides only apply in English; Japanese always uses the dictionary.
  const eyebrowText = lang === 'ja' ? t.hero.eyebrow : (eyebrow ?? t.hero.eyebrow);
  const headlineText = lang === 'ja' ? t.hero.headline : (headline ?? t.hero.headline);

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

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
        <div className="relative z-10">
          <div className="eyebrow-rule text-[12px] font-semibold tracking-[0.22em] mb-7" style={{ color: 'var(--accent-deep)' }}>{eyebrowText}</div>
          <h1 className={`font-serif whitespace-pre-line ${lang === 'ja' ? 'fluid-hero-ja leading-[1.2]' : 'fluid-hero-en leading-[1.05]'} font-medium text-slate-900 tracking-[-0.015em] mb-5`} style={{ textWrap: 'balance' } as React.CSSProperties}>
            {headlineText}
          </h1>
          <p className={`${lang === 'ja' ? '' : 'font-jp'} text-[21.5px] leading-[1.7] text-slate-700 mb-7 max-w-xl tracking-wide`}>
            {t.hero.tagline}
          </p>
          <p className="text-[20.5px] leading-[1.65] text-slate-600 max-w-xl mb-5">
            {t.hero.body}
          </p>
          <p className="text-[15.5px] leading-[1.7] text-slate-500 max-w-xl mb-9">
            {t.hero.support}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button data-magnetic className="cta-primary px-7 h-12 rounded-sm text-[12px] font-bold tracking-[0.14em]">
              {t.hero.ctaPrimary}
            </button>
            <button className="px-2 h-12 text-[17px] font-medium text-slate-700 hover:text-slate-900 flex items-center gap-2 group">
              {t.hero.ctaSecondary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>

          {/* 08.18 revision, page ①: the entry point to the information
              notice. The sheet draws it as a lead line with an arrow pointing
              at a bordered button, sitting directly under the hero CTAs and
              above the platform block. It routes to #/consent, not to a
              platform — the notice comes first. */}
          <a
            href="#/consent"
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 group w-fit"
          >
            <span className="flex items-center gap-3">
              <span className="whitespace-pre-line text-[19px] sm:text-[21px] font-bold leading-[1.35]" style={{ color: 'var(--accent-deep)' }}>
                {t.hero.gateLead}
              </span>
              <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden="true" className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-deep)' }}>
                <path d="M0 4h18V0l16 13-16 13v-4H0z" fill="currentColor" />
              </svg>
            </span>
            <span
              className="whitespace-pre-line rounded-md border-2 px-5 py-3 text-[15px] sm:text-[16px] font-bold leading-[1.45] text-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_35px_-12px_rgba(10,186,181,0.45)]"
              style={{ borderColor: 'var(--accent-deep)', color: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
            >
              {t.hero.gateButton}
            </span>
          </a>

          {/* Platform block, 08.24 revision: a selling headline, then one row
              per platform pairing its claim with the card it links to. The
              plain "EXECUTION VIA" label the cards used to sit under is gone. */}
          <div className="mt-10 max-w-xl">
            <h2 className="text-[21px] sm:text-[23px] font-bold leading-[1.4] mb-6" style={{ color: 'var(--accent-deep)' }}>
              {t.hero.platformsHeading}
            </h2>
            <div className="flex flex-col gap-4">
              {t.products.platforms.map((p, i) => (
                <div key={p.name} className="grid sm:grid-cols-[1fr_auto] gap-3 sm:gap-5 items-center">
                  <p className="text-[15px] leading-[1.6] font-semibold text-slate-800">
                    {t.hero.platformNotes[i]}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-lg px-5 py-4 border-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-12px_rgba(10,186,181,0.45)] sm:w-[248px]"
                    style={{ borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold tracking-[0.18em] mb-1 opacity-70" style={{ color: 'var(--accent-deep)' }}>{p.tag}</span>
                      <span className="block font-serif text-[22px] font-semibold tracking-tight leading-none" style={{ color: 'var(--accent-deep)' }}>{p.name}</span>
                    </span>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ background: 'var(--accent-deep)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M7 17L17 7M9 7h8v8" /></svg>
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div data-anim="hero-stats" className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {t.hero.stats.map(([a, b]) => (
              <div key={b}>
                <div data-count={a} className="font-serif text-[28px] font-medium tracking-tight" style={{ color: 'var(--accent-deep)' }}>{a}</div>
                <div className="text-[12px] text-slate-500 leading-tight mt-1">{b}</div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <VideoTiles />
          </div>
        </div>

        {/* Visual column: below `lg`, the photo gets a fixed-but-responsive
            height and the two info cards stack in normal document flow
            beneath it (side by side from `sm`). At `lg`+ they switch back to
            the original absolute-floating mockup treatment — the negative
            offsets (-left-6/-right-4) and 220px fixed width only ever
            applied at that width in the desktop design anyway. This is what
            prevents the guaranteed horizontal overflow those offsets caused
            on a full-viewport-width mobile column. */}
        <div data-anim="hero-visual" className="relative lg:mt-[44px] lg:h-[720px] flex flex-col lg:block">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(var(--shadow-rgb),0.4)]">
            <MainImage />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(var(--photo-tint-rgb),0.55) 0%, rgba(var(--photo-tint-rgb),0.15) 50%, transparent 100%)' }} />

            <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {t.hero.metrics.map((m) => (
                  <div key={m.v} className="bg-white/95 backdrop-blur rounded-lg p-2 sm:p-3">
                    <div className="text-[8px] sm:text-[9px] font-semibold tracking-[0.14em] sm:tracking-[0.18em] text-slate-500 uppercase truncate">{m.l}</div>
                    <div className="font-serif text-[15px] sm:text-[20px] font-semibold tracking-tight text-slate-900 mt-0.5">{m.v}</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">{m.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card cluster. `.spotlight` pins these to position:relative at a
              specificity a responsive `lg:absolute` cannot beat, so at lg+ they
              stay in normal flow — which is also how the client's page ①
              reference shows them, sitting under the photo. They therefore
              carry no absolute offsets: `top`/`bottom` on a relative element
              just shunts the two cards into each other. */}
          <div data-anim="hero-cards" className="mt-4 flex flex-col sm:flex-row gap-4">
            <div data-spotlight className="spotlight equiti-card-rim relative bg-white rounded-xl shadow-[0_16px_40px_-12px_rgba(var(--shadow-rgb),0.18)] p-4 w-full sm:flex-1 sm:min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-soft)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: 'var(--accent-deep)' }}>
                    <path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 6-6" />
                  </svg>
                </div>
                <div className="text-[11px] font-semibold tracking-[0.18em] text-slate-500">{t.hero.portfolio}</div>
              </div>
              <div className="font-serif text-[22px] sm:text-[24px] font-semibold tracking-tight text-slate-900">AED 1 = ¥41</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                <span className="text-[11px] text-slate-500">{t.hero.ytd}</span>
              </div>
            </div>

            <div data-spotlight className="spotlight equiti-card-rim relative bg-white rounded-xl shadow-[0_16px_40px_-12px_rgba(var(--shadow-rgb),0.18)] p-4 w-full sm:flex-1 sm:min-w-0">
              <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 mb-2">{t.hero.allocation}</div>
              {t.hero.allocRows.map((row, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-[11px] py-1 first:pt-0 last:pb-0 border-t first:border-t-0 border-slate-50">
                  <span className="text-slate-600 leading-tight min-w-0 break-words">{row.label}</span>
                  <span className="font-mono font-semibold text-slate-900 flex-shrink-0">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
