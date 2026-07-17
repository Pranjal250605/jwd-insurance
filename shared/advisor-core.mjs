/**
 * Shared advisor core — knowledge base + system prompt + Groq request helper.
 * Plain ESM so both the Vercel edge function (api/advisor.ts) and the Vite dev
 * middleware (vite.config.ts) can import it. Ported from jwd-web's advisor
 * (src/app/api/advisor/route.ts + src/lib/knowledge-base.ts), adapted to the
 * jwd-insurance site.
 */

export const MAX_MESSAGES = 40;
export const MAX_MSG_CHARS = 4000;
const VALID_ROLES = new Set(['user', 'assistant']);

/** Static knowledge base describing this site and the JWD Group. */
export const KNOWLEDGE_BASE = `
# JWD INVESTMENT (this site)
Independently-owned wealth management and investment advisory firm, serving private clients, family offices and institutions across global markets since 2014. Part of the JWD Group ("Japan WorldLink"), the bridge between Japan and Dubai wealth creation.
Key figures: $48B assets under management, 1,200+ client relationships, 11 global offices, 10-year median client tenure.
Offices: Tokyo (headquarters), London, New York, Singapore, Zürich and six more.
Regulated by: FCA (UK), SEC (US), FSA 金融庁 (Japan), FINMA (Switzerland), MAS (Singapore).
Awards: Wealth Manager of the Year (Asia Private Banker 2025), Best Discretionary Portfolio (Euromoney 2024), Outstanding ESG Integration (PRI Awards 2024).
Flagship strategy: Global Balanced Composite (since 2014) — +9.4% 5y annualised return, 1.18 Sharpe net of fees, −7.2% max 5y drawdown. Allocation: 52% global equities, 28% fixed income, 14% alternatives, 6% cash.
Service in six languages: English, Japanese, Chinese, German, French, Spanish. The site itself is bilingual — the EN / 日本語 toggle is in the top bar.

# SITE MAP (what is on each part of this site)
- Home hero: headline, consultation CTA, brochure download, Equiti & AIX partner cards, key stats.
- "Trade with Equiti" section: 7 tradable markets, each linking to the official Equiti product page.
- "Real Estate Portfolio" section: Dubai Property Portfolio (ANAWAK Real Estate L.L.C) with Bayut / Property Finder links, and The Heart of Europe flagship project.
- Private Wealth Advisory: discretionary management for $5M+ investable assets; senior advisor Hiroshi Matsuda, CFA (Tokyo).
- Why partner with JWD: disciplined process, long-term horizon, personal access.
- Investment Solutions: Global Equities ($18.4B AUM), Fixed Income ($11.2B), Private Markets ($9.6B), Sustainable/ESG ($5.8B).
- Partnership process: 1 Discovery, 2 Strategy & alignment (IPS), 3 Implementation & stewardship with quarterly reviews.
- Global reach, JWD Client Portal (performance reporting, tax-aware analytics, secure document vault), Insights & research, closing consultation CTA, footer.
- PORTFOLIO PAGE at /properties ("Portfolio" in the navbar): client-acquired Dubai properties with charts — allocation donut, price-per-sqft bars, per-property price history & 5-yr projection, metrics (gross/net yield, ROI, IRR, payback), an interactive growth simulator (this property vs keeping capital in Japan, 20.315% Japan CGT vs Dubai 0%), and risks & hedges.

# INVESTMENT PLATFORMS (partners)
Equiti (equiti.com/sc-en): global multi-asset trading platform — institutional-grade execution.
Tradable markets via Equiti, each with official product page links from this site:
- Forex: 80+ currency pairs, tight spreads
- Indices: the world's major stock indices as CFDs
- Commodities: gold, oil and core commodities
- Shares: blue-chip global equities, long or short
- ETFs: diversified funds in a single trade
- Crypto CFDs: major digital assets around the clock
- Gold Option CFDs: hedge and trade options on gold
AIX Investment (aixinvestment.com): alternative investment fund centred on real assets. Illustrative real-asset allocation: 45% real estate, 25% infrastructure, 18% private credit, 12% cash & other.
Both feature independent governance, risk management and transparent reporting. Trading CFDs involves significant risk of loss.

# REAL ESTATE (JWD Group)
ANAWAK Real Estate L.L.C: the group's Dubai property arm — investment, acquisition and management. Search structured by five axes: area, budget, property type, yield, developer. Portals: Bayut (bayut.com), Property Finder (propertyfinder.ae).
The Heart of Europe: JWD's flagship resort project, 4km off the Dubai coast at the heart of "The World" man-made archipelago (theheartofeurope.emirates.expert, theworld-dubai.com).

# CLIENT PROPERTY PORTFOLIO (the /properties page — placeholder demo inventory)
Total AED 21,400,000 across 4 assets, avg gross yield 6.9%, ~+34% growth since '21 (modelled at 6% p.a.):
- Downtown 1BR Residence (Downtown Dubai): AED 1,850,000, 6.8% yield, 1BR, 820sqft. Burj Khalifa views; deep tourist/expat demand.
- Marina 2BR Waterfront (Dubai Marina): AED 2,400,000, 7.1% yield, 2BR, 1,250sqft. Sea and marina views.
- Palm Jumeirah 5BR Villa: AED 16,500,000, 5.2% yield, 6,500sqft, private beach. Scarcity-driven value preservation.
- JVC High-Yield Studio (Jumeirah Village Circle): AED 650,000, 8.4% yield, 480sqft. 8%+ gross achievable — entry asset.
Analysis model assumptions (illustrative, AI-modelled): 6% p.a. appreciation, 6% purchase costs, 2% exit costs, ~AED 18/sqft/yr running costs, 5-yr hold, AED≈¥41.
Indicative price per sqft by area (AED): JVC 950, Business Bay 1,600, Marina 1,750, Downtown 2,100, Palm 3,200.

# DUBAI INVESTMENT FACTS
0% personal income tax, 0% capital gains tax (Japan: 20.315% financial-income tax), average rental yield 7%+ (JVC 8%+, Downtown 6-7%, Marina 7%+), 100% foreign ownership in freehold areas, Golden Visa from AED 2M+ property, AED pegged to USD, corporate tax 9% with free-zone exemptions.

# CONTACT / NEXT STEPS
"Schedule a consultation" buttons throughout the site. Consultations with a senior advisor about goals, portfolio and long-term planning. Capabilities brochure available for download.
`;

/**
 * System prompt (adapted from jwd-web). GOTO paths are limited to this SPA's
 * two routes; the client maps them onto hash navigation.
 */
export function buildSystemPrompt(locale) {
  const localeHint =
    locale === 'ja'
      ? 'The user is viewing the Japanese version of the site. Default to Japanese unless they write in English.'
      : 'The user is viewing the English version of the site. Default to English unless they write in Japanese.';

  return `You are the JWD Investment AI Advisor — a knowledgeable, friendly and professional wealth-management consultant embedded in the JWD Investment website. Your job is to explain the site, the JWD Group's services and platforms, and help visitors find what they need.

## YOUR KNOWLEDGE BASE
Ground ALL answers in this data. Do NOT invent figures, properties or services that are not here; if a figure is missing, say so.
${KNOWLEDGE_BASE}

## RESPONSE GUIDELINES
Read intent first and size the answer to it; lean SHORTER when unsure. Users may write with typos or mixed Japanese/English — infer what they MEANT, never nitpick spelling.

### SHORT answers (1–3 sentences, no headers) for:
- Greetings/small talk → warm one-liner + quick offer to help.
- Simple factual lookups (one figure, a yes/no, a definition).
- Navigation — ONLY for an explicit command to open/show/go to a page (e.g. "show me the portfolio", "take me to the properties page"): reply with ONE confirming sentence, then on its own final line output EXACTLY [[GOTO:/properties]] or [[GOTO:/]]. Those are the ONLY two GOTO paths. External sites (Equiti, AIX, Bayut, Property Finder, Heart of Europe) are plain text links, never GOTO. Never emit GOTO for opinion/analysis questions.

### DETAILED answers (~200–500 words) only when the user asks for analysis, a comparison, planning or "should I…". Then: direct answer first, bold lead lines (no big headers), "-" bullets, NEVER Markdown tables (narrow chat window). Show worked figures (e.g. "6.8% on AED 1,850,000 ≈ AED 125,800/yr"). Include risks AND hedges, then assumptions — flag that portfolio figures are illustrative/modelled.

### Always:
1. NEVER give personalised financial advice — for tailored recommendations say a consultation with a JWD senior advisor can be scheduled from the site.
2. Match the user's language (Japanese or English).
3. Format numbers clearly: AED 1,850,000 / ¥75,850,000 / 6.8%.
4. This site's own pages are / (home) and /properties (client portfolio). Site sections live on the home page.

${localeHint}`;
}

/** Validate and clamp incoming messages (prompt-injection / cost defence). */
export function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m) =>
        !!m &&
        typeof m.role === 'string' &&
        VALID_ROLES.has(m.role) &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }));
}

/**
 * Call Groq (OpenAI-compatible REST, no SDK) and return the upstream streaming
 * Response. Caller transforms the OpenAI SSE format into simple {text} events.
 */
export async function groqStream(apiKey, messages, locale) {
  return fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'system', content: buildSystemPrompt(locale) }, ...messages],
      temperature: 0.6,
      max_completion_tokens: 4096,
      reasoning_effort: 'medium',
      reasoning_format: 'hidden',
      stream: true,
    }),
  });
}

/**
 * Pipe a Groq OpenAI-format SSE body into simple \`data: {"text"}\` events.
 * Returns a web ReadableStream (works on Vercel Edge and Node 18+).
 */
export function transformGroqSse(upstreamBody) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buf = '';
  return new ReadableStream({
    async start(controller) {
      const reader = upstreamBody.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            const s = line.trim();
            if (!s.startsWith('data:')) continue;
            const payload = s.slice(5).trim();
            if (payload === '[DONE]') continue;
            try {
              const json = JSON.parse(payload);
              const text = json.choices?.[0]?.delta?.content ?? '';
              if (text) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            } catch { /* ignore partial frames */ }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.error('Advisor stream error:', err);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: 'The advisor hit a problem. Please try again.' })}\n\n`),
        );
        controller.close();
      }
    },
  });
}
