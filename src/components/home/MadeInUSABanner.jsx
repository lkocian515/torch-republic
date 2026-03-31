import React from 'react';
import { motion } from 'framer-motion';

const FLAG_STRIPES = ['#B22234', '#fff', '#B22234', '#fff', '#B22234'];

export default function MadeInUSABanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-6 px-6 overflow-hidden"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.12)', borderBottom: '1px solid rgba(201,162,74,0.12)' }}
    >
      {/* Subtle flag stripe accent on left edge */}
      <div className="absolute left-0 top-0 bottom-0 flex">
        {FLAG_STRIPES.map((color, i) => (
          <div key={i} style={{ width: '3px', backgroundColor: color, opacity: 0.35 }} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center sm:text-left pl-4">
        {/* Flag emoji + headline */}
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">🇺🇸</span>
          <div>
            <p className="font-heading font-black text-sm md:text-base uppercase tracking-widest text-white">
              Proudly Made in the USA
            </p>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(201,162,74,0.75)' }}>
              Every product supports American workers &amp; domestic production.
            </p>
          </div>
        </div>

        {/* Divider on desktop */}
        <div className="hidden sm:block h-8 w-px" style={{ backgroundColor: 'rgba(201,162,74,0.2)' }} />

        {/* Secondary message */}
        <p className="font-mono text-xs tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Buy American. Stay Free.
        </p>
      </div>
    </motion.section>
  );
}