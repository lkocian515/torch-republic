import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

const GOLD = '#D4AF37';
const BG = '#0A0A0A';
const PASSWORD = 'torchcommand2025';

const STATUSES = ['todo', 'in_progress', 'done'];
const STATUS_LABELS = { todo: 'To Do', in_progress: 'In Progress', done: 'Done' };
const STATUS_COLORS = { todo: 'rgba(212,175,55,0.5)', in_progress: '#E8A87C', done: '#7CBF8E' };

// ── Leads Table ──────────────────────────────────────────────────────────────
function LeadsTable() {
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['quiz-leads'],
    queryFn: () => base44.entities.CognitiveQuizLead.list('-created_date', 100),
  });

  const handleExport = () => {
    const csv = ['Email,Profile,Blend,Date',
      ...leads.map(l => `${l.email},${l.result_profile || ''},${l.result_blend || ''},${new Date(l.created_date).toLocaleDateString()}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'quiz-leads.csv'; a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif font-bold text-white" style={{ fontSize: '1.2rem' }}>Quiz Leads ({leads.length})</h2>
        <button onClick={handleExport} className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all hover:opacity-80" style={{ border: `1px solid ${GOLD}40`, color: GOLD }}>
          Export CSV
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: 'transparent' }} /></div>
      ) : leads.length === 0 ? (
        <p className="text-center py-10 font-mono text-sm" style={{ color: 'rgba(240,235,225,0.3)' }}>No leads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid rgba(212,175,55,0.15)` }}>
                {['Email', 'Profile', 'Blend', 'Date'].map(h => (
                  <th key={h} className="text-left pb-3 font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,175,55,0.5)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                  <td className="py-3 pr-4" style={{ color: 'rgba(240,235,225,0.75)', fontSize: '0.85rem' }}>{lead.email}</td>
                  <td className="py-3 pr-4 font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.5)' }}>{lead.result_profile || '—'}</td>
                  <td className="py-3 pr-4">
                    {lead.result_blend && (
                      <span className="font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1" style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30` }}>{lead.result_blend}</span>
                    )}
                  </td>
                  <td className="py-3 font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.4)' }}>{new Date(lead.created_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Protocol Editor ──────────────────────────────────────────────────────────
function ProtocolEditor() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const { data: protocols = [], isLoading } = useQuery({
    queryKey: ['protocols-admin'],
    queryFn: () => base44.entities.PerformanceProtocol.list('-created_date', 50),
  });

  const deleteMutation = useMutation({
    mutationFn: id => base44.entities.PerformanceProtocol.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['protocols-admin'] }),
  });

  const saveMutation = useMutation({
    mutationFn: ({ id, data }) => id ? base44.entities.PerformanceProtocol.update(id, data) : base44.entities.PerformanceProtocol.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['protocols-admin'] }); setEditing(null); setForm({}); },
  });

  const startEdit = (p) => { setEditing(p?.id || 'new'); setForm(p || { published: true, steps: [] }); };
  const handleSave = () => saveMutation.mutate({ id: editing === 'new' ? null : editing, data: { ...form, steps: Array.isArray(form.steps) ? form.steps : (form.steps || '').split('\n').filter(Boolean) } });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif font-bold text-white" style={{ fontSize: '1.2rem' }}>Performance Protocols ({protocols.length})</h2>
        <button onClick={() => startEdit(null)} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all hover:opacity-90" style={{ background: GOLD, color: '#0A0A0A' }}>
          <Plus className="w-3 h-3" /> New Protocol
        </button>
      </div>

      {/* Inline form */}
      {editing && (
        <div className="mb-6 p-5" style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}30` }}>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>{editing === 'new' ? 'New Protocol' : 'Edit Protocol'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {[['title', 'Title'], ['slug', 'Slug'], ['tagline', 'Tagline'], ['duration', 'Duration']].map(([key, label]) => (
              <input key={key} value={form[key] || ''} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={label} className="px-4 py-2.5 bg-transparent font-mono text-sm focus:outline-none"
                style={{ border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }} />
            ))}
            <select value={form.category || ''} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="px-4 py-2.5 font-mono text-sm focus:outline-none" style={{ background: '#111', border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }}>
              <option value="">Category</option>
              {['focus', 'sleep', 'energy', 'recovery', 'mindset'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={form.recommended_blend || ''} onChange={e => setForm(f => ({ ...f, recommended_blend: e.target.value }))}
              className="px-4 py-2.5 font-mono text-sm focus:outline-none" style={{ background: '#111', border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }}>
              <option value="">Blend</option>
              {['GlowMind', 'MoonCap', 'Both'].map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <textarea value={form.blend_rationale || ''} onChange={e => setForm(f => ({ ...f, blend_rationale: e.target.value }))}
            placeholder="Blend rationale..." rows={2} className="w-full px-4 py-2.5 bg-transparent font-mono text-sm focus:outline-none resize-none mb-3"
            style={{ border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }} />
          <textarea value={Array.isArray(form.steps) ? form.steps.join('\n') : (form.steps || '')}
            onChange={e => setForm(f => ({ ...f, steps: e.target.value }))}
            placeholder="Steps (one per line)..." rows={5} className="w-full px-4 py-2.5 bg-transparent font-mono text-sm focus:outline-none resize-none mb-4"
            style={{ border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }} />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saveMutation.isPending}
              className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-2.5 transition-all hover:opacity-90"
              style={{ background: GOLD, color: '#0A0A0A' }}>
              <Check className="w-3 h-3" /> {saveMutation.isPending ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => { setEditing(null); setForm({}); }}
              className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-2.5 transition-all hover:opacity-70"
              style={{ border: `1px solid rgba(212,175,55,0.25)`, color: 'rgba(212,175,55,0.6)' }}>
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: 'transparent' }} /></div>
      ) : (
        <div className="space-y-2">
          {protocols.map(p => (
            <div key={p.id} className="flex items-center justify-between p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(212,175,55,0.1)` }}>
              <div>
                <p className="font-heading text-sm text-white font-medium">{p.title}</p>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(212,175,55,0.5)' }}>{p.category} · {p.recommended_blend}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(p)} className="p-2 transition-all hover:opacity-70" style={{ color: 'rgba(212,175,55,0.6)' }}><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => deleteMutation.mutate(p.id)} className="p-2 transition-all hover:opacity-70" style={{ color: 'rgba(255,100,100,0.5)' }}><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Kanban Board ─────────────────────────────────────────────────────────────
function KanbanBoard() {
  const qc = useQueryClient();
  const [newTask, setNewTask] = useState({ title: '', status: 'todo', priority: 'medium', tag: 'SEO' });
  const [adding, setAdding] = useState(false);

  const { data: tasks = [] } = useQuery({
    queryKey: ['seo-tasks'],
    queryFn: () => base44.entities.SEOTask.list('-created_date', 100),
  });

  const createMutation = useMutation({
    mutationFn: data => base44.entities.SEOTask.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['seo-tasks'] }); setAdding(false); setNewTask({ title: '', status: 'todo', priority: 'medium', tag: 'SEO' }); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.SEOTask.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['seo-tasks'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: id => base44.entities.SEOTask.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['seo-tasks'] }),
  });

  const moveTask = (task, newStatus) => updateMutation.mutate({ id: task.id, data: { status: newStatus } });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif font-bold text-white" style={{ fontSize: '1.2rem' }}>Marketing & SEO Board</h2>
        <button onClick={() => setAdding(a => !a)} className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all hover:opacity-90" style={{ background: GOLD, color: '#0A0A0A' }}>
          <Plus className="w-3 h-3" /> Add Task
        </button>
      </div>

      {adding && (
        <div className="mb-5 p-4 flex flex-wrap gap-3 items-end" style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}25` }}>
          <input value={newTask.title} onChange={e => setNewTask(t => ({ ...t, title: e.target.value }))}
            placeholder="Task title..." className="flex-1 min-w-[200px] px-3 py-2.5 bg-transparent font-mono text-sm focus:outline-none"
            style={{ border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }} />
          <select value={newTask.priority} onChange={e => setNewTask(t => ({ ...t, priority: e.target.value }))}
            className="px-3 py-2.5 font-mono text-sm" style={{ background: '#111', border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }}>
            {['low', 'medium', 'high'].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={newTask.tag} onChange={e => setNewTask(t => ({ ...t, tag: e.target.value }))}
            className="px-3 py-2.5 font-mono text-sm" style={{ background: '#111', border: `1px solid rgba(212,175,55,0.25)`, color: '#F0EBE1' }}>
            {['SEO', 'Content', 'Social', 'Email', 'Paid', 'Technical'].map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </select>
          <button onClick={() => createMutation.mutate(newTask)} disabled={!newTask.title || createMutation.isPending}
            className="font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-2.5 transition-all hover:opacity-90" style={{ background: GOLD, color: '#0A0A0A' }}>
            Add
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map(status => (
          <div key={status} className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(212,175,55,0.1)` }}>
            <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-4" style={{ color: STATUS_COLORS[status] }}>{STATUS_LABELS[status]}</p>
            <div className="flex flex-col gap-2">
              {tasks.filter(t => t.status === status).map(task => (
                <div key={task.id} className="p-3" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid rgba(212,175,55,0.08)` }}>
                  <p className="text-sm mb-2" style={{ color: 'rgba(240,235,225,0.8)', lineHeight: 1.5 }}>{task.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      <span className="font-mono text-[7px] tracking-[0.2em] uppercase px-1.5 py-0.5" style={{ background: `${GOLD}12`, color: `${GOLD}80` }}>{task.tag}</span>
                      <span className="font-mono text-[7px] tracking-[0.2em] uppercase px-1.5 py-0.5"
                        style={{ background: task.priority === 'high' ? 'rgba(255,100,100,0.12)' : 'rgba(255,255,255,0.05)', color: task.priority === 'high' ? 'rgba(255,100,100,0.8)' : 'rgba(255,255,255,0.35)' }}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {STATUSES.filter(s => s !== status).map(s => (
                        <button key={s} onClick={() => moveTask(task, s)} title={`Move to ${STATUS_LABELS[s]}`}
                          className="font-mono text-[7px] px-1.5 py-0.5 transition-all hover:opacity-80"
                          style={{ border: `1px solid rgba(212,175,55,0.2)`, color: 'rgba(212,175,55,0.5)' }}>
                          {s === 'todo' ? '←' : s === 'in_progress' ? '→' : '✓'}
                        </button>
                      ))}
                      <button onClick={() => deleteMutation.mutate(task.id)} className="p-0.5 transition-all hover:opacity-70" style={{ color: 'rgba(255,100,100,0.4)' }}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.status === status).length === 0 && (
                <p className="font-mono text-[8px] text-center py-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Empty</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const TABS = ['Leads', 'Protocols', 'Board'];

export default function AdminCommand() {
  useSEO({ title: 'Torch Command Admin', description: 'Internal admin panel.', url: '/command/admin', noindex: true });
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState('Leads');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === PASSWORD) { setAuthed(true); setPwError(''); }
    else { setPwError('Incorrect password.'); }
  };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: BG, color: '#F0EBE1' }} className="flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center rounded-full" style={{ border: `2px solid ${GOLD}`, background: `${GOLD}10` }}>
            <span style={{ fontSize: '1.5rem' }}>🔐</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: GOLD }}>Torch Command</p>
          <h1 className="font-serif font-bold text-white mb-8" style={{ fontSize: '1.8rem' }}>Admin Center</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password"
              className="w-full px-5 py-4 bg-transparent font-mono text-center focus:outline-none"
              style={{ border: `1px solid rgba(212,175,55,0.35)`, color: '#F0EBE1' }} />
            {pwError && <p className="font-mono text-[9px]" style={{ color: '#FF6B6B' }}>{pwError}</p>}
            <button type="submit" className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold py-4 transition-all hover:opacity-90" style={{ background: GOLD, color: '#0A0A0A' }}>
              Enter →
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#F0EBE1' }} className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase font-bold" style={{ color: GOLD }}>Torch Command · Admin</span>
        <button onClick={() => setAuthed(false)} className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(212,175,55,0.4)' }}>Sign Out</button>
      </div>

      {/* Tabs */}
      <div className="flex px-6 pt-6 gap-1" style={{ borderBottom: `1px solid rgba(212,175,55,0.12)` }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-3 transition-all"
            style={{ color: activeTab === tab ? GOLD : 'rgba(212,175,55,0.4)', borderBottom: activeTab === tab ? `2px solid ${GOLD}` : '2px solid transparent', background: 'transparent' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 md:px-10 py-10 max-w-5xl w-full mx-auto">
        {activeTab === 'Leads' && <LeadsTable />}
        {activeTab === 'Protocols' && <ProtocolEditor />}
        {activeTab === 'Board' && <KanbanBoard />}
      </div>
    </div>
  );
}