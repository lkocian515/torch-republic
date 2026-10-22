import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const SHROOMS = [
  {
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    color: '#C8B8A6',
    benefits: ['Supports cognitive clarity', 'Supports focus and mental energy', 'Associated with memory & daily wellness', 'Used in traditional Eastern medicine for centuries'],
    desc: "One of the most well-known functional mushrooms in the world. Lion's Mane has been used for centuries in traditional wellness practices and is widely studied for its potential to support focus and cognitive clarity.",
  },
  {
    name: 'Cordyceps',
    latin: 'Cordyceps militaris',
    color: '#A89278',
    benefits: ['Traditionally used for energy', 'Supports stamina and daily performance', 'Naturally occurring cordycepin', 'Cultivated on grain-free substrate'],
    desc: "Cordyceps has a long history of use in traditional East Asian practice, where it was associated with energy and stamina. It is now one of the most widely used functional mushrooms in daily wellness routines.",
  },
  {
    name: 'Reishi',
    latin: 'Ganoderma lucidum',
    color: '#C0A184',
    benefits: ['Rich in antioxidants', 'Supports immune resilience', 'High in beta-glucans', 'Used in traditional Eastern medicine for centuries'],
    desc: "Reishi is known as the 'Mushroom of Immortality' in traditional practice, where it has been used for hundreds of years. It is valued for its naturally occurring triterpenes and beta-glucans and is associated with balance and overall daily wellness support.",
  },
];

export default function MushroomScience() {
  return (
    <section style={{ background: '#131313', position: 'relative' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
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
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Why Mushroom Coffee?
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(250,245,235,0.78)', lineHeight: 1.9, fontWeight: 300, maxWidth: '520px', margin: '0 auto' }}>
            Lion's Mane, Cordyceps and Reishi have been used in traditional wellness practices for centuries. Each Torch Republic blend pairs them with premium instant coffee for a smooth, functional daily ritual.
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
                background: '#1C1C1C',
                border: '1px solid rgba(230,183,173,0.12)',
                padding: '32px',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.4)', marginBottom: '8px' }}>
                {s.latin}
              </p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6', marginBottom: '14px', lineHeight: 1.1 }}>
                {s.name}
              </h3>
              <p style={{ fontSize: '0.87rem', color: 'rgba(250,245,235,0.8)', lineHeight: 1.85, fontWeight: 300, marginBottom: '20px' }}>
                {s.desc}
              </p>
              <div style={{ borderTop: '1px solid rgba(230,183,173,0.08)', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {s.benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ color: RG, fontSize: '9px', marginTop: '3px', flexShrink: 0 }}>✦</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,245,235,0.85)', lineHeight: 1.6 }}>
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