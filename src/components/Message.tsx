import { useT } from '@/i18n';
import { asset } from '@/lib/paths';

export default function Message() {
  const { t } = useT();
  const m = t.message;

  return (
    <section id="message" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div
          data-spotlight
          className="spotlight rounded-[20px] p-6 sm:p-10 lg:p-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center relative overflow-hidden"
          style={{ background: 'var(--gradient-soft)' }}
        >
          <div className="relative">
            <div className="eyebrow-rule text-[11.5px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>
              {m.eyebrow}
            </div>
            <div className="font-jp text-[16.5px] tracking-[0.18em] text-slate-500 mb-6">{m.sub}</div>
            <h2
              className="whitespace-pre-line font-serif fluid-40-52 leading-[1.22] font-medium text-slate-900 tracking-[-0.015em] mb-7"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              {m.title}
            </h2>
            <div className="space-y-4 mb-7">
              {m.paragraphs.map((p, i) => (
                <p key={i} className="text-[18.5px] leading-[1.8] text-slate-600">
                  {p}
                </p>
              ))}
            </div>
            {m.invite && <p className="text-[18.5px] leading-[1.8] font-medium text-slate-800">{m.invite}</p>}
          </div>

          <div className="relative">
            <div className="img-zoom relative rounded-xl overflow-hidden aspect-[4/5] max-w-[320px] mx-auto lg:max-w-none">
              <img
                src={asset("/hamit-gurbuz.jpg")}
                alt={`${m.signName}, ${m.signRole}, ${m.company}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(var(--photo-tint-rgb),0.62) 100%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="text-white/70 text-[11.5px] tracking-[0.12em] mb-1.5">{m.company}</div>
                <div className="text-white font-serif text-[20.5px] font-semibold leading-tight">{m.signName}</div>
                <div className="text-white/80 text-[13.5px] mt-0.5">{m.signRole}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
