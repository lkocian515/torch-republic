import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CORE_PRODUCTS, RITUAL_COLORS } from '@/lib/coreProducts';
import RitualProductImage from '@/components/products/RitualProductImage';

export default function RitualHero() {
  return (
    <section id="top" style={{ background: '#F7F1E7' }}>
      <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-6">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 text-center md:text-left"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#A97B32' }}>
              Three rituals. No clutter.
            </p>
            <h1
              className="mt-5 font-serif font-semibold leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.6rem,7vw,4.4rem)', color: '#292622', textWrap: 'balance' }}
            >
              Pick your ritual.
            </h1>
            <p
              className="mx-auto mt-5 max-w-md font-heading md:mx-0"
              style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.7, color: '#5F574F' }}
            >
              Coffee, matcha, or mushrooms. Three simple ways to start your day.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
              <Link to="/shop" className="btn btn-primary" style={{ minWidth: '200px' }}>
                Shop All Three
              </Link>
              <a href="#choose-ritual" className="btn btn-ghost" style={{ minWidth: '200px' }}>
                Find Your Ritual
              </a>
            </div>
          </motion.div>

          {/* Three products together */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="order-2">
            <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-4">
              {CORE_PRODUCTS.map((p, i) => {
                const c = RITUAL_COLORS[p.ritualKey];
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                    whileHover={{ y: -6 }}
                    className="flex flex-col items-center"
                  >
                    <Link
                      to={p.path}
                      aria-label={p.name}
                      className="flex w-full items-end justify-center overflow-hidden rounded-2xl"
                      style={{ background: c.soft, aspectRatio: '3/4', border: `1px solid ${c.accent}22` }}
                    >
                      <RitualProductImage product={p} eager={i === 0} className="h-full w-full p-3 sm:p-4" imgClassName="h-full w-full" />
                    </Link>
                    <span
                      className="mt-3 font-mono text-[8px] uppercase tracking-[0.2em] font-semibold sm:text-[9px]"
                      style={{ color: c.deep }}
                    >
                      {p.categoryLabel}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}