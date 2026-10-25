import React, { useState } from 'react';

/**
 * Draft materials. Nothing here is published or sent until the owner approves it.
 */
export default function ReleaseDraftList({ drafts, onToggleApproval }) {
  const [openId, setOpenId] = useState('');

  if (!drafts.length) {
    return <p className="body text-readable-secondary">No drafts created yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {drafts.map((d) => (
        <li key={d.id} className="card-torch p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading font-semibold">{d.title}</p>
              <p className="font-mono uppercase text-muted-foreground mt-1" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
                {d.release_name} / {d.kind} / {d.status === 'approved' ? 'approved' : 'unpublished'}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => setOpenId(openId === d.id ? '' : d.id)}>
                {openId === d.id ? 'Hide' : 'View'}
              </button>
              <button
                type="button"
                className={d.status === 'approved' ? 'btn btn-secondary' : 'btn btn-primary'}
                onClick={() => onToggleApproval(d)}
              >
                {d.status === 'approved' ? 'Withdraw approval' : 'Approve'}
              </button>
            </div>
          </div>

          {openId === d.id ? (
            <div className="mt-4">
              <pre className="whitespace-pre-wrap font-body text-readable-secondary">{d.body}</pre>
              {d.notes ? (
                <p className="body text-readable-secondary mt-3">To verify before use: {d.notes}</p>
              ) : null}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}