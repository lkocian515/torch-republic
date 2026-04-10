import React from 'react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    name: 'Founders Starter',
    tagline: 'The perfect entry point.',
    blends: ['Washington Blend (TR-001)', 'Jefferson Blend (TR-002)', 'Franklin Blend (TR-003)'],
    price: '$49',
    accent: '#C8A44D',
    desc: 'The three FOUNDER\'S EDITION blends. Perfect gift. Highest conversion. Start your collection here.',
    handle: 'founders-starter-pack',
  },
  {
    name: 'Revolution Pack',
    tagline: 'For those who don\'t ask permission.',
    blends: ['Adams Blend (TR-004)', 'Samuel Adams (TR-009)', 'Patrick Henry (TR-010)'],
    price: '$59',
    accent: '#9BB8CC',
    desc: 'The firebrand trio. Three men who chose coffee as an act of defiance.',
    handle: 'revolution-pack',
  },
  {
    name: 'Power Pack',
    tagline: 'Quiet strength. Maximum output.',
    blends: ['Roosevelt Blend (TR-006)', 'Lincoln Blend (TR-005)', 'Hamilton Blend (TR-007)'],
    price: '$69',
    accent: '#7AC87A',
    desc: 'Built for the serious. No limits, no excuses. The endurance collection.',
    handle: 'power-pack',
  },
];

export default function BuildCollectionSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>Build Your Collection</span>
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>
          <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700 }}>
            Start Your Collection.
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-md mx-auto">
            Not bundles. Collections. Each set is a narrative — three figures, one story arc, one decision.
          </p>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLLECTIONS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
              style={{ background: '#050505', border: '1px solid rgba(200,164,77,0.1)' }}
            >
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}88, transparent)` }} />

              <div className="p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Collection</p>
                    <h3 className="font-serif text-white" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{c.name}</h3>
                    <p className="font-mono text-[10px] mt-1" style={{ color: `${c.accent}99` }}>{c.tagline}</p>
                  </div>
                  <span className="font-mono font-bold text-xl" style={{ color: c.accent }}>{c.price}</span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed flex-1">{c.desc}</p>

                <div className="space-y-1.5">
                  {c.blends.map(b => (
                    <div key={b} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: c.accent }} />
                      <span className="font-mono text-[10px] text-gray-500">{b}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://torch-republic.com/products/${c.handle}`}
                  className="mt-2 py-3 text-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all"
                  style={{ border: `1px solid ${c.accent}40`, color: c.accent, background: `${c.accent}08` }}
                >
                  Start This Collection
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}