import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const CATEGORIES = [
  { id: 'all', label: 'All Articles', count: null },
  { id: 'science', label: 'Science', count: null },
  { id: 'habits', label: 'Morning Habits', count: null },
  { id: 'recipes', label: 'Recipes', count: null },
  { id: 'wellness', label: 'Wellness', count: null },
  { id: 'news', label: 'News', count: null },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <section id="categories" className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((category, i) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onCategoryChange(category.id)}
              className={`px-5 py-2.5 rounded-sm font-mono text-[9px] tracking-[0.25em] uppercase transition-all ${
                activeCategory === category.id ? 'scale-105' : 'hover:scale-105'
              }`}
              style={{
                background: activeCategory === category.id ? `${RG}15` : 'transparent',
                border: `1px solid ${activeCategory === category.id ? RG : `${RG}20`}`,
                color: activeCategory === category.id ? RG : `${RG}50`,
              }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}