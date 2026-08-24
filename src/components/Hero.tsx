import { useT } from '@/i18n';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';
import VideoTiles from '@/components/VideoTiles';
import MainImage from '@/components/MainImage';
import { useFxRate } from '@/hooks/useFxRate';

/* The sheet steps "No1" up from the surrounding claim text, level with the
   year. Copy carries it as a markdown bold marker, the same convention the
   chairman's copy uses in Promo.tsx. */
function withEmphasis(text: string) {
  return text.split('**').map((part, i) =>
    i % 2 ? <span key={i} className="text-[34.5px]">{part}</span> : part,
  );
}

interface HeroProps {
  eyebrow?: string;
  headline?: string;
}

export default function Hero({ eyebrow, headline }: HeroProps) {
  const { lang, t } = useT();
  const fx = useFxRate();
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

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-8 pt-6 sm:pt-8 lg:pt-10 pb-14 sm:pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-[1.32fr_1fr] gap-10 lg:gap-12 items-start">
          <div className="relative z-10">
            <div className="eyebrow-rule text-[16px] font-semibold tracking-[0.22em] mb-5" style={{ color: 'var(--accent-deep)' }}>{eyebrowText}</div>
            <h1 className={`font-serif whitespace-pre-line ${lang === 'ja' ? 'fluid-hero-ja leading-[1.2]' : 'fluid-hero-en leading-[1.05]'} font-medium text-slate-900 tracking-[-0.015em] mb-4`} style={{ textWrap: 'balance' } as React.CSSProperties}>
              {headlineText}
            </h1>
            {lang !== 'ja' && (
              <p className="font-jp text-[23.5px] leading-[1.7] text-slate-700 mb-7 max-w-xl tracking-wide">
                {t.hero.tagline}
              </p>
            )}
            <p className="text-[25px] leading-[1.6] text-slate-600 max-w-2xl mb-3.5">
              {t.hero.body}
            </p>
            <p className="text-[21.5px] leading-[1.65] text-slate-500 max-w-2xl mb-7">
              {t.hero.support}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <button data-magnetic className="cta-primary px-7 h-12 rounded-sm text-[16px] font-bold tracking-[0.14em]">
                {t.hero.ctaPrimary}
              </button>
              <button className="px-2 h-12 text-[22.5px] font-medium text-slate-700 hover:text-slate-900 flex items-center gap-2 group">
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
              className="mt-7 flex flex-wrap items-center gap-4 sm:gap-6 group w-fit"
            >
              <span className="flex items-center gap-3">
                <span className="whitespace-pre-line text-[29px] sm:text-[35.5px] font-bold leading-[1.3]" style={{ color: 'var(--accent-deep)' }}>
                  {t.hero.gateLead}
                </span>
                <svg width="38" height="30" viewBox="0 0 38 30" aria-hidden="true" className="flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: 'var(--accent-deep)' }}>
                  <path d="M0 2l38 13L0 28z" fill="currentColor" />
                </svg>
              </span>
              <span
                className="whitespace-pre-line rounded-md border-2 px-5 py-3 text-[21.5px] sm:text-[26px] font-bold leading-[1.4] text-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_35px_-12px_rgba(10,186,181,0.45)]"
                style={{ borderColor: 'var(--accent-deep)', color: 'var(--accent-deep)', background: '#ffffff' }}
              >
                {t.hero.gateButton}
              </span>
            </a>

            {/* Platform block: a selling headline, then one row per platform
                pairing its claim with the card it links to. The 08.18 sheet sets
                the headline and the claims in navy and restores the small label
                over the card column. */}
            <div className="mt-8 max-w-2xl">
              <h2 className="whitespace-pre-line text-[43px] sm:text-[60.5px] font-bold leading-[1.2] tracking-[-0.01em] mb-5" style={{ color: 'var(--jwd-navy)' }}>
                {t.hero.platformsHeading}
              </h2>
              <div className="grid sm:grid-cols-[1fr_auto] gap-3 sm:gap-4">
                <span aria-hidden="true" className="hidden sm:block" />
                <div className="text-[15.5px] font-bold tracking-[0.22em] text-slate-400 mb-2 sm:w-[208px]">{t.hero.platformsLabel}</div>
              </div>
              <div className="flex flex-col gap-4">
                {t.products.platforms.map((p, i) => (
                  <div key={p.name} className="grid sm:grid-cols-[1fr_auto] gap-3 sm:gap-4 items-center">
                    {/* The sheet closes each claim with the partner's own
                        wordmark. These are the supplied logo files, trimmed of
                        their white margins so they sit on the text baseline, and
                        each links to the same destination as the card beside it
                        — a reader who taps the logo means the same thing. */}
                    <p className="text-[27px] leading-[1.45] font-bold" style={{ color: 'var(--jwd-navy)' }}>
                      {t.hero.platformNotes[i].lead && (
                        <span className="text-[34.5px] mr-2">{t.hero.platformNotes[i].lead}</span>
                      )}
                      {withEmphasis(t.hero.platformNotes[i].text)}
                      <a
                        href={jaOutbound(p.url, lang === 'ja')}
                        title={lang === 'ja' ? JA_PROXY_NOTICE : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={p.name}
                        className="inline-block align-baseline transition-opacity hover:opacity-70"
                      >
                        <img
                          src={t.hero.platformNotes[i].brand === 'equiti' ? '/brand/equiti.png' : '/brand/aix.png'}
                          alt={t.hero.platformNotes[i].brand}
                          className={`ml-1.5 inline-block w-auto ${
                            t.hero.platformNotes[i].brand === 'equiti' ? 'h-[51px]' : 'h-[32px]'
                          }`}
                          style={{ verticalAlign: '-0.18em' }}
                        />
                      </a>
                    </p>
                    <a
                      href={jaOutbound(p.url, lang === 'ja')}
                      title={lang === 'ja' ? JA_PROXY_NOTICE : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-lg px-5 py-4 border-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-12px_rgba(10,186,181,0.45)] sm:w-[208px]"
                      style={{ borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
                    >
                      <span className="min-w-0">
                        <span className="block text-[13.5px] font-bold tracking-[0.18em] mb-1 opacity-70" style={{ color: 'var(--accent-deep)' }}>{p.tag}</span>
                        <span className="block font-serif text-[26px] font-semibold tracking-tight leading-none" style={{ color: 'var(--accent-deep)' }}>{p.name}</span>
                      </span>
                      <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ background: 'var(--accent-deep)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M7 17L17 7M9 7h8v8" /></svg>
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9">
              <VideoTiles />
            </div>
          </div>

          {/* Visual column: one photograph plus the exchange-rate chip beneath
              it, as page ① draws it. The column is auto-height so the chip always
              sits under the photo rather than outside a fixed-height box. */}
          <div data-anim="hero-visual" className="relative lg:mt-2 flex flex-col">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[720px] rounded-sm overflow-hidden">
              <MainImage />
            </div>

            {/* The sheet replaces the old two-card cluster with a single
                exchange-rate chip tucked under the photo's bottom-left corner. */}
            <div data-anim="hero-cards" className="mt-4 flex">
              <div className="inline-flex items-center gap-3 rounded-lg bg-white pr-5 shadow-[0_16px_40px_-18px_rgba(var(--shadow-rgb),0.25)]">
                <span className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-soft)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: 'var(--accent-deep)' }}>
                    <path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 6-6" />
                  </svg>
                </span>
                <span
                  className="text-[32.5px] sm:text-[40px] font-bold tracking-tight text-slate-900"
                  title={fx.live && fx.updated ? `${t.hero.ytd} · ${fx.updated}` : t.hero.ytd}
                >
                  AED 1 = ¥{fx.jpy.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div data-anim="hero-stats" className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-2 gap-x-6 gap-y-9 lg:flex lg:justify-between lg:gap-x-6">
          {t.hero.stats.map(([a, b]) => {
            // '120億＋' → figure '120', unit '億＋'. The sheet steps the unit
            // down to roughly 40% of the figure rather than setting the whole
            // value at one size.
            const [, figure, unit] = /^([\d０-９〜~–.,]*)(.*)$/.exec(a)!;
            return (
              <div key={b}>
                {/* data-count sits on the figure alone: the count-up in
                    Interactions.tsx writes textContent, which would wipe out
                    any child spans on the element it animates. */}
                <div className="font-serif font-medium tracking-tight leading-none whitespace-nowrap" style={{ color: 'var(--accent-deep)' }}>
                  <span data-count={figure} className="text-[62.5px] sm:text-[80px]">{figure}</span>
                  <span className="text-[26px] sm:text-[33.5px]">{unit}</span>
                </div>
                <div className="text-[19.5px] text-slate-500 leading-tight mt-3 lg:whitespace-nowrap">{b}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
