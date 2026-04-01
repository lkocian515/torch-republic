import React from 'react';
import { motion } from 'framer-motion';

const RED = '#B22234';
const BLUE = '#3C3B6E';

export default function MadeInUSABanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-7 px-6 overflow-hidden"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.15)', borderBottom: '1px solid rgba(201,162,74,0.15)' }}
    >
      {/* Flag stripe accents - left */}
      <div className="absolute left-0 top-0 bottom-0 flex">
        {[RED, '#fff', RED, '#fff', RED, '#fff', RED].map((color, i) => (
          <div key={i} style={{ width: '4px', backgroundColor: color, opacity: color === '#fff' ? 0.12 : 0.45 }} />
        ))}
      </div>

      {/* Flag stripe accents - right */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-row-reverse">
        {[RED, '#fff', RED, '#fff', RED, '#fff', RED].map((color, i) => (
          <div key={i} style={{ width: '4px', backgroundColor: color, opacity: color === '#fff' ? 0.12 : 0.45 }} />
        ))}
      </div>

      {/* Blue canton accent top-left */}
      <div className="absolute top-0 left-7 h-full w-10 opacity-20" style={{ backgroundColor: BLUE }} />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center sm:text-left px-8">
        {/* Stars + headline */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center w-12 h-10 rounded-sm" style={{ backgroundColor: BLUE, flexShrink: 0 }}>
            <span className="text-white text-lg leading-none">★</span>
            <span className="font-mono text-white text-[8px] tracking-widest mt-0.5">USA</span>
          </div>
          <div>
            <p className="font-heading font-black text-sm md:text-base uppercase tracking-widest text-white">
              Proudly Made in the USA
            </p>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(201,162,74,0.8)' }}>
              Every product supports American workers &amp; domestic production.
            </p>
          </div>
        </div>

        {/* Divider on desktop */}
        <div className="hidden sm:block h-8 w-px" style={{ backgroundColor: 'rgba(201,162,74,0.2)' }} />

        {/* Secondary message */}
        <p className="font-mono text-xs tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
          🇺🇸 &nbsp;Buy American. Stay Free.
        </p>
      </div>
    </motion.section>
  );
}