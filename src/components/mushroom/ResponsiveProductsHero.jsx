import React from 'react';
import { motion } from 'framer-motion';

const DESKTOP_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988';
const MOBILE_IMG = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988';

export default function ResponsiveProductsHero() {
  return (
    <section style={{ background: '#111111', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      {/* Desktop: Full-width banner (16:9 aspect) */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        src={DESKTOP_IMG}
        alt="Torch Republic Products"
        className="hidden md:block w-full h-auto object-cover"
        style={{ aspectRatio: '16/9', maxHeight: '600px' }}
      />

      {/* Mobile: Square format with padding */}
      <div className="md:hidden px-6 py-12">
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={MOBILE_IMG}
          alt="Torch Republic Products"
          className="w-full h-auto object-cover rounded-lg"
          style={{ aspectRatio: '1/1', maxHeight: '400px' }}
        />
      </div>
    </section>
  );
}