import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Coffee, Plane } from 'lucide-react';

const BENEFITS = [
  { icon: Leaf, title: 'Natural ingredients', body: 'Real, clean ingredients in every cup — nothing artificial, ever.' },
  { icon: Recycle, title: 'No pods, no capsules', body: 'No pods, no capsules, no single-use plastic. Just one pouch — nothing to discard but the bag.' },
  { icon: Coffee, title: 'No machine needed', body: 'Just add hot water. No brewer, grinder, or cleanup — ever.' },
  { icon: Plane, title: 'Made for on the go', body: 'Toss it in your bag — your daily ritual travels wherever you do.' },
];

export default function PoweredByNature({ accent = '#B7653E' }) {
  return (
    <section style={{ background: '#FBF8F1', padding: 'clamp(56px, 8vw, 96px) 24px' }}>
      <div className="mx-auto max-w-[1100px]">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] sm:text-xs" style={{ color: accent }}>Powered by Nature</p>
          <h2 className="mt-3 font-serif font-bold" style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', color: '#292622', lineHeight: 1.12, textWrap: 'balance' }}>
            Real ingredients. No machine. No plastic.
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-heading" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#5F574F', lineHeight: 1.7 }}>
            Every cup starts with nature — clean, natural ingredients you can trust. No pods to throw away, no machine to clean, no compromise. Just your ritual, anywhere.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-3 p-6 text-center"
              style={{ background: '#FFFDF8', border: '1px solid #E4D8C9', borderRadius: 12 }}
            >
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${accent}14`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <b.icon size={22} style={{ color: accent }} />
              </div>
              <h3 className="font-heading font-bold" style={{ fontSize: '1.02rem', color: '#292622' }}>{b.title}</h3>
              <p className="font-heading" style={{ fontSize: '0.86rem', color: '#5F574F', lineHeight: 1.6 }}>{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}