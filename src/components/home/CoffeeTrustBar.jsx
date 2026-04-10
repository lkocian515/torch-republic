import React from 'react';
import { ShieldCheck, Users, Star, Flag, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const ITEMS = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Users, label: 'Small Business' },
  { icon: Star, label: 'Premium Quality' },
  { icon: Flag, label: 'USA-Inspired Brand' },
  { icon: Truck, label: 'Fast Shipping' },
];

export default function CoffeeTrustBar() {
  return (
    <section className="py-8 px-6" style={{ backgroundColor: '#040404', borderTop: '1px solid rgba(200,164,77,0.08)', borderBottom: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2"
            >
              <item.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C8A44D' }} />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-500">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}