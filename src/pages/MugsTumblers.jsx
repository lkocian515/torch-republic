import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import MugsTumblersHero from '../components/mugs-tumblers/MugsTumblersHero';
import MugsTumblersGrid from '../components/mugs-tumblers/MugsTumblersGrid';
import LifestyleValueSection from '../components/mugs-tumblers/LifestyleValueSection';
import CoffeeCrossSell from '../components/mugs-tumblers/CoffeeCrossSell';
import QualityTrustStrip from '../components/mugs-tumblers/QualityTrustStrip';

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

      {/* Lifestyle Value Section */}
      <LifestyleValueSection />

      {/* Coffee Cross-Sell */}
      <CoffeeCrossSell />

      {/* Trust & Quality Strip */}
      <QualityTrustStrip />

      {/* Final CTA */}
      <section className="py-20 md:py-28 px-6 md:px-12 text-center" style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[640px] mx-auto"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${AC}60` }}>
            Complete Your Journey
          </p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em' }}>
            Carry the Flame<br />
            <span style={{ color: AC }}>Every Day</span>
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
            Pair your mug or tumbler with a premium blend from the Founders Series and complete the ritual.
          </p>
          <a
            href="https://torch-republic.com/collections/mugs-tumblers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-90 btn-glow"
            style={{ background: AC, color: '#080808', fontWeight: 800, padding: '14px 36px' }}
          >
            Shop All Drinkware →
          </a>
        </motion.div>
      </section>
    </div>
  );
}