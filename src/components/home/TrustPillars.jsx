import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Truck, RotateCcw } from 'lucide-react';

const PILLARS = [
  {
    icon: CheckCircle2,
    title: 'Wear What You Stand For',
    description: 'Every piece is designed to reflect conviction and craftsmanship. Premium quality, not generic merch.'
  },
  {
    icon: Truck,
    title: 'Fast U.S. Shipping',
    description: 'Made here, shipped here. Standard delivery to all 50 states. Free shipping on orders over $100.'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day returns on all items. No questions asked. We stand behind every product we sell.'
  }
];

export default function TrustPillars() {
  return (
    <section className="py-20 px-6 border-t border-b" style={{ backgroundColor: '#000', borderColor: 'rgba(200,164,77,0.1)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className="w-12 h-12 mx-auto mb-6" style={{ color: '#C8A44D' }} />
                <h3 className="font-heading font-black text-lg uppercase tracking-tight text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}