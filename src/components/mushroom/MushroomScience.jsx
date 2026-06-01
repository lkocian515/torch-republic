import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const SHROOMS = [
  {
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    color: '#C8B8A6',
    benefits: ['Supports cognitive clarity', 'May stimulate NGF production', 'Associated with memory & focus', 'Used in traditional Eastern medicine for centuries'],
    desc: "One of the most studied medicinal mushrooms in the world. Lion's Mane contains hericenones and erinacines — bioactive compounds believed to support the brain's natural growth factors.",
  },
  {
    name: 'Chaga',
    latin: 'Inonotus obliquus',
    color: '#A89278',
    benefits: ['Rich in antioxidants', 'Supports immune resilience', 'High in beta-glucans', 'Harvested from birch trees in cold climates'],
    desc: "Known as the 'King of Mushrooms,' Chaga has been used in Siberian folk medicine for hundreds of years. Its dense beta-glucan content makes it one of nature's most potent antioxidant sources.",
  },
];

export default function MushroomScience() {
  return (
    <section style={{ background: '#040404', borderTop: '1px solid rgba(230,183,173,0.07)' }}>
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-14 md:py-20">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.6em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.5)', marginBottom: '12px' }}>
            The Science
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Why These Mushrooms
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'rgba(240,235,225,0.42)', lineHeight: 1.85, fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
            Not all mushrooms are equal. We chose Lion's Mane and Chaga for their centuries of traditional use and growing body of modern research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SHROOMS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              style={{
                background: '#0C0B0B',
                border: '1px solid rgba(230,183,173,0.1)',
                padding: '32px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.4)', marginBottom: '8px' }}>
                {s.latin}
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#fff', marginBottom: '14px', lineHeight: 1.1 }}>
                {s.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(220,210,200,0.6)', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>
                {s.desc}
              </p>
              <div style={{ borderTop: '1px solid rgba(230,183,173,0.08)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {s.benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: RG, fontSize: '9px', marginTop: '3px', flexShrink: 0 }}>✦</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.65)', lineHeight: 1.6 }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', textAlign: 'center', marginTop: '24px', lineHeight: 1.7 }}
        >
          *These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </motion.p>
      </div>
    </section>
  );
}