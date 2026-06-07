import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Leaf, Coffee, TrendingUp } from 'lucide-react';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

const MUSHROOM_PRODUCTS = [
  { name: 'SunCap Rise', caffeine: 'Medium', flavor: 'Bright & Uplifting', roast: 'Light', mushrooms: "Lion's Mane + Chaga" },
  { name: 'GlowMind Clarity', caffeine: 'Medium', flavor: 'Smooth & Balanced', roast: 'Medium', mushrooms: "Lion's Mane + Chaga" },
  { name: 'MoonCap Restore', caffeine: 'Medium', flavor: 'Dark & Mellow', roast: 'Dark', mushrooms: "Lion's Mane + Chaga" },
  { name: 'DreamCap Blend', caffeine: 'Medium', flavor: 'Smooth & Earthy', roast: 'Medium', mushrooms: "Lion's Mane + Chaga" },
  { name: 'The Oracle', caffeine: 'Medium', flavor: 'Rich & Intentional', roast: 'Medium', mushrooms: "Lion's Mane + Chaga" },
  { name: 'Mystic Bloom', caffeine: 'Medium', flavor: 'Soft & Harmonious', roast: 'Medium', mushrooms: "Lion's Mane + Chaga" },
];

const MATCHA_PRODUCTS = [
  { name: 'The Monk', caffeine: 'Medium', flavor: 'Smooth & Grounding', roast: 'Ceremonial', mushrooms: 'None' },
  { name: 'The Ascendant', caffeine: 'Medium', flavor: 'Bright & Uplifting', roast: 'Ceremonial', mushrooms: 'None' },
  { name: 'The Alchemist', caffeine: 'Medium', flavor: 'Creative & Focused', roast: 'Ceremonial', mushrooms: 'None' },
];

export default function BlendComparisonChart() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Compare Blends
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5EFE6' }}>
            Find Your Perfect Match
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Compare caffeine levels, flavor profiles, and functional ingredients across all mushroom coffee and matcha blends.
          </p>
        </motion.div>

        {/* Mushroom Coffee Table */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
              Mushroom Coffee Blends
            </p>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th className="text-left p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: RG, fontSize: '0.85rem', fontWeight: 600 }}>
                      Blend
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Caffeine
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Flavor
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Roast
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Mushrooms
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MUSHROOM_PRODUCTS.map((product, i) => (
                    <tr key={i}>
                      <td className="p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: '#F5EFE6', fontSize: '0.85rem', fontWeight: 500 }}>
                        {product.name}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.caffeine}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.flavor}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.roast}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.mushrooms}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Matcha Table */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
              Ceremonial Matcha Blends
            </p>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th className="text-left p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: RG, fontSize: '0.85rem', fontWeight: 600 }}>
                      Blend
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Caffeine
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Flavor
                    </th>
                    <th className="text-center p-3" style={{ background: '#0F0E0D', borderBottom: `2px solid ${RG}`, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MATCHA_PRODUCTS.map((product, i) => (
                    <tr key={i}>
                      <td className="p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: '#F5EFE6', fontSize: '0.85rem', fontWeight: 500 }}>
                        {product.name}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.caffeine}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.flavor}
                      </td>
                      <td className="text-center p-3" style={{ background: i % 2 === 0 ? '#0F0E0D' : '#141312', borderBottom: `1px solid ${RG}15`, color: 'rgba(240,235,225,0.7)', fontSize: '0.85rem' }}>
                        {product.roast}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}