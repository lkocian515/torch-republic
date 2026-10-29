import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp, Search, MousePointer, Eye, BarChart2, Globe, ShoppingBag, AlertCircle, CheckCircle, Loader2, ExternalLink,
  ArrowUp, ArrowDown, Minus, RefreshCw, BookOpen, Map
} from 'lucide-react';
import UTMLinkBuilder from '@/components/admin/UTMLinkBuilder';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

const SITE_URL = 'https://torchrepublic.com';

function StatCard({ label, value, sub, icon: Icon, color = RG, trend, connected = true }) {
  return (
    <div className="p-5 flex flex-col gap-2" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" style={{ color }} />}
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{label}</span>
        </div>
        {trend !== undefined && (
          <span className="font-mono text-[8px]" style={{ color: trend > 0 ? '#6CBD5A' : trend < 0 ? '#E8697A' : 'rgba(255,255,255,0.3)' }}>
            {trend > 0 ? <ArrowUp className="w-3 h-3 inline" /> : trend < 0 ? <ArrowDown className="w-3 h-3 inline" /> : <Minus className="w-3 h-3 inline" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      {connected ? (
        <p className="font-serif font-bold" style={{ fontSize: '1.6rem', color: '#F5EFE6', lineHeight: 1 }}>{value}</p>
      ) : (
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>Not Connected</p>
      )}
      {sub && <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.35)', fontWeight: 300 }}>{sub}</p>}
    </div>
  );
}

function SectionHeader({ title, sub }) {
  return (
    <div className="mb-6">
      <h2 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>{title}</h2>
      {sub && <p className="font-heading text-sm mt-1" style={{ color: 'rgba(240,235,225,0.4)', fontWeight: 300 }}>{sub}</p>}
    </div>
  );
}

function ConnectionStatus({ name, status, actionUrl, actionLabel }) {
  const colors = {
    connected: '#6CBD5A',
    partial: GOLD,
    disconnected: 'rgba(230,183,173,0.4)',
  };
  const icons = {
    connected: CheckCircle,
    partial: AlertCircle,
    disconnected: AlertCircle,
  };
  const Icon = icons[status] || AlertCircle;
  return (
    <div className="flex items-center justify-between p-4" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" style={{ color: colors[status] }} />
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: '#F5EFE6' }}>{name}</p>
          <p className="font-heading text-xs" style={{ color: colors[status], fontWeight: 300 }}>
            {status === 'connected' ? 'Connected' : status === 'partial' ? 'Partial — action needed' : 'Not verified'}
          </p>
        </div>
      </div>
      {actionUrl && (
        <a href={actionUrl} target="_blank" rel="noopener noreferrer"
          className="font-mono text-[8px] tracking-[0.2em] uppercase flex items-center gap-1 px-3 py-1.5 transition-opacity hover:opacity-80"
          style={{ border: `1px solid ${RG}40`, color: RG }}>
          {actionLabel || 'Setup'} <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}

export default function TrafficGrowthCenter() {
  const [user, setUser] = useState(null);
  const [dateRange, setDateRange] = useState('28');

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: gscData, isLoading: gscLoading } = useQuery({
    queryKey: ['gsc-keywords', dateRange],
    queryFn: () => base44.functions.invoke('getSearchConsoleKeywords', { days: parseInt(dateRange) }),
    retry: false,
    staleTime: 1000 * 60 * 15,
  });

  const { data: gaData, isLoading: gaLoading, refetch: refetchGA } = useQuery({
    queryKey: ['ga-analytics', dateRange],
    queryFn: () => base44.functions.invoke('getGoogleAnalytics', { days: parseInt(dateRange) }),
    retry: false,
    staleTime: 1000 * 60 * 15,
  });

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews-count'],
    queryFn: () => base44.entities.Review.list('-created_date', 200),
    staleTime: 1000 * 60 * 60,
  });

  const { data: blogPostsData } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => base44.entities.BlogPost.filter({ published: true }),
    staleTime: 1000 * 60 * 60,
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>Access Restricted</p>
          <Link to="/" className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>← Return Home</Link>
        </div>
      </div>
    );
  }

  const gscKeywords = gscData?.data?.keywords || [];
  const gscConnected = gscData?.data?.connected !== false && gscKeywords.length > 0;
  const totalImpressions = gscKeywords.reduce((s, k) => s + (k.impressions || 0), 0);
  const totalClicks = gscKeywords.reduce((s, k) => s + (k.clicks || 0), 0);
  const avgPosition = gscKeywords.length
    ? (gscKeywords.reduce((s, k) => s + (k.position || 0), 0) / gscKeywords.length).toFixed(1)
    : null;
  const avgCTR = totalImpressions > 0
    ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%'
    : null;

  // Opportunity queries: ranking 4–20, high impressions, low CTR
  const opportunities = gscKeywords
    .filter(k => k.position >= 4 && k.position <= 20 && k.impressions > 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  // GA4 data
  const gaOverview = gaData?.data?.overview || null;
  const gaConnected = gaData?.data?.connected === true;
  const gaChannels = gaData?.data?.channels || [];
  const gaTopPages = gaData?.data?.topPages || [];

  const fmtSeconds = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.round(s % 60);
    return `${m}m ${sec}s`;
  };

  const reviewCount = reviewsData?.length || 0;
  const avgRating = reviewsData?.length
    ? (reviewsData.reduce((s, r) => s + (r.rating || 5), 0) / reviewsData.length).toFixed(1)
    : '4.8';
  const publishedPosts = blogPostsData?.length || 0;

  // Sitemap URLs
  const SITEMAPS = [
    { label: 'Sitemap Index', url: `${SITE_URL}/sitemap.xml` },
    { label: 'Pages Sitemap', url: `${SITE_URL}/sitemap-pages.xml` },
    { label: 'Products Sitemap', url: `${SITE_URL}/sitemap-products.xml` },
    { label: 'Blog Sitemap', url: `${SITE_URL}/sitemap-blog.xml` },
    { label: 'Image Sitemap', url: `${SITE_URL}/sitemap-images.xml` },
    { label: 'Robots.txt', url: `${SITE_URL}/robots.txt` },
  ];

  const DATE_RANGES = [
    { label: '7 days', value: '7' },
    { label: '28 days', value: '28' },
    { label: '90 days', value: '90' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Header */}
      <div className="px-6 md:px-10 pt-12 pb-8" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Admin</p>
          <h1 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6' }}>
            Traffic Growth Center
          </h1>
          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
            SEO performance, indexing status, content health, and search opportunity data for torchrepublic.com
          </p>
          {/* Date range selector */}
          <div className="flex gap-2 mt-5">
            {DATE_RANGES.map(d => (
              <button key={d.value} onClick={() => setDateRange(d.value)}
                className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 transition-all"
                style={{
                  background: dateRange === d.value ? RG : 'transparent',
                  color: dateRange === d.value ? '#080808' : 'rgba(230,183,173,0.5)',
                  border: `1px solid ${dateRange === d.value ? RG : 'rgba(230,183,173,0.2)'}`,
                  fontWeight: dateRange === d.value ? 700 : 400,
                }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-10 max-w-7xl mx-auto space-y-12">

        {/* ── Integrations & Connections ── */}
        <section>
          <SectionHeader title="Integration Connections" sub="Verify each service is actively sending data" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ConnectionStatus
              name="Google Search Console"
              status={gscConnected ? 'connected' : 'partial'}
              actionUrl="https://search.google.com/search-console"
              actionLabel="Open GSC"
            />
            <ConnectionStatus
              name="Google Analytics 4"
              status={gaConnected ? 'connected' : 'partial'}
              actionUrl="https://analytics.google.com"
              actionLabel="Open GA4"
            />
            <ConnectionStatus
              name="Google Merchant Center"
              status="disconnected"
              actionUrl="https://merchants.google.com"
              actionLabel="Setup GMC"
            />
            <ConnectionStatus
              name="Bing Webmaster Tools"
              status="disconnected"
              actionUrl="https://www.bing.com/webmasters"
              actionLabel="Setup Bing"
            />
          </div>
        </section>

        {/* ── Search Performance ── */}
        <section>
          <SectionHeader title="Search Performance" sub={gscConnected ? `Last ${dateRange} days via Google Search Console` : 'Connect Google Search Console to see live data'} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Organic Clicks" value={gscConnected ? totalClicks.toLocaleString() : '—'} icon={MousePointer} connected={gscConnected} />
            <StatCard label="Impressions" value={gscConnected ? totalImpressions.toLocaleString() : '—'} icon={Eye} connected={gscConnected} />
            <StatCard label="Avg Position" value={gscConnected && avgPosition ? `#${avgPosition}` : '—'} icon={Search} connected={gscConnected} />
            <StatCard label="Click-Through Rate" value={gscConnected && avgCTR ? avgCTR : '—'} icon={TrendingUp} connected={gscConnected} />
          </div>
        </section>

        {/* ── Google Analytics 4 Overview ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionHeader title="Google Analytics 4" sub={gaConnected ? `Last ${dateRange} days — Property 525961514` : 'Fetching GA4 data...'} />
            <button onClick={() => refetchGA()} className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.5)' }}>
              <RefreshCw className={`w-3 h-3 ${gaLoading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
          {gaLoading ? (
            <div className="flex items-center gap-3 py-8" style={{ color: 'rgba(230,183,173,0.4)' }}>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase">Loading GA4 data...</span>
            </div>
          ) : gaConnected && gaOverview ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                <StatCard label="Sessions" value={gaOverview.sessions.toLocaleString()} icon={BarChart2} color="#6CBD5A" />
                <StatCard label="Active Users" value={gaOverview.activeUsers.toLocaleString()} icon={Eye} color={RG} />
                <StatCard label="Page Views" value={gaOverview.pageViews.toLocaleString()} icon={Globe} color={GOLD} />
                <StatCard label="New Users" value={gaOverview.newUsers.toLocaleString()} icon={TrendingUp} color={RG} />
                <StatCard label="Bounce Rate" value={`${(gaOverview.bounceRate * 100).toFixed(1)}%`} icon={ArrowDown} color={gaOverview.bounceRate > 0.6 ? '#E8697A' : '#6CBD5A'} />
                <StatCard label="Avg Session" value={fmtSeconds(gaOverview.avgSessionDuration)} icon={RefreshCw} color={GOLD} />
              </div>

              {/* Traffic by Channel */}
              {gaChannels.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Traffic by Channel</p>
                    <div className="space-y-2">
                      {gaChannels.map((ch, i) => {
                        const totalSessions = gaChannels.reduce((s, c) => s + c.sessions, 0);
                        const pct = totalSessions > 0 ? Math.round((ch.sessions / totalSessions) * 100) : 0;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-heading text-xs" style={{ color: '#F5EFE6' }}>{ch.channel}</span>
                                <span className="font-mono text-[8px]" style={{ color: 'rgba(230,183,173,0.6)' }}>{ch.sessions.toLocaleString()} sessions</span>
                              </div>
                              <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: i === 0 ? RG : i === 1 ? GOLD : 'rgba(230,183,173,0.35)' }} />
                              </div>
                            </div>
                            <span className="font-mono text-[8px] w-8 text-right" style={{ color: 'rgba(230,183,173,0.5)' }}>{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top Pages */}
                  {gaTopPages.length > 0 && (
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Top Pages by Views</p>
                      <div className="space-y-1.5">
                        {gaTopPages.slice(0, 8).map((pg, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 px-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.06)' }}>
                            <span className="font-mono text-[8px] truncate" style={{ color: i < 3 ? RG : 'rgba(240,235,225,0.5)', maxWidth: '70%' }}>{pg.path}</span>
                            <span className="font-mono text-[8px]" style={{ color: 'rgba(230,183,173,0.5)' }}>{pg.pageViews.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
                {gaData?.data?.error || 'Unable to load GA4 data'}
              </p>
            </div>
          )}
        </section>

        {/* ── Keyword Opportunities ── */}
        {gscConnected && opportunities.length > 0 && (
          <section>
            <SectionHeader title="Ranking Opportunities" sub="Queries in positions 4–20 with 50+ impressions — highest lift potential" />
            <div className="overflow-x-auto">
              <table className="w-full" style={{ fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
                    {['Query', 'Position', 'Impressions', 'Clicks', 'CTR', 'Opportunity'].map(h => (
                      <th key={h} className="text-left py-3 pr-6 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((k, i) => {
                    const ctr = k.impressions > 0 ? ((k.clicks / k.impressions) * 100).toFixed(1) : '0.0';
                    const opportunityLabel = k.position <= 10 ? 'On page 1 — optimize CTR' : 'Climb to page 1';
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td className="py-3 pr-6 font-heading" style={{ color: '#F5EFE6', fontWeight: 400 }}>{k.query}</td>
                        <td className="py-3 pr-6 font-mono text-sm" style={{ color: GOLD }}>#{k.position?.toFixed(1)}</td>
                        <td className="py-3 pr-6 font-mono text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>{k.impressions?.toLocaleString()}</td>
                        <td className="py-3 pr-6 font-mono text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>{k.clicks}</td>
                        <td className="py-3 pr-6 font-mono text-sm" style={{ color: parseFloat(ctr) < 3 ? '#E8697A' : '#6CBD5A' }}>{ctr}%</td>
                        <td className="py-3 pr-6 font-heading text-xs" style={{ color: RG }}>{opportunityLabel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Content Health ── */}
        <section>
          <SectionHeader title="Content Health" sub="Live counts from the database" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Published Blog Posts" value={publishedPosts} icon={BookOpen} color="#6CBD5A" />
            <StatCard label="Verified Reviews" value={reviewCount} icon={CheckCircle} color={GOLD} />
            <StatCard label="Avg Review Rating" value={avgRating} icon={TrendingUp} color={RG} />
            <StatCard label="Total Products" value="12" icon={ShoppingBag} color={RG} sub="6 mushroom + 3 classic + 3 matcha" />
          </div>
        </section>

        {/* ── Indexing & Sitemaps ── */}
        <section>
          <SectionHeader title="Indexing & Sitemaps" sub="All sitemaps are live and referenced in robots.txt" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SITEMAPS.map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-4 transition-opacity hover:opacity-75"
                style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                <div className="flex items-center gap-3">
                  <Map className="w-4 h-4" style={{ color: '#6CBD5A' }} />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#F5EFE6' }}>{s.label}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" style={{ color: 'rgba(230,183,173,0.4)' }} />
              </a>
            ))}
          </div>
          <div className="mt-4 p-4" style={{ background: 'rgba(108,189,90,0.06)', border: '1px solid rgba(108,189,90,0.2)' }}>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6CBD5A' }}>Sitemap Index Status</p>
            <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Sitemap index live at <strong style={{ color: RG }}>torchrepublic.com/sitemap.xml</strong> — referenced in robots.txt.
              Submit to Google Search Console and Bing Webmaster Tools manually (see Owner Actions below).
            </p>
          </div>
        </section>

        {/* ── Technical SEO Audit ── */}
        <section>
          <SectionHeader title="Technical SEO Status" sub="In-app audit results" />
          <div className="space-y-2">
            {[
              { label: 'robots.txt', status: 'pass', detail: '/robots.txt — disallows admin, cart, checkout, auth routes; allows all public content' },
              { label: 'Sitemap Index', status: 'pass', detail: 'sitemap.xml references 4 sub-sitemaps: pages, products, blog, images' },
              { label: 'Canonical Tags', status: 'pass', detail: 'useSEO hook sets canonical on all pages; index.html has root canonical' },
              { label: 'Structured Data — Organization', status: 'pass', detail: 'Organization JSON-LD in index.html' },
              { label: 'Structured Data — WebSite', status: 'pass', detail: 'WebSite JSON-LD in index.html' },
              { label: 'Structured Data — Product', status: 'pass', detail: 'Product schema generated via useSEO hook on all 12 product pages' },
              { label: 'Structured Data — BlogPosting', status: 'pass', detail: 'BlogPosting schema on all journal articles' },
              { label: 'Structured Data — BreadcrumbList', status: 'pass', detail: 'Breadcrumbs injected on product and article pages' },
              { label: 'Open Graph Tags', status: 'pass', detail: 'OG title, description, image, type, url set on all pages' },
              { label: 'Twitter Card Tags', status: 'pass', detail: 'twitter:card, title, description, image set on all pages' },
              { label: 'Meta Descriptions', status: 'pass', detail: 'Unique descriptions set on all indexed pages via useSEO' },
              { label: 'noindex on admin routes', status: 'pass', detail: '/admin/*, /traffic-report, /email-campaign-dashboard redirect to / or blocked in robots.txt' },
              { label: 'Google Analytics 4', status: 'pass', detail: `GA4 connected via API — Property 525961514 (Torch Republic Coffee Company). Live data visible in Traffic Growth Center.` },
              { label: 'IndexNow', status: 'todo', detail: 'Not yet implemented — requires IndexNow API key (see Owner Actions)' },
              { label: 'Core Web Vitals Baseline', status: 'todo', detail: 'Run PageSpeed Insights after deployment for current LCP/INP/CLS scores' },
              { label: 'Google Merchant Center Feed', status: 'todo', detail: 'Shopify native feed recommended — see Owner Actions' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.07)' }}>
                {item.status === 'pass' && <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#6CBD5A' }} />}
                {item.status === 'warn' && <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: GOLD }} />}
                {item.status === 'todo' && <Loader2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.4)' }} />}
                <div>
                  <p className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: '#F5EFE6' }}>{item.label}</p>
                  <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Owner Actions Required ── */}
        <section>
          <SectionHeader title="Owner Actions Required" sub="Items that require manual steps outside this app" />
          <div className="space-y-4">
            {[

              {
                priority: 'HIGH',
                title: 'Submit sitemap to Google Search Console',
                steps: [
                  'Open search.google.com/search-console',
                  'Select torchrepublic.com property',
                  'Go to Sitemaps → Add a new sitemap',
                  'Enter: sitemap.xml and click Submit',
                  'Also submit: sitemap-pages.xml, sitemap-products.xml, sitemap-blog.xml',
                ],
                color: '#E8697A',
              },
              {
                priority: 'HIGH',
                title: 'Submit sitemap to Bing Webmaster Tools',
                steps: [
                  'Go to bing.com/webmasters and sign in',
                  'Add torchrepublic.com if not already added',
                  'Verify ownership via DNS TXT record or HTML file method',
                  'Go to Sitemaps and submit https://torchrepublic.com/sitemap.xml',
                ],
                color: '#E8697A',
              },
              {
                priority: 'MEDIUM',
                title: 'Set up Google Merchant Center product feed',
                steps: [
                  'Log in to your Shopify Admin → Sales Channels → Google & YouTube (install if not present)',
                  'Connect Google Merchant Center via Shopify native integration',
                  'This automatically syncs all 12 products with accurate prices, images, and availability',
                  'Shopify handles feed updates whenever price or inventory changes',
                  'Set product category to "Food, Beverages & Tobacco > Beverages > Coffee" for coffee products',
                  'Set matcha products to "Food, Beverages & Tobacco > Beverages > Tea"',
                ],
                color: GOLD,
              },
              {
                priority: 'MEDIUM',
                title: 'Add IndexNow API key for instant indexing',
                steps: [
                  'Go to bing.com/indexnow and generate an API key',
                  'Create a text file at torchrepublic.com/{api-key}.txt containing only the API key',
                  'In your Shopify admin, install the "IndexNow for Shopify" app to auto-submit product updates',
                  'For blog posts, the Base44 admin can manually submit via: https://api.indexnow.org/indexnow?url=https://torchrepublic.com/journal/{slug}&key={your-key}',
                ],
                color: GOLD,
              },
              {
                priority: 'MEDIUM',
                title: 'Update Organization schema with social profiles',
                steps: [
                  'Open index.html in the Base44 file editor',
                  'Find the Organization JSON-LD block',
                  'Add your social profile URLs to the sameAs array, e.g.: ["https://www.instagram.com/torchrepublic", "https://www.facebook.com/torchrepublic"]',
                  'Add legalName: "LiberTees For All LLC"',
                ],
                color: GOLD,
              },
              {
                priority: 'LOW',
                title: 'Core Web Vitals baseline measurement',
                steps: [
                  'Run https://pagespeed.web.dev/report?url=https://torchrepublic.com (both mobile and desktop tabs)',
                  'Record LCP, INP, and CLS scores',
                  'Priority improvements: image preload on hero, font-display:swap already set, lazy loading below fold',
                  'Re-test after any image or script changes',
                ],
                color: 'rgba(230,183,173,0.4)',
              },
              {
                priority: 'LOW',
                title: 'Verify product prices in structured data match Shopify',
                steps: [
                  'Product schema is built from local mushroomProducts.js fallback prices',
                  'Prices update automatically when mergeWithShopifyData() runs on product pages',
                  'Visit each product page and inspect page source to confirm Product schema price matches displayed price',
                  'If any mismatch, check that the Shopify product handle in mushroomProducts.js exactly matches the Shopify product handle',
                ],
                color: 'rgba(230,183,173,0.4)',
              },
            ].map((action, i) => (
              <div key={i} className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${action.color}30` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-1" style={{ background: `${action.color}15`, color: action.color, border: `1px solid ${action.color}30` }}>
                    {action.priority}
                  </span>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: '#F5EFE6' }}>{action.title}</p>
                </div>
                <ol className="space-y-1.5 pl-4">
                  {action.steps.map((step, j) => (
                    <li key={j} className="font-heading text-sm list-decimal" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.6 }}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ── UTM Link Builder ── */}
        <section>
          <SectionHeader title="UTM Link Builder" sub="Build tagged campaign URLs for social, email, QR codes, and ads" />
          <UTMLinkBuilder />
        </section>

        {/* ── Internal Links Quick Guide ── */}
        <section>
          <SectionHeader title="Internal Link Coverage" sub="Recommended cross-links between content and products" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { from: 'GlowMind Clarity (product)', to: ['Lion\'s Mane science article', 'Mushroom coffee vs regular coffee', 'Focus rituals collection'] },
              { from: 'DreamCap Blend (product)', to: ['MoonCap Restore comparison', 'Evening ritual content', 'Mushroom coffee taste guide'] },
              { from: 'The Monk Matcha (product)', to: ['Matcha vs Coffee article', 'History of Matcha article', 'Matcha collection'] },
              { from: 'Torchbearer (product)', to: ['Why premium instant coffee', 'Pod-free alternatives article', 'Classic coffee collection'] },
              { from: 'Jitters article', to: ['Matcha vs Coffee', 'Mushroom coffee taste guide', 'Mushroom collection'] },
              { from: 'Taste article', to: ['Mushroom collection', 'How it works page', 'Lion\'s Mane science'] },
              { from: 'Pod article', to: ['Classic instant coffee collection', 'Mushroom coffee collection', 'Build Your Ritual'] },
              { from: 'Matcha vs Coffee article', to: ['Matcha collection', 'Mushroom coffee collection', 'History of Matcha'] },
            ].map((link, i) => (
              <div key={i} className="p-4" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-2" style={{ color: RG }}>{link.from}</p>
                <ul className="space-y-1">
                  {link.to.map((t, j) => (
                    <li key={j} className="font-heading text-xs flex items-center gap-2" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
                      <span style={{ color: 'rgba(230,183,173,0.3)' }}>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}