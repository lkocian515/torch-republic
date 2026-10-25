import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { asArray, todayISO } from '@/lib/releaseDates';
import ReleaseBoard from '@/components/admin/release/ReleaseBoard';
import ReleaseDetail from '@/components/admin/release/ReleaseDetail';
import ReleaseTaskList, { CYCLE } from '@/components/admin/release/ReleaseTaskList';
import ReleaseDraftList from '@/components/admin/release/ReleaseDraftList';

const TABS = [
  { key: 'board', label: 'Release board' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'drafts', label: 'Drafts' },
];

/**
 * The 2027 seasonal release plan: the working source of truth for the calendar,
 * the tasks behind it, and every draft awaiting approval.
 */
export default function AdminReleases() {
  const [tab, setTab] = useState('board');
  const [releases, setReleases] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [loading, setLoading] = useState(true);

  useSEO({ title: '2027 Release Plan', url: '/admin/releases', noindex: true });

  const load = useCallback(async () => {
    setLoading(true);
    const [releaseRes, taskRes, draftRes] = await Promise.all([
      base44.entities.SeasonalRelease.list({ sort: 'display_order', limit: 100 }),
      base44.entities.ReleaseTask.list({ sort: 'due_date', limit: 500 }),
      base44.entities.ReleaseDraft.list({ limit: 500 }),
    ]);
    setReleases(asArray(releaseRes));
    setTasks(asArray(taskRes));
    setDrafts(asArray(draftRes));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const today = todayISO();

  const isOverdue = useCallback(
    (t) => t.status !== 'done' && t.due_date && t.due_date < today,
    [today],
  );

  const overdueTasks = useMemo(() => tasks.filter(isOverdue), [tasks, isOverdue]);
  const openTasks = useMemo(() => tasks.filter((t) => t.status !== 'done'), [tasks]);
  const pendingDrafts = useMemo(() => drafts.filter((d) => d.status !== 'approved'), [drafts]);

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const diff = (isOverdue(a) ? 0 : 1) - (isOverdue(b) ? 0 : 1);
      if (diff !== 0) return diff;
      return String(a.due_date || '').localeCompare(String(b.due_date || ''));
    });
  }, [tasks, isOverdue]);

  const cycleTask = async (task) => {
    const next = CYCLE[task.status] || 'todo';
    const completed = next === 'done' ? today : '';
    await base44.entities.ReleaseTask.update(task.id, { status: next, completed_date: completed });
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: next, completed_date: completed } : t)));
  };

  const toggleDraftApproval = async (draft) => {
    const next = draft.status === 'approved' ? 'draft' : 'approved';
    await base44.entities.ReleaseDraft.update(draft.id, {
      status: next,
      approved_date: next === 'approved' ? today : '',
    });
    setDrafts((prev) => prev.map((d) => (d.id === draft.id ? { ...d, status: next } : d)));
  };

  const selected = releases.find((r) => r.slug === selectedSlug) || null;
  const selectedTasks = selected ? tasks.filter((t) => t.release_slug === selected.slug) : [];
  const selectedDrafts = selected ? drafts.filter((d) => d.release_slug === selected.slug) : [];

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header>
          <p className="eyebrow">Admin</p>
          <h1 className="h1 mt-2">2027 Seasonal Release Plan</h1>
          <p className="body text-readable-secondary mt-3">
            Thirteen seasonal releases across twelve months. Deadlines below are recalculated from today,{' '}
            {today} (America/Chicago).
          </p>
        </header>

        {loading ? (
          <p className="body text-readable-secondary mt-8">Loading the plan...</p>
        ) : (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="card-torch p-4">
                <p className="font-mono uppercase text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
                  Releases on the board
                </p>
                <p className="h2 mt-2">{releases.length}</p>
              </div>
              <div className="card-torch p-4">
                <p className="font-mono uppercase text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
                  Open tasks / overdue
                </p>
                <p className={`h2 mt-2 ${overdueTasks.length ? 'text-destructive' : ''}`}>
                  {openTasks.length} / {overdueTasks.length}
                </p>
              </div>
              <div className="card-torch p-4">
                <p className="font-mono uppercase text-muted-foreground" style={{ fontSize: '10px', letterSpacing: '0.14em' }}>
                  Drafts awaiting approval
                </p>
                <p className="h2 mt-2">{pendingDrafts.length}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={tab === t.key ? 'btn btn-primary' : 'btn btn-secondary'}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {tab === 'board' ? (
                <div className="space-y-8">
                  <ReleaseBoard releases={releases} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
                  <ReleaseDetail
                    release={selected}
                    tasks={selectedTasks}
                    drafts={selectedDrafts}
                    onCycleTask={cycleTask}
                    onToggleDraftApproval={toggleDraftApproval}
                  />
                </div>
              ) : null}

              {tab === 'tasks' ? (
                <ReleaseTaskList tasks={sortedTasks} onCycle={cycleTask} showRelease />
              ) : null}

              {tab === 'drafts' ? (
                <ReleaseDraftList drafts={drafts} onToggleApproval={toggleDraftApproval} />
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}