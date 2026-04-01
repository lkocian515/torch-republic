import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <section className="py-14 px-6" style={{ backgroundColor: '#0B0B0B' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl font-heading font-black uppercase tracking-widest mb-1" style={{ color: '#C9A24A' }}>Collections</h2>
          <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">Shop by theme</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {COLLECTIONS.map((col, index) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/BestSellers?collection=${col.slug}`}
                className="group block relative overflow-hidden bg-card"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(201,162,74,0.08)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: 'rgba(201,162,74,0.7)' }}>{col.description}</p>
                  <span className="inline-flex items-center gap-2 font-heading font-black text-base uppercase tracking-wide text-white group-hover:gap-3 transition-all">
                    {col.name} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to={createPageUrl('Collections')}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase transition-all hover:gap-3"
            style={{ color: 'rgba(201,162,74,0.7)' }}
          >
            View All Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}