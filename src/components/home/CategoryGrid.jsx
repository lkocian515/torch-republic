import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Branded SVG icons using Torch Republic palette
const TShirtIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 6 L6 12 L10 16 L10 34 L30 34 L30 16 L34 12 L26 6 C25 9 22 11 20 11 C18 11 15 9 14 6Z" fill="url(#tg)" stroke="rgba(201,162,74,0.6)" strokeWidth="0.8"/>
    <defs><linearGradient id="tg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="100%" stopColor="#1B5060"/></linearGradient></defs>
  </svg>
);

const HoodieIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 5 C13 5 10 8 8 10 L4 14 L9 18 L10 34 L30 34 L31 18 L36 14 L32 10 C30 8 27 5 27 5 C25 10 22 12 20 12 C18 12 15 10 13 5Z" fill="url(#hg)" stroke="rgba(201,162,74,0.6)" strokeWidth="0.8"/>
    <path d="M16 12 L16 20 M24 12 L24 20 M16 20 Q20 22 24 20" stroke="rgba(201,162,74,0.5)" strokeWidth="0.8" fill="none"/>
    <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="100%" stopColor="#1B5060"/></linearGradient></defs>
  </svg>
);

const HatIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 26 Q20 14 34 26" fill="url(#hatg)" stroke="rgba(201,162,74,0.6)" strokeWidth="0.8"/>
    <rect x="5" y="25" width="30" height="5" rx="1" fill="#C8A44D" opacity="0.8"/>
    <path d="M15 25 Q20 16 25 25" fill="url(#hatg2)" stroke="rgba(201,162,74,0.4)" strokeWidth="0.6"/>
    <defs>
      <linearGradient id="hatg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="100%" stopColor="#1B5060"/></linearGradient>
      <linearGradient id="hatg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="100%" stopColor="#1B5060"/></linearGradient>
    </defs>
  </svg>
);

const TankIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="tank-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="100%" stopColor="#1B5060"/></linearGradient></defs>
    {/* Shoulders */}
    <path d="M10 6 L6 14 L12 16 L12 34 L28 34 L28 16 L34 14 L30 6" fill="url(#tank-g)" stroke="rgba(201,162,74,0.6)" strokeWidth="0.8"/>
    {/* Neck scoop */}
    <path d="M10 6 Q20 12 30 6" fill="none" stroke="rgba(201,162,74,0.7)" strokeWidth="1"/>
    {/* Left armhole */}
    <path d="M6 14 Q9 18 12 16" fill="none" stroke="rgba(201,162,74,0.5)" strokeWidth="0.8"/>
    {/* Right armhole */}
    <path d="M34 14 Q31 18 28 16" fill="none" stroke="rgba(201,162,74,0.5)" strokeWidth="0.8"/>
  </svg>
);

const TeaIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14 L12 32 Q12 34 14 34 L26 34 Q28 34 28 32 L30 14Z" fill="url(#teg)" stroke="rgba(201,162,74,0.6)" strokeWidth="0.8"/>
    <rect x="9" y="13" width="22" height="3" rx="1" fill="#C8A44D" opacity="0.7"/>
    <path d="M20 8 Q18 5 20 3 Q22 5 20 8" stroke="rgba(201,162,74,0.8)" strokeWidth="1" fill="none"/>
    <line x1="18" y1="13" x2="18" y2="7" stroke="rgba(201,162,74,0.5)" strokeWidth="0.8"/>
    <defs><linearGradient id="teg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="100%" stopColor="#1B5060"/></linearGradient></defs>
  </svg>
);

const StickerIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,4 24,14 35,14 26,21 29,32 20,25 11,32 14,21 5,14 16,14" fill="url(#sg)" stroke="rgba(201,162,74,0.7)" strokeWidth="0.8"/>
    <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0E2A2F"/><stop offset="60%" stopColor="#1B5060"/><stop offset="100%" stopColor="#C8A44D" stopOpacity="0.6"/></linearGradient></defs>
  </svg>
);

const CATEGORIES = [
  { label: 'T-Shirts', category: 't-shirts', Icon: TShirtIcon },
  { label: 'Hoodies', category: 'hoodies', Icon: HoodieIcon },
  { label: 'Hats', category: 'hats', Icon: HatIcon },
  { label: 'Tanks', category: 'tanks', Icon: TankIcon },
  { label: 'Collectibles & Gifts', category: 'accessories', Icon: TeaIcon },
  { label: 'Magnets & Stickers', category: 'stickers', Icon: StickerIcon },
];

export default function CategoryGrid() {
  return (
    <section className="py-14 px-6" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1200px] mx-auto">
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
                <cat.Icon />
                <span className="font-mono text-xs tracking-wider uppercase text-white group-hover:text-yellow-300 transition-colors text-center">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}