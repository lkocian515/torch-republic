import React from 'react';
import { motion } from 'framer-motion';

const UPCOMING = [
  { name: 'Liberty Icons', timeline: '2026', status: 'Art Ready', desc: 'Patriotic symbols and archetypes of American identity.', color: '#9BB8CC' },
  { name: 'Commanders', timeline: 'Sep 2026', status: 'In Development', desc: 'Military leaders, battlefield legends, warrior culture.', color: '#7AC87A' },
  { name: 'Visionaries', timeline: 'Dec 2026', status: 'In Development', desc: 'Scientists, inventors, and geniuses who changed the world.', color: '#C8A44D' },
  { name: 'Patriots', timeline: '2027', status: 'Planned', desc: 'Freedom fighters and abolitionists who expanded liberty for all.', color: '#C87070' },
];

export default function SeriesExpansionSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>The Universe Expands</span>
            <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>
          <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700 }}>
            The Series Is Expanding.
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto">
            The Founders Series is only the beginning. Eight series. 30+ active SKUs. A growing collectible universe built on history.
          </p>
        </div>

        {/* Series grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {UPCOMING.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6"
              style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(200,164,77,0.1)' }}
            >
              <div className="h-px w-full mb-5" style={{ background: `linear-gradient(90deg, ${s.color}88, transparent)` }} />

              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-0.5" style={{ color: s.color, border: `1px solid ${s.color}28`, background: `${s.color}08` }}>
                  {s.status}
                </span>
                <span className="font-mono text-[9px] text-gray-600">{s.timeline}</span>
              </div>

              <h3 className="font-serif text-white mb-2" style={{ fontSize: '1.3rem', fontWeight: 600 }}>{s.name}</h3>
              <p className="text-gray-600 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(200,164,77,0.4)' }}>
            This is only the beginning.
          </p>
          <a
            href="/shop/instant-coffee"
            className="inline-flex items-center gap-3 px-8 py-4 font-heading font-black text-sm tracking-[0.2em] uppercase"
            style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C9A24A 100%)', color: '#fff' }}
          >
            Shop All Coffee
          </a>
        </div>
      </div>
    </section>
  );
}