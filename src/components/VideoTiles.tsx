import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '@/i18n';

/* Every tile shows a poster frame until it is clicked, then opens the real
   <video> in a lightbox over a blurred page — so arriving on the page costs no
   video bytes, which matters here because the page carries eight clips. */

function src(id: string) {
  return { video: `/media/${id}.mp4`, poster: `/media/${id}.jpg` };
}

/** Full-screen player. Rendered into <body> so no ancestor's overflow,
    transform or stacking context can clip or trap it. */
function Lightbox({ id, label, onClose }: { id: string; label: string; onClose: () => void }) {
  const media = src(id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-slate-950/80 backdrop-blur-xl animate-[fadeIn_180ms_ease-out]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/12 hover:bg-white/22 text-white flex items-center justify-center transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* The click guard keeps a tap on the player itself from closing it. */}
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[1100px]">
        <video
          src={media.video}
          poster={media.poster}
          controls
          autoPlay
          playsInline
          className="w-full max-h-[82vh] rounded-xl bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]"
        />
        <div className="mt-4 text-center text-[14px] text-white/80">{label}</div>
      </div>
    </div>,
    document.body,
  );
}

function Tile({
  id,
  label,
  aspect,
  /* The six Equiti clips are a mix of landscape and portrait, so they are
     letterboxed rather than cropped — cover would cut heads off the vertical
     ones. The two featured clips are both landscape and can fill their tile. */
  fit = 'cover',
}: {
  id: string;
  label: string;
  aspect: string;
  fit?: 'cover' | 'contain';
}) {
  const [open, setOpen] = useState(false);
  const media = src(id);
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain';

  return (
    <div className={`img-zoom relative rounded-xl overflow-hidden ${aspect} bg-slate-900`}>
      <button type="button" onClick={() => setOpen(true)} aria-label={label} className="group absolute inset-0 w-full h-full">
        <img src={media.poster} alt="" loading="lazy" decoding="async" className={`absolute inset-0 w-full h-full ${fitClass}`} />
        <span className="absolute inset-0 bg-slate-900/20 transition-colors group-hover:bg-slate-900/10" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-14 h-14 rounded-full bg-white/95 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.5)] flex items-center justify-center transition-transform group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent-deep)' }}>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </span>
      </button>
      {open && <Lightbox id={id} label={label} onClose={() => setOpen(false)} />}
    </div>
  );
}

/** The two tiles the revision sheet places under the hero stats. */
export default function VideoTiles() {
  const { t } = useT();

  return (
    <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
      {t.hero.videos.map((v) => (
        <figure key={v.id} className="m-0">
          <Tile id={v.id} label={`${v.title} ${v.note}`} aspect="aspect-[16/10]" />
          <figcaption className="mt-3 text-[14px] font-semibold text-slate-800 leading-snug">
            {v.title}
            <span className="font-normal text-slate-500 whitespace-nowrap">{v.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** The remaining Equiti clips, grouped in their own band below the hero. */
export function VideoGallery() {
  const { t } = useT();

  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-4 pb-12 sm:pb-16">
        <div className="text-[11px] font-bold tracking-[0.22em] text-slate-400 mb-5">{t.hero.moreVideosLabel}</div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {t.hero.moreVideos.map((v) => (
            <figure key={v.id} className="m-0">
              <Tile id={v.id} label={v.title} aspect="aspect-[16/10]" fit="contain" />
              <figcaption className="mt-2.5 text-[13.5px] font-medium text-slate-700 leading-snug">{v.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
