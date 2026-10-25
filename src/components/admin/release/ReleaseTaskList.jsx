import React from 'react';
import { formatDate } from '@/lib/releaseDates';

const CYCLE = { todo: 'in_progress', in_progress: 'done', done: 'todo' };
const LABEL = { todo: 'To do', in_progress: 'In progress', done: 'Done' };

/**
 * Tasks for one release, or the whole plan when no release is passed.
 */
export default function ReleaseTaskList({ tasks, onCycle, showRelease }) {
  if (!tasks.length) {
    return <p className="body text-readable-secondary">No tasks recorded.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="card-torch flex flex-wrap items-start justify-between gap-3 p-3">
          <div className="min-w-0">
            <p className={`font-body ${t.status === 'done' ? 'text-readable-secondary line-through' : ''}`}>
              {t.title}
            </p>
            <p className="font-mono uppercase text-muted-foreground mt-1" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
              {t.phase}
              {showRelease && t.release_name ? ` / ${t.release_name}` : ''}
              {` / due ${formatDate(t.due_date)}`}
              {t.priority === 'high' ? ' / high' : ''}
            </p>
            {t.notes ? <p className="body text-readable-secondary mt-1">{t.notes}</p> : null}
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => onCycle(t)}>
            {LABEL[t.status] || 'To do'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export { CYCLE };