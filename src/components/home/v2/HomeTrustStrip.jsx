import React from 'react';
import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  { icon: '🇺🇸', label: 'Roasted & Shipped in USA', delay: 0 },
  { icon: '🔥', label: 'Small Batch Coffee', delay: 0.1 },
  { icon: '⚡', label: 'Fast Fulfillment', delay: 0.2 },
  { icon: '🔒', label: 'Secure Checkout', delay: 0.3 },
];

export default function HomeTrustStrip() {
  return (
    <section style={{ background: 'linear-gradient(135deg, rgba(201,162,74,0.04) 0%, rgba(201,162,74,0.02) 100%)', borderTop: '1px solid rgba(201,162,74,0.1)', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TRUST_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex items-center gap-3 md:gap-4"
            >
              <span style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)' }}>
                {item.icon}
              </span>
              <p className="font-heading text-sm md:text-base font-medium" style={{ color: '#F7F2E9', lineHeight: 1.4 }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}