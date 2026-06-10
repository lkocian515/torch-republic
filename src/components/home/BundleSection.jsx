import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const BUNDLES = [
  {
    name: 'Morning Ritual Bundle',
    bestFor: 'Classic morning energy and smooth daily routine',
    description: 'Three blends chosen for clean energy, a smooth start, and a ritual that sets your tone for the day.',
    includes: 'Torchbearer + Ember Rise + one focus blend',
    servings: '3 tubes · ~81 servings total',
    perServing: '~$0.93 per serving',
    price: '$74.97',
    accent: '#D6B27A',
    tag: 'Great for First-Timers',
    href: '/build-your-ritual',
  },
  {
    name: 'Focus & Clarity Bundle',
    bestFor: 'Work, creativity, mental clarity, and steady energy',
    description: 'Blends chosen for sustained focus, calm energy, and deep work rituals throughout your day.',
    includes: 'GlowMind Clarity + The Oracle + Torchbearer',
    servings: '3 tubes · ~81 servings total',
    perServing: '~$0.93 per serving',
    price: '$74.97',
    accent: '#10B981',
    tag: 'Most Popular',
    featured: true,
    href: '/build-your-ritual',
  },
  {
    name: 'Calm Energy Bundle',
    bestFor: 'Slower mornings, reset rituals, and smoother energy',
    description: 'Designed for afternoons, wind-down rituals, and customers who want calmer, smoother energy.',
    includes: 'MoonCap Restore + DreamCap + The Monk Matcha',
    servings: '3 tubes · ~79 servings total',
    perServing: '~$0.95 per serving',
    price: '$74.97',
    accent: '#8B9ED4',
    tag: 'Best for Evenings',
    href: '/build-your-ritual',
  },
  {
    name: 'Full Torch Ritual Bundle',
    bestFor: 'The complete coffee, mushroom coffee, and matcha experience',
    description: 'Experience the full Torch Republic lineup — classic coffee, mushroom coffee, and matcha in one ritual-ready bundle.',
    includes: 'Choose any 6 blends from all three categories',
    servings: '6 tubes · ~156 servings total',
    perServing: '~$0.83 per serving',
    price: '$129.99',
    accent: '#E6B7AD',
    tag: 'Best Value',
    href: '/build-your-ritual',
  },
];

export default function BundleSection() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#0D0C0B' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Build Your Ritual
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Choose Your Bundle
          </h2>
          <p className="font-heading mx-auto mb-4" style={{ fontSize: '1.1rem', color: 'rgba(245,239,230,0.8)', fontWeight: 400, lineHeight: 1.85, maxWidth: '580px' }}>
            Curated bundles designed for different moments of your day. Save when you bundle.
          </p>
        </motion.div>

        {/* Bundle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {BUNDLES.map((bundle, i) => (
            <motion.div
              key={bundle.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="flex flex-col relative"
              style={{
                background: bundle.featured ? `rgba(16,185,129,0.04)` : '#141312',
                border: bundle.featured ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(230,183,173,0.1)',
              }}
            >
              {/* Tag badge */}
              {bundle.tag && (
                <div className="px-3 py-1.5" style={{ background: bundle.featured ? '#10B981' : `rgba(230,183,173,0.1)`, borderBottom: bundle.featured ? 'none' : '1px solid rgba(230,183,173,0.1)' }}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-center" style={{ color: bundle.featured ? '#080808' : RG }}>
                    {bundle.tag}
                  </p>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Name */}
                <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                  {bundle.name}
                </h3>

                {/* Best for */}
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-3" style={{ color: `${bundle.accent}80` }}>
                  Best for: {bundle.bestFor}
                </p>

                {/* Description */}
                <p className="font-heading text-base mb-4 flex-1" style={{ color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.75 }}>
                  {bundle.description}
                </p>

                {/* Includes */}
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-1" style={{ color: `${bundle.accent}FF` }}>
                  Includes
                </p>
                <p className="font-heading text-base mb-3" style={{ color: `${bundle.accent}EE`, fontWeight: 400, lineHeight: 1.5 }}>
                  {bundle.includes}
                </p>

                {/* Servings + per serving */}
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  ✦ {bundle.servings}
                </p>
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.35)' }}>
                  {bundle.perServing}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-bold" style={{ fontSize: '1.25rem', color: RG }}>
                    {bundle.price}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    Free Ship
                  </span>
                </div>

                <Link
                  to={bundle.href}
                  className="block text-center font-mono text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-80 py-3.5"
                  style={{
                    background: bundle.featured ? '#10B981' : 'transparent',
                    color: bundle.featured ? '#080808' : RG,
                    border: bundle.featured ? 'none' : `1px solid rgba(230,183,173,0.3)`,
                  }}
                >
                  Build This Bundle →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Or custom build */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.4)', fontWeight: 300 }}>
            Want to mix your own blends?
          </p>
          <Link
            to="/build-your-ritual"
            className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
            style={{ color: RG, borderBottom: `1px solid ${RG}40`, paddingBottom: '2px' }}
          >
            Build a Custom Bundle →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}