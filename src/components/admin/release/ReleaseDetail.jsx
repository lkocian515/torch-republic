import React from 'react';
import { formatDate, dueLabel, statusClass } from '@/lib/releaseDates';
import ReleaseTaskList from './ReleaseTaskList';
import ReleaseDraftList from './ReleaseDraftList';

const FIELDS = [
  ['Supplier flavour', 'supplier_flavor'],
  ['Sale window', 'sale_window_label'],
  ['Sale start', 'sale_start'],
  ['Sale end', 'sale_end'],
  ['Preview date', 'preview_date'],
  ['Availability verified', 'availability_verified_date'],
  ['Availability source', 'availability_source'],
  ['Grind options', 'grind_options'],
  ['Grind options verified', 'grind_options_verified'],
  ['Label status', 'label_status'],
  ['Product page status', 'page_status'],
  ['Image status', 'image_status'],
  ['Price and margin status', 'pricing_status'],
  ['Shopify status', 'shopify_status'],
  ['Shopify link', 'shopify_link'],
  ['Campaign status', 'campaign_status'],
  ['Approvals', 'approvals'],
  ['Owner', 'owner'],
  ['Existing edition record', 'existing_edition_slug'],
  ['Notes', 'notes'],
];

const render = (release, key) => {
  const value = release[key];
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'not set';
  if (typeof value === 'boolean') return value ? 'yes' : 'not yet';
  if (key.endsWith('_date') || key.endsWith('_start') || key.endsWith('_end')) return formatDate(value);
  return value || 'not set';
};

/**
 * Full detail for one release: every tracked field, its tasks and its drafts.
 */
export default function ReleaseDetail({ release, tasks, drafts, onCycleTask, onToggleDraftApproval }) {
  if (!release) {
    return (
      <p className="body text-readable-secondary">
        Select a release above to see its dates, statuses, tasks and drafts.
      </p>
    );
  }

  const due = dueLabel(release.next_action_due);
  const reminders = (release.reminder_dates || []).map((d) => formatDate(d)).join(', ') || 'not set';

  return (
    <div className="space-y-6">
      <div className="card-torch p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{release.month}</p>
            <h2 className="h2 mt-2">{release.release_name}</h2>
          </div>
          <p className={`font-mono uppercase ${statusClass(release.status)}`} style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
            {release.status}
          </p>
        </div>

        <p className={`body mt-4 ${due.overdue ? 'text-destructive' : 'text-readable-secondary'}`}>
          Next action: {release.next_action || 'nothing recorded'} ({formatDate(release.next_action_due)}, {due.text})
        </p>

        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {FIELDS.map(([label, key]) => (
            <div key={key}>
              <dt className="font-mono uppercase text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
                {label}
              </dt>
              <dd className="body mt-1">{render(release, key)}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono uppercase text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
              Reminder dates
            </dt>
            <dd className="body mt-1">{reminders}</dd>
          </div>
          <div>
            <dt className="font-mono uppercase text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
              Results
            </dt>
            <dd className="body mt-1">
              {release.results_recorded_date
                ? `${release.results_orders ?? 0} orders, $${release.results_revenue ?? 0} recorded on ${formatDate(release.results_recorded_date)}`
                : 'not recorded yet'}
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="h2">Tasks</h3>
        <div className="mt-4">
          <ReleaseTaskList tasks={tasks} onCycle={onCycleTask} />
        </div>
      </div>

      <div>
        <h3 className="h2">Drafts</h3>
        <div className="mt-4">
          <ReleaseDraftList drafts={drafts} onToggleApproval={onToggleDraftApproval} />
        </div>
      </div>
    </div>
  );
}