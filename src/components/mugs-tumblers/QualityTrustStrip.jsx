import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Truck, Award } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Award, label: 'Premium Quality Materials', detail: 'Crafted to last a lifetime' },
  { icon: Zap, label: 'Designed in the USA', detail: 'Built with American precision' },
  { icon: Truck, label: 'Fast Shipping', detail: 'Ships within 2–3 business days' },
  { icon: Shield, label: 'Satisfaction Guarantee', detail: 'Love it or we make it right' },
];

export default function QualityTrustStrip() {
  return (
    <section className="px-6 md:px-12 py-16 md:py-20" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <Icon className="w-6 h-6" style={{ color: '#E6AC45' }} />
                <div>
                  <p className="font-heading font-semibold text-sm" style={{ color: '#F7F2E9', marginBottom: '4px' }}>
                    {item.label}
                  </p>
                  <p className="font-mono text-[8px]" style={{ color: 'rgba(240,235,225,0.4)' }}>
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}