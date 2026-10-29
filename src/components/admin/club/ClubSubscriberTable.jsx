import React from 'react';
import { STATUSES } from '@/lib/clubStatuses';

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function ClubSubscriberTable({ subscribers, loading, onStatusChange }) {
  if (loading) {
    return <p className="py-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Loading roster…</p>;
  }

  if (!subscribers.length) {
    return (
      <p className="rounded-lg border border-border bg-card px-5 py-10 text-center font-heading text-sm text-muted-foreground">
        Nobody here yet. Club waitlist joins appear automatically, or add a subscriber above.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead className="bg-muted">
          <tr>
            {['Subscriber', 'Status', 'Plan', 'Next delivery', 'Joined'].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 font-mono text-[0.625rem] font-normal uppercase tracking-[0.2em] text-muted-foreground"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subscribers.map((row) => (
            <tr key={row.id} className="border-t border-border">
              <td className="px-4 py-3">
                <p className="font-heading text-sm font-semibold text-foreground">{row.full_name || row.email}</p>
                {row.full_name ? (
                  <p className="font-mono text-[0.6875rem] text-muted-foreground">{row.email}</p>
                ) : null}
              </td>
              <td className="px-4 py-3">
                <select
                  value={row.status || 'waitlist'}
                  onChange={(event) => onStatusChange(row, event.target.value)}
                  aria-label={`Status for ${row.email}`}
                  className="rounded border border-border bg-background px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-foreground"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 font-heading text-sm text-foreground/80">{row.plan_title || '—'}</td>
              <td className="px-4 py-3 font-mono text-xs text-foreground/70">{formatDate(row.next_delivery_date)}</td>
              <td className="px-4 py-3 font-mono text-xs text-foreground/70">{formatDate(row.joined_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}