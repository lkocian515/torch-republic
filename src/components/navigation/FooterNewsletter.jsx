import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const THEME = {
  text: '#292622',
  secondary: '#5F574F',
  border: '#E4D8C9',
  card: '#FFFDF8',
  clay: '#B7653E',
  moss: '#566047',
};

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await base44.entities.EmailSubscriber.create({
        email: trimmed,
        description: 'Footer newsletter signup',
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="footer-newsletter-email" className="block font-heading text-xs font-semibold mb-2" style={{ color: THEME.text }}>
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="footer-newsletter-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
          placeholder="your@email.com"
          disabled={status === 'loading'}
          autoComplete="email"
          className="flex-1 min-h-[44px] rounded-md border px-3 font-heading text-sm transition-colors focus:outline-none focus:ring-2"
          style={{ borderColor: THEME.border, background: THEME.card, color: THEME.text }}
          aria-required="true"
          aria-invalid={status === 'error'}
          aria-describedby="footer-newsletter-status"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn btn-primary shrink-0"
          style={{ minHeight: 44, fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
        >
          {status === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Subscribe'}
        </button>
      </div>
      <div id="footer-newsletter-status" className="mt-2 min-h-[1.25rem]" role="status" aria-live="polite">
        {status === 'success' && (
          <p className="flex items-center gap-1.5 font-heading text-xs" style={{ color: THEME.moss }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Thanks for subscribing!
          </p>
        )}
        {status === 'error' && (
          <p className="flex items-center gap-1.5 font-heading text-xs" style={{ color: THEME.clay }}>
            <AlertCircle className="w-3.5 h-3.5" /> Please enter a valid email address.
          </p>
        )}
      </div>
    </form>
  );
}