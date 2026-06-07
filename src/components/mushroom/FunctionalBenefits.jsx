import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Zap, Moon, Leaf, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const MUSHROOM_BENEFITS = [
  { icon: Brain, title: "Lion's Mane", description: 'Supports cognitive function, memory, and mental clarity', color: '#A8D5BA' },
  { icon: Shield, title: 'Chaga', description: 'Rich in antioxidants, supports immune health and wellness', color: '#D4A574' },
  { icon: Zap, title: 'Clean Energy', description: 'Sustained focus without jitters or afternoon crash', color: '#E6B7AD' },
];

const MATCHA_BENEFITS = [
  { icon: Leaf, title: 'L-Theanine', description: 'Promotes relaxed alertness and calm focus', color: '#10B981' },
  { icon: Zap, title: 'Natural Caffeine', description: 'Gentle, sustained energy from whole leaf matcha', color: '#8BC45A' },
  { icon: Moon, title: 'Antioxidants', description: 'Rich in EGCG and catechins for cellular health', color: '#C4A85A' },
];

export default function FunctionalBenefits({ product }) {
  const isMatcha = product.category === 'matcha';
  const benefits = isMatcha ? MATCHA_BENEFITS : MUSHROOM_BENEFITS;

  return (
    <section
      className="px-6 md:px-10 py-16"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(230,183,173,0.06) 0%, transparent 70%)',
        border: `1px solid ${RG}15`,
        borderRadius: '4px',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}60` }}>
            Functional Benefits
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#F5EFE6' }}>
            {isMatcha ? 'The Power of Ceremonial Matcha' : 'The Science of Functional Mushrooms'}
          </h2>
          <p
            className="font-heading max-w-2xl mx-auto"
            style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8, fontSize: '1.05rem' }}
          >
            {isMatcha
              ? `${product.name} delivers clean, sustained energy without the crash. The natural combination of L-theanine and caffeine creates a state of relaxed alertness.`
              : `${product.name} combines the cognitive benefits of Lion's Mane with the immune support of Chaga — all in a delicious instant ritual.`}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 text-center"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${benefit.color}25`,
                  borderRadius: '4px',
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon size={32} style={{ color: benefit.color }} />
                </div>
                <h3 className="font-serif font-bold mb-2" style={{ color: benefit.color, fontSize: '1.1rem' }}>
                  {benefit.title}
                </h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Product-Specific Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-6 text-center"
          style={{
            background: `radial-gradient(ellipse at center, ${isMatcha ? 'rgba(16,185,129,0.08)' : 'rgba(230,183,173,0.06)'} 0%, transparent 70%)`,
            border: `1px solid ${isMatcha ? '#10B98125' : `${RG}20`}`,
            borderRadius: '4px',
          }}
        >
          <p
            className="font-heading text-base"
            style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.8 }}
          >
            <span className="font-serif font-bold" style={{ color: isMatcha ? '#10B981' : RG }}>
              {product.name}
            </span>{' '}
            {isMatcha
              ? 'is crafted from 100% ceremonial grade matcha — no artificial ingredients, no added sugars, just pure, grounding energy in its simplest form.'
              : 'is formulated with dual-extracted mushroom extracts for maximum bioavailability. Every serving delivers the full spectrum of beneficial compounds nature intended.'}
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8" style={{ borderTop: `1px solid ${RG}15` }}>
          {[
            { label: 'No Artificial Ingredients', icon: Sparkles },
            { label: 'Third-Party Tested', icon: Shield },
            { label: 'Sustainably Sourced', icon: Leaf },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <Icon size={14} style={{ color: `${RG}50` }} />
                <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}