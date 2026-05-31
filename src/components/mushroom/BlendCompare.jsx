import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';

export default function BlendCompare() {
  return (
    <section className="px-6 md:px-10 py-24" style={{ background: '#0A0909', borderTop: '1px solid rgba(230,183,173,0.07)' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.65)' }}>The Six Blends</p>
          <h2 className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Find Your Ritual
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MUSHROOM_PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/products/${p.slug}`}
                className="flex items-start gap-5 p-6 group transition-all"
                style={{
                  background: '#0F0E0E',
                  border: '1px solid rgba(230,183,173,0.1)',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${p.accent}45`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}
              >
                {/* Color swatch */}
                <div className="w-1 self-stretch rounded-full flex-shrink-0"
                  style={{ background: `linear-gradient(to bottom, ${p.accent}, ${p.accent}40)` }} />

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif font-bold text-white" style={{ fontSize: '1rem' }}>{p.name}</h3>
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase px-2 py-0.5 flex-shrink-0"
                      style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}25` }}>
                      {p.roast}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] tracking-[0.15em] uppercase mb-2" style={{ color: `${p.accent}70` }}>
                    {p.mood}
                  </p>
                  <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
                    {p.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}