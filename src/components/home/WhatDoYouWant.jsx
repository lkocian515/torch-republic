import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Zap, Moon, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const PATHWAYS = [
  {
    id: 'classic',
    icon: Coffee,
    title: 'KEEP THE CLASSIC COFFEE EXPERIENCE',
    sub: 'Same bold taste, no machine needed',
    products: 'Republic Reserve & Torchbearer',
    link: '/shop/instant-coffee',
    accent: '#D6B27A',
  },
  {
    id: 'functional',
    icon: Zap,
    title: 'CREATE A FUNCTIONAL MORNING RITUAL',
    sub: 'Coffee with added focus support',
    products: 'SunCap Rise & mushroom morning blends',
    link: '/products/suncap-rise',
    accent: '#10B981',
  },
  {
    id: 'pods',
    icon: Sparkles,
    title: 'AVOID PODS AND A COFFEE MACHINE',
    sub: 'Instant, convenient, no single-use waste',
    products: 'All instant coffee & mushroom coffee',
    link: '/shop',
    accent: RG,
  },
  {
    id: 'evening',
    icon: Moon,
    title: 'FIND A GENTLER EVENING RITUAL',
    sub: 'Low-caffeine blend for winding down',
    products: 'DreamCap Blend',
    link: '/products/dreamcap-blend',
    accent: '#8B9ED4',
  },
  {
    id: 'alternative',
    icon: Leaf,
    title: 'TRY A COFFEE ALTERNATIVE',
    sub: 'Smooth, ceremonial-grade matcha',
    products: 'Ceremonial Matcha collection',
    link: '/shop/matcha',
    accent: '#6EE7B7',
  },
];

export default function WhatDoYouWant() {
  const [active, setActive] = useState(null);

  return (
    <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: '#0C0B0A' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
            Find Your Ritual
          </p>
          <h2
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#F5EFE6', letterSpacing: '-0.01em', lineHeight: 1.2 }}
          >
            What do you want to change about your coffee?
          </h2>
        </motion.div>

        {/* Pathway cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PATHWAYS.map((p, i) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={p.link}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  className="flex flex-col gap-3 p-5 h-full transition-all duration-200 block"
                  style={{
                    background: isActive ? `${p.accent}12` : '#141414',
                    border: `1px solid ${isActive ? p.accent : 'rgba(230,183,173,0.1)'}`,
                    borderRadius: '4px',
                    textDecoration: 'none',
                    minHeight: '160px',
                  }}
                >
                  <Icon
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: p.accent }}
                    strokeWidth={1.5}
                  />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <p
                      className="font-mono text-[9px] tracking-[0.15em] uppercase font-bold leading-tight"
                      style={{ color: isActive ? p.accent : '#F5EFE6' }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="font-heading text-[0.8rem] leading-snug"
                      style={{ color: 'rgba(245,239,230,0.65)', fontWeight: 400 }}
                    >
                      {p.sub}
                    </p>
                  </div>
                  <p
                    className="font-mono text-[8px] tracking-[0.1em] uppercase"
                    style={{ color: p.accent }}
                  >
                    → {p.products}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}