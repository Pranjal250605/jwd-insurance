import { useCallback, useEffect, useRef, useState } from 'react';
import { useT } from '@/i18n';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';

/* 08.18 revision, page ②. The hero's "grow your assets with a top UAE firm"
   button lands here rather than going straight to the Equiti material: the
   client wants the reader to have passed the notice, on their own initiative,
   before any explanatory video is shown.

   Two gates, exactly as the sheet draws them:
     · the agree button stays grey until the notice has been scrolled to its
       end — then it turns orange ("High Lighted" in the sheet);
     · the notice's own copy asks the reader to tick a box before continuing,
       so the click is only accepted once that box is ticked.

   Where it goes afterwards: the client asked (2026.08.19, via Tomo) for the
   agree button to open the Equiti landing page for now — "we will make the
   appropriate page later" — rather than the in-house #/how-to-invest page.
   TEMPORARY: when that page is written, point NEXT_TARGET back at it.

   Equiti publishes no Japanese site (ar/cn/en/es/ko/pt/th/vi only), so
   Japanese readers go through the same Google Translate proxy as every other
   investor-site link here — see src/lib/translate.ts for why we do not
   rehost or retranslate a regulated broker's pages ourselves. */

const NEXT_TARGET = 'https://www.equiti.com/sc-en/';

export default function ConsentGate() {
  const { t, lang } = useT();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // A few px of slack: sub-pixel layout means scrollTop rarely lands exactly
  // on the maximum, and a notice that can never be "finished" is a dead end.
  const check = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight <= 24) setReachedEnd(true);
  }, []);

  // Also runs on mount, so a viewport tall enough to show the whole notice
  // without scrolling doesn't leave the button permanently disabled.
  useEffect(() => {
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [check]);

  const proceed = () => {
    if (!reachedEnd) {
      scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: 'smooth' });
      return;
    }
    if (!checked) {
      setShowHint(true);
      return;
    }
    /* A new tab, matching every other investor-site link on this site: the
       reader keeps the notice they just accepted, and leaving JWD is never
       something the agree button does silently underneath them. */
    window.open(jaOutbound(NEXT_TARGET, lang === 'ja'), '_blank', 'noopener,noreferrer');
  };

  const armed = reachedEnd && checked;

  return (
    <main className="bg-white">
      <div className="max-w-[980px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-28 sm:pb-16">
        <button
          type="button"
          onClick={() => { window.location.hash = ''; }}
          className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium text-slate-500 hover:text-slate-800"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {t.consent.back}
        </button>

        {/* The mint panel from the sheet: the notice scrolls inside it, so
            "reached the end" is a fact about the notice, not the window. */}
        <div className="rounded-3xl p-4 sm:p-8" style={{ background: 'var(--accent-soft)' }}>
          <div
            ref={scrollerRef}
            onScroll={check}
            tabIndex={0}
            className="consent-scroller bg-white rounded-2xl px-5 sm:px-10 py-8 sm:py-12 overflow-y-auto max-h-[62vh] min-h-[360px] shadow-[0_10px_40px_-24px_rgba(15,23,42,0.35)]"
          >
            <h1 className="text-[15px] sm:text-[17px] font-bold text-center leading-relaxed text-slate-900 mb-8">
              {t.consent.title}
            </h1>

            <h2 className="text-[14px] sm:text-[15px] font-bold text-center text-slate-900 mb-6">{t.consent.lead}</h2>

            <div className="space-y-3">
              {t.consent.intro.map((p, i) => (
                <p key={i} className="text-[13.5px] sm:text-[14px] leading-[1.9] text-slate-700">{p}</p>
              ))}
            </div>

            {t.consent.sections.map((sec) => (
              <section key={sec.heading} className="mt-9">
                <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-slate-900 mb-4">{sec.heading}</h3>
                <div className="space-y-3">
                  {sec.body.map((p, i) => (
                    <p key={i} className="text-[13.5px] sm:text-[14px] leading-[1.9] text-slate-700">{p}</p>
                  ))}
                </div>
                {sec.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5 list-none p-0">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[13.5px] sm:text-[14px] leading-[1.9] text-slate-700">
                        <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-deep)' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* The quoted declaration the draft places immediately above the
                tick box — set apart so it reads as the statement being agreed
                to rather than as more body copy. */}
            <blockquote className="mt-8 border-l-2 pl-4 sm:pl-5 text-[13.5px] sm:text-[14px] leading-[1.9] text-slate-800" style={{ borderColor: 'var(--accent-deep)' }}>
              {t.consent.quote}
            </blockquote>

            {/* This is the action the whole notice exists for, and an older
                reader can scroll straight past a line of plain body text. It
                is set larger than the notice around it and given a tinted,
                ruled panel so it reads as the thing to do, not more copy. */}
            <label
              className="mt-10 flex items-start justify-center gap-4 cursor-pointer rounded-xl border-2 px-5 py-5 sm:px-7 sm:py-6 transition-colors"
              style={{ borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => { setChecked(e.target.checked); setShowHint(false); }}
                className="mt-[5px] h-[26px] w-[26px] flex-shrink-0 accent-[var(--accent-deep)]"
              />
              <span className="text-[17px] sm:text-[19.5px] font-bold leading-[1.7] text-slate-900">{t.consent.agreeLabel}</span>
            </label>

            <div className="mt-8 space-y-2">
              {t.consent.notes.map((n, i) => (
                <p key={i} className="text-[12.5px] leading-[1.85] text-slate-500">{n}</p>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] sm:text-[14px] leading-[1.9] font-semibold text-slate-800">{t.consent.closing}</p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={proceed}
              aria-disabled={!armed}
              title={lang === 'ja' ? JA_PROXY_NOTICE : undefined}
              className={`h-[52px] px-14 rounded-full text-[15px] font-semibold transition-colors duration-300 ${
                armed
                  ? 'bg-[#F5A25D] text-slate-900 hover:bg-[#EE9440] shadow-[0_10px_28px_-12px_rgba(238,148,64,0.9)]'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {t.consent.button}
            </button>
            {/* Japanese readers are told, before they click, that the button
                leaves JWD for an auto-translated external page. */}
            {armed && lang === 'ja' && (
              <p className="max-w-[46ch] text-center text-[12px] leading-[1.8] text-slate-500">{JA_PROXY_NOTICE}</p>
            )}
            {!reachedEnd && <p className="text-[12.5px] text-slate-400">{t.consent.scrollHint}</p>}
            {showHint && <p className="text-[12.5px] text-rose-500">{t.consent.hint}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
