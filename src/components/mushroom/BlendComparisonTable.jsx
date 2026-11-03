import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Leaf, Sparkles } from 'lucide-react';

const RG = '#E6AC45';
const GOLD = '#E6AC45';
const GREEN = '#264A35';

const CATEGORIES = [
  {
    name: 'Classic Coffee',
    icon: Coffee,
    accent: GOLD,
    bestFor: 'Pure coffee ritual, convenience, everyday use',
    flavor: 'Bold, smooth premium instant coffee',
    mushrooms: 'No',
    caffeine: 'Coffee',
  },
  {
    name: 'Mushroom Coffee',
    icon: Leaf,
    accent: RG,
    bestFor: 'Focus, clarity, restoration, wellness rituals',
    flavor: 'Coffee with functional mushrooms',
    mushrooms: 'Yes (Lion\'s Mane + Cordyceps + Reishi)',
    caffeine: 'Coffee',
  },
  {
    name: 'Matcha',
    icon: Sparkles,
    accent: GREEN,
    bestFor: 'Calm energy, focus, presence, afternoons',
    flavor: 'Smooth green tea matcha',
    mushrooms: 'No',
    caffeine: 'Matcha / Green Tea',
  },
];

export default function BlendComparisonTable() {
  return (
    <section style={{ background: '#0A0A0A', padding: 'clamp(60px,8vw,100px) 24px', borderTop: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
            Category Guide
          </p>
          <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Not Sure Where to Start?
          </h2>
          <p className="font-heading text-sm max-w-xl mx-auto" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            Compare our three categories to find your perfect ritual.
          </p>
        </motion.div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${RG}25` }}>
                <th className="text-left py-4 px-4 font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(245,239,230,0.5)' }}>Category</th>
                {CATEGORIES.map((cat) => (
                  <th key={cat.name} className="text-center py-4 px-4" style={{ minWidth: '200px' }}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <cat.icon size={18} style={{ color: cat.accent }} />
                      <span className="font-serif font-bold" style={{ color: '#F7F2E9', fontSize: '1.1rem' }}>{cat.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Best For', key: 'bestFor' },
                { label: 'Flavor Direction', key: 'flavor' },
                { label: 'Contains Mushrooms?', key: 'mushrooms' },
                { label: 'Caffeine Type', key: 'caffeine' },
              ].map((row, i) => (
                <tr key={row.label} style={{ borderBottom: i < 3 ? `1px solid ${RG}15` : 'none' }}>
                  <td className="py-4 px-4 font-heading text-sm" style={{ color: 'rgba(245,239,230,0.7)' }}>{row.label}</td>
                  {CATEGORIES.map((cat) => (
                    <td key={cat.name} className="text-center py-4 px-4 font-heading text-sm" style={{ color: '#F7F2E9' }}>
                      {cat[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ border: `1px solid ${cat.accent}25`, background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '20px' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <cat.icon size={20} style={{ color: cat.accent }} />
                <h3 className="font-serif font-bold" style={{ color: '#F7F2E9', fontSize: '1.2rem' }}>{cat.name}</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(245,239,230,0.5)' }}>Best For</p>
                  <p className="font-heading text-sm" style={{ color: '#F7F2E9' }}>{cat.bestFor}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(245,239,230,0.5)' }}>Flavor</p>
                  <p className="font-heading text-sm" style={{ color: '#F7F2E9' }}>{cat.flavor}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(245,239,230,0.5)' }}>Mushrooms</p>
                  <p className="font-heading text-sm" style={{ color: '#F7F2E9' }}>{cat.mushrooms}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(245,239,230,0.5)' }}>Caffeine</p>
                  <p className="font-heading text-sm" style={{ color: '#F7F2E9' }}>{cat.caffeine}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}