import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';

/**
 * Adds a club subscriber by hand — for anyone who subscribed through Shopify
 * checkout, which the store's plan does not report back to the app.
 */
export default function AddClubSubscriberForm({ onAdded }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('waitlist');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Enter a valid email address.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await base44.entities.ClubSubscriber.create({
        email: value,
        full_name: name.trim() || undefined,
        status,
        source: 'manual',
        plan_title: 'Monthly Special Edition Club',
        joined_date: new Date().toISOString().slice(0, 10),
      });
      setEmail('');
      setName('');
      setStatus('waitlist');
      onAdded();
    } catch {
      setError('That could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="mb-8 rounded-lg border border-border bg-card p-4">
      <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
        Add a subscriber
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          aria-label="Subscriber email address"
          className="min-h-[40px] flex-1 rounded border border-border bg-background px-3 font-heading text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name (optional)"
          aria-label="Subscriber name"
          className="min-h-[40px] flex-1 rounded border border-border bg-background px-3 font-heading text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Subscriber status"
          className="min-h-[40px] rounded border border-border bg-background px-3 font-heading text-sm text-foreground"
        >
          <option value="waitlist">Waitlist</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded bg-primary px-4 font-heading text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {saving ? 'Saving' : 'Add'}
        </button>
      </div>
      {error ? <p className="mt-2 font-heading text-xs text-destructive">{error}</p> : null}
    </form>
  );
}