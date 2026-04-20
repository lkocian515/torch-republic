import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import MugsTumblersHero from '../components/mugs-tumblers/MugsTumblersHero';
import MugsTumblersGrid from '../components/mugs-tumblers/MugsTumblersGrid';

const AC = '#C9A24A';

async function fetchMugsTumblers() {
  try {
    const res = await base44.functions.invoke('fetchShopifyCollection', { handle: 'mugs-tumblers' });
    return res.data?.products || [];
  } catch (error) {
    console.error('Error fetching mugs & tumblers:', error);
    return [];
  }
}

export default function MugsTumblers() {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['mugs-tumblers'],
    queryFn: fetchMugsTumblers,
    staleTime: 10 * 60 * 1000,
  });

  // Simple category filtering based on product titles
  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'mugs', label: 'Mugs' },
    { id: 'tumblers', label: 'Tumblers' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.title.toLowerCase().includes(activeCategory));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* Hero */}
      <MugsTumblersHero />

      {/* Category Filter */}
      {allProducts.length > 0 && (
        <section className="px-6 md:px-12 py-8" style={{ backgroundColor: '#050505', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="font-mono text-[10px] tracking-[0.3em] uppercase transition-all px-4 py-2"
                  style={{
                    background: activeCategory === cat.id ? AC : 'transparent',
                    color: activeCategory === cat.id ? '#080808' : 'rgba(240,235,225,0.6)',
                    border: activeCategory === cat.id ? 'none' : '1px solid rgba(201,162,74,0.2)',
                  }}
                  onMouseEnter={e => {
                    if (activeCategory !== cat.id) {
                      e.currentTarget.style.borderColor = 'rgba(201,162,74,0.5)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== cat.id) {
                      e.currentTarget.style.borderColor = 'rgba(201,162,74,0.2)';
                    }
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <MugsTumblersGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
}