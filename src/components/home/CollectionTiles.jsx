import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TILES = [
  {
    title: 'The Founders Series',
    sub: 'Collectible small-batch coffee',
    cta: 'Shop Coffee',
    href: '/CoffeeCollection',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80',
    accent: '#C8A44D',
  },
  {
    title: 'Wear What You Stand For',
    sub: 'Heritage apparel, crafted to last',
    cta: 'Shop Apparel',
    href: '/Shop',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=900&q=80',
    accent: '#9BB8CC',
  },
  {
    title: 'The Torch Box',
    sub: 'Monthly drops. Exclusive access.',
    cta: 'Join Now',
    href: '/TheTorchBox',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80',
    accent: '#C87070',
  },
];

export default function CollectionTiles() {
  return (
    <section style={{ backgroundColor: '#050508', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(196,163,90,0.5)' }}>Signature Offerings</p>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.015em' }}>
            Curated for the Discerning
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TILES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: '3/4', cursor: 'pointer' }}
            >
              {/* Background image */}
              <img src={t.image} alt={t.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ opacity: 0.45 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}60, transparent)` }} />

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col gap-3">
                <h3 className="font-serif text-white" style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.15 }}>{t.title}</h3>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: `${t.accent}90` }}>{t.sub}</p>
                <Link to={t.href}
                  className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-all w-fit"
                  style={{
                    color: t.accent,
                    borderBottom: `1px solid ${t.accent}40`,
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  {t.cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}