import React from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.div 
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="w-full bg-background border-b border-primary/20 py-2.5 px-4"
    >
      <p className="text-center text-sm font-sans text-white">
        Free shipping for orders over <span className="text-primary font-semibold">$100</span> or more
      </p>
    </motion.div>
  );
}