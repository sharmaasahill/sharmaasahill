import { useEffect, useState } from 'react';
import { FiAlertCircle, FiArrowUpRight, FiCheck, FiCopy, FiTerminal } from 'react-icons/fi';
import { contact, links } from '../data/portfolioData';

// Our own serverless function (api/contact.js). It talks to Resend server-side,
// so no key is exposed here and the response is a real delivery result.
const ENDPOINT = '/api/contact';
const EMPTY = { name: '', email: '', message: '', botcheck: '' };

const FIELDS = [
  { name: 'name', type: 'text', autoComplete: 'name', maxLength: 100 },
  { name: 'email', type: 'email', autoComplete: 'email', maxLength: 254 },
  { name: 'message', multiline: true, maxLength: 5000 },
];

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const onChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    // Honeypot: a bot filled the hidden field. Stop without claiming success.
    if (form.botcheck) return;

    setStatus('sending');
    setError('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }

      if (res.ok && data?.success) {
        setStatus('success');
        setForm(EMPTY);
        return;
      }

      // Real failure: show what the server actually reported.
      setStatus('error');
      setError(
        data?.message ||
          (res.status === 404
            ? 'Contact endpoint not found. On the plain Vite server, restart "npm run dev".'
            : `Request failed (HTTP ${res.status} ${res.statusText}).`)
      );
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof TypeError
          ? 'Network error: could not reach the server. Check your connection and try again.'
          : err?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const locked = status === 'sending' || status === 'success';

  return (
    <form id="contact-form" className="form" onSubmit={onSubmit} data-reveal>
      {FIELDS.map((field) => {
        const id = `cf-${field.name}`;
        const copy = contact.fields[field.name];
        const shared = {
          id,
          name: field.name,
          value: form[field.name],
          onChange,
          required: true,
          disabled: locked,
          placeholder: copy.placeholder,
          maxLength: field.maxLength,
        };
        return (
          <div key={field.name} className="field">
            <label htmlFor={id}>{copy.label}</label>
            {field.multiline ? (
              <textarea {...shared} rows={5} />
            ) : (
              <input {...shared} type={field.type} autoComplete={field.autoComplete} />
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people, tempting to bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        checked={Boolean(form.botcheck)}
        onChange={(event) => setForm({ ...form, botcheck: event.target.checked ? '1' : '' })}
        style={{ display: 'none' }}
      />

      <div className="form__foot">
        <div
          className={`form__status${status === 'success' ? ' is-success' : ''}${status === 'error' ? ' is-error' : ''}`}
          role="status"
          aria-live="polite"
        >
          {status === 'idle' && <span>{contact.idle}</span>}
          {status === 'sending' && <span>Sending…</span>}
          {status === 'success' && (
            <>
              <FiCheck aria-hidden="true" />
              <span>{contact.success}</span>
            </>
          )}
          {status === 'error' && (
            <>
              <FiAlertCircle aria-hidden="true" />
              <span>
                {error} <a href={`mailto:${links.email}`}>Email me instead</a>.
              </span>
            </>
          )}
        </div>

        <button type="submit" className="btn btn--primary" disabled={locked}>
          {status === 'sending' ? 'Sending…' : status === 'success' ? 'Delivered' : status === 'error' ? 'Try again' : contact.submit}
          {status === 'success' ? <FiCheck aria-hidden="true" /> : <FiArrowUpRight aria-hidden="true" />}
        </button>
      </div>
    </form>
  );
}

function CopyEmail() {
  const [state, setState] = useState('idle'); // idle | copied | failed

  // Go back to the resting label a moment after any result.
  useEffect(() => {
    if (state === 'idle') return undefined;
    const timer = setTimeout(() => setState('idle'), 2200);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <button type="button" className="copy-email" onClick={copy}>
      {state === 'copied' ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      <span aria-live="polite">{state === 'copied' ? contact.copied : state === 'failed' ? 'Copy blocked, select it instead' : contact.copy}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="rail">
        <div className="contact__icon" data-reveal aria-hidden="true">
          <FiTerminal />
        </div>
        <p className="eyebrow" data-reveal>
          <b>05</b> / {contact.eyebrow}
        </p>
        <h2 id="contact-title" className="h2" data-lines>
          <span className="line">
            <span>{contact.title[0]} </span>
          </span>
          <span className="line muted">
            <span>{contact.title[1]}</span>
          </span>
        </h2>
        <p className="contact__body" data-reveal>
          {contact.body[0]} <br className="br-desktop" />
          {contact.body[1]}
        </p>

        <ContactForm />

        <div className="form__note" data-reveal>
          <span>{contact.alt}</span>
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <CopyEmail />
          <span aria-hidden="true">·</span>
          <a href={links.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <p className="contact__sign" aria-hidden="true">
          {contact.sign}
        </p>
      </div>
    </section>
  );
}
