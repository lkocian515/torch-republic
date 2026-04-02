import React from 'react';
import { motion } from 'framer-motion';

export default function MadeInUSABanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full py-4 px-6"
      style={{ borderTop: '1px solid rgba(200,164,77,0.15)', borderBottom: '1px solid rgba(200,164,77,0.15)', backgroundColor: '#050505' }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-6 md:gap-12 flex-wrap">
        {[
          { flag: '🇺🇸', text: 'Designed in America' },
          { flag: '⚡', text: 'Veteran Inspired' },
          { flag: '✦', text: 'Premium Materials' },
          { flag: '🇺🇸', text: 'Proudly American' },
        ].map(({ flag, text }) => (
          <div key={text} className="flex items-center gap-2">
            <span className="text-xs">{flag}</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(200,164,77,0.65)' }}>{text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}