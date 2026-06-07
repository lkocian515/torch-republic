import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const RG = '#E6B7AD';

const CATEGORIES = [
  {
    title: 'Classic Coffee',
    accent: '#C4A35A',
    description: '100% Premium Arabica',
    features: ['No Mushrooms', 'Instant Powder', '27 Servings', 'Bold & Smooth'],
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2f3384009_hjkhjkgk.png',
    clipPath: 'polygon(0 0, 33% 0, 33% 100%, 0 100%)',
  },
  {
    title: 'Mushroom Coffee',
    accent: '#E6B7AD',
    description: "Lion's Mane + Chaga",
    features: ['Functional Adaptogens', 'Instant Powder', '27 Servings', 'Focus + Calm'],
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/666faf673_4.png',
    clipPath: 'polygon(33% 0, 66% 0, 66% 100%, 33% 100%)',
  },
  {
    title: 'Matcha',
    accent: '#10B981',
    description: 'Ceremonial Grade',
    features: ['100% Pure Matcha', 'No Whisk Needed', '25 Servings', 'Calm Energy'],
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a2eb9ed53_zssssss.png',
    clipPath: 'polygon(66% 0, 100% 0, 100% 100%, 66% 100%)',
  },
];

export default function ProductComparison() {
  return (
    <section className="px-6 md:px-10 py-16" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Find Your Ritual
          </p>
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4" style={{ color: '#FFFFFF' }}>
            Three Collections. One Standard.
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85 }}>
            Premium instant blends crafted for every mood, moment, and ritual.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded"
              style={{ 
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${cat.accent}30`,
              }}
            >
              {/* Image */}
              <div className="w-full aspect-square relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                  style={{ transform: 'scale(1.1)' }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)` }} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl mb-2" style={{ color: cat.accent }}>
                  {cat.title}
                </h3>
                <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {cat.description}
                </p>
                <ul className="space-y-2">
                  {cat.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-3 h-3" style={{ color: cat.accent }} />
                      <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Comparison Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded"
          style={{ 
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${RG}30`,
          }}
        >
          <div className="grid grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="relative aspect-[4/3]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <span className="font-serif font-bold text-lg md:text-xl" style={{ color: cat.accent }}>
                    {cat.title.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}