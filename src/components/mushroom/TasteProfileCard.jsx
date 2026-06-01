import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function TasteProfileCard({ product }) {
  const tasteData = product.tasteProfile || {
    flavorNotes: product.flavorNotes?.join(' • ') || 'Rich • Smooth • Balanced',
    body: 'Medium',
    finish: 'Clean, rounded finish with minimal bitterness',
    bestFor: product.mood || 'Morning focus, daily rituals, productive afternoons',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="w-full mb-12"
    >
      <div style={{
        border: `1px solid ${RG}25`,
        borderRadius: '2px',
        padding: '32px 28px',
        background: 'linear-gradient(180deg, rgba(230,183,173,0.03) 0%, transparent 100%)',
      }}>
        {/* Header */}
        <div className="mb-6">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${RG}80` }}>
            Taste Profile
          </p>
          <h2 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.6rem', lineHeight: 1.1 }}>
            What Does It Taste Like?
          </h2>
          <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
            A specialty coffee experience first, functional mushroom support second.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flavor Notes */}
          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Flavor Notes
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
              {tasteData.flavorNotes}
            </p>
          </div>

          {/* Body */}
          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Body
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
              {tasteData.body}
            </p>
          </div>

          {/* Finish */}
          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Finish
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
              {tasteData.finish}
            </p>
          </div>

          {/* Best For */}
          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${RG}60` }}>
              Best For
            </p>
            <p className="font-serif text-white" style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>
              {tasteData.bestFor}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}