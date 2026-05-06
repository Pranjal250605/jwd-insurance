'use client';

import { useRef, useState } from 'react';
import type { TweakValues, SetTweak } from '@/types/tweaks';

interface Props {
  tweaks: TweakValues;
  setTweak: SetTweak;
}

const ALT_SURFACE_OPTIONS: TweakValues['altSurfaceTone'][] = ['neutral', 'warm', 'cool', 'mint'];

export default function TweaksPanel({ tweaks, setTweak }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-xl transition-all"
        title="Tweaks"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-16 right-4 z-50 w-72 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-slate-700 tracking-wide">TWEAKS</span>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700 text-[16px] leading-none">✕</button>
          </div>
          <div className="p-4 flex flex-col gap-5">
            {/* Brand accent */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Brand accent</div>
              <label className="flex items-center justify-between text-[12px] text-slate-600 mb-1">
                <span>Hue</span>
                <span className="text-slate-400 font-mono">{tweaks.accentHue}</span>
              </label>
              <input
                type="range" min={0} max={360} step={1}
                value={tweaks.accentHue}
                onChange={(e) => setTweak('accentHue', Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-teal-400"
              />
              <label className="flex items-center justify-between text-[12px] text-slate-600 mb-1 mt-3">
                <span>Saturation</span>
                <span className="text-slate-400 font-mono">{tweaks.accentChroma.toFixed(2)}</span>
              </label>
              <input
                type="range" min={0} max={0.2} step={0.01}
                value={tweaks.accentChroma}
                onChange={(e) => setTweak('accentChroma', Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-teal-400"
              />
            </div>

            {/* Alt surface */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Alt surface</div>
              <div className="flex gap-1.5">
                {ALT_SURFACE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setTweak('altSurfaceTone', opt)}
                    className={`flex-1 py-1 rounded-lg text-[11px] font-medium transition-all ${
                      tweaks.altSurfaceTone === opt
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero copy */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Hero copy</div>
              <label className="text-[12px] text-slate-600 block mb-1">Eyebrow</label>
              <input
                type="text"
                value={tweaks.heroEyebrow}
                onChange={(e) => setTweak('heroEyebrow', e.target.value)}
                className="w-full text-[12px] px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-slate-700 mb-3"
              />
              <label className="text-[12px] text-slate-600 block mb-1">Headline</label>
              <input
                type="text"
                value={tweaks.heroHeadline}
                onChange={(e) => setTweak('heroHeadline', e.target.value)}
                className="w-full text-[12px] px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-slate-700"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
