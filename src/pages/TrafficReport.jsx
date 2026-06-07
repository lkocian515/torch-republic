import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCw, ExternalLink, TrendingUp, Users, Eye, Globe } from 'lucide-react';

const CHANNEL_COLORS = {
  'Organic Search': '#4ADE80',
  'Direct': '#E6B7AD',
  'Social': '#60A5FA',
  'Paid Search': '#FBBF24',
  'Email': '#A78BFA',
  'Referral': '#FB7185',
  'Organic Social': '#34D399',
  'Unassigned': '#6B7280',
};

const getColor = (channel) => CHANNEL_COLORS[channel] || '#9CA3AF';

const StatCard = ({ icon: Icon, label, value, sub }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(230,183,173,0.12)',
    borderRadius: '4px',
    padding: '20px 24px',
  }}>
    <div className="flex items-center gap-2 mb-2">
      <Icon size={14} style={{ color: '#E6B7AD' }} />
      <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{label}</span>
    </div>
    <div className="font-serif font-bold text-3xl" style={{ color: '#F5EFE6' }}>{value}</div>
    {sub && <div className="font-mono text-[9px] mt-1" style={{ color: 'rgba(200,185,165,0.45)' }}>{sub}</div>}
  </div>
);

// @ts-nocheck
// Admin-only page - not linked in public navigation, noindex
import { useSEO } from '@/hooks/useSEO';

export default function TrafficReport() {
  useSEO({
    title: 'Traffic Report',
    description: 'Google Analytics traffic sources report.',
    url: '/traffic-report',
    noindex: true,
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const res = await base44.functions.invoke('getTrafficSources', {});
    if (res.data.error) {
      setError(res.data.error);
    } else {
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0908', padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Google Analytics · Product Pages
            </p>
            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
              Traffic Sources
            </h1>
            {data && (
              <p className="font-mono text-[9px] mt-1" style={{ color: 'rgba(200,185,165,0.4)' }}>
                {data.property} · {data.period}
              </p>
            )}
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase px-4 py-2.5 transition-opacity hover:opacity-70"
            style={{ background: 'rgba(230,183,173,0.1)', border: '1px solid rgba(230,183,173,0.2)', color: '#E6B7AD', borderRadius: '2px' }}
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="font-mono text-sm p-4 mb-8" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !data && (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} style={{ height: '80px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        )}

        {data && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <StatCard icon={TrendingUp} label="Total Sessions" value={data.totalSessions.toLocaleString()} sub="Product pages · last 30 days" />
              <StatCard icon={Globe} label="Top Channel" value={data.channels[0]?.channel || '—'} sub={`${data.channels[0]?.percent || 0}% of sessions`} />
              <StatCard icon={Eye} label="Top Page Views" value={data.topPages[0]?.pageViews?.toLocaleString() || '—'} sub={data.topPages[0]?.path || ''} />
            </div>

            {/* Channel bar chart */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px', padding: '28px', marginBottom: '32px' }}>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.45)' }}>Sessions by Channel</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.channels} barCategoryGap="30%">
                  <XAxis dataKey="channel" tick={{ fill: 'rgba(200,185,165,0.5)', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(200,185,165,0.35)', fontSize: 9, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#111', border: '1px solid rgba(230,183,173,0.2)', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}
                    labelStyle={{ color: '#E6B7AD' }}
                    itemStyle={{ color: 'rgba(240,230,215,0.8)' }}
                    formatter={(value, name) => [value.toLocaleString(), name]}
                  />
                  <Bar dataKey="sessions" radius={[2,2,0,0]}>
                    {data.channels.map((c) => (
                      <Cell key={c.channel} fill={getColor(c.channel)} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Channel breakdown table */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px', marginBottom: '32px', overflow: 'hidden' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(230,183,173,0.45)' }}>Channel Breakdown</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
                      {['Channel', 'Sessions', 'Users', 'Page Views', 'Share'].map(h => (
                        <th key={h} className="px-6 py-3 text-left font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.channels.map((c, i) => (
                      <tr key={c.channel} style={{ borderBottom: i < data.channels.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                        className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: getColor(c.channel), flexShrink: 0 }} />
                            <span className="font-heading text-sm" style={{ color: '#F5EFE6' }}>{c.channel}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 font-mono text-sm" style={{ color: 'rgba(240,230,215,0.75)' }}>{c.sessions.toLocaleString()}</td>
                        <td className="px-6 py-3.5 font-mono text-sm" style={{ color: 'rgba(240,230,215,0.6)' }}>{c.users.toLocaleString()}</td>
                        <td className="px-6 py-3.5 font-mono text-sm" style={{ color: 'rgba(240,230,215,0.6)' }}>{c.pageViews.toLocaleString()}</td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            <div style={{ height: '3px', width: `${c.percent}px`, maxWidth: '80px', background: getColor(c.channel), borderRadius: '2px', opacity: 0.7 }} />
                            <span className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.6)' }}>{c.percent}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top product pages */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(230,183,173,0.45)' }}>Top Product Pages</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
                      {['Page', 'Views', 'Users'].map(h => (
                        <th key={h} className="px-6 py-3 text-left font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.topPages.map((p, i) => (
                      <tr key={p.path} style={{ borderBottom: i < data.topPages.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                        className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs" style={{ color: '#E6B7AD' }}>{p.path}</span>
                            <a href={`https://torchrepublic.com${p.path}`} target="_blank" rel="noreferrer">
                              <ExternalLink size={10} style={{ color: 'rgba(230,183,173,0.35)' }} />
                            </a>
                          </div>
                          {p.title && p.title !== p.path && (
                            <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(200,185,165,0.4)' }}>{p.title}</p>
                          )}
                        </td>
                        <td className="px-6 py-3.5 font-mono text-sm" style={{ color: 'rgba(240,230,215,0.75)' }}>{p.pageViews.toLocaleString()}</td>
                        <td className="px-6 py-3.5 font-mono text-sm" style={{ color: 'rgba(240,230,215,0.6)' }}>{p.users.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}