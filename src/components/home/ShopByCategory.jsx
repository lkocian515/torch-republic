import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const CATEGORIES = [
  {
    label: 'Classic Instant Coffee',
    route: '/classic-coffee',
    cta: 'Shop Instant Coffee',
    accent: '#C4A35A',
    body: 'Smooth, premium instant coffee for simple daily energy. No machines, no pods. Rich flavor in seconds.',
    detail: 'Medium & Dark Roasts · 27 Servings · No Mushrooms',
    emoji: '☕',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/17_a9cde60d-d323-42f1-9eb5-1ca1cce8678e.png?v=1781102333',
  },
  {
    label: 'Mushroom Coffee',
    route: '/mushroom-coffee',
    cta: 'Shop Mushroom Coffee',
    accent: '#10B981',
    body: "Coffee-forward blends with functional mushrooms to support clarity, focus, and calm energy. Tastes like coffee, not mushrooms.",
    detail: "Lion's Mane + Chaga · Coffee-Forward · 27 Servings",
    emoji: '🍄',
    featured: true,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cd698018e_11.png',
  },
  {
    label: 'Ceremonial Matcha',
    route: '/matcha',
    cta: 'Shop Matcha',
    accent: '#6EE7B7',
    body: 'Ceremonial-style matcha for smooth focus, presence, and daily ritual. Calm energy, no jitters, no coffee.',
    detail: 'Ceremonial Grade · Instant Powder · 25 Servings · No Coffee',
    emoji: '🍵',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a2eb9ed53_zssssss.png',
  },
];

export default function ShopByCategory() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#0A0807' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Or Browse by Category
          </p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Three Rituals. One Brand.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col relative"
              style={{
                background: cat.featured ? 'rgba(16,185,129,0.04)' : '#141312',
                border: cat.featured ? `1px solid rgba(16,185,129,0.25)` : '1px solid rgba(230,183,173,0.1)',
              }}
            >
              {cat.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1" style={{ background: '#10B981', color: '#080808' }}>
                  <p className="font-mono text-[7px] tracking-[0.3em] uppercase font-bold">Most Popular</p>
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                {cat.image && (
                  <div className="mb-5 flex items-center justify-center" style={{ height: '120px' }}>
                    <img src={cat.image} alt={cat.label} className="max-h-full max-w-full object-contain" />
                  </div>
                )}
                <span className="text-3xl mb-5 block">{cat.emoji}</span>
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>
                  {cat.label}
                </h3>
                <p className="font-heading text-base mb-4 flex-1" style={{ color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.8 }}>
                  {cat.body}
                </p>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-6" style={{ color: `${cat.accent}FF` }}>
                  {cat.detail}
                </p>
                <Link
                  to={cat.route}
                  className="block text-center font-mono text-[12px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-80 py-3.5"
                  style={{
                    background: cat.featured ? '#10B981' : 'transparent',
                    color: cat.featured ? '#080808' : RG,
                    border: cat.featured ? 'none' : `1px solid rgba(230,183,173,0.3)`,
                  }}
                >
                  {cat.cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}