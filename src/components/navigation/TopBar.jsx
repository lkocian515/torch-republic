import React from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.div 
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="w-full py-1.5 px-4"
      style={{ backgroundColor: '#0E2A2F', borderBottom: '1px solid #C8A44D22' }}
    >
      <p className="text-center text-sm font-mono tracking-widest uppercase" style={{ color: '#E8DFAF' }}>
        Free shipping for orders over <span className="font-semibold" style={{ color: '#C8A44D' }}>$100</span> or more
      </p>
    </motion.div>
  );
}