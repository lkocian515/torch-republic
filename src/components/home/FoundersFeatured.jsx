import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FEATURED = [
  {
    code: 'TR-001',
    name: 'Washington',
    roast: 'Dark Roast',
    notes: 'Cocoa · Toasted Nut · Full Body',
    route: '/WashingtonBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
    color: '#160D04',
  },
  {
    code: 'TR-002',
    name: 'Jefferson',
    roast: 'Medium Roast',
    notes: 'Dark Chocolate · Almond · Toffee',
    route: '/JeffersonBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841',
    color: '#080F14',
  },
  {
    code: 'TR-003',
    name: 'Franklin',
    roast: 'Light Roast',
    notes: 'Caramel · Lemon · Sweet Finish',
    route: '/FranklinBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986',
    color: '#0E0E06',
  },
  {
    code: 'TR-004',
    name: 'Adams',
    roast: 'Medium Roast',
    notes: 'Toffee · Dark Chocolate · Citrus',
    route: '/AdamsBlend',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090',
    color: '#0E070E',
  },
];

export default function FoundersFeatured() {
  return (
    <section style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Flagship Collection
          </p>
          <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
            The Founders Series
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontWeight: 300, maxWidth: '380px', margin: '0 auto' }}>
            A collectible coffee line inspired by the architects of freedom.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {FEATURED.map((f, i) => (
            <motion.div
              key={f.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col"
              style={{
                background: '#111111',
                border: '1px solid rgba(201,162,74,0.1)',
                transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,162,74,0.45)';
                e.currentTarget.style.boxShadow = '0 0 32px rgba(201,162,74,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,162,74,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: f.color }}>
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.7 }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #111111 0%, transparent 60%)` }} />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] font-black tracking-widest px-2.5 py-1" style={{ background: '#C9A24A', color: '#0B0B0B' }}>
                    {f.code}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-serif text-white" style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1 }}>{f.name}</h3>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>{f.roast}</p>
                <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{f.notes}</p>
                <Link
                  to={f.route}
                  className="mt-auto pt-4 font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-200"
                  style={{ color: 'rgba(201,162,74,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C9A24A'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,162,74,0.5)'}
                >
                  View Blend →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-16">
          <Link
            to="/CoffeeCollection"
            className="font-mono text-[11px] tracking-[0.4em] uppercase transition-all duration-200 hover:opacity-60"
            style={{ color: 'rgba(201,162,74,0.6)', borderBottom: '1px solid rgba(201,162,74,0.25)', paddingBottom: '3px' }}
          >
            View All Six Blends
          </Link>
        </div>
      </div>
    </section>
  );
}