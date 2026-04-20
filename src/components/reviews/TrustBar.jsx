import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Flame, Lock } from 'lucide-react';

export default function TrustBar({ avgRating = '4.8', totalReviews = null }) {
  const stats = [
    { icon: <Star className="w-4 h-4 fill-current" style={{ color: '#C9A24A' }} />, value: `${avgRating}/5`, label: 'Verified Rating' },
    { icon: <Flame className="w-4 h-4" style={{ color: '#C9A24A' }} />, value: 'Small Batch', label: 'Roasted to Order' },
    { icon: <Shield className="w-4 h-4" style={{ color: '#C9A24A' }} />, value: 'Guaranteed', label: 'Quality Promise' },
    { icon: <Lock className="w-4 h-4" style={{ color: '#C9A24A' }} />, value: 'Secure', label: 'Checkout' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-xl py-8 px-6 md:px-12 mb-12"
      style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.12)' }}
    >
      <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-center mb-6" style={{ color: 'rgba(201,162,74,0.55)' }}>
        Trusted by Patriots Across the Country
      </p>
      <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
        {stats.map((s, i) => (
          <div key={i} className="text-center flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              {s.icon}
              <span className="font-mono font-black" style={{ fontSize: '1.4rem', color: '#C9A24A' }}>{s.value}</span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}