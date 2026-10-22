import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CATEGORY_IMAGES } from '@/lib/homepageFeaturedProducts';

const RG = '#E6B7AD';

const CATEGORIES = [
  {
    label: 'Classic Instant Coffee',
    route: '/classic-coffee',
    cta: 'Shop Instant Coffee',
    accent: '#C4A35A',
    icon: '☕',
    body: 'Premium coffee-forward instant blends for smooth energy, rich flavor, and everyday convenience.',
    detail: 'No machines · Instant prep · 27 servings',
    categoryKey: 'classic-coffee',
  },
  {
    label: 'Mushroom Coffee',
    route: '/mushroom-coffee',
    cta: 'Shop Mushroom Coffee',
    accent: '#10B981',
    icon: '🍄',
    body: 'Functional mushroom coffee blends made for focus, clarity, calm energy, and modern wellness rituals.',
    detail: "Lion's Mane + Cordyceps + Reishi · Coffee-forward · 27 servings",
    featured: true,
    categoryKey: 'mushroom-coffee',
  },
  {
    label: 'Ceremonial Matcha',
    route: '/matcha',
    cta: 'Shop Matcha',
    accent: '#6EE7B7',
    icon: '🍵',
    body: 'Smooth matcha blends for calm focus, mindful energy, and a grounded daily reset.',
    detail: 'Ceremonial grade · Instant powder · 25 servings',
    categoryKey: 'matcha',
  },
];

export default function ThreeCategories() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: '#0A0807' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[8px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Three Rituals. One Brand.
          </p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Choose Your Ritual
          </h2>
        </motion.div>

        {/* Cards with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => {
            const categoryImage = CATEGORY_IMAGES[cat.categoryKey];
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col"
                style={{
                  background: cat.featured ? 'rgba(16,185,129,0.04)' : '#141312',
                  border: cat.featured ? `1px solid rgba(16,185,129,0.25)` : '1px solid rgba(230,183,173,0.1)',
                  position: 'relative',
                }}
              >
                {cat.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                    style={{ background: '#10B981', color: '#080808' }}>
                    <p className="font-mono text-[7px] tracking-[0.3em] uppercase font-bold">Most Popular</p>
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  <span className="text-4xl mb-5 block">{cat.icon}</span>
                  <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.3rem', lineHeight: 1.2 }}>
                    {cat.label}
                  </h3>
                  <p className="font-heading text-sm mb-4 flex-1" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.75 }}>
                    {cat.body}
                  </p>
                  <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-6" style={{ color: `${cat.accent}70` }}>
                    {cat.detail}
                  </p>
                  
                  {/* Category Image */}
                  <div className="mb-6 product-image-wrap" style={{ aspectRatio: '4/3', background: '#141414', borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src={categoryImage?.imageUrl || '/torch-republic-logo-transparent.png'}
                      alt={categoryImage?.alt || `${cat.label} collection`}
                      loading="lazy"
                      width="400"
                      height="300"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/torch-republic-logo-transparent.png';
                      }}
                    />
                  </div>
                  
                  <Link
                    to={cat.route}
                    className="block text-center font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3"
                    style={{ background: cat.featured ? '#10B981' : 'transparent', color: cat.featured ? '#080808' : RG, border: cat.featured ? 'none' : `1px solid rgba(230,183,173,0.3)` }}
                  >
                    {cat.cta} →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}