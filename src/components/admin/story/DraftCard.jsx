import React from 'react';
import { Check } from 'lucide-react';

/**
 * One staged Story World draft, shown exactly as written.
 * Approval here only marks copy as signed off — nothing is published.
 */
export default function DraftCard({ draft, onApprove }) {
  const approved = draft.status === 'approved';

  return (
    <article
      className="rounded-sm border p-5"
      style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--card))' }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-serif text-xl" style={{ color: 'hsl(var(--foreground))' }}>
          {draft.title}
        </h3>
        <button
          type="button"
          onClick={() => onApprove(draft, approved ? 'draft' : 'approved')}
          aria-pressed={approved}
          className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.15em]"
          style={{
            borderColor: approved ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            color: approved ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
            background: approved ? 'hsl(var(--primary) / 0.08)' : 'transparent',
          }}
        >
          {approved && <Check className="h-3 w-3" aria-hidden="true" />}
          {approved ? 'Approved' : 'Mark approved'}
        </button>
      </div>

      <div className="mt-4 whitespace-pre-line font-serif text-[1.0125rem] leading-8" style={{ color: 'hsl(var(--foreground))' }}>
        {draft.body}
      </div>

      {draft.notes ? (
        <p
          className="mt-5 border-t pt-3 font-mono text-[0.6875rem] leading-5"
          style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}
        >
          {draft.notes}
        </p>
      ) : null}
    </article>
  );
}