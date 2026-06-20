import { useId, useState } from 'react';

/**
 * Pre-launch "let me know when it drops" signup. Static site, no backend — the
 * email is POSTed straight to Formspree (AJAX, so the page never reloads) and
 * lands in the Formspree dashboard. On success we swap the field for a
 * "Big up yaself!" confirmation. No confirmation email is sent.
 *
 * SETUP: create a free form at https://formspree.io and paste its endpoint
 * below. Until that's done the form will report an error on submit.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mojzgyjp';

// Pragmatic email shape check — mirrors the browser's native type="email" rule.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailSignup({ releaseTitle }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | done | error
  const inputId = useId();

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      });
      if (!res.ok) throw new Error('signup failed');
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="signup signup--done" role="status" aria-live="polite">
        {/* Nautical "Answering Pennant" — in the Code of Signals it means
            "message received and understood." It hoists, then flutters. */}
        <span className="pennant" role="img" aria-label="Answering pennant hoisted — signal received">
          <svg className="pennant__flag" viewBox="0 0 140 60" aria-hidden="true" focusable="false">
            <clipPath id="pennant-clip">
              <polygon points="0,0 140,30 0,60" />
            </clipPath>
            <g clipPath="url(#pennant-clip)">
              <rect x="0"   y="0" width="28" height="60" className="pennant__red" />
              <rect x="28"  y="0" width="28" height="60" className="pennant__white" />
              <rect x="56"  y="0" width="28" height="60" className="pennant__red" />
              <rect x="84"  y="0" width="28" height="60" className="pennant__white" />
              <rect x="112" y="0" width="28" height="60" className="pennant__red" />
            </g>
          </svg>
        </span>
        <p className="signup__done">Big up yaself!</p>
        <p className="signup__done-sub">Proud of that &mdash; welcome to Ras Reality.</p>
      </div>
    );
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      <label className="signup__label" htmlFor={inputId}>Let me know when it drops</label>
      {releaseTitle && <input type="hidden" name="release" value={releaseTitle} />}
      <input type="hidden" name="_subject" value={`New "${releaseTitle || 'release'}" signup`} />
      <div className="signup__row">
        <input
          id={inputId}
          className="signup__input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? `${inputId}-err` : undefined}
          required
        />
        <button
          type="submit"
          className="release__btn release__btn--primary signup__btn"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending…' : 'Notify me'}
        </button>
      </div>
      {status === 'error' && (
        <p className="signup__error" id={`${inputId}-err`} role="alert">
          {EMAIL_RE.test(email.trim())
            ? 'Miscommunication... please try again.'
            : 'Bumboclot email!'}
        </p>
      )}
    </form>
  );
}
