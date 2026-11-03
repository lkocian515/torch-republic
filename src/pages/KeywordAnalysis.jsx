import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Search, MousePointerClick, Eye, Target, RefreshCw, AlertCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6AC45';

function StatCard({ icon: Icon, label, value, sub }) {
  /* Icon is passed as a prop — used as <Icon /> below */
  return (
    <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color: RG }} />
        <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{label}</p>
      </div>
      <p className="font-serif font-bold text-white text-2xl">{value}</p>
      {sub && <p className="font-mono text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</p>}
    </div>
  );
}

function KeywordTable({ rows, title, columns }) {
  return (
    <div style={{ border: '1px solid rgba(230,183,173,0.08)', background: '#0A0908' }}>
      <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: RG }}>{title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
              <th className="text-left px-6 py-3 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>#</th>
              <th className="text-left px-4 py-3 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Keyword</th>
              {columns.map((col) => (
                <th key={col.key} className="text-right px-4 py-3 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-3 font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{i + 1}</td>
                <td className="px-4 py-3 font-mono text-xs text-white font-medium max-w-[260px] truncate">{row.query}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-right font-mono text-xs" style={{ color: col.color || 'rgba(255,255,255,0.6)' }}>
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KeywordAnalysis() {
  useSEO({ title: 'Keyword Analysis | Admin', description: 'Internal SEO keyword analysis dashboard.', url: '/admin/keywords', noindex: true });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('coffee');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('getSearchConsoleKeywords', {});
      setData(res.data);
    } catch (e) {
      setError(e.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const totalClicks = data?.topCoffeeKeywords?.reduce((s, r) => s + r.clicks, 0) || 0;
  const totalImpressions = data?.topCoffeeKeywords?.reduce((s, r) => s + r.impressions, 0) || 0;
  const avgPosition = data?.topCoffeeKeywords?.length
    ? (data.topCoffeeKeywords.reduce((s, r) => s + r.position, 0) / data.topCoffeeKeywords.length).toFixed(1)
    : '—';

  const tabs = [
    { id: 'coffee', label: 'Coffee Keywords' },
    { id: 'all', label: 'Top by Clicks' },
    { id: 'opportunities', label: 'Opportunities' },
  ];

  const activeRows =
    activeTab === 'coffee' ? (data?.topCoffeeKeywords || []) :
    activeTab === 'all' ? (data?.topByClicks || []) :
    (data?.opportunities || []);

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh', color: '#F7F2E9' }}>
      {/* Header */}
      <div className="px-6 md:px-10 pt-12 pb-8" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Google Search Console
            </p>
            <h1 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              Keyword Performance
            </h1>
            {data?.dateRange && (
              <p className="font-mono text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {data.dateRange.start} → {data.dateRange.end} · {data.siteUrl}
              </p>
            )}
          </div>
          <button onClick={fetchData} disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-75 disabled:opacity-40"
            style={{ border: `1px solid ${RG}40`, color: RG }}>
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="px-6 md:px-10 py-10 max-w-6xl mx-auto">

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-8" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <p className="font-mono text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: `${RG}30`, borderTopColor: RG }} />
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Fetching keyword data…</p>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              <StatCard icon={MousePointerClick} label="Total Clicks" value={totalClicks.toLocaleString()} sub="Coffee keywords · 90 days" />
              <StatCard icon={Eye} label="Impressions" value={totalImpressions.toLocaleString()} sub="Coffee keywords · 90 days" />
              <StatCard icon={Target} label="Avg. Position" value={avgPosition} sub="Coffee keywords" />
              <StatCard icon={Search} label="Keywords Found" value={data.topCoffeeKeywords?.length || 0} sub={`of ${data.totalRows} total`} />
            </div>

            {/* Top Coffee Keywords Chart */}
            {data.topCoffeeKeywords?.length > 0 && (
              <div className="mb-10" style={{ border: '1px solid rgba(230,183,173,0.08)', background: '#0A0908' }}>
                <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: RG }}>
                    Top Coffee Keywords — Clicks vs Impressions
                  </p>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data.topCoffeeKeywords.slice(0, 15)}
                      margin={{ top: 4, right: 20, left: 0, bottom: 60 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="query" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9, fontFamily: 'monospace' }}
                        angle={-35} textAnchor="end" interval={0} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }} />
                      <Tooltip
                        contentStyle={{ background: '#141210', border: '1px solid rgba(230,183,173,0.2)', borderRadius: 4 }}
                        labelStyle={{ color: RG, fontFamily: 'monospace', fontSize: 11 }}
                        itemStyle={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                      />
                      <Bar dataKey="clicks" fill={RG} name="Clicks" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="impressions" fill="rgba(230,183,173,0.2)" name="Impressions" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 mb-4 flex-wrap">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="px-5 py-2.5 font-mono text-[9px] tracking-[0.25em] uppercase transition-all"
                  style={{
                    background: activeTab === tab.id ? RG : 'transparent',
                    color: activeTab === tab.id ? '#080808' : 'rgba(230,183,173,0.5)',
                    border: `1px solid ${activeTab === tab.id ? RG : 'rgba(230,183,173,0.15)'}`,
                  }}>
                  {tab.label}
                  {tab.id === 'opportunities' && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[8px]"
                      style={{ background: 'rgba(16,185,129,0.2)', color: '#264A35' }}>
                      {data.opportunities?.length || 0}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Table */}
            <KeywordTable
              rows={activeRows}
              title={
                activeTab === 'coffee' ? `Coffee-Related Keywords (${activeRows.length})` :
                activeTab === 'all' ? 'Top Keywords by Clicks' :
                'Growth Opportunities — High Impressions, Low CTR'
              }
              columns={[
                { key: 'clicks', label: 'Clicks', color: RG },
                { key: 'impressions', label: 'Impressions', color: 'rgba(255,255,255,0.5)' },
                { key: 'ctr', label: 'CTR %', color: '#264A35', format: (v) => `${v}%` },
                {
                  key: 'position', label: 'Position',
                  color: 'rgba(255,255,255,0.5)',
                  format: (v) => {
                    const color = v <= 3 ? '#264A35' : v <= 10 ? RG : 'rgba(255,255,255,0.4)';
                    return <span style={{ color }}>{v}</span>;
                  }
                },
              ]}
            />

            {/* Opportunities explainer */}
            {activeTab === 'opportunities' && activeRows.length > 0 && (
              <div className="mt-4 p-4" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <div className="flex items-start gap-3">
                  <TrendingUp size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                  <p className="font-mono text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    These keywords have <strong style={{ color: 'rgba(255,255,255,0.6)' }}>high impressions but low CTR</strong>, meaning your pages are showing up in search results but not getting clicked. Improving titles, meta descriptions, or on-page content for these keywords can significantly boost organic traffic.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}