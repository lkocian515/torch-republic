import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { trackEvent } from '@/lib/analyticsEvents';

/**
 * A real notification request. Every submission is stored against the exact
 * release it is about, so a customer is never added to an unrelated list and
 * the request can never be mistaken for the general newsletter.
 *
 * Marketing consent is a separate, unchecked box.
 */
export default function SeasonalInterestForm({
  kind = 'notify',
  productSlug = '',
  productName = '',
  source = 'seasonal-calendar',
  buttonLabel = 'Notify me',
  note = null,
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    setSubmitting(true);
    setStatus(null);
    try {
      await base44.entities.SeasonalInterest.create({
        email: value,
        kind,
        product_slug: productSlug,
        product_name: productName,
        marketing_consent: consent,
        source,
      });

      // A club waitlist join also belongs on the club roster; the request above
      // stays the source of truth, so a roster miss never fails the signup.
      if (kind === 'club_waitlist') {
        try {
          await base44.functions.invoke('trackClubSubscriber', { email: value, source });
        } catch {
          // Roster entry is a convenience; the stored request already stands.
        }
      }

      const done =
        kind === 'return_list'
          ? `We'll email ${value} if ${productName} returns.`
          : kind === 'club_waitlist'
            ? `You're on the waitlist. We'll email ${value} when enrollment opens.`
            : `We'll email ${value} when ${productName} is available.`;
      // The stored request is the truth; this only measures how it was reached.
      trackEvent('interest_submit', { kind, source }, `interest-${kind}-${value}`);
      setStatus({ type: 'success', message: done });
      setEmail('');
      setConsent(false);
      setOpen(false);
    } catch {
      setStatus({ type: 'error', message: 'That did not go through. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (status?.type === 'success') {
    return (
      <p role="status" className="body" style={{ fontSize: '0.9375rem', color: 'hsl(var(--foreground))', margin: 0 }}>
        {status.message}
      </p>
    );
  }

  if (!open) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 px-4 font-heading text-sm font-semibold transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            borderRadius: 999,
            border: '1px solid hsl(var(--primary))',
            color: 'hsl(var(--primary))',
            background: 'transparent',
          }}
        >
          {buttonLabel}
        </button>
        {note ? <span className="body" style={{ fontSize: '0.8125rem' }}>{note}</span> : null}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
      <label className="sr-only" htmlFor={`interest-email-${productSlug || kind}`}>
        Email address for {productName || 'this notification'}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`interest-email-${productSlug || kind}`}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="min-h-[44px] flex-1 px-3 body focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            borderRadius: 4,
            border: '1px solid hsl(var(--border))',
            background: '#FFFCF7',
            color: 'hsl(var(--foreground))',
          }}
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 px-4 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
          style={{ borderRadius: 4, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {submitting ? 'Sending' : 'Send'}
        </button>
      </div>

      <label className="flex items-start gap-2 body" style={{ fontSize: '0.8125rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4"
          style={{ accentColor: 'hsl(var(--primary))' }}
        />
        <span>Also send me Torch Republic news and offers. Optional.</span>
      </label>

      {status?.type === 'error' ? (
        <p role="alert" className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--destructive))', margin: 0 }}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}