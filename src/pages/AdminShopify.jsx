import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Package, Image, Tag, RefreshCw, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Users, Mail, BarChart2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useMutation } from '@tanstack/react-query';

const RG = '#E6B7AD';

// Categorize a product by type/lifecycle based on its fields
function categorizeProduct(p) {
  const status = p.status || p.published_status || (p.published_at ? 'active' : 'draft');
  const hasVariants = p.variants && p.variants.length > 0;
  const totalInventory = hasVariants ? p.variants.reduce((sum, v) => sum + (v.inventory_quantity || 0), 0) : (p.inventory_quantity || 0);
  const tags = (p.tags || '').toLowerCase();
  const title = (p.title || '').toLowerCase();

  let lifecycle = 'Active';
  let lifecycleColor = '#10B981';
  if (status === 'draft' || status === 'unpublished') { lifecycle = 'Draft'; lifecycleColor = '#F59E0B'; }
  else if (status === 'archived') { lifecycle = 'Archived'; lifecycleColor = '#6B7280'; }
  else if (totalInventory === 0 && hasVariants) { lifecycle = 'Out of Stock'; lifecycleColor = '#EF4444'; }
  else if (totalInventory > 0 && totalInventory <= 5) { lifecycle = 'Low Stock'; lifecycleColor = '#F59E0B'; }

  let type = 'Other';
  let typeColor = 'rgba(230,183,173,0.5)';
  if (title.includes('mushroom') || tags.includes('mushroom')) { type = 'Mushroom Coffee'; typeColor = '#C8A96E'; }
  else if (title.includes('matcha') || tags.includes('matcha')) { type = 'Matcha'; typeColor = '#6CBD5A'; }
  else if (title.includes('coffee') || title.includes('roast') || tags.includes('coffee')) { type = 'Classic Coffee'; typeColor = '#D67A5A'; }
  else if (title.includes('bundle') || tags.includes('bundle')) { type = 'Bundle'; typeColor = '#818CF8'; }
  else if (title.includes('subscription') || tags.includes('subscription')) { type = 'Subscription'; typeColor = '#E6B7AD'; }
  else if (p.product_type) { type = p.product_type; }

  return { lifecycle, lifecycleColor, type, typeColor, totalInventory, status };
}

function ProductCategoryTable({ products }) {
  if (!Array.isArray(products) || products.length === 0) return null;

  const typeCounts = {};
  const lifecycleCounts = {};
  products.forEach(p => {
    const { lifecycle, type } = categorizeProduct(p);
    typeCounts[type] = (typeCounts[type] || 0) + 1;
    lifecycleCounts[lifecycle] = (lifecycleCounts[lifecycle] || 0) + 1;
  });

  return (
    <div className="mt-3 space-y-3">
      {/* Summary badges */}
      <div className="flex flex-wrap gap-2 px-1">
        {Object.entries(lifecycleCounts).map(([label, count]) => {
          const { lifecycleColor } = categorizeProduct({ status: label === 'Active' ? 'active' : label === 'Draft' ? 'draft' : 'archived', title: '', tags: '' });
          const colorMap = { 'Active': '#10B981', 'Draft': '#F59E0B', 'Archived': '#6B7280', 'Out of Stock': '#EF4444', 'Low Stock': '#F59E0B' };
          const c = colorMap[label] || RG;
          return (
            <span key={label} className="font-mono text-[8px] tracking-[0.15em] uppercase px-2.5 py-1" style={{ background: `${c}15`, border: `1px solid ${c}30`, color: c, borderRadius: '3px' }}>
              {label}: {count}
            </span>
          );
        })}
      </div>

      {/* Product rows */}
      <div style={{ border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div className="grid gap-0" style={{ gridTemplateColumns: '1fr auto auto auto' }}>
          {/* Header */}
          <div className="px-3 py-2 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.4)', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>Product</div>
          <div className="px-3 py-2 font-mono text-[7px] tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(230,183,173,0.4)', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>Type</div>
          <div className="px-3 py-2 font-mono text-[7px] tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(230,183,173,0.4)', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>Status</div>
          <div className="px-3 py-2 font-mono text-[7px] tracking-[0.3em] uppercase text-right" style={{ color: 'rgba(230,183,173,0.4)', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>Stock</div>

          {/* Rows */}
          {products.map((p, i) => {
            const { lifecycle, lifecycleColor, type, typeColor, totalInventory } = categorizeProduct(p);
            return (
              <React.Fragment key={p.id || i}>
                <div className="px-3 py-2.5 font-heading text-xs truncate" style={{ color: '#F5EFE6', borderBottom: i < products.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', maxWidth: '200px' }}>
                  {p.title}
                </div>
                <div className="px-3 py-2.5 text-center" style={{ borderBottom: i < products.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span className="font-mono text-[7px] tracking-[0.1em] uppercase px-2 py-0.5" style={{ background: `${typeColor}15`, color: typeColor, borderRadius: '2px', whiteSpace: 'nowrap' }}>{type}</span>
                </div>
                <div className="px-3 py-2.5 text-center" style={{ borderBottom: i < products.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span className="font-mono text-[7px] tracking-[0.1em] uppercase px-2 py-0.5" style={{ background: `${lifecycleColor}15`, color: lifecycleColor, borderRadius: '2px', whiteSpace: 'nowrap' }}>{lifecycle}</span>
                </div>
                <div className="px-3 py-2.5 font-mono text-[9px] text-right" style={{ color: totalInventory === 0 ? '#EF4444' : 'rgba(240,230,215,0.6)', borderBottom: i < products.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  {totalInventory}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ title, data, loading, expanded, onToggle }) {
  const isProductList = Array.isArray(data) && data.length > 0 && data[0]?.variants !== undefined;

  if (loading) return (
    <div className="p-4 mt-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
      <div className="flex items-center gap-2">
        <RefreshCw size={12} className="animate-spin" style={{ color: RG }} />
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Fetching from Shopify...</span>
      </div>
    </div>
  );
  if (!data) return null;
  return (
    <div className="mt-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <CheckCircle size={12} style={{ color: '#10B981' }} />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: '#10B981' }}>
            {title} — {Array.isArray(data) ? `${data.length} results` : 'Done'}
          </span>
        </div>
        {expanded ? <ChevronUp size={12} style={{ color: RG }} /> : <ChevronDown size={12} style={{ color: RG }} />}
      </button>
      {expanded && (
        <div className="px-4 pb-4">
          {isProductList ? (
            <ProductCategoryTable products={data} />
          ) : (
            <pre className="font-mono text-[8px] overflow-auto max-h-[400px] p-3" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '4px', color: 'rgba(240,230,215,0.7)', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

function ToolCard({ icon: Icon, title, description, onRun, loading, result, color = RG }) {
  const [expanded, setExpanded] = useState(false);

  // Auto-expand when result arrives
  React.useEffect(() => {
    if (result) setExpanded(true);
  }, [result]);

  return (
    <div className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${color}20`, borderRadius: '6px' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25`, borderRadius: '4px' }}>
          <Icon size={16} style={{ color }} />
        </div>
        <div>
          <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem' }}>{title}</h3>
          <p className="font-heading text-xs" style={{ color: 'rgba(240,230,215,0.45)', fontWeight: 300 }}>{description}</p>
        </div>
      </div>
      <button
        onClick={onRun}
        disabled={loading}
        className="w-full font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-2.5 transition-all hover:opacity-90 flex items-center justify-center gap-2"
        style={{ background: loading ? `${color}30` : color, color: loading ? 'rgba(255,255,255,0.4)' : '#080808', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? <><RefreshCw size={11} className="animate-spin" /> Running...</> : 'Run'}
      </button>
      <ResultPanel title={title} data={result} loading={loading} expanded={expanded} onToggle={() => setExpanded(e => !e)} />
    </div>
  );
}

export default function AdminShopify() {
  useSEO({ title: 'Shopify Admin Tools', description: 'Admin tools for Shopify integration.', url: '/admin/shopify', noindex: true });

  const [states, setStates] = useState({});
  const [importResult, setImportResult] = useState(null);

  const importCustomersMutation = useMutation({
    mutationFn: async () => {
      const res = await base44.functions.invoke('fetchShopifyCustomers', {});
      return res.data;
    },
    onSuccess: (data) => setImportResult(data),
  });

  const run = async (key, fn) => {
    setStates(s => ({ ...s, [key]: { loading: true, result: null, error: null } }));
    try {
      const res = await fn();
      setStates(s => ({ ...s, [key]: { loading: false, result: res?.data || res, error: null } }));
    } catch (e) {
      setStates(s => ({ ...s, [key]: { loading: false, result: null, error: e.message } }));
    }
  };

  const tools = [
    {
      key: 'products',
      icon: Package,
      title: 'Fetch All Products',
      description: 'Retrieve all products, variants, prices, and availability from Shopify.',
      color: RG,
      fn: () => base44.functions.invoke('fetchShopifyProducts', {}),
    },
    {
      key: 'variantIds',
      icon: Tag,
      title: 'Verify Variant IDs',
      description: 'Look up and verify all Shopify variant IDs used for checkout URL generation.',
      color: '#C4A35A',
      fn: () => base44.functions.invoke('getActualVariantIds', {}),
    },
    {
      key: 'variants',
      icon: Tag,
      title: 'Get Shopify Variants',
      description: 'Fetch full variant data including SKUs, inventory, and pricing.',
      color: '#B88FA8',
      fn: () => base44.functions.invoke('getShopifyVariants', {}),
    },
    {
      key: 'images',
      icon: Image,
      title: 'Get Product Images',
      description: 'Fetch all product images and their URLs from Shopify CDN.',
      color: '#6CBD5A',
      fn: () => base44.functions.invoke('getShopifyProductImages', {}),
    },
    {
      key: 'availability',
      icon: CheckCircle,
      title: 'Check Product Availability',
      description: 'Verify in-stock status and inventory levels for all products.',
      color: '#10B981',
      fn: () => base44.functions.invoke('getShopifyProductAvailability', {}),
    },
    {
      key: 'activeProducts',
      icon: Package,
      title: 'Active Products Only',
      description: 'Fetch only published/active products currently listed in the Shopify store.',
      color: '#4A9EE6',
      fn: () => base44.functions.invoke('getActiveShopifyProducts', {}),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#080808', padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.4)' }}>
            <Link to="/admin/shopify" style={{ color: 'rgba(230,183,173,0.6)', textDecoration: 'none' }} className="hover:opacity-80 transition-opacity">Admin</Link>
            {' · '}Shopify Integration
          </p>
          <h1 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Admin Panel
          </h1>
          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
            Manage Shopify data, import customers, and run campaigns.
          </p>
        </div>

        {/* Admin Quick Nav */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <div className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '6px' }}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} style={{ color: RG }} />
              <h3 className="font-serif font-bold text-white">Customer Import</h3>
            </div>
            <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,230,215,0.45)' }}>
              Pull customer data from Shopify into the app for email campaigns.
            </p>
            <button
              onClick={() => importCustomersMutation.mutate()}
              disabled={importCustomersMutation.isPending}
              className="w-full font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-2.5 flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: importCustomersMutation.isPending ? 'rgba(230,183,173,0.3)' : RG, color: '#080808', borderRadius: '4px', cursor: importCustomersMutation.isPending ? 'not-allowed' : 'pointer' }}
            >
              {importCustomersMutation.isPending ? <><RefreshCw size={11} className="animate-spin" /> Importing...</> : <><Download size={11} /> Import from Shopify</>}
            </button>
            {importResult && (
              <p className="font-mono text-[9px] mt-2 text-center" style={{ color: '#10B981' }}>
                ✓ {importResult?.data?.totalCustomers || 'Done'} customers loaded
              </p>
            )}
          </div>

          <Link to="/email-campaign" className="block p-5 transition-all hover:opacity-80" style={{ background: '#0F0E0D', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '6px', textDecoration: 'none' }}>
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} style={{ color: '#818CF8' }} />
              <h3 className="font-serif font-bold text-white">Email Campaigns</h3>
            </div>
            <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,230,215,0.45)' }}>
              Send relaunch and re-engagement email sequences to customer segments.
            </p>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: '#818CF8' }}>
              Open Dashboard →
            </span>
          </Link>

          <Link to="/traffic-report" className="block p-5 transition-all hover:opacity-80" style={{ background: '#0F0E0D', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', textDecoration: 'none' }}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 size={16} style={{ color: '#10B981' }} />
              <h3 className="font-serif font-bold text-white">Traffic Report</h3>
            </div>
            <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,230,215,0.45)' }}>
              View Google Analytics traffic sources, sessions, and top product pages.
            </p>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: '#10B981' }}>
              View Report →
            </span>
          </Link>
        </div>

        {/* Divider */}
        <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.3)' }}>
          Shopify Product Tools
        </p>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map(tool => (
            <ToolCard
              key={tool.key}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              color={tool.color}
              loading={states[tool.key]?.loading || false}
              result={states[tool.key]?.result || null}
              onRun={() => run(tool.key, tool.fn)}
            />
          ))}
        </div>

        {/* Error display */}
        {Object.entries(states).map(([key, s]) => s.error ? (
          <div key={key} className="mt-4 p-4 flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '4px' }}>
            <AlertCircle size={14} style={{ color: '#FCA5A5' }} />
            <span className="font-mono text-xs" style={{ color: '#FCA5A5' }}>{key}: {s.error}</span>
          </div>
        ) : null)}

      </div>
    </div>
  );
}