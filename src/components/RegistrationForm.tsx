import { useState } from 'react';
import { useT } from '@/i18n';

/* 08.25 revision, item 5. The notice now sits behind a short registration
   step, because the client needs to be able to say *who* consented — an
   anonymous tick records nothing.

   This component only collects and validates. What happens to the details is
   the caller's business: see ConsentGate for where they go. */

export interface Registration {
  name: string;
  kana: string;
  phone: string;
  email: string;
  entity: 'corporate' | 'individual';
  company: string;
}

const EMPTY: Registration = { name: '', kana: '', phone: '', email: '', entity: 'individual', company: '' };

export default function RegistrationForm({ onDone }: { onDone: (r: Registration) => void }) {
  const { t } = useT();
  const f = t.consent.form;
  const [v, setV] = useState<Registration>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Registration, string>>>({});

  const set = (k: keyof Registration) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setV((prev) => ({ ...prev, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Registration, string>> = {};
    (['name', 'kana', 'phone', 'email'] as const).forEach((k) => {
      if (!v[k].trim()) next[k] = f.required;
    });
    // Deliberately loose: a stricter pattern rejects valid addresses, and the
    // address is verified by actually reaching the person, not by a regex.
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) next.email = f.invalidEmail;
    // Company name is only meaningful for corporate registrations.
    if (v.entity === 'corporate' && !v.company.trim()) next.company = f.required;

    setErrors(next);
    if (Object.keys(next).length === 0) onDone({ ...v, name: v.name.trim(), email: v.email.trim() });
  };

  const field = (k: keyof Registration, label: string, type = 'text', autoComplete?: string) => (
    <label className="block">
      <span className="block text-[17px] sm:text-[18.5px] font-semibold text-slate-800 mb-2">{label}</span>
      <input
        type={type}
        value={v[k] as string}
        onChange={set(k)}
        autoComplete={autoComplete}
        aria-invalid={errors[k] ? true : undefined}
        className={`w-full h-[54px] rounded-lg border-2 bg-white px-4 text-[18px] text-slate-900 outline-none transition-colors focus:border-[var(--accent-deep)] ${
          errors[k] ? 'border-rose-400' : 'border-slate-200'
        }`}
      />
      {errors[k] && <span className="mt-1.5 block text-[15px] text-rose-500">{errors[k]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="rounded-3xl p-5 sm:p-10" style={{ background: 'var(--accent-soft)' }}>
      <div className="bg-white rounded-2xl px-5 sm:px-10 py-8 sm:py-11">
        <h1 className="text-[21px] sm:text-[24px] font-bold text-slate-900 leading-relaxed mb-3">{f.heading}</h1>
        <p className="text-[17px] leading-[1.8] text-slate-600 mb-9">{f.note}</p>

        <div className="grid sm:grid-cols-2 gap-6">
          {field('name', f.name, 'text', 'name')}
          {field('kana', f.kana)}
          {field('phone', f.phone, 'tel', 'tel')}
          {field('email', f.email, 'email', 'email')}

          <label className="block">
            <span className="block text-[17px] sm:text-[18.5px] font-semibold text-slate-800 mb-2">{f.entity}</span>
            <select
              value={v.entity}
              onChange={set('entity')}
              className="w-full h-[54px] rounded-lg border-2 border-slate-200 bg-white px-4 text-[18px] text-slate-900 outline-none transition-colors focus:border-[var(--accent-deep)]"
            >
              <option value="individual">{f.individual}</option>
              <option value="corporate">{f.corporate}</option>
            </select>
          </label>

          {field('company', f.company, 'text', 'organization')}
        </div>
        <p className="mt-3 text-[15.5px] text-slate-500">{f.companyNote}</p>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="cta-primary h-[56px] px-14 rounded-full text-[18px] font-bold tracking-[0.08em]"
          >
            {f.next}
          </button>
        </div>
      </div>
    </form>
  );
}
