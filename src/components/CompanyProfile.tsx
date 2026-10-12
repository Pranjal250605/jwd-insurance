import { useT, STRINGS } from '@/i18n';
import { asset } from '@/lib/paths';

/* 09.30 sheet: the 会社概要 card, directly under the representative's
   message. Pale aqua panel, group mark beside the company name, and a
   two-column label/value list set in Times, as in the sheet's mock. The
   theme's `font-serif` is Sora under Equiti, so the card names its own stack;
   Noto Serif JP (already loaded) carries the kanji. */
const CARD_FONT = "'Times New Roman', Times, 'Noto Serif JP', 'Yu Mincho', 'Hiragino Mincho ProN', serif";
// 10.12: the card itself is always in English — the company's registered
// particulars read as they do on its documents — on the Japanese page too.
// Only the section heading above it follows the language toggle.
const CARD = STRINGS.en.companyProfile;

export default function CompanyProfile() {
  const { t } = useT();
  const c = t.companyProfile;

  return (
    <section id="company-profile" className="bg-white scroll-mt-[130px]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="eyebrow-rule text-[11.5px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>
          {c.eyebrow}
        </div>
        <div className="font-jp text-[16.5px] tracking-[0.18em] text-slate-500 mb-8">{c.sub}</div>

        <div className="rounded-[28px] sm:rounded-[44px] px-6 py-10 sm:px-12 sm:py-14 lg:px-20 lg:py-16" style={{ background: '#E6F8FB', fontFamily: CARD_FONT }} lang="en" translate="no">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-12">
            <img src={asset('/jwd-icon.png')} alt="" className="h-12 sm:h-16 w-auto flex-shrink-0" />
            <h2 className="text-[24px] sm:text-[34px] lg:text-[38px] font-medium text-slate-900 tracking-[0.01em] leading-tight">
              {CARD.company}
            </h2>
          </div>

          <dl className="max-w-[860px] mx-auto grid sm:grid-cols-[230px_1fr] gap-x-10 gap-y-1 sm:gap-y-6">
            {CARD.rows.map((r) => (
              <div key={r.label} className="contents">
                <dt className="font-bold text-[18px] sm:text-[20px] text-slate-900 mt-4 sm:mt-0">{r.label}:</dt>
                <dd className="text-[17px] sm:text-[20px] leading-[1.6] text-slate-800 whitespace-pre-line [overflow-wrap:anywhere]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
