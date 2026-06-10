const SOLUTIONS = [
  {
    label: 'Global Equities',
    jp: 'グローバル株式',
    sub: 'CORE STRATEGY',
    body: 'High-conviction portfolios of best-in-class companies across developed and emerging markets.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80&auto=format&fit=crop',
    aum: '$18.4B',
  },
  {
    label: 'Fixed Income',
    jp: '債券運用',
    sub: 'CAPITAL PRESERVATION',
    body: 'Investment-grade and sovereign portfolios designed for stable income and disciplined risk control.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop',
    aum: '$11.2B',
  },
  {
    label: 'Private Markets',
    jp: 'プライベート市場',
    sub: 'ALTERNATIVES',
    body: 'Curated access to private equity, venture, real assets and credit partnerships, typically reserved for institutions.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop',
    aum: '$9.6B',
  },
  {
    label: 'Sustainable',
    jp: 'ESG・サステナブル',
    sub: 'ESG INTEGRATED',
    body: 'Impact-aligned strategies integrating environmental, social and governance factors with rigorous financial analysis.',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80&auto=format&fit=crop',
    aum: '$5.8B',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Discovery',
    jp: 'ヒアリング',
    body: 'A confidential conversation about your goals, family circumstances, time horizon and existing balance sheet.',
    cta: 'Begin discovery',
  },
  {
    n: '02',
    title: 'Strategy & alignment',
    jp: '戦略設計',
    body: 'Your dedicated team prepares an investment policy statement, allocation proposal and integrated tax framework.',
    cta: 'See sample IPS',
  },
  {
    n: '03',
    title: 'Implementation & stewardship',
    jp: '運用と継続的な見直し',
    body: 'Disciplined execution and quarterly reviews — your portfolio evolves alongside your life and the markets.',
    cta: 'Our review cadence',
  },
];

export default function Products() {
  return (
    <section style={{ background: 'var(--surface-alt)' }}>
      <div className="max-w-[1280px] mx-auto px-8 py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 mb-16 items-end">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>INVESTMENT SOLUTIONS</div>
            <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-6">投資ソリューション</div>
            <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.08] font-medium text-slate-900 tracking-[-0.015em]">
              From core portfolios to private markets
            </h2>
          </div>
          <p className="text-[16px] leading-[1.65] text-slate-600 max-w-lg lg:justify-self-end">
            Whether you are seeking compounding equity returns, capital preservation, or selective access to private opportunities, our solutions are constructed by investment professionals with decades of experience across cycles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SOLUTIONS.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.16)] hover:-translate-y-0.5 transition-all">
              <div className="grid grid-cols-[1fr_180px]">
                <div className="p-8">
                  <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-400 mb-2">{s.sub}</div>
                  <h3 className="font-serif text-[24px] font-semibold text-slate-900 mb-1 tracking-[-0.01em]">{s.label}</h3>
                  <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mb-4">{s.jp}</div>
                  <p className="text-[14px] leading-[1.6] text-slate-600 mb-6">{s.body}</p>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase">AUM</div>
                      <div className="font-serif text-[18px] font-semibold tracking-tight" style={{ color: 'var(--accent-deep)' }}>{s.aum}</div>
                    </div>
                    <a href="#" className="text-[12px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                      Strategy detail
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <img src={s.image} alt={s.label} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-20">
        <div className="rounded-[20px] p-12 lg:p-20 text-center relative overflow-hidden"
          style={{ background: 'var(--gradient-dark)' }}>
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(var(--photo-tint-rgb), 0.92), rgba(var(--photo-tint-rgb), 0.85))' }} />
          </div>
          <div className="relative">
            <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--secondary)' }}>SERVICE IN SIX LANGUAGES</div>
            <div className="font-jp text-[13px] tracking-[0.18em] mb-7 text-white/60">6か国語による専任サポート</div>
            <h2 className="font-serif text-[36px] lg:text-[52px] leading-[1.1] font-medium text-white tracking-[-0.015em] max-w-3xl mx-auto">
              Local advisors, fluent in your language and your markets
            </h2>
            <div className="mt-12 flex items-center justify-center gap-3 flex-wrap">
              {[
                { l: 'English',   jp: '英語' },
                { l: '日本語',     jp: 'Japanese' },
                { l: '中文',       jp: 'Chinese' },
                { l: 'Deutsch',   jp: 'German' },
                { l: 'Français',  jp: 'French' },
                { l: 'Español',   jp: 'Spanish' },
              ].map((lang) => (
                <span key={lang.l} className="px-5 h-10 rounded-full bg-white/5 border border-white/10 text-white/85 text-[13px] flex items-center font-medium">{lang.l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        <div className="text-[11px] font-semibold tracking-[0.28em] mb-3" style={{ color: 'var(--accent-deep)' }}>BEGIN YOUR PARTNERSHIP</div>
        <div className="font-jp text-[13px] tracking-[0.18em] text-slate-500 mb-6">パートナーシップの開始</div>
        <h2 className="font-serif text-[40px] lg:text-[52px] leading-[1.1] font-medium text-slate-900 tracking-[-0.015em] mb-14 max-w-3xl">
          A considered process, designed to last decades
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-9 hover:shadow-[0_16px_50px_-16px_rgba(var(--shadow-rgb),0.16)] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-7">
                <div className="font-serif text-[40px] font-medium leading-none" style={{ color: 'var(--accent-deep)' }}>{s.n}</div>
                <div className="text-[10px] font-semibold tracking-[0.22em] text-slate-300">STEP</div>
              </div>
              <div className="font-jp text-[12px] tracking-[0.16em] text-slate-500 mb-1">{s.jp}</div>
              <h3 className="font-serif text-[22px] font-semibold text-slate-900 mb-3 tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-slate-600 mb-8">{s.body}</p>
              <a href="#" className="text-[13px] font-semibold inline-flex items-center gap-1.5 hover:gap-2 transition-all" style={{ color: 'var(--accent-deep)' }}>
                {s.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
