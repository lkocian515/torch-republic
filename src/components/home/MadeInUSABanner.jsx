import React from 'react';
import { motion } from 'framer-motion';

export default function MadeInUSABanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 px-6 relative overflow-hidden"
      style={{ backgroundColor: '#060606' }}
    >
      {/* Thin gold rule top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.3) 30%, rgba(201,162,74,0.3) 70%, transparent)' }} />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex items-center gap-5">
          <span className="text-3xl leading-none select-none">🇺🇸</span>
          <div>
            <p className="font-serif font-bold text-lg text-white leading-tight">
              Proudly Made in the USA
            </p>
            <p className="font-mono text-xs mt-1.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Every product supports American workers & domestic production.
            </p>
          </div>
        </div>

        <div className="hidden md:block h-10 w-px" style={{ backgroundColor: 'rgba(201,162,74,0.15)' }} />

        <p className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>
          Buy American. Stay Free.
        </p>
      </div>

      {/* Thin gold rule bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.3) 30%, rgba(201,162,74,0.3) 70%, transparent)' }} />
    </motion.section>
  );
}