import React from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.div 
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="w-full bg-primary/10 border-b border-primary/20 py-2 px-4"
    >
      <p className="text-center text-xs font-mono tracking-widest text-primary uppercase">
        Use Code TORCH20 for 20% Off at Checkout &nbsp;·&nbsp; Free Shipping Over $100
      </p>
    </motion.div>
  );
}