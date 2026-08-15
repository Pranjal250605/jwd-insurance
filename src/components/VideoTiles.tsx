import { useState } from 'react';
import { useT } from '@/i18n';

/* Two tiles below the hero stats. Each shows a poster frame until it is
   clicked, then swaps in the real <video> and plays — so a visitor never
   downloads several MB of video just for arriving on the page. */

const SOURCES: Record<string, { src: string; poster: string }> = {
  forex: { src: '/media/forex-expo-2025.mp4', poster: '/media/forex-expo-2025.jpg' },
  inheritance: { src: '/media/inheritance.mp4', poster: '/media/inheritance.jpg' },
};

export default function VideoTiles() {
  const { t } = useT();
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="grid sm:grid-cols-2 gap-5 max-w-xl">
      {t.hero.videos.map((v) => {
        const media = SOURCES[v.id];
        const isPlaying = playing === v.id;
        return (
          <figure key={v.id} className="m-0">
            <div className="img-zoom relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-900">
              {isPlaying ? (
                <video
                  src={media.src}
                  poster={media.poster}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(v.id)}
                  aria-label={`${v.title} ${v.note}`}
                  className="group absolute inset-0 w-full h-full"
                >
                  <img
                    src={media.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-slate-900/20 transition-colors group-hover:bg-slate-900/10" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/95 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.5)] flex items-center justify-center transition-transform group-hover:scale-105">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent-deep)' }}>
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-3 text-[14px] font-semibold text-slate-800 leading-snug">
              {v.title}
              <span className="font-normal text-slate-500 whitespace-nowrap">{v.note}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
