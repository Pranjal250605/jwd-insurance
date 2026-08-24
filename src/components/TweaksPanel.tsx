import { useState } from 'react';
import { createPortal } from 'react-dom';
import type { TweakValues, SetTweak, Variant } from '@/types/tweaks';

interface Props {
  tweaks: TweakValues;
  setTweak: SetTweak;
}

const ALT_SURFACE_OPTIONS: TweakValues['altSurfaceTone'][] = ['neutral', 'warm', 'cool', 'mint'];

const VARIANTS: { id: Variant; label: string; jp: string; chips: [string, string, string] }[] = [
  {
    id: 'heritage',
    label: 'Heritage',
    jp: 'ヘリテージ',
    chips: ['#0B1830', '#1A2C4F', '#B89968'],
  },
  {
    id: 'equiti',
    label: 'Equiti',
    jp: 'エクイティ',
    chips: ['#06121E', '#00B8D4', '#3DDCE0'],
  },
];

export default function TweaksPanel({ tweaks, setTweak }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-4 z-50 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-xl transition-all"
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
        title="Tweaks"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && createPortal(
        <div
          className="fixed z-[60] w-[calc(100vw-2rem)] max-w-80 max-h-[70vh] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ right: '1rem', bottom: 'calc(4.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
            <span className="text-[14.5px] font-semibold text-slate-700 tracking-wide">TWEAKS</span>
            <button onClick={() => setOpen(false)} className="flex items-center justify-center w-8 h-8 -mr-1 text-slate-400 hover:text-slate-700 text-[19px] leading-none">✕</button>
          </div>
          <div className="p-4 flex flex-col gap-5 overflow-y-auto">
            <div>
              <div className="text-[12px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Brand variant</div>
              <div className="grid grid-cols-2 gap-2">
                {VARIANTS.map((v) => {
                  const active = tweaks.variant === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setTweak('variant', v.id)}
                      className={`group text-left rounded-xl border p-3 transition-all ${
                        active
                          ? 'border-slate-900 shadow-[0_4px_14px_-6px_rgba(15,23,42,0.25)]'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-1 mb-2">
                        {v.chips.map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-slate-200/70"
                            style={{ background: c }}
                          />
                        ))}
                      </div>
                      <div className="text-[14.5px] font-semibold text-slate-900 leading-tight">{v.label}</div>
                      <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mt-0.5">{v.jp}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {tweaks.variant === 'heritage' && (
              <>
                <div>
                  <div className="text-[12px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Brand accent</div>
                  <label className="flex items-center justify-between text-[14.5px] text-slate-600 mb-1">
                    <span>Hue</span>
                    <span className="text-slate-400 font-mono">{tweaks.accentHue}</span>
                  </label>
                  <input
                    type="range" min={0} max={360} step={1}
                    value={tweaks.accentHue}
                    onChange={(e) => setTweak('accentHue', Number(e.target.value))}
                    className="range-touch w-full"
                    style={{ ['--range-thumb-color' as string]: '#2dd4bf' }}
                  />
                  <label className="flex items-center justify-between text-[14.5px] text-slate-600 mb-1 mt-3">
                    <span>Saturation</span>
                    <span className="text-slate-400 font-mono">{tweaks.accentChroma.toFixed(2)}</span>
                  </label>
                  <input
                    type="range" min={0} max={0.2} step={0.01}
                    value={tweaks.accentChroma}
                    onChange={(e) => setTweak('accentChroma', Number(e.target.value))}
                    className="range-touch w-full"
                    style={{ ['--range-thumb-color' as string]: '#2dd4bf' }}
                  />
                </div>

                <div>
                  <div className="text-[12px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Alt surface</div>
                  <div className="flex gap-1.5">
                    {ALT_SURFACE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setTweak('altSurfaceTone', opt)}
                        className={`flex-1 py-1 rounded-lg text-[13px] font-medium transition-all ${
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
              </>
            )}

            {tweaks.variant === 'equiti' && (
              <div className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2.5">
                <div className="text-[12px] font-bold tracking-[0.16em] text-slate-500 uppercase mb-1">Equiti palette</div>
                <p className="text-[14px] leading-[1.5] text-slate-600">
                  Brand-matched cyan + midnight navy, modelled on{' '}
                  <span className="font-medium text-slate-800">equiti.com</span>. Sliders are disabled — switch back to Heritage to fine-tune.
                </p>
              </div>
            )}

            <div>
              <div className="text-[12px] font-bold tracking-[0.1em] text-slate-400 uppercase mb-3">Hero copy</div>
              <label className="text-[14.5px] text-slate-600 block mb-1">Eyebrow</label>
              <input
                type="text"
                value={tweaks.heroEyebrow}
                onChange={(e) => setTweak('heroEyebrow', e.target.value)}
                className="w-full text-[19px] sm:text-[14.5px] px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-slate-700 mb-3"
              />
              <label className="text-[14.5px] text-slate-600 block mb-1">Headline</label>
              <input
                type="text"
                value={tweaks.heroHeadline}
                onChange={(e) => setTweak('heroHeadline', e.target.value)}
                className="w-full text-[19px] sm:text-[14.5px] px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 bg-white text-slate-700"
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
