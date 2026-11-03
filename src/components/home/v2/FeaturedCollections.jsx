import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
  {
    title: 'Founders Series',
    description: 'Six small-batch blends. Six presidents who shaped a nation. Each one retires when it\'s gone.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5455ef981_generated_image.png',
    cta: 'Explore the Series',
    route: '/CoffeeCollection',
    accent: '#E6AC45',
    tag: 'Limited Drops',
  },
  {
    title: 'Liberty Icons',
    description: 'Bold blends named for the symbols that define American freedom. Uncompromising flavor. Unforgettable story.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/22b58bc3c_generated_image.png',
    cta: 'Shop Liberty Icons',
    route: '/LibertyIcons',
    accent: '#9BB8CC',
    tag: 'Fan Favorite',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.1)' }}>
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-4" style={{ color: '#E6AC45' }}>Collections</p>
          <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            Every Legacy Has a Blend.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.65 }}
            >
              <Link
                to={col.route}
                className="group block relative overflow-hidden"
                style={{ aspectRatio: '16/9', background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.1)' }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.62, filter: 'brightness(1.06) contrast(1.05)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${col.accent}60, transparent)` }} />

                {/* Tag */}
                <div className="absolute top-5 left-5">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-3 py-1.5"
                    style={{ background: 'rgba(0,0,0,0.7)', color: col.accent, border: `1px solid ${col.accent}40` }}>
                    {col.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif leading-tight mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, color: col.accent }}>
                    {col.title}
                  </h3>
                  <p className="font-heading text-sm leading-relaxed mb-5" style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 400, lineHeight: 1.8, maxWidth: '400px' }}>
                    {col.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all group-hover:gap-3"
                    style={{ color: col.accent, borderBottom: `1px solid ${col.accent}50`, paddingBottom: '2px' }}
                  >
                    {col.cta} →
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