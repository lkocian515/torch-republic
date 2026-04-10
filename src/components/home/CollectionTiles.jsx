import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TILES = [
  {
    label: 'Founders Coffee',
    sub: 'Six collectible roasts. Limited edition.',
    link: '/CoffeeCollection',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d9a87ee6a_torch_republic_cinematic_hero.png',
    cta: 'Shop Coffee',
  },
  {
    label: 'Apparel',
    sub: 'Wear the mission.',
    link: '/Shop',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    cta: 'Browse Shop',
  },
  {
    label: 'The Torch Box',
    sub: 'Monthly drops. For those who collect.',
    link: '/TheTorchBox',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/d7b6f1c99_Untitleddesign_20260310_044300_0000.png',
    cta: 'Join Now',
  },
];

export default function CollectionTiles() {
  return (
    <section style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif mb-16 text-center"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#F0EBE1', fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          The Collection
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TILES.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              {/* BG image */}
              <img
                src={tile.image}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ opacity: 0.45 }}
              />
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,11,11,0.95) 0%, rgba(11,11,11,0.3) 60%, rgba(11,11,11,0.2) 100%)' }} />
              {/* Gold border on hover */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ border: '1px solid rgba(201,162,74,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.08)'}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.55)' }}>
                  {tile.sub}
                </p>
                <h3 className="font-serif text-white mb-6" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1.1 }}>
                  {tile.label}
                </h3>
                <Link
                  to={tile.link}
                  className="self-start font-mono text-[10px] tracking-[0.3em] uppercase px-6 py-3 transition-all duration-200"
                  style={{ background: 'transparent', border: '1px solid rgba(201,162,74,0.4)', color: 'rgba(240,235,225,0.8)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C9A24A'; e.currentTarget.style.color = '#0B0B0B'; e.currentTarget.style.borderColor = '#C9A24A'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(240,235,225,0.8)'; e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'; }}
                >
                  {tile.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}