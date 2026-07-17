import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useT } from '@/i18n';

/**
 * AI Advisor chat — ported from jwd-web's ChatWidget/ChatPanel, adapted to
 * this Vite SPA. Streams from /api/advisor (Vercel edge function in prod,
 * Vite dev middleware locally). Supports the [[GOTO:/path]] navigation
 * directive on this site's two routes.
 */

interface Msg {
  role: 'user' | 'assistant';
  content: string;
  error?: boolean;
}

const GOTO_RE = /\[\[GOTO:([^\]]+)\]\]/;

function AiSpark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4L12 2z" fill="currentColor" />
      <path d="M19 3l.8 2.4L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.6L19 3z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

/* Markdown-lite: **bold**, [text](url), "- " bullets, paragraphs. */
function renderInline(text: string, key: number): ReactNode {
  const parts: ReactNode[] = [];
  let rest = text;
  let i = 0;
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/;
  for (;;) {
    const m = rest.match(pattern);
    if (!m || m.index == null) break;
    if (m.index > 0) parts.push(rest.slice(0, m.index));
    if (m[1] != null) {
      parts.push(<strong key={`${key}-${i++}`} className="font-semibold text-slate-900">{m[1]}</strong>);
    } else {
      const href = m[3].startsWith('/') ? `#${m[3] === '/' ? '' : m[3]}` : m[3];
      const ext = !m[3].startsWith('/');
      parts.push(
        <a key={`${key}-${i++}`} href={href} target={ext ? '_blank' : undefined} rel={ext ? 'noopener noreferrer' : undefined}
          className="underline font-medium" style={{ color: 'var(--accent-deep)' }}>{m[2]}</a>,
      );
    }
    rest = rest.slice(m.index + m[0].length);
  }
  if (rest) parts.push(rest);
  return parts;
}

function Markdown({ text }: { text: string }) {
  const clean = text.replace(GOTO_RE, '').trimEnd();
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  let k = 0;
  const flush = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={k++} className="my-1.5 flex flex-col gap-1 pl-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-400" />
              <span>{renderInline(b, k * 100 + i)}</span>
            </li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };
  for (const line of clean.split('\n')) {
    const s = line.trim();
    if (s.startsWith('- ')) { bullets.push(s.slice(2)); continue; }
    flush();
    if (s) blocks.push(<p key={k++} className="my-1">{renderInline(s, k * 100)}</p>);
  }
  flush();
  return <>{blocks}</>;
}

export default function Advisor() {
  const { lang, t } = useT();
  const a = t.advisor;

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs, open]);

  const newChat = () => {
    abortRef.current?.abort();
    setMsgs([]);
    setBusy(false);
  };

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    setInput('');
    const history: Msg[] = [...msgs, { role: 'user', content }];
    setMsgs([...history, { role: 'assistant', content: '' }]);
    setBusy(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    let acc = '';
    const patch = (m: Partial<Msg>) =>
      setMsgs((cur) => cur.map((x, i) => (i === cur.length - 1 ? { ...x, ...m } : x)));

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(({ role, content: c }) => ({ role, content: c })),
          locale: lang,
        }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => null);
        patch({ content: err?.error ?? a.error, error: true });
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
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
            if (json.error) { patch({ content: json.error, error: true }); continue; }
            if (json.text) { acc += json.text; patch({ content: acc }); }
          } catch { /* partial frame */ }
        }
      }
      // Navigation directive
      const go = acc.match(GOTO_RE)?.[1];
      if (go === '/properties') window.location.hash = '#/properties';
      else if (go === '/') window.location.hash = '';
    } catch (err) {
      if ((err as Error).name !== 'AbortError') patch({ content: a.error, error: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* floating trigger — sits left of the tweaks cog */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={a.label}
          className="fixed bottom-4 right-16 z-50 flex items-center gap-2 rounded-full py-2.5 pl-3 pr-5 text-white shadow-[0_12px_34px_-8px_rgba(7,128,124,0.6)] transition-transform hover:scale-[1.04]"
          style={{ background: 'var(--gradient-dark)' }}
        >
          <AiSpark className="h-6 w-6" />
          <span className="text-[14px] font-semibold tracking-wide">{a.label}</span>
        </button>
      )}

      {open && (
        <div
          className="fixed z-[60] flex flex-col overflow-hidden bg-white shadow-2xl border border-slate-200
            inset-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:h-[620px] sm:w-[400px] sm:rounded-2xl"
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: 'var(--accent-deep)' }}>
                <AiSpark className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900 leading-tight">{a.title}</div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10.5px] uppercase tracking-wide text-slate-400">{a.online}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={newChat} title={a.newChat} aria-label={a.newChat}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            <div className="text-[14px] leading-[1.6] text-slate-700 bg-slate-50 rounded-2xl rounded-tl-md px-4 py-3 max-w-[92%]">
              {a.greeting}
            </div>
            {msgs.length === 0 && (
              <div className="flex flex-col items-start gap-2 mt-1">
                {a.suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    className="px-3.5 py-2 rounded-full border text-[13px] font-medium transition-all hover:-translate-y-0.5"
                    style={{ color: 'var(--accent-deep)', borderColor: 'var(--accent-deep)', background: 'var(--accent-soft)' }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              m.role === 'user' ? (
                <div key={i} className="self-end text-[14px] leading-[1.6] text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[85%]" style={{ background: 'var(--accent-deep)' }}>
                  {m.content}
                </div>
              ) : (
                <div key={i} className={`text-[14px] leading-[1.6] rounded-2xl rounded-tl-md px-4 py-3 max-w-[92%] ${m.error ? 'bg-rose-50 text-rose-700' : 'bg-slate-50 text-slate-700'}`}>
                  {m.content ? (
                    <Markdown text={m.content} />
                  ) : (
                    <span className="inline-flex gap-1 items-center h-4">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: `${d * 150}ms` }} />
                      ))}
                    </span>
                  )}
                </div>
              )
            ))}
          </div>

          {/* input */}
          <form
            className="border-t border-slate-100 p-3 flex items-center gap-2"
            onSubmit={(e) => { e.preventDefault(); send(input); }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={a.placeholder}
              className="flex-1 h-11 px-4 rounded-full border border-slate-200 text-[14px] outline-none focus:border-slate-400 bg-white"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="h-11 w-11 rounded-full flex items-center justify-center text-white disabled:opacity-40 transition-opacity flex-shrink-0"
              style={{ background: 'var(--accent-deep)' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
          <div className="px-4 pb-2 text-[10.5px] text-slate-400 text-center">{a.disclaimer}</div>
        </div>
      )}
    </>
  );
}
