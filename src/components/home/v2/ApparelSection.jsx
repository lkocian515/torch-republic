import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const APPAREL_ITEMS = [
  {
    title: 'Tees & Tanks',
    description: 'Wear the mission.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    route: '/Shop',
  },
  {
    title: 'Hoodies & Sweatshirts',
    description: 'Built for the season.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    route: '/Shop',
  },
  {
    title: 'Hats & Accessories',
    description: 'Carry the torch.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
    route: '/Shop',
  },
];

export default function ApparelSection() {
  return (
    <section
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.55)' }}>
              Lifestyle Extension
            </p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Apparel & Gear
            </h2>
          </div>
          <Link
            to="/Shop"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5 flex items-center gap-2"
            style={{ color: 'rgba(196,163,90,0.7)', borderBottom: '1px solid rgba(201,162,74,0.25)' }}
          >
            Shop All Apparel <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {APPAREL_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={item.route}
                className="group block relative overflow-hidden"
                style={{ aspectRatio: '3/4', background: '#111', border: '1px solid rgba(196,163,90,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.1)'}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.55, filter: 'brightness(0.9) grayscale(15%)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif font-bold mb-1" style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>{item.title}</h3>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: 'rgba(196,163,90,0.65)' }}>{item.description}</p>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all group-hover:opacity-100 opacity-60"
                    style={{ color: '#C9A24A', borderBottom: '1px solid rgba(201,162,74,0.3)', paddingBottom: '2px' }}>
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}