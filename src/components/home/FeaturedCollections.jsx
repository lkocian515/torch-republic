import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    name: 'Patriot Pride',
    slug: 'patriotic-pride',
    description: 'Wear your love for this country front and center.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/american-heart-collection-9399768.png?v=1772927307&width=1500',
  },
  {
    name: 'Freedom Collection',
    slug: 'freedom-isnt-free',
    description: 'Honor those who paid the price for liberty.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/freedom-isnt-free-collection-9247105.png?v=1772308430&width=1500',
  },
  {
    name: 'God, Family, Country',
    slug: 'god-family-country',
    description: 'The foundation of everything we stand for.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/god-family-country-collection-1224586.png?v=1772308435&width=1500',
  },
];

export default function FeaturedCollections() {
  return (
    <section style={{ backgroundColor: '#0B0B0B' }}>
      {COLLECTIONS.map((col, i) => (
        <motion.div
          key={col.slug}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden"
          style={{ height: 'clamp(280px, 40vw, 520px)' }}
        >
          {/* Image */}
          <img
            src={col.image}
            alt={col.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            style={{ filter: 'brightness(0.55) saturate(0.75)' }}
          />

          {/* Gradient overlay — always dark on left for text legibility */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }}
          />

          {/* Subtle gold edge on hover */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{ background: 'linear-gradient(to bottom, transparent, #C9A24A, transparent)' }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
              <div className="max-w-lg">
                <span className="font-mono text-[11px] tracking-[0.45em] uppercase mb-4 block" style={{ color: 'rgba(201,162,74,0.7)' }}>
                  Collection {String(i + 1).padStart(2, '0')}
                </span>
                <h2
                  className="font-serif font-bold text-white leading-tight mb-4"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                >
                  {col.name}
                </h2>
                <p className="font-heading font-light text-sm md:text-base mb-8 max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {col.description}
                </p>
                <Link
                  to={`/BestSellers?collection=${col.slug}`}
                  className="group/btn inline-flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300"
                  style={{ color: '#C9A24A' }}
                >
                  <span>Explore</span>
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-2">→</span>
                  <div className="h-px flex-1 w-8 transition-all duration-300 group-hover/btn:w-14" style={{ backgroundColor: 'rgba(201,162,74,0.5)' }} />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          {i < COLLECTIONS.length - 1 && (
            <div className="absolute bottom-0 left-8 right-8 h-px" style={{ backgroundColor: 'rgba(201,162,74,0.08)' }} />
          )}
        </motion.div>
      ))}
    </section>
  );
}