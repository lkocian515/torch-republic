import React from 'react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: '🔥',
    title: 'Small Batch Roasted',
    body: 'Every bag is roasted to order. No sitting on shelves. No compromise.',
  },
  {
    icon: '📜',
    title: 'Story-Driven Blends',
    body: 'Each blend is named for a founder, a moment, or a movement. Your morning carries meaning.',
  },
  {
    icon: '🇺🇸',
    title: 'Built on Faith & Freedom',
    body: 'We believe in conviction — in the cup and in the country. No apologies.',
  },
];

export default function WhyTorchRepublic() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(196,163,90,0.1)' }}>
      <div className="max-w-[1200px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-4" style={{ color: '#E6AC45' }}>Why Torch Republic</p>
          <h2 className="font-serif leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            Not just coffee. A declaration.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-10"
              style={{ background: '#131313', border: '1px solid rgba(196,163,90,0.12)' }}
            >
              <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full"
                style={{ background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.2)' }}>
                <span style={{ fontSize: '1.8rem' }}>{p.icon}</span>
              </div>
              <h3 className="font-serif font-bold mb-4" style={{ fontSize: '1.2rem', color: '#FFFCF7' }}>{p.title}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.78)', fontWeight: 400, lineHeight: 1.9 }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}