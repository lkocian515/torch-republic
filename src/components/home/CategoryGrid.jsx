import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    name: 'Car Magnets & Stickers',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/unapologetic-patriot-car-magnet-american-flag-text-magnetic-decal-2233678.jpg?v=1773111057&width=1500',
    category: 'magnets'
  },
  {
    name: 'Hats & Caps',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/hats-caps-4541196.jpg?v=1773006008&width=1500',
    category: 'hats'
  },
  {
    name: 'Jewelry & Wearables',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/jewelry-and-wearables-2782820.jpg?v=1772997702&width=1500',
    category: 'jewelry'
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
            Categories
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={createPageUrl('BestSellers') + `?category=${cat.category}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-card"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-foreground font-heading font-bold text-xl uppercase tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}