import React from 'react';
import { motion } from 'framer-motion';
import { COFFEE_ORIGIN } from '@/lib/coffeeOrigin';

export default function FlavorExperienceSection({ accent = '#E6AC45' }) {
  return (
    <div className="py-16 px-6 md:px-10" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: accent }}>
            Flavor Experience
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            {COFFEE_ORIGIN.flavor.title}
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.9 }}>
            {COFFEE_ORIGIN.flavor.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {COFFEE_ORIGIN.flavor.notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 text-center"
              style={{ background: '#0F0E0D', border: `1px solid ${accent}20`, borderRadius: '6px' }}
            >
              <div className="mb-4 mx-auto" style={{ width: 56, height: 56, borderRadius: '50%', background: `${accent}12`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.4rem' }}>{['🍫', '🥜', '🍯'][i]}</span>
              </div>
              <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.15rem' }}>{note.name}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{note.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5" style={{ background: `${accent}06`, border: `1px solid ${accent}15`, borderRadius: '6px' }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: `${accent}80` }}>Body</p>
            <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.7 }}>{COFFEE_ORIGIN.flavor.body}</p>
          </div>
          <div className="p-5" style={{ background: `${accent}06`, border: `1px solid ${accent}15`, borderRadius: '6px' }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: `${accent}80` }}>Finish</p>
            <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.7 }}>{COFFEE_ORIGIN.flavor.finish}</p>
          </div>
        </div>
      </div>
    </div>
  );
}