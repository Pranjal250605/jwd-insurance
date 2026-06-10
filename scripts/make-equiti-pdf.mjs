// Screenshots every visual block of the JWD Investment homepage rendered in the Equiti
// brand variant, then assembles them into a presentation-style PDF.
//
// Prereqs: the Vite dev server must be running on http://localhost:5173.
// Run: node scripts/make-equiti-pdf.mjs
//
// Output: ./JWD-Investment-Equiti-Variant.pdf

import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = process.env.HOST || 'http://localhost:5173';
const OUT  = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'JWD-Investment-Equiti-Variant-JP.pdf');

// 1440 wide matches the lg breakpoint where the design hits its intended grid.
// DSF 2 captures retina-quality screenshots without blowing up file size.
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };
const SLIDE_W  = 1600;
const SLIDE_H  = 900;

// One slide per visual block. `sel` is an array of CSS selectors — if it has more than
// one entry, the screenshot is the combined bounding box of all matched elements.
// Selectors traverse the rendered tree from `App.tsx` →
//   <div className="min-h-screen bg-white">
//     <Nav>     // renders <div>      → #root > div > div:nth-child(1)
//     <Hero>    // renders <section>  → section:nth-of-type(1)
//     <Promo>   // ...                 → section:nth-of-type(2), with 3 div children
//     <Products> ...                  → section:nth-of-type(3), with 3 div children
//     <Money>    ...                  → section:nth-of-type(4), with 2 div children
//     <Explore>  ...                  → section:nth-of-type(5), with 2 div children
//     <ClosingCTA> ...                → section:nth-of-type(6), with 3 div children
//     <Footer>   // renders <footer>  → footer
const S = (n) => `#root > div > section:nth-of-type(${n})`;
const SLIDES = [
  { title: 'ナビゲーション',                sub: '規制当局バー · メインメニュー · グロウCTA',                                 sel: ['#root > div > div:nth-child(1)'] },
  { title: 'ヒーロー',                       sub: 'ヘッドライン · 主要数値 · 旗艦戦略カード · 浮遊UIモック',                    sel: [`${S(1)}`] },
  { title: 'プライベート・ウェルス・アドバイザリー', sub: '5百万ドル以上のポートフォリオ向けオーダーメイド一任運用',          sel: [`${S(2)} > div:nth-child(1)`] },
  { title: '受託者責任の三本柱',             sub: '徹底した投資プロセス · 長期的な視点 · 専任担当者',                          sel: [`${S(2)} > div:nth-child(2)`, `${S(2)} > div:nth-child(3)`] },
  { title: '投資ソリューション',             sub: 'グローバル株式 · 債券運用 · プライベート市場 · サステナブル',                sel: [`${S(3)} > div:nth-child(1)`] },
  { title: '6か国語による専任サポート',      sub: 'お客様の言語と市場に精通した現地アドバイザー',                              sel: [`${S(3)} > div:nth-child(2)`] },
  { title: '三段階のパートナーシップ・プロセス', sub: 'ヒアリング · 戦略設計 · 運用と継続的見直し',                              sel: [`${S(3)} > div:nth-child(3)`] },
  { title: 'グローバル・リーチ',             sub: 'アジア・欧州・米州 全11拠点',                                                sel: [`${S(4)} > div:nth-child(1)`] },
  { title: 'JWDクライアント・ポータル',     sub: '全口座・全デバイスでの資産一元管理',                                          sel: [`${S(4)} > div:nth-child(2)`] },
  { title: '市場洞察・リサーチ',             sub: '四半期見通し · ホワイトペーパー · マーケット・レター',                        sel: [`${S(5)} > div:nth-child(1)`] },
  { title: 'JWDの強み',                     sub: '受託者責任 · 経験豊富なチーム · 機関投資家からの信頼',                        sel: [`${S(5)} > div:nth-child(2)`] },
  { title: '資産運用ジャーニーの計画',       sub: 'クロージングCTA — コンサルテーション予約',                                    sel: [`${S(6)} > div:nth-child(1)`] },
  { title: '規制当局と受賞歴',               sub: 'FCA · SEC · FSA · FINMA · MAS + 業界アワード',                              sel: [`${S(6)} > div:nth-child(2)`, `${S(6)} > div:nth-child(3)`] },
  { title: 'フッター',                       sub: 'サイトマップ · 開示事項 · コンプライアンス · ソーシャル',                      sel: ['#root > div > footer'] },
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function ensureFonts(page) {
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('600 64px Sora'),
      document.fonts.load('500 28px Sora'),
      document.fonts.load('400 16px Inter'),
      // Japanese deck text — make sure both display + body weights are in cache before pdf().
      document.fonts.load('700 64px "Noto Sans JP"'),
      document.fonts.load('500 24px "Noto Sans JP"'),
      document.fonts.load('400 14px "Noto Sans JP"'),
      document.fonts.ready,
    ]);
  });
}

async function waitForImagesIn(page, selectors) {
  await page.evaluate(async (sels) => {
    const all = sels.flatMap(s => {
      const el = document.querySelector(s);
      return el ? Array.from(el.querySelectorAll('img')) : [];
    });
    await Promise.all(all.map(img => img.complete ? null : new Promise(res => {
      img.addEventListener('load', res, { once: true });
      img.addEventListener('error', res, { once: true });
    })));
  }, selectors);
}

async function combinedBox(page, selectors) {
  return page.evaluate((sels) => {
    const boxes = sels
      .map(s => document.querySelector(s))
      .filter(Boolean)
      .map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
      });
    if (boxes.length === 0) return null;
    const xMin = Math.min(...boxes.map(b => b.x));
    const yMin = Math.min(...boxes.map(b => b.y));
    const xMax = Math.max(...boxes.map(b => b.x + b.w));
    const yMax = Math.max(...boxes.map(b => b.y + b.h));
    return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin };
  }, selectors);
}

async function captureSlide(page, slide) {
  // Scroll the first selector into view. GSAP ScrollTrigger fires on `top 82%` for most
  // reveal animations — scrolling the section's top to the viewport top is well past that.
  const ok = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    el.scrollIntoView({ block: 'start' });
    return true;
  }, slide.sel[0]);
  if (!ok) {
    console.warn(`[skip] selector not found: ${slide.sel[0]}`);
    return null;
  }
  await waitForImagesIn(page, slide.sel);
  // GSAP reveals run ~1s with `clearProps` afterwards. Wait long enough that everything
  // has both played in and had its inline opacity/transform cleared.
  await sleep(1500);

  const box = await combinedBox(page, slide.sel);
  if (!box || box.width === 0 || box.height === 0) {
    console.warn(`[skip] empty bounding box: ${slide.title}`);
    return null;
  }
  // page.screenshot with clip lets us capture an arbitrary rect, including the
  // combined bounding box of multiple adjacent siblings — supports captureBeyondViewport
  // so we don't need to size the viewport to the section.
  const raw = await page.screenshot({
    type: 'png',
    clip: { x: box.x, y: box.y, width: box.width, height: box.height },
    captureBeyondViewport: true,
  });
  const base64 = Buffer.from(raw).toString('base64');
  return `data:image/png;base64,${base64}`;
}

function deckHTML(captures) {
  const slides = captures
    .filter(c => c.dataUrl)
    .map((c, i) => `
      <div class="slide content">
        <div class="slide-header">
          <div class="slide-title-block">
            <span class="slide-num">${String(i + 1).padStart(2, '0')}</span>
            <div>
              <div class="slide-title">${c.title}</div>
              <div class="slide-sub">${c.sub}</div>
            </div>
          </div>
          <div class="slide-brand">JWD · エクイティ・バリアント</div>
        </div>
        <div class="slide-canvas">
          <img src="${c.dataUrl}" alt="${c.title}" />
        </div>
      </div>`).join('\n');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8" />
<title>JWD Investment — Equiti Variant</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
  @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #06121E; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  /* Japanese deck — use Noto Sans JP as primary so CJK glyphs render with weights;
     Inter handles Latin/ASCII (it's listed first only as a hint for the Latin fallback
     order, but Noto Sans JP covers both scripts well so we list it first). */
  body { font-family: 'Noto Sans JP', 'Inter', system-ui, sans-serif; color: #fff; }

  .slide {
    width: ${SLIDE_W}px; height: ${SLIDE_H}px;
    page-break-after: always; break-after: page;
    position: relative; overflow: hidden;
    background:
      radial-gradient(120% 80% at 80% 0%, rgba(0,184,212,0.22) 0%, transparent 55%),
      radial-gradient(80% 90% at 0% 100%, rgba(61,220,224,0.14) 0%, transparent 60%),
      linear-gradient(135deg, #06121E 0%, #0E2138 55%, #0A2E47 100%);
  }
  .slide:last-child { page-break-after: auto; break-after: auto; }

  /* ----- cover ----- */
  .cover { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 80px; }
  .cover-eyebrow { color: #3DDCE0; font-size: 14px; font-weight: 600; letter-spacing: 0.28em; margin-bottom: 28px; }
  .cover h1 {
    font-family: 'Noto Sans JP', 'Sora', 'Inter', sans-serif;
    font-weight: 800; font-size: 86px; letter-spacing: -0.02em; line-height: 1.08;
    max-width: 1280px; margin: 0 auto 32px;
    background: linear-gradient(180deg, #ffffff 0%, #D6F5FA 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .cover-sub { font-size: 18px; line-height: 1.85; color: rgba(224,247,250,0.78); max-width: 880px; margin: 0 auto; }
  .cover-meta { margin-top: 72px; display: flex; gap: 56px; justify-content: center; }
  .cover-meta-item { text-align: left; min-width: 180px; }
  .cover-meta-item .l { font-size: 10px; letter-spacing: 0.3em; color: rgba(224,247,250,0.5); font-weight: 600; }
  .cover-meta-item .v { font-size: 17px; color: #fff; margin-top: 6px; font-weight: 500; }
  .cover-chips { position: absolute; bottom: 56px; left: 0; right: 0; display: flex; justify-content: center; gap: 12px; }
  .cover-chip { width: 18px; height: 18px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.18); }

  /* ----- content slides ----- */
  .content { display: flex; flex-direction: column; padding: 0; }
  .slide-header {
    padding: 24px 52px 14px;
    display: flex; align-items: flex-start; justify-content: space-between;
    flex-shrink: 0;
  }
  .slide-title-block { display: flex; align-items: flex-start; gap: 22px; }
  .slide-num {
    color: #3DDCE0;
    font-family: 'Sora', 'Inter', sans-serif;
    font-size: 32px; font-weight: 700; letter-spacing: -0.02em; line-height: 1;
    padding-top: 4px;
  }
  .slide-title { font-family: 'Noto Sans JP', 'Sora', 'Inter', sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.005em; line-height: 1.25; }
  .slide-sub { font-family: 'Noto Sans JP', 'Inter', sans-serif; font-size: 12.5px; color: rgba(224,247,250,0.65); margin-top: 6px; line-height: 1.55; max-width: 820px; }
  .slide-brand { font-size: 10px; letter-spacing: 0.28em; color: rgba(224,247,250,0.45); font-weight: 600; padding-top: 6px; }

  .slide-canvas {
    flex: 1;
    min-height: 0;       /* critical: lets the flex child shrink so contained img has room */
    margin: 0 52px 36px;
    border-radius: 14px; background: #ffffff;
    box-shadow:
      0 28px 60px -22px rgba(0,184,212,0.42),
      0 0 0 1px rgba(0,184,212,0.22),
      0 0 64px -16px rgba(61,220,224,0.18);
    overflow: hidden;
    display: flex; align-items: flex-start; justify-content: center;
  }
  .slide-canvas img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top center;
  }
</style>
</head><body>
  <div class="slide cover">
    <div class="cover-eyebrow">JWDインベストメント · ブランド・バリアント・スタディ</div>
    <h1>エクイティ・バリアント</h1>
    <p class="cover-sub">
      JWDインベストメントのホームページを、Equiti社のブライト・フィンテック調のビジュアル言語に
      再調整するパレット・タイポグラフィ・装飾システム。<br />
      ヘリテージ・デザインのレイアウト・コピー・構造はすべて維持したまま、ブランドの印象を切り替えます。
    </p>
    <div class="cover-meta">
      <div class="cover-meta-item"><div class="l">カラーパレット</div><div class="v">シアン + ミッドナイトネイビー</div></div>
      <div class="cover-meta-item"><div class="l">タイポグラフィ</div><div class="v">Sora · Inter · Noto Sans JP</div></div>
      <div class="cover-meta-item"><div class="l">参考サイト</div><div class="v">equiti.com/sc-en</div></div>
    </div>
    <div class="cover-chips">
      <span class="cover-chip" style="background:#06121E"></span>
      <span class="cover-chip" style="background:#0E2138"></span>
      <span class="cover-chip" style="background:#00B8D4"></span>
      <span class="cover-chip" style="background:#3DDCE0"></span>
      <span class="cover-chip" style="background:#E0F7FA"></span>
    </div>
  </div>
${slides}
</body></html>`;
}

async function main() {
  console.log(`▶  launching puppeteer…`);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    const url = `${HOST}/?theme=equiti&bare=1`;
    console.log(`▶  navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });
    // Nav is `position: sticky` so as we scroll to each section the nav follows the
    // viewport and bleeds into the captured area. Pin it to its DOM-natural position
    // (the Nav is the first child of the App wrapper).
    await page.addStyleTag({ content: `
      #root > div > div:first-child { position: static !important; top: auto !important; }
    ` });
    await ensureFonts(page);
    await sleep(800);

    // Pre-pass: scroll the whole page from top to bottom so every GSAP ScrollTrigger
    // fires. With `toggleActions: 'play none none reverse'`, the elements would
    // re-reverse on scroll-back-up — so after this pre-pass we leave the page at the
    // bottom and let each captureSlide() scroll FORWARD (downward) from its previous
    // position. Since SLIDES is in DOM order, every per-slide scroll is downward.
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      const step = window.innerHeight * 0.7;
      for (let y = 0; y <= h; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    await sleep(800);

    const captures = [];
    for (const slide of SLIDES) {
      console.log(`📸 ${slide.title}`);
      const dataUrl = await captureSlide(page, slide);
      captures.push({ ...slide, dataUrl });
    }

    console.log(`▶  composing deck`);
    const html = deckHTML(captures);
    const tmpPath = '/tmp/jwd-equiti-deck.html';
    await fs.writeFile(tmpPath, html, 'utf8');

    const deckPage = await browser.newPage();
    await deckPage.goto(`file://${tmpPath}`, { waitUntil: 'networkidle0' });
    await ensureFonts(deckPage);
    await sleep(500);

    console.log(`▶  rendering PDF → ${OUT}`);
    await deckPage.pdf({
      path: OUT,
      width: `${SLIDE_W}px`,
      height: `${SLIDE_H}px`,
      printBackground: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      preferCSSPageSize: true,
    });

    const stat = await fs.stat(OUT);
    console.log(`✓  done · ${(stat.size / 1024).toFixed(0)} KB · ${captures.filter(c => c.dataUrl).length} screenshots + cover`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
