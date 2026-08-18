import { useT } from '@/i18n';
import { VideoGallery } from '@/components/VideoTiles';
import PhotoStrip from '@/components/PhotoStrip';

/* 08.18 revision, page ②: the page the consent screen's "合意しました" button
   leads to — "How to invest on equiti". The sheet names the destination but
   does not draw it, so the page is built from material already approved
   elsewhere on the site: the four-step account flow, the two partner platform
   links, and the Equiti activity videos and field photography of page ③.
   Copy for the steps is provisional pending the client's own wording. */

export default function HowToInvest() {
  const { t } = useT();

  return (
    <main className="bg-white">
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-10">
        <div className="eyebrow-rule text-[12px] font-semibold tracking-[0.22em] mb-6" style={{ color: 'var(--accent-deep)' }}>
          {t.howTo.eyebrow}
        </div>
        <h1 className="font-serif text-[34px] sm:text-[44px] font-medium tracking-[-0.015em] text-slate-900 leading-[1.2] mb-2">
          {t.howTo.title}
        </h1>
        <p className="text-[13px] font-semibold tracking-[0.14em] text-slate-400 mb-6">{t.howTo.sub}</p>
        <p className="text-[17px] leading-[1.8] text-slate-600 max-w-2xl">{t.howTo.intro}</p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {t.howTo.steps.map((s, i) => (
            <li key={s.title} className="border border-slate-200 rounded-2xl p-6">
              <div className="text-[10px] font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--accent-deep)' }}>
                {t.howTo.stepLabel} {String(i + 1).padStart(2, '0')}
              </div>
              <h2 className="font-serif text-[20px] font-semibold text-slate-900 mb-2.5 leading-snug">{s.title}</h2>
              <p className="text-[14px] leading-[1.75] text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 text-[21px] sm:text-[23px] font-bold mb-6" style={{ color: 'var(--accent-deep)' }}>
          {t.howTo.platformsTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
          {t.products.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-lg px-5 py-4 border-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_35px_-12px_rgba(10,186,181,0.45)]"
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
          ))}
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-slate-500 max-w-2xl">{t.howTo.note}</p>
      </section>

      <VideoGallery />
      <PhotoStrip />
    </main>
  );
}
