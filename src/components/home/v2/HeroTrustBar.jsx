import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, Coffee, Star } from 'lucide-react';

const ITEMS = [
  { icon: Shield, label: 'Secure Checkout' },
  { icon: Truck, label: 'Fast U.S. Shipping' },
  { icon: Coffee, label: 'Small-Batch Roasted' },
  { icon: Star, label: 'Satisfaction Guaranteed' },
];

export default function HeroTrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="w-full"
      style={{ background: 'rgba(0,0,0,0.65)', borderBottom: '1px solid rgba(201,162,74,0.1)', backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-3 flex items-center justify-center flex-wrap gap-5 md:gap-10">
        {ITEMS.map(({ icon: IconComp, label }) => (
          <div key={label} className="flex items-center gap-2">
            <IconComp className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.7)' }} />
            <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}