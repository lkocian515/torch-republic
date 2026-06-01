import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function OriginCraftsmanshipSection({ product }) {
  const origin = product.originStory || {
    headline: 'Crafted from premium coffee beans and enhanced with functional mushrooms',
    description: 'Torch Republic blends traditional coffee craftsmanship with modern wellness ingredients. Each blend is carefully roasted to highlight the natural flavor profile of specialty-grade Arabica beans, then enhanced with dual-extracted Lion\'s Mane and Chaga mushroom extracts for a balanced, coffee-forward experience.',
    coffeeOrigin: 'Premium Arabica beans sourced from Central and South American highlands',
    roastProfile: 'Small-batch roasted to achieve optimal flavor extraction and smooth body',
    processing: 'Freeze-dried instant coffee process preserves flavor complexity and aroma',
    whyCreated: product.mood || 'Designed for daily rituals that demand both mental clarity and rich coffee satisfaction',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full mb-16"
    >
      <div style={{ padding: '40px 32px', background: 'linear-gradient(135deg, rgba(230,183,173,0.04) 0%, rgba(0,0,0,0.2) 100%)', border: `1px solid ${RG}15` }}>
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${RG}80` }}>
            Origin & Craftsmanship
          </p>
          <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.8rem', lineHeight: 1.1 }}>
            {origin.headline}
          </h2>
          <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300, lineHeight: 1.8, maxWidth: '680px' }}>
            {origin.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Coffee Origin
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
              {origin.coffeeOrigin}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Roast Profile
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
              {origin.roastProfile}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Processing Method
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
              {origin.processing}
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Why This Blend Was Created
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
              {origin.whyCreated}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}