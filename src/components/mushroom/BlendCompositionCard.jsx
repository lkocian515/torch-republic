import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Droplets, Zap, Leaf } from 'lucide-react';

const RG = '#E6B7AD';

const DEFAULT_COMPOSITION = {
  mushrooms: [
    { name: "Lion's Mane", benefit: 'Supports focus and mental clarity' },
    { name: 'Chaga', benefit: 'Supports balance and daily wellness' },
  ],
  coffee: {
    type: '100% Arabica Coffee',
    origin: 'Premium Central & South American beans',
    roast: 'Medium Roast',
    caffeine: 'Moderate (50-75mg per serving)',
  },
  preparation: '100% Instant Coffee — No brewing equipment needed',
};

export default function BlendCompositionCard({ product }) {
  const composition = product.blendComposition || DEFAULT_COMPOSITION;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full mb-12"
    >
      <div style={{
        border: `1px solid ${RG}25`,
        borderRadius: '2px',
        padding: '32px 28px',
        background: 'rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${RG}80` }}>
            What's Inside
          </p>
          <h2 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.6rem', lineHeight: 1.1 }}>
            Blend Composition
          </h2>
          <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
            Premium coffee craftsmanship meets functional mushroom science.
          </p>
        </div>

        {/* Mushrooms Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-4 h-4" style={{ color: RG }} />
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}70` }}>
              Functional Mushroom Blend
            </p>
          </div>
          <div className="space-y-3">
            {composition.mushrooms.map((mushroom, i) => (
              <div key={mushroom.name} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: RG }} />
                <div>
                  <p className="font-serif text-white" style={{ fontSize: '1rem', lineHeight: 1.4 }}>
                    {mushroom.name}
                  </p>
                  <p className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>
                    {mushroom.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coffee Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Coffee className="w-4 h-4" style={{ color: RG }} />
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}70` }}>
              Coffee Base
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Type
              </p>
              <p className="font-serif text-white" style={{ fontSize: '0.95rem' }}>
                {composition.coffee.type}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Origin
              </p>
              <p className="font-serif text-white" style={{ fontSize: '0.95rem' }}>
                {composition.coffee.origin}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Roast Level
              </p>
              <p className="font-serif text-white" style={{ fontSize: '0.95rem' }}>
                {composition.coffee.roast}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Caffeine Content
              </p>
              <p className="font-serif text-white" style={{ fontSize: '0.95rem' }}>
                {composition.coffee.caffeine}
              </p>
            </div>
          </div>
        </div>

        {/* Preparation */}
        <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${RG}15` }}>
          <Zap className="w-4 h-4" style={{ color: RG }} />
          <p className="font-serif text-white" style={{ fontSize: '0.95rem' }}>
            {composition.preparation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}