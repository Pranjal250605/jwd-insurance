import { useT } from '@/i18n';

/* The cards used to fan out in a rotated cascade. The site reads as a formal
   financial document, so they now sit flush in a plain vertical column and
   only the accent colour varies between them. */
const RESEARCH_ACCENTS = ['navy', 'gold', 'slate'];

const accentBg = (a: string) => {
  if (a === 'gold')  return 'linear-gradient(135deg, var(--secondary), var(--accent-deep))';
  if (a === 'slate') return 'linear-gradient(135deg, #475569, #1E293B)';
  return 'var(--gradient-dark)';
};

const accentMark = (a: string) => {
  if (a === 'gold')  return '◆';
  if (a === 'slate') return '✦';
  return '◇';
};

/* Same destinations as the matching pillars in Promo. */
const FEATURE_LINKS = ['#chairman', '#contact', 'https://new-jwd-office.vercel.app/'];

const FEATURE_IMAGES = [
  'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&q=80&auto=format&fit=crop',
];

export default function Explore() {
  const { t } = useT();

  return (
    <section id="insights" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div data-spotlight className="spotlight rounded-[20px] bg-white border border-slate-100 p-6 sm:p-10 lg:p-16 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="eyebrow-rule text-[11.5px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.explore.insightsEyebrow}</div>
            <div className="font-jp text-[16.5px] tracking-[0.18em] text-slate-500 mb-6">{t.explore.insightsSub}</div>
            <h2 className="font-serif fluid-40-48 leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-6">
              {t.explore.insightsTitle}
            </h2>
            <p className="text-[20.5px] leading-[1.65] text-slate-600 mb-3 max-w-md">
              {t.explore.insightsBody}
            </p>
            <p className="font-jp text-[19px] leading-[1.85] text-slate-600 mb-9 max-w-md tracking-wide">
              {t.explore.insightsBody2}
            </p>
            <a href="#insights" className="link-underline text-[16.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
              {t.explore.insightsCta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>

          {/* min-w-0: without it, this grid item's default min-width:auto
              sizes to the intrinsic (unwrapped) width of the truncated card
              titles below, forcing the item — and the whole card — wider
              than its track and overflowing the viewport on mobile. */}
          <div data-anim="research-cards" className="flex flex-col gap-4 min-w-0">
            {t.explore.research.map((c, i) => (
              <div
                key={i}
                data-spotlight
                className="spotlight w-full bg-white rounded-xl shadow-[0_14px_40px_-12px_rgba(var(--shadow-rgb),0.18)] border border-slate-100 p-4 sm:p-5 flex items-center gap-4 hover:shadow-[0_22px_55px_-14px_rgba(var(--shadow-rgb),0.28)] transition-shadow"
              >
                <div className="w-14 h-[70px] sm:w-16 sm:h-20 rounded-md flex-shrink-0 flex items-center justify-center text-white font-serif font-medium text-[21.5px] sm:text-[26px]"
                  style={{ background: accentBg(RESEARCH_ACCENTS[i]) }}>
                  {accentMark(RESEARCH_ACCENTS[i])}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 mb-1">{c.tag}</div>
                  <div className="font-serif text-[18.5px] sm:text-[20.5px] font-semibold text-slate-900 leading-tight mb-1 truncate">{c.title}</div>
                  <div className="text-[11.5px] text-slate-500 truncate">{c.meta} · <span className="font-jp">{c.sub}</span></div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300 flex-shrink-0">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="eyebrow-rule text-[11.5px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>{t.explore.apartEyebrow}</div>
        <div className="font-jp text-[16.5px] tracking-[0.18em] text-slate-500 mb-6">{t.explore.apartSub}</div>
        <h2 className="whitespace-pre-line font-serif fluid-40-52 leading-[1.15] font-medium text-slate-900 tracking-[-0.015em] mb-10 sm:mb-14 max-w-3xl">
          {t.explore.apartTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {t.explore.features.map((c, i) => (
            <div key={i} data-spotlight className="spotlight group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.16)] hover:-translate-y-0.5 transition-all">
              <div className="img-zoom relative h-[200px] sm:h-[220px] overflow-hidden">
                <img src={FEATURE_IMAGES[i]} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(var(--photo-tint-rgb),0.35) 100%)' }} />
              </div>
              <div className="p-6 sm:p-8">
                <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-400 mb-1">{c.tag}</div>
                <div className="font-jp text-[13px] tracking-[0.16em] text-slate-500 mb-3">{c.sub}</div>
                <h3 className="font-serif text-[24px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{c.title}</h3>
                <p className="text-[19px] leading-[1.6] text-slate-600 mb-7">{c.body}</p>
                <a href={FEATURE_LINKS[i]} className="link-underline text-[16.5px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                  {c.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
