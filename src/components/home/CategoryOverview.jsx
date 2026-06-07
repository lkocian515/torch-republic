import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Leaf, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const CATEGORIES = [
  {
    name: 'Premium Instant Coffee',
    tagline: 'For those who want coffee in its purest, simplest form.',
    desc: 'Smooth, premium instant coffee for mornings when simplicity is enough. No machine, no grinder, no complication — just a clean cup and a clear beginning.',
    products: 'Torchbearer · Ember Rise · Midnight Watch',
    icon: Coffee,
    color: '#D6B27A',
    link: '/classic-coffee',
    cta: 'Shop Instant Coffee'
  },
  {
    name: 'Mushroom Coffee',
    tagline: 'For those who want function woven into the ritual.',
    desc: 'Premium instant coffee blended with functional mushrooms for focus, clarity, energy, restoration, and daily resilience.',
    products: 'SunCap Rise · GlowMind Clarity · MoonCap Restore · DreamCap · The Oracle · Mystic Bloom',
    icon: Leaf,
    color: '#E6B7AD',
    link: '/mushroom-coffee',
    cta: 'Shop Mushroom Coffee'
  },
  {
    name: 'Matcha',
    tagline: 'For those who want calm focus, discipline, and ceremonial energy.',
    desc: 'Matcha blends inspired by discipline, transformation, creativity, and the quiet power of daily devotion.',
    products: 'The Monk · The Ascendant · The Alchemist',
    icon: Sparkles,
    color: '#10B981',
    link: '/matcha',
    cta: 'Shop Matcha'
  }
];

export default function CategoryOverview() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            Three Ways to Begin
          </p>
          <h2 className="font-serif font-bold" style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#FFFFFF'
          }}>
            Choose Your Foundation
          </h2>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8"
              style={{
                background: '#0F0E0D',
                border: `1px solid ${cat.color}25`,
                borderRadius: '6px'
              }}
            >
              <div className="mb-6" style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `${cat.color}15`,
                border: `1px solid ${cat.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <cat.icon size={26} style={{ color: cat.color }} />
              </div>
              
              <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.3rem' }}>
                {cat.name}
              </h3>
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-4" style={{ color: cat.color }}>
                {cat.tagline}
              </p>
              <p className="font-heading text-sm mb-5" style={{
                color: 'rgba(240,235,225,0.55)',
                fontWeight: 300,
                lineHeight: 1.75
              }}>
                {cat.desc}
              </p>
              <p className="font-mono text-[7px] tracking-[0.15em] uppercase mb-6" style={{
                color: 'rgba(240,235,225,0.4)'
              }}>
                {cat.products}
              </p>
              
              <Link
                to={cat.link}
                className="inline-block font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80"
                style={{ color: cat.color }}
              >
                {cat.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}