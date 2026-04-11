import React from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -32 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full py-2 px-4"
      style={{ backgroundColor: '#090909', borderBottom: '1px solid rgba(196,163,90,0.15)' }}
    >
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(196,163,90,0.5)' }}>
          Free Shipping on Orders Over $75
        </span>
        <span style={{ color: 'rgba(196,163,90,0.2)' }}>|</span>
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Use <span style={{ color: '#C4A35A' }}>TORCH20</span> for 20% Off Your First Order
        </span>
        <span style={{ color: 'rgba(196,163,90,0.2)' }}>|</span>
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(196,163,90,0.5)' }}>
          Founders Series — Now Available
        </span>
      </div>
    </motion.div>
  );
}