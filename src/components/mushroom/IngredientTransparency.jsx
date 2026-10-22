import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Droplet, Leaf, Clock, Package, ShieldCheck } from 'lucide-react';

const RG = '#E6B7AD';

const TRANSPARENCY_ITEMS = [
  {
    icon: Coffee,
    label: '27 Servings Per Tube',
    desc: 'Each tube contains 1.9 oz / 54g of premium instant coffee. That\'s 27 servings at 2g per cup.',
  },
  {
    icon: Droplet,
    label: 'Caffeine Content',
    desc: 'Approximately 60-80mg per serving (varies by blend). Designed for a balanced daily routine.',
  },
  {
    icon: Leaf,
    label: 'Mushroom Types',
    desc: "Lion's Mane (Hericium erinaceus) for focus and cognitive support. Cordyceps (Cordyceps militaris) for natural energy. Reishi (Ganoderma lucidum) for antioxidant and immune support.",
  },
  {
    icon: Clock,
    label: 'Best Time to Drink',
    desc: 'SunCap Rise for mornings. GlowMind Clarity for deep work. MoonCap Restore for evenings. Choose your ritual.',
  },
  {
    icon: Package,
    label: 'Flavor Notes',
    desc: 'Smooth, rich coffee base with subtle earthy undertones from mushroom extracts. No artificial flavors or preservatives.',
  },
  {
    icon: ShieldCheck,
    label: 'Third-Party Tested',
    desc: 'Every batch is tested for purity, potency, and safety. Packaged in the USA with globally sourced ingredients.',
  },
];

export default function IngredientTransparency() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(60px, 8vw, 100px) 24px',
        borderTop: '1px solid rgba(230,183,173,0.06)',
        borderBottom: '1px solid rgba(230,183,173,0.06)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Transparency First
          </p>
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)',
              color: '#F5EFE6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            What's In Every Cup
          </h2>
          <p
            className="font-heading mt-4 max-w-2xl mx-auto"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.65)',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            We believe in complete transparency. No proprietary blends, no hidden ingredients, no vague claims. Here's exactly what you're getting.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRANSPARENCY_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(230,183,173,0.08)',
                borderRadius: '2px',
                padding: '24px 20px',
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(230,183,173,0.08)',
                    border: `1px solid ${RG}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={16} style={{ color: RG }} />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>{item.label}</p>
                </div>
              </div>
              <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p
            className="font-mono text-[7px] tracking-[0.15em] max-w-2xl mx-auto"
            style={{
              color: 'rgba(255,255,255,0.2)',
              lineHeight: 1.8,
            }}
          >
            <strong style={{ color: 'rgba(255,255,255,0.3)' }}>Note:</strong> Individual results may vary. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use if pregnant, nursing, or have a medical condition.
          </p>
        </motion.div>
      </div>
    </section>
  );
}