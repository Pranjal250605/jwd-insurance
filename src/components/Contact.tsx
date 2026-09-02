import { useState } from 'react';
import { apiUrl } from '@/lib/paths';
import { NO_BACKEND, contactEmail } from '@/lib/runtime';
import { useT } from '@/i18n';

/* The consultation form at the foot of the page, modelled on the DWC site's
   so the two read as one group. The asset-range chips that site carries are
   deliberately not here — the client asked for them out.

   Posts to /api/contact, which emails the enquiry on. A failure is shown
   rather than swallowed: unlike the consent record, the reader needs to know
   whether their message actually went. */

interface Enquiry { name: string; email: string; message: string }

const EMPTY: Enquiry = { name: '', email: '', message: '' };

export default function Contact() {
  const { t } = useT();
  const c = t.contact;
  const [v, setV] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Enquiry, string>> = {};
    if (!v.name.trim()) next.name = c.required;
    if (!v.email.trim()) next.email = c.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) next.email = c.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) return;

    /* Static hosts (onamae, MilesWeb) run no server to post to, so the
       enquiry is handed to the visitor's own mail client with the fields
       already filled in. It leaves their outbox rather than ours, which is
       the honest limit of a site with no backend — but it does reach us,
       where a form that always errored would not. */
    if (NO_BACKEND) {
      const to = contactEmail();
      if (!to) {
        // site-config.js was never filled in. Say so rather than opening a
        // blank mail window the visitor cannot address.
        setState('failed');
        return;
      }
      const subject = `${c.submit}: ${v.name.trim()}`;
      const body = [
        `${c.name}: ${v.name.trim()}`,
        `${c.email}: ${v.email.trim()}`,
        '',
        v.message.trim(),
      ].join('\n');
      window.location.href =
        `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState('sent');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...v, name: v.name.trim(), email: v.email.trim() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
    } catch {
      setState('failed');
    }
  };

  const inputCls = (bad?: string) =>
    `w-full h-[58px] rounded-lg border-2 bg-white px-4 text-[18px] text-slate-900 outline-none transition-colors focus:border-[var(--accent-deep)] ${
      bad ? 'border-rose-400' : 'border-slate-200'
    }`;

  return (
    <section id="contact" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div
          data-spotlight
          className="spotlight rounded-[20px] px-6 py-12 sm:px-12 sm:py-16"
          style={{ background: 'linear-gradient(135deg, var(--accent-soft) 0%, #ffffff 70%)' }}
        >
          <div className="max-w-[760px] mx-auto text-center">
            <div className="eyebrow-rule inline-block text-[13px] font-semibold tracking-[0.28em] mb-4" style={{ color: 'var(--accent-deep)' }}>
              {c.eyebrow}
            </div>
            <h2 className="font-serif fluid-36-44 leading-[1.25] font-medium text-slate-900 tracking-[-0.015em] mb-4">
              {c.title}
            </h2>
            <p className="text-[19px] leading-[1.8] text-slate-600 mb-10">{c.body}</p>
          </div>

          {state === 'sent' ? (
            <div className="max-w-[760px] mx-auto text-center rounded-2xl bg-white px-6 py-12">
              <span
                className="inline-flex w-14 h-14 rounded-full items-center justify-center text-[26px] mb-4"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent-deep)' }}
                aria-hidden="true"
              >
                ✓
              </span>
              <p className="text-[20px] font-semibold text-slate-800">{c.done}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="max-w-[760px] mx-auto">
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <input
                    value={v.name}
                    onChange={set('name')}
                    placeholder={c.name}
                    autoComplete="name"
                    aria-label={c.name}
                    aria-invalid={errors.name ? true : undefined}
                    className={inputCls(errors.name)}
                  />
                  {errors.name && <span className="mt-1.5 block text-[15px] text-rose-500">{errors.name}</span>}
                </label>
                <label className="block">
                  <input
                    type="email"
                    value={v.email}
                    onChange={set('email')}
                    placeholder={c.email}
                    autoComplete="email"
                    aria-label={c.email}
                    aria-invalid={errors.email ? true : undefined}
                    className={inputCls(errors.email)}
                  />
                  {errors.email && <span className="mt-1.5 block text-[15px] text-rose-500">{errors.email}</span>}
                </label>
              </div>

              <textarea
                rows={4}
                value={v.message}
                onChange={set('message')}
                placeholder={c.message}
                aria-label={c.message}
                className="mt-5 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3.5 text-[18px] leading-[1.7] text-slate-900 outline-none transition-colors focus:border-[var(--accent-deep)] resize-y"
              />

              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="cta-primary h-[58px] px-14 rounded-full text-[18px] font-bold tracking-[0.08em] disabled:opacity-60"
                >
                  {c.submit}
                </button>
                {state === 'failed' && <p className="text-[16px] text-rose-500">{c.failed}</p>}
                <p className="text-[15.5px] text-slate-500 text-center">{c.note}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
