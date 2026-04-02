import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FEATURED_COLLECTIONS = [
  {
    title: 'Best Sellers',
    collection: 'best-sellers',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'
  },
  {
    title: 'New Drops',
    collection: 'on-sale',
    image: 'https://images.unsplash.com/photo-1505521585350-ea646e6221b7?w=500&q=80'
  },
  {
    title: 'American Heroes',
    collection: 'american-heroes',
    image: 'https://images.unsplash.com/photo-1578932750294-708c5f69b854?w=500&q=80'
  },
  {
    title: 'Torchbearer Collection',
    collection: 'founders',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'
  }
];

export default function FeaturedCollectionsGrid() {
  return (
    <section className="py-12 px-6 md:px-8" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.1)', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {FEATURED_COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.collection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/BestSellers?collection=${col.collection}`}
                className="group relative overflow-hidden block h-64 md:h-80"
              >
                {/* Image */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

                {/* Title */}
                <div className="absolute inset-0 flex items-end justify-start p-4 md:p-6">
                  <h3 className="font-heading font-black uppercase tracking-tight text-white text-lg md:text-xl leading-tight">
                    {col.title}
                  </h3>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <span className="font-mono text-xs tracking-widest uppercase text-primary">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}