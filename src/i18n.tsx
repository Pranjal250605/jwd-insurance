import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ja';

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});

const STORAGE_KEY = 'jwd-lang';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    const url = new URLSearchParams(window.location.search).get('lang');
    if (url === 'ja' || url === 'en') return url;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'ja' ? 'ja' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/* ————————————————————————————————————————————————————————————————
   Full site copy, keyed per component. In JA mode the Japanese takes
   the primary slot and English becomes the small accent line (the
   mirror of how EN mode already treats Japanese).
   ———————————————————————————————————————————————————————————————— */

export const STRINGS = {
  en: {
    nav: {
      regulated: 'REGULATED BY FCA · SEC · FSA · MAS',
      portal: 'Client Portal',
      contact: 'Contact',
      cta: 'SCHEDULE CONSULTATION',
      menus: {
        Solutions: { label: 'Solutions', sub: 'ソリューション', items: ['Wealth Management', 'Private Banking', 'Asset Management', 'Family Office', 'Corporate Advisory'] },
        Insights:  { label: 'Insights',  sub: '市場洞察',       items: ['Market Outlook', 'Research Papers', 'Quarterly Letters', 'Economic Calendar', 'Webinars'] },
        About:     { label: 'About',     sub: '会社情報',       items: ['Our Firm', 'Leadership', 'Our Process', 'Stewardship', 'Press'] },
        Clients:   { label: 'Clients',   sub: 'クライアント',   items: ['Private Clients', 'Family Offices', 'Institutions', 'Endowments', 'Pensions'] },
      },
    },
    hero: {
      eyebrow: 'JWD INVESTMENT · TRUSTED SINCE 2014',
      headline: 'Building lasting wealth, generation after generation',
      tagline: '次世代へつなぐ、確かな資産運用を。',
      body: 'Comprehensive wealth management and investment advisory for institutions, family offices and private clients across global markets — guided by disciplined process and long-term conviction.',
      ctaPrimary: 'SCHEDULE A CONSULTATION',
      ctaSecondary: 'Download capabilities brochure',
      platformsLabel: 'EXECUTION VIA',
      stats: [
        ['$48B', 'Assets under management'],
        ['1,200+', 'Client relationships'],
        ['11', 'Global offices'],
        ['10 yrs', 'Median tenure'],
      ] as [string, string][],
      flagship: 'FLAGSHIP STRATEGY',
      flagshipName: 'Global Balanced Composite',
      since: 'SINCE 2014',
      portfolio: 'PORTFOLIO',
      ytd: 'YTD · +1.36%',
      allocation: 'ASSET ALLOCATION',
      allocRows: ['Global Equities', 'Fixed Income', 'Alternatives', 'Cash'],
      metrics: [
        { l: '5Y Return', v: '+9.4%', s: 'annualised' },
        { l: 'Sharpe', v: '1.18', s: 'net of fees' },
        { l: 'Drawdown', v: '−7.2%', s: '5y maximum' },
      ],
    },
    promo: {
      advisoryEyebrow: 'PRIVATE WEALTH ADVISORY',
      advisorySub: 'プライベート・ウェルス・アドバイザリー',
      advisoryTitle: "Tailored portfolios, built around your life's work",
      advisoryBody: 'Discretionary management for individuals and families with $5M+ in investable assets. Bespoke strategies, integrated tax and estate planning, and direct access to a dedicated senior advisor.',
      advisoryCta: 'REQUEST INTRODUCTION',
      advisorName: 'Hiroshi Matsuda, CFA',
      advisorRole: 'Senior Wealth Advisor · Tokyo',
      whyEyebrow: 'WHY PARTNER WITH JWD',
      whySub: 'JWDが選ばれる理由',
      whyTitle: 'Three pillars of stewardship',
      pillars: [
        { title: 'Disciplined process', sub: '徹底した投資プロセス', body: 'A multi-stage investment committee, rigorous fundamental research and global risk oversight underpin every portfolio decision.', cta: 'Our process' },
        { title: 'Long-term horizon', sub: '長期的な視点', body: 'We invest with conviction across market cycles — building portfolios that compound over decades, not quarters.', cta: 'Investment philosophy' },
        { title: 'Personal access', sub: '専任担当者', body: 'Direct relationships with senior advisors and portfolio managers — every client supported by a dedicated, multi-disciplinary team.', cta: 'Meet our advisors' },
      ],
    },
    products: {
      eyebrow: 'INVESTMENT SOLUTIONS',
      sub: '投資ソリューション',
      title: 'From core portfolios to private markets',
      intro: 'Whether you are seeking compounding equity returns, capital preservation, or selective access to private opportunities, our solutions are constructed by investment professionals with decades of experience across cycles.',
      aumLabel: 'AUM',
      detailCta: 'Strategy detail',
      solutions: [
        { label: 'Global Equities', sub2: 'グローバル株式', tag: 'CORE STRATEGY', body: 'High-conviction portfolios of best-in-class companies across developed and emerging markets.' },
        { label: 'Fixed Income', sub2: '債券運用', tag: 'CAPITAL PRESERVATION', body: 'Investment-grade and sovereign portfolios designed for stable income and disciplined risk control.' },
        { label: 'Private Markets', sub2: 'プライベート市場', tag: 'ALTERNATIVES', body: 'Curated access to private equity, venture, real assets and credit partnerships, typically reserved for institutions.' },
        { label: 'Sustainable', sub2: 'ESG・サステナブル', tag: 'ESG INTEGRATED', body: 'Impact-aligned strategies integrating environmental, social and governance factors with rigorous financial analysis.' },
      ],
      platformsEyebrow: 'INVESTMENT PLATFORMS',
      platformsSub: '投資プラットフォーム',
      platformsTitle: 'Execute through our partner platforms',
      platformsNote: 'Links open an external site. Always review the offering documents before investing.',
      platformsVisit: 'Visit official site',
      platforms: [
        { name: 'Equiti', tag: 'TRADING & MULTI-ASSET', desc: 'Global multi-asset trading platform — FX, equities and CFDs with institutional-grade execution.', url: 'https://www.equiti.com/sc-en/' },
        { name: 'AIX Investment', tag: 'ALTERNATIVE FUND', desc: 'An alternative investment fund centred on real assets — structure, objectives and returns made clear.', url: 'https://www.aixinvestment.com/' },
      ],
      langEyebrow: 'SERVICE IN SIX LANGUAGES',
      langSub: '6か国語による専任サポート',
      langTitle: 'Local advisors, fluent in your language and your markets',
      stepsEyebrow: 'BEGIN YOUR PARTNERSHIP',
      stepsSub: 'パートナーシップの開始',
      stepsTitle: 'A considered process, designed to last decades',
      stepLabel: 'STEP',
      steps: [
        { title: 'Discovery', sub: 'ヒアリング', body: 'A confidential conversation about your goals, family circumstances, time horizon and existing balance sheet.', cta: 'Begin discovery' },
        { title: 'Strategy & alignment', sub: '戦略設計', body: 'Your dedicated team prepares an investment policy statement, allocation proposal and integrated tax framework.', cta: 'See sample IPS' },
        { title: 'Implementation & stewardship', sub: '運用と継続的な見直し', body: 'Disciplined execution and quarterly reviews — your portfolio evolves alongside your life and the markets.', cta: 'Our review cadence' },
      ],
    },
    money: {
      reachEyebrow: 'GLOBAL REACH',
      reachSub: 'グローバル・リーチ',
      reachTitle: 'Local insight, global perspective',
      reachBody: 'Eleven offices across Asia, Europe and the Americas — each staffed by senior advisors who live in the markets they cover, supported by a single global research platform.',
      reachBody2: '世界11拠点のチームが、お客様の地域に根ざした視点とグローバルな運用力をお届けします。',
      reachCta: 'View our office network',
      hq: 'HEADQUARTERS',
      office: 'OFFICE',
      offices: [
        { city: 'Tokyo', sub: '東京' },
        { city: 'London', sub: 'ロンドン' },
        { city: 'New York', sub: 'ニューヨーク' },
        { city: 'Singapore', sub: 'シンガポール' },
        { city: 'Zürich', sub: 'チューリッヒ' },
      ],
      portalEyebrow: 'CLIENT EXPERIENCE',
      portalSub: 'クライアント・エクスペリエンス',
      portalTitle: 'The JWD Client Portal — clarity, on every device',
      portalBody: 'A consolidated view of every account, position and document — with institutional-grade encryption and seamless access for principals, family members and authorised advisors.',
      portalBody2: 'すべての資産情報を一元管理。安全で直感的なクライアント・ポータル。',
      features: [
        { l: 'Performance reporting', sub: 'パフォーマンス報告' },
        { l: 'Tax-aware analytics', sub: '税務分析' },
        { l: 'Secure document vault', sub: 'ドキュメント保管' },
      ],
      totalWealth: 'TOTAL WEALTH',
      qtr: 'QTR',
    },
    explore: {
      insightsEyebrow: 'INSIGHTS & RESEARCH',
      insightsSub: '市場洞察・リサーチ',
      insightsTitle: 'Considered thinking, delivered with discipline',
      insightsBody: 'Our investment team publishes quarterly outlooks, market commentary and long-form research — written by the same professionals managing client portfolios.',
      insightsBody2: '運用チームが執筆する、信頼性の高い市場分析と長期的な視点の調査資料。',
      insightsCta: 'View research library',
      research: [
        { tag: 'QUARTERLY OUTLOOK', sub: '四半期見通し', title: 'Navigating a higher-rate world', meta: 'Q2 2026 · 24 min read' },
        { tag: 'WHITE PAPER', sub: 'ホワイトペーパー', title: 'The case for global diversification', meta: 'Strategy · 16 min read' },
        { tag: 'MARKET LETTER', sub: 'マーケット・レター', title: 'Japan equities: a structural reawakening', meta: 'Regional · 12 min read' },
      ],
      apartEyebrow: 'WHAT SETS US APART',
      apartSub: 'JWDの強み',
      apartTitle: 'A firm built on conviction',
      features: [
        { tag: 'STEWARDSHIP', sub: '受託者責任', title: 'Fiduciary by design', body: 'Independently owned and aligned with our clients — fee-only, transparent and free from product conflicts.', cta: 'Our principles' },
        { tag: 'LEADERSHIP', sub: 'リーダーシップ', title: 'A team you can trust', body: 'Senior portfolio managers averaging 22 years of experience, with deep regional and asset class expertise.', cta: 'Meet the team' },
        { tag: 'INSTITUTIONAL', sub: '機関投資家', title: 'Trusted by institutions', body: 'Endowments, pensions and family offices entrust us with mandates measured in decades, not quarters.', cta: 'Institutional capabilities' },
      ],
    },
    closing: {
      eyebrow: 'BEGIN YOUR PARTNERSHIP',
      sub: 'パートナーシップの始まり',
      title: 'Plan your wealth journey with JWD',
      tagline: 'お客様の100年先の未来を、確かな運用でお支えします。',
      body: "Speak with a senior advisor about your goals, your portfolio and how JWD's disciplined approach can serve your family or institution for decades to come.",
      ctaPrimary: 'SCHEDULE CONSULTATION',
      ctaSecondary: 'REQUEST CAPABILITIES BROCHURE',
      regulatedTitle: 'REGULATED & LICENSED ACROSS GLOBAL JURISDICTIONS',
      regulatedSub: '世界各国の規制当局による認可',
      regulators: [
        { code: 'FCA', name: 'Financial Conduct Authority', region: 'United Kingdom' },
        { code: 'SEC', name: 'Securities & Exchange Comm.', region: 'United States' },
        { code: 'FSA', name: 'Financial Services Agency', region: 'Japan · 金融庁' },
        { code: 'FINMA', name: 'Swiss Financial Markets', region: 'Switzerland' },
        { code: 'MAS', name: 'Monetary Authority', region: 'Singapore' },
      ],
      recognition: [
        { award: 'Wealth Manager of the Year', pub: 'Asia Private Banker', yr: '2025' },
        { award: 'Best Discretionary Portfolio', pub: 'Euromoney', yr: '2024' },
        { award: 'Outstanding ESG Integration', pub: 'PRI Awards', yr: '2024' },
      ],
    },
    footer: {
      blurb: 'JWD Investment is an independently-owned wealth management and investment advisory firm, serving private clients, family offices and institutions across global markets since 2014.',
      blurb2: '世界の富裕層・機関投資家のための、独立系資産運用会社。',
      cols: [
        { h: 'Solutions', sub: 'ソリューション', links: ['Wealth Management', 'Private Banking', 'Asset Management', 'Family Office', 'Corporate Advisory'] },
        { h: 'Insights', sub: '市場洞察', links: ['Market Outlook', 'Quarterly Letters', 'Research Papers', 'Webinars', 'Calendar'] },
        { h: 'About', sub: '会社情報', links: ['Our Firm', 'Leadership', 'Stewardship', 'Careers', 'Press'] },
        { h: 'Clients', sub: 'クライアント', links: ['Private Clients', 'Family Offices', 'Institutions', 'Endowments', 'Client Portal'] },
      ],
      regLine: ['FCA AUTHORISED', 'SEC REGISTERED INVESTMENT ADVISER', 'FSA LICENSED · 金融庁認可', 'FINMA SUPERVISED', 'MAS REGULATED'],
      importantLabel: 'Important:',
      disclaimer: 'This material is provided for informational purposes only and does not constitute investment, legal or tax advice, nor an offer to buy or sell securities. Investments involve risk, including possible loss of principal. Past performance is not indicative of future results. JWD Investment maintains separate legal entities in each jurisdiction and provides services to clients only through its locally regulated affiliates.',
      links: ['Legal', 'Privacy', 'Cookies', 'Disclosures'],
      copyright: '© 2026 JWD Investment',
    },
  },

  ja: {
    nav: {
      regulated: 'FCA・SEC・FSA・MAS 認可',
      portal: 'クライアント・ポータル',
      contact: 'お問い合わせ',
      cta: 'ご相談のご予約',
      menus: {
        Solutions: { label: 'ソリューション', sub: 'Solutions', items: ['ウェルス・マネジメント', 'プライベート・バンキング', 'アセット・マネジメント', 'ファミリーオフィス', 'コーポレート・アドバイザリー'] },
        Insights:  { label: '市場洞察', sub: 'Insights', items: ['マーケット・アウトルック', 'リサーチペーパー', '四半期レター', '経済カレンダー', 'ウェビナー'] },
        About:     { label: '会社情報', sub: 'About', items: ['会社概要', '経営陣', '運用プロセス', 'スチュワードシップ', 'プレス'] },
        Clients:   { label: 'クライアント', sub: 'Clients', items: ['個人のお客様', 'ファミリーオフィス', '機関投資家', '財団・基金', '年金基金'] },
      },
    },
    hero: {
      eyebrow: 'JWDインベストメント · 2014年創業',
      headline: '世代を超えて受け継がれる、確かな資産形成',
      tagline: 'Building lasting wealth, generation after generation.',
      body: '機関投資家、ファミリーオフィス、個人富裕層のお客様へ。規律ある運用プロセスと長期的な確信に基づく、総合的な資産運用・投資助言サービスを世界の市場でご提供します。',
      ctaPrimary: 'ご相談のご予約',
      ctaSecondary: '会社案内をダウンロード',
      platformsLabel: '提携プラットフォーム',
      stats: [
        ['$48B', '運用資産残高'],
        ['1,200+', 'お客様数'],
        ['11', '世界拠点数'],
        ['10年', '平均在籍年数'],
      ] as [string, string][],
      flagship: 'フラッグシップ戦略',
      flagshipName: 'グローバル・バランス・コンポジット',
      since: '2014年設定',
      portfolio: 'ポートフォリオ',
      ytd: '年初来 · +1.36%',
      allocation: '資産配分',
      allocRows: ['グローバル株式', '債券', 'オルタナティブ', '現金'],
      metrics: [
        { l: '5年リターン', v: '+9.4%', s: '年率' },
        { l: 'シャープレシオ', v: '1.18', s: '報酬控除後' },
        { l: 'ドローダウン', v: '−7.2%', s: '5年最大' },
      ],
    },
    promo: {
      advisoryEyebrow: 'プライベート・ウェルス・アドバイザリー',
      advisorySub: 'PRIVATE WEALTH ADVISORY',
      advisoryTitle: 'お客様の人生に寄り添う、オーダーメイドのポートフォリオ',
      advisoryBody: '投資可能資産500万ドル以上の個人・ご家族のための一任運用サービス。オーダーメイドの戦略、税務・相続対策との統合、そして専任シニアアドバイザーへの直接アクセスをご提供します。',
      advisoryCta: 'ご紹介を依頼する',
      advisorName: '松田 浩 (CFA)',
      advisorRole: 'シニア・ウェルス・アドバイザー · 東京',
      whyEyebrow: 'JWDが選ばれる理由',
      whySub: 'WHY PARTNER WITH JWD',
      whyTitle: '受託者責任を支える、3つの柱',
      pillars: [
        { title: '徹底した投資プロセス', sub: 'Disciplined process', body: '多段階の投資委員会、徹底したファンダメンタルズ調査、グローバルなリスク管理体制が、すべての運用判断を支えます。', cta: '運用プロセス' },
        { title: '長期的な視点', sub: 'Long-term horizon', body: '市場サイクルを超えて確信を持って投資し、四半期ではなく数十年単位で複利成長するポートフォリオを構築します。', cta: '投資哲学' },
        { title: '専任担当者', sub: 'Personal access', body: 'シニアアドバイザーやポートフォリオマネージャーとの直接の関係。すべてのお客様を専任の多職種チームがサポートします。', cta: 'アドバイザーのご紹介' },
      ],
    },
    products: {
      eyebrow: '投資ソリューション',
      sub: 'INVESTMENT SOLUTIONS',
      title: 'コア・ポートフォリオからプライベート市場まで',
      intro: '複利での株式リターン、資本の保全、あるいはプライベート市場への選別的なアクセス。数十年にわたり市場サイクルを経験してきた運用プロフェッショナルが、お客様のニーズに応じたソリューションを構築します。',
      aumLabel: '運用資産',
      detailCta: '戦略詳細',
      solutions: [
        { label: 'グローバル株式', sub2: 'Global Equities', tag: 'コア戦略', body: '先進国・新興国市場の優良企業に厳選投資する、高確信度のポートフォリオ。' },
        { label: '債券運用', sub2: 'Fixed Income', tag: '資本保全', body: '安定した収益と規律あるリスク管理を目的とした、投資適格債・ソブリン債ポートフォリオ。' },
        { label: 'プライベート市場', sub2: 'Private Markets', tag: 'オルタナティブ', body: 'プライベート・エクイティ、ベンチャー、実物資産、クレジットへの厳選されたアクセス。通常は機関投資家に限られる投資機会をご提供します。' },
        { label: 'ESG・サステナブル', sub2: 'Sustainable', tag: 'ESG統合', body: '環境・社会・ガバナンス要素と厳格な財務分析を統合した、インパクト志向の運用戦略。' },
      ],
      platformsEyebrow: '投資プラットフォーム',
      platformsSub: 'INVESTMENT PLATFORMS',
      platformsTitle: 'パートナー・プラットフォームによる執行',
      platformsNote: 'リンクは外部サイトに移動します。投資判断は目論見書等をご確認ください。',
      platformsVisit: '公式サイトへ',
      platforms: [
        { name: 'Equiti', tag: 'トレーディング&マルチアセット', desc: 'FX・株式・CFDを機関投資家水準の執行で提供する、グローバル・マルチアセット取引プラットフォーム。', url: 'https://www.equiti.com/sc-en/' },
        { name: 'AIX Investment', tag: 'オルタナティブ・ファンド', desc: '実物資産を中心としたオルタナティブ投資ファンド。構造・目的・リターンを正しく理解いただけます。', url: 'https://www.aixinvestment.com/' },
      ],
      langEyebrow: '6か国語による専任サポート',
      langSub: 'SERVICE IN SIX LANGUAGES',
      langTitle: 'お客様の言語と市場に精通した、現地アドバイザー',
      stepsEyebrow: 'パートナーシップの開始',
      stepsSub: 'BEGIN YOUR PARTNERSHIP',
      stepsTitle: '数十年先を見据えた、丁寧なプロセス',
      stepLabel: 'ステップ',
      steps: [
        { title: 'ヒアリング', sub: 'Discovery', body: 'お客様の目標、ご家族の状況、運用期間、既存の資産構成について、秘密厳守でお伺いします。', cta: 'ヒアリングを開始' },
        { title: '戦略設計', sub: 'Strategy & alignment', body: '専任チームが投資方針書(IPS)、資産配分のご提案、税務フレームワークを作成します。', cta: 'IPSサンプルを見る' },
        { title: '運用と継続的な見直し', sub: 'Implementation', body: '規律ある執行と四半期ごとのレビュー。お客様の人生と市場の変化に合わせて、ポートフォリオを進化させます。', cta: 'レビュー体制' },
      ],
    },
    money: {
      reachEyebrow: 'グローバル・リーチ',
      reachSub: 'GLOBAL REACH',
      reachTitle: '地域に根ざした知見、グローバルな視野',
      reachBody: 'アジア・欧州・米州の世界11拠点に、担当市場に暮らすシニアアドバイザーが駐在。単一のグローバル・リサーチ・プラットフォームがそれを支えます。',
      reachBody2: 'Eleven offices across Asia, Europe and the Americas — supported by a single global research platform.',
      reachCta: '拠点ネットワークを見る',
      hq: '本社',
      office: '拠点',
      offices: [
        { city: '東京', sub: 'Tokyo' },
        { city: 'ロンドン', sub: 'London' },
        { city: 'ニューヨーク', sub: 'New York' },
        { city: 'シンガポール', sub: 'Singapore' },
        { city: 'チューリッヒ', sub: 'Zürich' },
      ],
      portalEyebrow: 'クライアント・エクスペリエンス',
      portalSub: 'CLIENT EXPERIENCE',
      portalTitle: 'JWDクライアント・ポータル — あらゆるデバイスで、明瞭に',
      portalBody: 'すべての口座・ポジション・書類を一元的に確認。機関投資家水準の暗号化により、ご本人・ご家族・顧問の皆様が安全かつシームレスにアクセスできます。',
      portalBody2: 'A consolidated view of every account, position and document.',
      features: [
        { l: 'パフォーマンス報告', sub: 'Performance reporting' },
        { l: '税務分析', sub: 'Tax-aware analytics' },
        { l: 'ドキュメント保管', sub: 'Secure document vault' },
      ],
      totalWealth: '総資産',
      qtr: '四半期',
    },
    explore: {
      insightsEyebrow: '市場洞察・リサーチ',
      insightsSub: 'INSIGHTS & RESEARCH',
      insightsTitle: '規律に裏打ちされた、深い洞察',
      insightsBody: '運用チームが四半期見通し、市場コメンタリー、長編リサーチを執筆。お客様のポートフォリオを実際に運用するプロフェッショナル自身の分析です。',
      insightsBody2: 'Written by the same professionals managing client portfolios.',
      insightsCta: 'リサーチライブラリを見る',
      research: [
        { tag: '四半期見通し', sub: 'Quarterly Outlook', title: '高金利時代の羅針盤', meta: '2026年第2四半期 · 24分' },
        { tag: 'ホワイトペーパー', sub: 'White Paper', title: 'グローバル分散投資の意義', meta: '戦略 · 16分' },
        { tag: 'マーケット・レター', sub: 'Market Letter', title: '日本株式:構造的な再覚醒', meta: '地域 · 12分' },
      ],
      apartEyebrow: 'JWDの強み',
      apartSub: 'WHAT SETS US APART',
      apartTitle: '確信の上に築かれた運用会社',
      features: [
        { tag: '受託者責任', sub: 'Stewardship', title: '設計思想としての受託者責任', body: '独立系・フィーオンリーの透明な運営。商品販売に伴う利益相反から自由な、お客様本位の体制です。', cta: '私たちの原則' },
        { tag: 'リーダーシップ', sub: 'Leadership', title: '信頼できるチーム', body: '平均22年の経験を持つシニア・ポートフォリオマネージャーが、地域と資産クラスへの深い専門性を発揮します。', cta: 'チームのご紹介' },
        { tag: '機関投資家', sub: 'Institutional', title: '機関投資家からの信頼', body: '財団、年金基金、ファミリーオフィスから、四半期ではなく数十年単位のマンデートをお任せいただいています。', cta: '機関投資家向けサービス' },
      ],
    },
    closing: {
      eyebrow: 'パートナーシップの始まり',
      sub: 'BEGIN YOUR PARTNERSHIP',
      title: 'JWDとともに描く、資産の未来',
      tagline: 'お客様の100年先の未来を、確かな運用でお支えします。',
      body: 'シニアアドバイザーが、お客様の目標とポートフォリオ、そしてJWDの規律ある運用がご家族や機関投資家の皆様を数十年にわたりどのように支えられるかをご説明します。',
      ctaPrimary: 'ご相談のご予約',
      ctaSecondary: '会社案内を請求する',
      regulatedTitle: '世界各国の規制当局による認可',
      regulatedSub: 'REGULATED & LICENSED ACROSS GLOBAL JURISDICTIONS',
      regulators: [
        { code: 'FCA', name: '英国金融行為監督機構', region: '英国' },
        { code: 'SEC', name: '米国証券取引委員会', region: '米国' },
        { code: 'FSA', name: '金融庁', region: '日本' },
        { code: 'FINMA', name: 'スイス金融市場監督機構', region: 'スイス' },
        { code: 'MAS', name: 'シンガポール金融管理局', region: 'シンガポール' },
      ],
      recognition: [
        { award: 'ウェルス・マネージャー・オブ・ザ・イヤー', pub: 'Asia Private Banker', yr: '2025' },
        { award: 'ベスト一任ポートフォリオ賞', pub: 'Euromoney', yr: '2024' },
        { award: '優秀ESG統合賞', pub: 'PRI Awards', yr: '2024' },
      ],
    },
    footer: {
      blurb: 'JWDインベストメントは、2014年の創業以来、世界の個人富裕層、ファミリーオフィス、機関投資家にサービスを提供する、独立系の資産運用・投資助言会社です。',
      blurb2: 'An independently-owned wealth management and investment advisory firm.',
      cols: [
        { h: 'ソリューション', sub: 'Solutions', links: ['ウェルス・マネジメント', 'プライベート・バンキング', 'アセット・マネジメント', 'ファミリーオフィス', 'コーポレート・アドバイザリー'] },
        { h: '市場洞察', sub: 'Insights', links: ['マーケット・アウトルック', '四半期レター', 'リサーチペーパー', 'ウェビナー', 'カレンダー'] },
        { h: '会社情報', sub: 'About', links: ['会社概要', '経営陣', 'スチュワードシップ', '採用情報', 'プレス'] },
        { h: 'クライアント', sub: 'Clients', links: ['個人のお客様', 'ファミリーオフィス', '機関投資家', '財団・基金', 'クライアント・ポータル'] },
      ],
      regLine: ['FCA認可', 'SEC登録投資顧問', '金融庁認可 · FSA LICENSED', 'FINMA監督', 'MAS規制'],
      importantLabel: '重要事項:',
      disclaimer: '本資料は情報提供のみを目的としており、投資・法務・税務に関する助言や、有価証券の売買の勧誘を構成するものではありません。投資には元本割れを含むリスクがあります。過去の運用実績は将来の成果を保証するものではありません。JWDインベストメントは各法域に独立した法人を有し、現地で規制を受ける関連会社を通じてのみお客様にサービスを提供します。',
      links: ['法的事項', 'プライバシー', 'クッキー', '開示事項'],
      copyright: '© 2026 JWDインベストメント',
    },
  },
} as const;

export type Strings = (typeof STRINGS)['en'];

export function useT(): { lang: Lang; setLang: (l: Lang) => void; t: Strings } {
  const { lang, setLang } = useLang();
  return { lang, setLang, t: STRINGS[lang] as unknown as Strings };
}
