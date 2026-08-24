import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
  {
    title: 'Founders Series',
    description: 'Six small-batch blends. Six men who shaped a nation. Each one retires when it\'s gone.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/576e1d934_hero.jpg',
    route: '/CoffeeCollection',
    accent: '#C8A44D',
  },
  {
    title: 'Liberty Icons',
    description: 'Bold blends named for the symbols that define American freedom. Uncompromising.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4262eaf1c_tcr_coffee_blank_final_latest3r.jpeg',
    route: '/LibertyIcons',
    accent: '#9BB8CC',
  },
  {
    title: 'The Torch Box',
    description: 'A curated ritual delivered monthly. New blends, limited drops, archived before the world catches on.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
    route: '/TheTorchBox',
    accent: '#C9A24A',
  },
];

export default function CollectionHighlight() {
  return (
    <section
      className="py-28 px-6 md:px-12"
      style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#C9A24A' }}>Collections</p>
          <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.015em' }}>
            Every Legacy Has a Blend.
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link to={col.route} className="group block relative overflow-hidden" style={{ aspectRatio: '3/4', background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.1)' }}>
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.58, filter: 'brightness(1.08) contrast(1.05)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${col.accent}50, transparent)` }} />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="font-serif leading-tight mb-3" style={{ fontSize: '1.45rem', fontWeight: 700, color: col.accent }}>
                    {col.title}
                  </h3>
                  <p className="font-heading text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.88)', fontWeight: 400, lineHeight: 1.85 }}>
                    {col.description}
                  </p>
                  <span
                    className="font-mono text-[10px] tracking-[0.3em] uppercase transition-all group-hover:opacity-60"
                    style={{ color: col.accent, borderBottom: `1px solid ${col.accent}40`, paddingBottom: '2px' }}
                  >
                    Explore Collection →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}