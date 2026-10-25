import React from 'react';
import { dueLabel, formatDate, statusClass } from '@/lib/releaseDates';

/**
 * The 2027 seasonal release calendar. Each row is one release record.
 */
export default function ReleaseBoard({ releases, selectedSlug, onSelect }) {
  if (!releases.length) {
    return <p className="body text-readable-secondary">No releases on the board yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {releases.map((r) => {
        const due = dueLabel(r.next_action_due);
        const selected = selectedSlug === r.slug;
        return (
          <li key={r.id}>
            <button
              type="button"
              onClick={() => onSelect(selected ? '' : r.slug)}
              className={`card-torch w-full p-4 text-left ${selected ? 'border-primary' : ''}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p
                    className="font-mono uppercase text-muted-foreground"
                    style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                  >
                    {r.month}
                  </p>
                  <p className="font-heading font-semibold mt-1">{r.release_name}</p>
                  <p className="body text-readable-secondary mt-1">
                    {r.supplier_flavor} &middot; {r.sale_window_label}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-mono uppercase ${statusClass(r.status)}`}
                    style={{ fontSize: '10px', letterSpacing: '0.14em' }}
                  >
                    {r.status}
                  </p>
                  <p className={`mt-1 text-sm ${due.overdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {due.text}
                  </p>
                </div>
              </div>
              <p className="body text-readable-secondary mt-3">
                Next: {r.next_action || 'nothing recorded'} ({formatDate(r.next_action_due)})
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}