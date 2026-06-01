import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const RG = '#E6B7AD';

export default function MushroomCoffeeComparison({ productName }) {
  const typicalMushroomCoffee = [
    { label: 'Taste', value: 'Earthy, mushroom-forward' },
    { label: 'Finish', value: 'Muddy, lingering earthiness' },
    { label: 'Coffee Flavor', value: 'Weak, secondary to mushroom taste' },
    { label: 'Experience', value: 'Wellness product with coffee flavoring' },
  ];

  const torchRepublic = [
    { label: 'Taste', value: 'Coffee-forward, rich & smooth' },
    { label: 'Finish', value: 'Clean, rounded, minimal bitterness' },
    { label: 'Coffee Flavor', value: 'Bold, specialty-grade Arabica' },
    { label: 'Experience', value: 'Premium coffee with functional support' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full mb-12"
    >
      <div style={{
        border: `1px solid ${RG}25`,
        borderRadius: '2px',
        padding: '32px 28px',
        background: 'rgba(0,0,0,0.25)',
      }}>
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${RG}80` }}>
            Comparison
          </p>
          <h2 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.6rem', lineHeight: 1.1 }}>
            How It Tastes Compared to Traditional Mushroom Coffee
          </h2>
          <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
            We start with specialty coffee. Others start with mushrooms.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
          {/* Typical Mushroom Coffee */}
          <div style={{
            padding: '24px 20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Typical Mushroom Coffee
            </p>
            <div className="space-y-4">
              {typicalMushroomCoffee.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {item.label}
                    </p>
                    <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Torch Republic */}
          <div style={{
            padding: '24px 20px',
            background: `linear-gradient(180deg, ${RG}08 0%, rgba(0,0,0,0.2) 100%)`,
            border: `1px solid ${RG}30`,
          }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
              Torch Republic
            </p>
            <div className="space-y-4">
              {torchRepublic.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: RG }} />
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-0.5" style={{ color: `${RG}70` }}>
                      {item.label}
                    </p>
                    <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}