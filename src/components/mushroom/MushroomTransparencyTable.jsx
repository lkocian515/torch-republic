import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6AC45';

const PRODUCTS = [
  { name: 'GlowMind Clarity',  bestFor: 'Deep work & daily focus',     time: 'Morning / Midday', functional: 'Focus & clarity' },
  { name: 'SunCap Rise',       bestFor: 'Morning energy & fresh starts', time: 'Morning',          functional: 'Vitality & energy' },
  { name: 'MoonCap Restore',   bestFor: 'Calm evenings & restoration',  time: 'Afternoon / Evening', functional: 'Recovery & calm' },
];

const PLACEHOLDER = (label) => (
  <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>{label}</span>
);

export default function MushroomTransparencyTable() {
  return (
    <section className="px-4 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.1)', borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: RG }}>
            Ingredient Transparency
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
            What's Inside Every Mushroom Blend
          </h2>
          <p className="font-heading max-w-2xl mx-auto mb-4" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.85 }}>
            We are committed to ingredient transparency. Below is the current information available for each blend.
            Final mushroom dosage, extract type, and caffeine figures should be verified with supplier specifications before publishing.
          </p>
          <div className="inline-block px-4 py-2" style={{ background: 'rgba(230,183,173,0.06)', border: '1px solid rgba(230,183,173,0.15)' }}>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              All blends contain: Premium Instant Coffee · Lion's Mane (Hericium erinaceus) · Cordyceps (Cordyceps militaris) · Reishi (Ganoderma lucidum)
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[700px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Blend', 'Mushroom Species', 'Dosage / Serving', 'Extract Type', 'Caffeine', 'Servings', 'Best Time', 'Functional Focus'].map((h, i) => (
                  <th
                    key={h}
                    className="p-3 text-left"
                    style={{
                      background: i === 0 ? '#111' : '#0F0E0D',
                      color: i === 0 ? RG : 'rgba(240,235,225,0.45)',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      borderBottom: `2px solid ${i === 0 ? RG : 'rgba(230,183,173,0.1)'}`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p, i) => (
                <tr key={p.name} style={{ background: i % 2 === 0 ? '#0F0E0D' : '#111' }}>
                  <td className="p-3" style={{ color: '#F7F2E9', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem', borderBottom: '1px solid rgba(230,183,173,0.07)', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </td>
                  <td className="p-3" style={{ fontSize: '0.78rem', color: 'rgba(240,235,225,0.7)', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                    Lion's Mane + Cordyceps + Reishi
                  </td>
                  <td className="p-3" style={{ fontSize: '0.78rem', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                    {PLACEHOLDER('Supplier verification needed')}
                  </td>
                  <td className="p-3" style={{ fontSize: '0.78rem', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                    {PLACEHOLDER('Add extract type here')}
                  </td>
                  <td className="p-3" style={{ fontSize: '0.78rem', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                    {PLACEHOLDER('Add mg/serving')}
                  </td>
                  <td className="p-3" style={{ color: 'rgba(240,235,225,0.7)', fontSize: '0.78rem', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                    27 per tube
                  </td>
                  <td className="p-3" style={{ color: 'rgba(240,235,225,0.7)', fontSize: '0.78rem', borderBottom: '1px solid rgba(230,183,173,0.07)', whiteSpace: 'nowrap' }}>
                    {p.time}
                  </td>
                  <td className="p-3" style={{ color: RG, fontSize: '0.78rem', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                    {p.functional}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="mt-8 p-5" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(16,185,129,0.65)', lineHeight: 1.85 }}>
            <strong style={{ color: '#264A35' }}>Transparency Note:</strong> We are actively working to publish exact mushroom species dosage (mg per serving), extract type (fruiting body, mycelium, or blend), supplier name, and third-party testing documentation for each blend. Placeholders above indicate information that requires supplier verification before publishing.
            <br /><br />
            These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </section>
  );
}