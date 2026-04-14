import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    label: 'Founders Series',
    description: 'Heritage-crafted · Small-batch',
    route: '/CoffeeCollection',
    icon: '🏛️',
  },
  {
    label: 'Liberty Icons',
    description: 'Bold symbols · American ideals',
    route: '/LibertyIcons',
    icon: '🔥',
  },
  {
    label: 'View All Coffee',
    description: 'Browse every blend',
    route: '/CoffeeCollection',
    icon: '☕',
    isAll: true,
  },
];

export default function CoffeeCollectionMenu() {
  return (
    <section className="px-4 md:px-10 pt-10 pb-4" style={{ backgroundColor: '#050508' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-6" style={{ background: 'rgba(196,163,90,0.4)' }} />
          <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color: 'rgba(196,163,90,0.6)' }}>
            Coffee Collections
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={col.route}
                className="flex items-center gap-3 px-5 py-3 transition-all duration-200 group"
                style={{
                  background: col.isAll ? 'transparent' : 'rgba(196,163,90,0.05)',
                  border: col.isAll ? '1px solid rgba(196,163,90,0.2)' : '1px solid rgba(196,163,90,0.25)',
                  color: col.isAll ? 'rgba(196,163,90,0.6)' : '#F0EBE1',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(196,163,90,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(196,163,90,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = col.isAll ? 'transparent' : 'rgba(196,163,90,0.05)';
                  e.currentTarget.style.borderColor = col.isAll ? 'rgba(196,163,90,0.2)' : 'rgba(196,163,90,0.25)';
                }}
              >
                <span style={{ fontSize: '1rem' }}>{col.icon}</span>
                <div>
                  <p className="font-mono text-xs font-bold tracking-wide leading-none mb-0.5" style={{ color: col.isAll ? 'rgba(196,163,90,0.7)' : '#C9A24A' }}>
                    {col.label}
                  </p>
                  <p className="font-mono text-[9px] leading-none" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {col.description}
                  </p>
                </div>
                <span className="font-mono text-xs ml-1 opacity-40 group-hover:opacity-80 transition-opacity" style={{ color: '#C9A24A' }}>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.15), transparent)' }} />
      </div>
    </section>
  );
}