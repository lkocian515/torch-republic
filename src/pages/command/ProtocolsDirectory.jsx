import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Search } from 'lucide-react';

const GOLD = '#D4AF37';
const BG = '#0A0A0A';

const CATEGORY_COLORS = {
  focus: '#D4AF37',
  sleep: '#7C9CBF',
  energy: '#E8A87C',
  recovery: '#7CBF8E',
  mindset: '#C49ABF',
};

const BLEND_COLORS = {
  GlowMind: '#D4AF37',
  MoonCap: '#7C9CBF',
  Both: '#7CBF8E',
};

export default function ProtocolsDirectory() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: protocols = [], isLoading } = useQuery({
    queryKey: ['protocols'],
    queryFn: () => base44.entities.PerformanceProtocol.filter({ published: true }),
  });

  const categories = ['all', 'focus', 'sleep', 'energy', 'recovery', 'mindset'];

  const filtered = protocols.filter(p => {
    const matchesSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.tagline?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#F0EBE1' }} className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Torch Command</span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,175,55,0.5)' }}>Performance Protocols</span>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ borderBottom: `1px solid rgba(212,175,55,0.08)` }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-[10px] tracking-[0.6em] uppercase mb-4" style={{ color: `${GOLD}70` }}>Optimization Library</p>
          <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Performance Protocols
          </h1>
          <p className="max-w-xl mx-auto" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Evidence-based mental and physical optimization routines for peak performers. Each protocol pairs with a specific Torch Republic blend.
          </p>
        </motion.div>
      </section>

      {/* Search + Filters */}
      <section className="px-6 md:px-10 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `${GOLD}60` }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search protocols..."
              className="w-full pl-12 pr-4 py-3 bg-transparent font-mono text-sm focus:outline-none"
              style={{ border: `1px solid rgba(212,175,55,0.2)`, color: '#F0EBE1' }}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all"
                style={{
                  background: activeCategory === cat ? `${GOLD}18` : 'transparent',
                  border: `1px solid ${activeCategory === cat ? GOLD : 'rgba(212,175,55,0.2)'}`,
                  color: activeCategory === cat ? GOLD : 'rgba(212,175,55,0.5)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: 'transparent' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: 'rgba(240,235,225,0.3)', fontSize: '0.9rem' }}>No protocols found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((protocol, i) => {
                const catColor = CATEGORY_COLORS[protocol.category] || GOLD;
                const blendColor = BLEND_COLORS[protocol.recommended_blend] || GOLD;
                return (
                  <motion.div
                    key={protocol.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/command/protocols/${protocol.slug}`}
                      className="block p-6 transition-all group"
                      style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid rgba(212,175,55,0.12)`, textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(212,175,55,0.4)`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = `rgba(212,175,55,0.12)`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1" style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}30` }}>
                          {protocol.category}
                        </span>
                        {protocol.duration && (
                          <span className="font-mono text-[8px]" style={{ color: 'rgba(240,235,225,0.3)' }}>{protocol.duration}</span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-white mb-2 group-hover:text-opacity-90" style={{ fontSize: '1.15rem', lineHeight: 1.3 }}>
                        {protocol.title}
                      </h3>
                      {protocol.tagline && (
                        <p className="mb-4" style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.85rem' }}>{protocol.tagline}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: blendColor }}>
                          ◆ {protocol.recommended_blend}
                        </span>
                        <span className="font-mono text-[9px] transition-all group-hover:translate-x-1" style={{ color: GOLD }}>View Protocol →</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}