import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    label: 'Founders Series',
    route: '/CoffeeCollection',
  },
  {
    label: 'Liberty Icons',
    route: '/LibertyIcons',
  },
  {
    label: 'View All Coffee',
    route: '/CoffeeCollection',
    outline: true,
  },
];

export default function CoffeeCollectionMenu() {
  return (
    <section className="px-4 md:px-10 pt-10 pb-8" style={{ backgroundColor: '#050508' }}>
      <div className="max-w-[1280px] mx-auto text-center">
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.6)' }}>
          Coffee Collections
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={col.route}
                className="inline-flex items-center justify-center px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: col.outline ? 'transparent' : '#C9A24A',
                  color: col.outline ? '#C9A24A' : '#000000',
                  border: '1px solid #C9A24A',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = col.outline ? 'rgba(201,162,74,0.08)' : '#E4C46A';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = col.outline ? 'transparent' : '#C9A24A';
                }}
              >
                {col.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}