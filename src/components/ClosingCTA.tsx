const REGULATORS = [
  { code: 'FCA',   name: 'Financial Conduct Authority',  region: 'United Kingdom' },
  { code: 'SEC',   name: 'Securities & Exchange Comm.',  region: 'United States' },
  { code: 'FSA',   name: 'Financial Services Agency',    region: 'Japan · 金融庁' },
  { code: 'FINMA', name: 'Swiss Financial Markets',      region: 'Switzerland' },
  { code: 'MAS',   name: 'Monetary Authority',           region: 'Singapore' },
];

const RECOGNITION = [
  { award: 'Wealth Manager of the Year',     pub: 'Asia Private Banker',     yr: '2025' },
  { award: 'Best Discretionary Portfolio',   pub: 'Euromoney',                yr: '2024' },
  { award: 'Outstanding ESG Integration',    pub: 'PRI Awards',               yr: '2024' },
];

export default function ClosingCTA() {
  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div
          className="rounded-[20px] py-24 px-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FAFAF7 0%, #F4F6F9 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div
              className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(184,153,104,0.12), transparent 70%)' }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(11,24,48,0.08), transparent 70%)' }}
            />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>BEGIN YOUR PARTNERSHIP</div>
            <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-7">パートナーシップの始まり</div>
            <h2
              className="font-serif text-[44px] lg:text-[60px] leading-[1.05] font-medium text-slate-900 tracking-[-0.015em] mb-6"
              style={{ textWrap: 'balance' } as React.CSSProperties}
            >
              Plan your wealth journey with JWD
            </h2>
            <p className="font-jp text-[16px] leading-[1.85] text-slate-700 mb-4 tracking-wide">
              お客様の100年先の未来を、確かな運用でお支えします。
            </p>
            <p className="text-[16px] leading-[1.7] text-slate-600 mb-10 max-w-xl mx-auto">
              Speak with a senior advisor about your goals, your portfolio and how JWD&apos;s disciplined approach can serve your family or institution for decades to come.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                className="px-8 py-4 rounded-sm text-[12px] font-bold tracking-[0.14em] text-white transition-all hover:brightness-110"
                style={{ background: 'var(--accent)' }}
              >
                SCHEDULE CONSULTATION
              </button>
              <button className="px-8 py-4 rounded-sm text-[12px] font-bold tracking-[0.14em] text-slate-900 transition-all hover:bg-slate-50 border border-slate-300">
                REQUEST CAPABILITIES BROCHURE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-12">
        <div className="text-[11px] font-semibold tracking-[0.28em] mb-2 text-slate-400 text-center">REGULATED & LICENSED ACROSS GLOBAL JURISDICTIONS</div>
        <div className="font-jp text-[12px] tracking-[0.16em] text-slate-400 mb-10 text-center">世界各国の規制当局による認可</div>
        <div className="flex items-center justify-center flex-wrap gap-3 lg:gap-4">
          {REGULATORS.map((r) => (
            <div key={r.code} className="px-6 py-4 bg-white rounded-md border border-slate-200 flex items-center gap-4 hover:border-slate-300 transition-all">
              <div className="font-serif text-[22px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>{r.code}</div>
              <div className="border-l border-slate-200 pl-4">
                <div className="text-[12px] font-medium text-slate-700 leading-tight">{r.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{r.region}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div className="border-t border-slate-100 pt-12 grid md:grid-cols-3 gap-8">
          {RECOGNITION.map((r) => (
            <div key={r.award} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,153,104,0.12)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B89968" strokeWidth="1.6">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-[16px] font-semibold text-slate-900 leading-tight">{r.award}</div>
                <div className="text-[12px] text-slate-500 mt-1">{r.pub} · {r.yr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
