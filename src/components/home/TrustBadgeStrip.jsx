import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Truck, Lock, Shield } from 'lucide-react';

const BADGES = [
  {
    icon: Shield,
    title: 'Made in USA',
    description: 'Proudly manufactured',
  },
  {
    icon: CheckCircle2,
    title: '30-Day Guarantee',
    description: 'Love it or return it',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'SSL encrypted',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Orders $50+',
  },
];

export default function TrustBadgeStrip() {
  return (
    <section className="py-8 px-6 border-y" style={{ borderColor: 'rgba(200,164,77,0.15)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <Icon className="w-8 h-8 mb-3" style={{ color: '#C8A44D' }} />
                <p className="text-sm font-heading font-bold text-white mb-1">
                  {badge.title}
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}