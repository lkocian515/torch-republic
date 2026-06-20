import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Globe2, Leaf } from 'lucide-react';
import { COFFEE_ORIGIN } from '@/lib/coffeeOrigin';

const RG = '#E6B7AD';

export default function CoffeeOriginSection({ accent = RG }) {
  return (
    <div className="py-16 px-6 md:px-10" style={{ background: '#0A0908', borderTop: `1px solid ${accent}15`, borderBottom: `1px solid ${accent}15` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: accent }}>
            Coffee Origin
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {COFFEE_ORIGIN.origin.title}
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.9 }}>
            {COFFEE_ORIGIN.origin.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: Mountain, title: 'Highland Growing', detail: 'Grown in the mountainous highlands of Papua New Guinea at high elevations where coffee develops its distinctive character.' },
            { icon: Globe2, title: 'Volcanic Soil', detail: 'Rich volcanic soil contributes to the clean cup profile, complexity, and nuanced sweetness that define this region.' },
            { icon: Leaf, title: 'Blue Mountain Heritage', detail: 'Many PNG coffees trace their heritage to Jamaica Blue Mountain stock — a lineage known for balanced, refined cups.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6"
              style={{ background: '#0F0E0D', border: `1px solid ${accent}20`, borderRadius: '6px' }}
            >
              <div className="mb-4" style={{ width: 48, height: 48, borderRadius: '50%', background: `${accent}15`, border: `1px solid ${accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.icon size={22} style={{ color: accent }} />
              </div>
              <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.15rem' }}>{item.title}</h3>
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-6" style={{ background: `${accent}06`, border: `1px solid ${accent}15`, borderRadius: '6px' }}>
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-4 text-center" style={{ color: `${accent}80` }}>
            Why Origin Matters
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COFFEE_ORIGIN.origin.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: accent, fontSize: '0.55rem', marginTop: '4px', flexShrink: 0 }}>◆</span>
                <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.6 }}>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}