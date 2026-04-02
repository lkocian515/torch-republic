import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FEATURED_CATS = [
  {
    title: 'Apparel',
    description: 'T-shirts, hoodies, and tanks made to last.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/ChatGPT_Image_Apr_2_2026_08_54_21_AM.png?v=1775138184',
    category: 't-shirts'
  },
  {
    title: 'Gifts & Collectibles',
    description: 'Mugs, hats, stickers—gifts that mean something.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/20260402141146-1f12e9de-1f1a-63a6-9540-8e11def1f423.png?v=1775139208',
    category: 'accessories'
  },
  {
    title: 'Founders Collection',
    description: 'Limited-edition, honoring American legacy.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsdss.png?v=1775128209',
    category: 'founders'
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#000' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-3">
            Curated Collections
          </h2>
          <p className="text-gray-500 font-mono text-sm">Browse by category or explore new drops</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_CATS.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/BestSellers?category=${cat.category}`}
                className="group block relative overflow-hidden h-80 rounded-sm"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-heading font-black text-xl text-white mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{cat.description}</p>
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse <ArrowRight className="w-3 h-3" />
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