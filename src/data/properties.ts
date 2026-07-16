/**
 * Client property portfolio — ported from jwd-web (src/content/properties.ts).
 * PLACEHOLDER data until the client supplies real inventory.
 */
export interface Listing {
  id: string;
  area: string;
  nameJa: string;
  nameEn: string;
  typeJa: string;
  typeEn: string;
  priceAed: number;
  yieldPct: number;
  beds: string;
  sizeSqft: number;
  descJa: string;
  descEn: string;
  image: string;
  bayut: string;
  pf: string;
}

export const LISTINGS: Listing[] = [
  {
    id: 'downtown-1br',
    area: 'Downtown Dubai',
    nameJa: 'ダウンタウン 1BR レジデンス',
    nameEn: 'Downtown 1BR Residence',
    typeJa: 'アパートメント',
    typeEn: 'Apartment',
    priceAed: 1_850_000,
    yieldPct: 6.8,
    beds: '1BR',
    sizeSqft: 820,
    descJa: 'ブルジュ・ハリファを望むダウンタウンの中心に立つ1ベッドルーム。観光・駐在需要が厚く、長期・短期いずれの賃貸でも高稼働が見込めます。',
    descEn: 'A one-bedroom residence in the heart of Downtown with Burj Khalifa views. Deep tourist and expat demand supports strong occupancy on both long and short lets.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/downtown-dubai/',
    pf: 'https://www.propertyfinder.ae/en/search?l=50&c=1&fu=0&ob=mr',
  },
  {
    id: 'marina-2br',
    area: 'Dubai Marina',
    nameJa: 'マリーナ 2BR ウォーターフロント',
    nameEn: 'Marina 2BR Waterfront',
    typeJa: 'アパートメント',
    typeEn: 'Apartment',
    priceAed: 2_400_000,
    yieldPct: 7.1,
    beds: '2BR',
    sizeSqft: 1_250,
    descJa: 'マリーナのウォーターフロントに位置する2ベッドルーム。海とヨットハーバーの眺望、充実した共用施設が、安定した賃貸需要を支えます。',
    descEn: 'A two-bedroom waterfront residence on Dubai Marina. Sea and marina views with rich shared amenities underpin steady rental demand.',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/dubai-marina/',
    pf: 'https://www.propertyfinder.ae/en/search?l=36&c=1&fu=0&ob=mr',
  },
  {
    id: 'palm-villa',
    area: 'Palm Jumeirah',
    nameJa: 'パーム・ジュメイラ 5BR ヴィラ',
    nameEn: 'Palm Jumeirah 5BR Villa',
    typeJa: 'ヴィラ',
    typeEn: 'Villa',
    priceAed: 16_500_000,
    yieldPct: 5.2,
    beds: '5BR',
    sizeSqft: 6_500,
    descJa: 'パーム・ジュメイラのプライベートビーチに面した5ベッドルーム・ヴィラ。希少性が高く、資産価値の保全と短期賃貸の上振れの両面で魅力があります。',
    descEn: 'A five-bedroom villa on a private beach on Palm Jumeirah. High scarcity makes it compelling both for preserving value and for short-let upside.',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
    bayut: 'https://www.bayut.com/for-sale/villas/dubai/palm-jumeirah/',
    pf: 'https://www.propertyfinder.ae/en/search?l=1535&c=1&t=35&fu=0&ob=mr',
  },
  {
    id: 'jvc-studio',
    area: 'Jumeirah Village Circle',
    nameJa: 'JVC 高利回りスタジオ',
    nameEn: 'JVC High-Yield Studio',
    typeJa: 'スタジオ',
    typeEn: 'Studio',
    priceAed: 650_000,
    yieldPct: 8.4,
    beds: 'Studio',
    sizeSqft: 480,
    descJa: 'JVCの高利回りスタジオ。手頃な価格帯と旺盛な賃貸需要により、グロス8%超を狙えるエントリー向けの一戸です。',
    descEn: 'A high-yield studio in JVC. An accessible price point and robust rental demand make 8%+ gross achievable — an ideal entry asset.',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    bayut: 'https://www.bayut.com/for-sale/apartments/dubai/jumeirah-village-circle-jvc/',
    pf: 'https://www.propertyfinder.ae/en/search?l=64&c=1&fu=0&ob=mr',
  },
];

/* ── Illustrative model assumptions (same as jwd-web PropertyAnalysis) ── */
export const APPRECIATION = 0.06; // capital growth p.a.
export const PURCHASE_COST = 0.06; // DLD 4% + agency 2%
export const EXIT_COST = 0.02; // agency at sale
export const OPEX_PER_SQFT = 18; // service charge + management, AED/yr
export const HOLD = 5; // holding period, years

export function irr(cf: number[]): number {
  const npv = (r: number) => cf.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
  let lo = -0.95, hi = 1.5;
  let flo = npv(lo);
  if (flo * npv(hi) > 0) return NaN;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const fm = npv(mid);
    if (Math.abs(fm) < 1) return mid;
    if (flo * fm < 0) hi = mid;
    else { lo = mid; flo = fm; }
  }
  return (lo + hi) / 2;
}

export const fmtAed = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

export const FX_JPY = 41; // AED → JPY (illustrative, matches jwd-web fallback)
export const JP_CGT = 0.20315; // Japan capital-gains / financial-income tax

/** Short area names for chart labels. */
export const AREA_SHORT: Record<string, { en: string; ja: string }> = {
  'Downtown Dubai': { en: 'Downtown', ja: 'ダウンタウン' },
  'Dubai Marina': { en: 'Marina', ja: 'マリーナ' },
  'Palm Jumeirah': { en: 'Palm Jumeirah', ja: 'パーム・ジュメイラ' },
  'Jumeirah Village Circle': { en: 'JVC', ja: 'JVC' },
};

/** Validated categorical palette for the allocation donut (fixed entity order). */
export const SERIES_COLORS = ['#0A9A93', '#3E6FB8', '#C08A2D', '#9D5FB4'];

/** Indicative price per sq ft by area — from jwd-web dubai-properties.ts. */
export const AREA_PRICES = [
  { en: 'JVC', ja: 'JVC', value: 950, highlight: true },
  { en: 'Business Bay', ja: 'ビジネスベイ', value: 1600 },
  { en: 'Marina', ja: 'マリーナ', value: 1750 },
  { en: 'Downtown', ja: 'ダウンタウン', value: 2100 },
  { en: 'Palm', ja: 'パーム', value: 3200 },
];
