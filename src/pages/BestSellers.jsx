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

        {/* ── CINEMATIC BANNER ── */}
        <section className="relative w-full overflow-hidden" style={{ height: 'clamp(380px, 55vh, 600px)' }}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85"
            alt="Best Sellers"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.5 }}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 18%, transparent 60%, #000 100%)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #000 0%, transparent 20%, transparent 80%, #000 100%)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(196,163,90,0.6)' }}>
              Torch Republic
            </p>
            <h1 className="font-serif leading-none mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 700, color: '#C9A24A', letterSpacing: '-0.02em', textShadow: '0 2px 40px rgba(0,0,0,0.7)' }}>
              Best Sellers
            </h1>
            <p className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.4)' }}>
              The ones people keep coming back for.
            </p>
            <div className="h-px w-20 mt-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.5), transparent)' }} />
          </div>
        </section>

        {/* ── DESCRIPTION ── */}
        <div className="max-w-[720px] mx-auto px-6 py-16 text-center">
          <p style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.5)', lineHeight: 2, fontWeight: 300 }}>
            Premium apparel for those who carry the flame. These are the designs our community keeps coming back to — built with the same conviction that drives everything we do.
          </p>
        </div>

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

        {/* ── CLOSING QUOTE ── */}
        <section className="px-6 py-28 text-center" style={{ borderTop: '1px solid rgba(196,163,90,0.07)', backgroundColor: '#060606' }}>
          <blockquote className="font-serif italic max-w-[760px] mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#F0EBE1', lineHeight: 1.25 }}>
            "Wear what you believe."
          </blockquote>
        </section>

      </div>
    </PullToRefresh>
  );
}