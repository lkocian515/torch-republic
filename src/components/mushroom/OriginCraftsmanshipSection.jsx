import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Coffee, Zap } from 'lucide-react';

const RG = '#E6B7AD';

export default function OriginCraftsmanshipSection({ product }) {
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
            The Ritual
          </p>
          <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.8rem', lineHeight: 1.1 }}>
            Crafted for a Daily Coffee Ritual
          </h2>
          <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300, lineHeight: 1.8, maxWidth: '680px' }}>
            {product.name} is a premium instant mushroom coffee powder blend — crafted for smooth coffee-forward flavor and everyday wellness. No coffee maker, grinder, or equipment needed. Just scoop, stir, and sip.
          </p>
        </div>

        {/* 3-column ritual info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
                Coffee Base
              </p>
            </div>
            <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
              Premium instant coffee — {product.roast}. Smooth, coffee-forward flavor designed for easy preparation and consistent taste every time.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
                Functional Mushrooms
              </p>
            </div>
            <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
              Crafted with Lion's Mane, Cordyceps and Reishi to support clarity, focus, and daily wellness as part of your everyday ritual.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
                Best For
              </p>
            </div>
            <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
              {product.bestFor || product.mood}. 27 servings per tube. Instant powder — dissolves in hot water, milk, or creamer.
            </p>
          </div>
        </div>

        {/* FDA disclaimer */}
        <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${RG}10` }}>
          <p className="font-mono text-[8px] tracking-[0.1em] leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </motion.div>
  );
}