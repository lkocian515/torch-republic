import React, { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductGrid from '../components/products/ProductGrid';
import PullToRefresh from '../components/mobile/PullToRefresh';

const CATEGORY_TABS = [
  { key: 'all', label: 'All' },
  { key: 't-shirts', label: 'T-Shirts' },
];

const SORT_OPTIONS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-low', label: 'Price ↑' },
  { key: 'price-high', label: 'Price ↓' },
];

export default function BestSellers() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['best-sellers'] });
  }, [queryClient]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['best-sellers'],
    queryFn: () => base44.entities.Product.filter({ collection: 'best-sellers' }, '', 500),
  });

  const filtered = products.filter(p => {
    if (!p.image_url) return false;
    return category === 'all' || p.category === category;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    const aRank = a.best_seller_rank || 9999;
    const bRank = b.best_seller_rank || 9999;
    if (aRank !== bRank) return aRank - bRank;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

        {/* ── HERO ── */}
        <section className="pt-20 pb-10 px-6 md:px-12" style={{ borderBottom: '1px solid rgba(196,163,90,0.1)' }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C4A35A)' }} />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C4A35A' }}>
                Torch Republic
              </span>
            </div>
            <h1 className="font-serif mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#F0EBE1', lineHeight: 1 }}>
              Best Sellers
            </h1>
            <p className="font-mono text-sm" style={{ color: 'rgba(196,163,90,0.6)' }}>
              Premium apparel for those who carry the flame.
            </p>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <div className="sticky top-0 z-20 px-6 md:px-12 py-3"
          style={{ background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid rgba(196,163,90,0.07)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-[1280px] mx-auto flex items-center gap-2 flex-wrap">
            {/* Category tabs */}
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setCategory(tab.key)}
                  className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2 transition-all"
                  style={{
                    color: category === tab.key ? '#000' : 'rgba(255,255,255,0.4)',
                    background: category === tab.key ? '#C4A35A' : 'transparent',
                    border: category === tab.key ? '1px solid #C4A35A' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort + count */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-gray-600">{sorted.length} items</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-2 outline-none"
                style={{ background: 'rgba(196,163,90,0.06)', border: '1px solid rgba(196,163,90,0.2)', color: '#C4A35A' }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.key} value={o.key} style={{ background: '#111' }}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── GRID ── */}
        <section className="py-12 px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <ProductGrid products={sorted} isLoading={isLoading} />
          </div>
        </section>

      </div>
    </PullToRefresh>
  );
}