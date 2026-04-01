import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { label: 'T-Shirts', category: 't-shirts', emoji: '👕' },
  { label: 'Hoodies', category: 'hoodies', emoji: '🧥' },
  { label: 'Hats', category: 'hats', emoji: '🧢' },
  { label: 'Coffee', category: 'coffee', emoji: '☕' },
  { label: 'Tea', category: 'tea', emoji: '🍵' },
  { label: 'Stickers', category: 'stickers', emoji: '🏷️' },
];

export default function CategoryGrid() {
  return (
    <section className="py-14 px-6" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-xl font-heading font-black uppercase tracking-widest mb-1" style={{ color: '#C9A24A' }}>Quick Shop</h2>
          <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">Browse by category</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/BestSellers?category=${cat.category}`}
                className="group flex flex-col items-center justify-center gap-2 py-6 px-3 border transition-all duration-300"
                style={{ backgroundColor: '#111', borderColor: 'rgba(201,162,74,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)'; e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,162,74,0.12)'; e.currentTarget.style.backgroundColor = '#111'; }}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="font-mono text-xs tracking-wider uppercase text-white group-hover:text-yellow-300 transition-colors">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}