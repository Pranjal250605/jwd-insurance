import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Dev-only middleware that mirrors the deployed Vercel function
 * (api/advisor.ts) so the AI advisor works under `npm run dev`.
 * Reads GROQ_API_KEY from .env.local — the key never reaches the client.
 */
function advisorDevApi(apiKey: string): Plugin {
  return {
    name: 'advisor-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/advisor', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed.' }));
          return;
        }
        if (!apiKey) {
          res.statusCode = 503;
          res.end(JSON.stringify({ error: 'AI advisor is not configured. Set GROQ_API_KEY in .env.local.' }));
          return;
        }
        try {
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const { sanitizeMessages, groqStream, transformGroqSse, MAX_MESSAGES } =
            await import('./shared/advisor-core.mjs');
          const raw = body?.messages;
          if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid messages.' }));
            return;
          }
          const messages = sanitizeMessages(raw);
          const upstream = await groqStream(apiKey, messages, body.locale === 'ja' ? 'ja' : 'en');
          if (!upstream.ok || !upstream.body) {
            res.statusCode = 502;
            res.end(JSON.stringify({ error: 'The advisor is unavailable right now.' }));
            return;
          }
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          });
          const reader = transformGroqSse(upstream.body).getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
          res.end();
        } catch (err) {
          console.error('advisor dev api error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal server error.' }));
        }
      });
    },
  };
}

/**
 * Dev-only middleware mirroring the deployed Vercel function (api/fx.ts), so
 * the hero's exchange-rate chip shows a live number under `npm run dev` too.
 */
function fxDevApi(): Plugin {
  return {
    name: 'fx-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/fx', async (_req, res) => {
        try {
          const upstream = await fetch('https://open.er-api.com/v6/latest/AED', {
            headers: { accept: 'application/json' },
          });
          const data = await upstream.json();
          const jpy = data?.rates?.JPY;
          if (data?.result !== 'success' || typeof jpy !== 'number') throw new Error('bad payload');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            jpy,
            updated: data.time_last_update_utc ?? null,
            next: data.time_next_update_utc ?? null,
          }));
        } catch (err) {
          console.error('fx dev api error:', err);
          res.statusCode = 503;
          res.end(JSON.stringify({ error: 'Rate unavailable.' }));
        }
      });
    },
  };
}

/** Dev-only mirror of api/consent.ts so the 08.25 registration flow works
 *  under `npm run dev`. Logs the same single line the edge function does. */
function consentDevApi(): Plugin {
  return {
    name: 'consent-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/consent', async (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('{}'); return; }
        const chunks: Buffer[] = [];
        for await (const c of req) chunks.push(c as Buffer);
        try {
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          console.log('consent-accepted', JSON.stringify({ at: new Date().toISOString(), ...body }));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid body.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, '');
  return {
    plugins: [react(), advisorDevApi(env.GROQ_API_KEY ?? ''), fxDevApi(), consentDevApi()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  };
});
