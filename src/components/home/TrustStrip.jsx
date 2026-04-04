import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Package } from 'lucide-react';

const ITEMS = [
  { emoji: '🇺🇸', label: 'American Inspired' },
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Star, label: 'Verified Customers' },
  { icon: Package, label: 'Fast Shipping' },
];

export default function TrustStrip() {
  return (
    <div style={{ borderTop: '1px solid rgba(212,175,90,0.15)', borderBottom: '1px solid rgba(212,175,90,0.15)', backgroundColor: '#040a0c' }}>
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-center gap-2"
              >
                {item.emoji ? (
                  <span className="text-base">{item.emoji}</span>
                ) : (
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#C8A44D' }} />
                )}
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(212,175,90,0.8)' }}>
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}