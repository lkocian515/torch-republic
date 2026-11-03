import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Flame, Snowflake, Coffee } from 'lucide-react';

const RG = '#E6AC45';

const PILLARS = [
  { icon: Mountain, label: 'High-Altitude', detail: 'Highland growing regions' },
  { icon: Flame, label: 'Volcanic Soil', detail: 'Rich mineral content' },
  { icon: Snowflake, label: 'Freeze-Dried', detail: 'Preserves flavor compounds' },
  { icon: Coffee, label: 'Tasting Notes', detail: 'Dark chocolate, toasted almond, sweet toffee' },
];

export default function PNGCoffeeCallout() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: '#080808' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto p-8 md:p-12"
        style={{ background: 'linear-gradient(160deg, #0F0E0D 0%, #0A0908 100%)', border: `1px solid ${RG}20` }}
      >
        <div className="text-center mb-10">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            The Origin
          </p>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Single-Origin Papua New Guinea Coffee
          </h2>
        </div>

        <p className="font-heading text-center max-w-2xl mx-auto mb-10" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
          Our coffee is grown in the highland regions of Papua New Guinea, where high-altitude growing and rich volcanic soil produce a cup with natural complexity and a smooth, aromatic finish. After harvesting, the coffee is brewed and freeze-dried to preserve the flavor compounds that make it distinctive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {PILLARS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="mx-auto mb-3" style={{ width: 48, height: 48, borderRadius: '50%', background: `${RG}12`, border: `1px solid ${RG}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.icon size={20} style={{ color: RG }} />
              </div>
              <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1.5" style={{ color: RG }}>{item.label}</p>
              <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.6 }}>{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-8" style={{ borderTop: `1px solid ${RG}15` }}>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.9, fontStyle: 'italic' }}>
            Notes of dark chocolate, toasted almond, and sweet toffee — in every cup.
          </p>
        </div>
      </motion.div>
    </section>
  );
}