import React from 'react';
import { motion } from 'framer-motion';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS } from '@/lib/mushroomProducts';

const colors = {
  page: '#F7F2E9',
  card: '#FFFCF7',
  text: '#32190F',
  secondary: '#5E4639',
  border: '#B89A6D',
  accent: '#9B4E2F',
};

export default function BlendComparisonChart() {
  const rows = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS];
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: colors.page, borderTop: `1px solid ${colors.border}` }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: colors.accent }}>Compare Rituals</p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: colors.text }}>Find Your Perfect Match</h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: colors.secondary, lineHeight: 1.8 }}>Compare the active mushroom coffee and ceremonial matcha rituals.</p>
        </motion.div>
        <div className="overflow-x-auto" style={{ background: colors.card, border: `1px solid ${colors.border}` }}>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Product', 'Category', 'Flavor', 'Best For'].map((heading) => (
                  <th key={heading} className="text-left p-4 font-heading text-sm" style={{ color: colors.text, borderBottom: `1px solid ${colors.border}`, background: '#F7F2E9' }}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((product) => (
                <tr key={product.id}>
                  <td className="p-4 font-serif font-bold" style={{ color: colors.text, borderBottom: `1px solid ${colors.border}` }}>{product.name}</td>
                  <td className="p-4" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.border}` }}>{product.category === 'matcha' ? 'Ceremonial Matcha' : 'Mushroom Coffee'}</td>
                  <td className="p-4" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.border}` }}>{product.tasteDescription}</td>
                  <td className="p-4" style={{ color: colors.secondary, borderBottom: `1px solid ${colors.border}` }}>{product.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}