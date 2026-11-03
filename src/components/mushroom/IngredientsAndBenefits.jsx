import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Brain, Shield, Heart, Coffee } from 'lucide-react';

const INGREDIENT_ICONS = {
  'Lion\'s Mane': Brain,
  'Reishi': Shield,
  'Matcha': Leaf,
  'Coffee': Coffee,
  'L-Theanine': Zap,
  'Antioxidants': Heart,
};

const DEFAULT_INGREDIENTS = {
  'mushroom-coffee': [
    {
      name: "Organic Lion's Mane Mushroom",
      scientific: 'Hericium erinaceus',
      benefits: ['Supports cognitive function and mental clarity', 'Promotes nerve growth factor (NGF) production', 'Enhances focus and concentration'],
      icon: Brain,
      accent: '#E6AC45',
    },
    {
      name: 'Organic Reishi Mushroom',
      scientific: 'Ganoderma lucidum',
      benefits: ['Rich in antioxidants for immune support', 'Helps reduce oxidative stress', 'Supports overall wellness and vitality'],
      icon: Shield,
      accent: '#E6AC45',
    },
    {
      name: 'Premium Instant Coffee',
      scientific: 'Coffea arabica',
      benefits: ['Clean, sustained energy without jitters', 'Rich in natural antioxidants', 'Supports mental alertness and physical performance'],
      icon: Coffee,
      accent: '#E6AC45',
    },
  ],
  'classic-coffee': [
    {
      name: 'Premium Arabica Coffee',
      scientific: 'Coffea arabica',
      benefits: ['Smooth, rich flavor with low acidity', 'Natural caffeine for sustained energy', 'High in antioxidants and beneficial compounds'],
      icon: Coffee,
      accent: '#E6AC45',
    },
  ],
  'matcha': [
    {
      name: 'Ceremonial Grade Matcha',
      scientific: 'Camellia sinensis',
      benefits: ['Rich in L-Theanine for calm focus', 'Packed with catechins and antioxidants', 'Supports metabolism and natural energy'],
      icon: Leaf,
      accent: '#264A35',
    },
  ],
};

export default function IngredientsAndBenefits({ product }) {
  const ingredients = DEFAULT_INGREDIENTS[product.category] || DEFAULT_INGREDIENTS['mushroom-coffee'];

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Ingredients & Benefits
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
            What Makes This Blend Special
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            Every ingredient is purposefully selected to support your daily ritual — combining traditional wisdom with modern convenience.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ingredients.map((ingredient, index) => {
            const Icon = ingredient.icon || Leaf;
            return (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${ingredient.accent}20`,
                  borderRadius: '4px',
                }}
              >
                {/* Icon */}
                <div className="mb-4" style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${ingredient.accent}10`, border: `1px solid ${ingredient.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} style={{ color: ingredient.accent }} />
                </div>

                {/* Name */}
                <h3 className="font-serif font-bold mb-1" style={{ fontSize: '1.15rem', color: '#F7F2E9' }}>
                  {ingredient.name}
                </h3>
                
                {/* Scientific Name */}
                <p className="font-mono text-[8px] tracking-[0.2em] italic mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  {ingredient.scientific}
                </p>

                {/* Benefits List */}
                <ul className="space-y-2.5">
                  {ingredient.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span style={{ color: ingredient.accent, marginTop: '3px', flexShrink: 0, fontSize: '0.5rem' }}>◆</span>
                      <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.6 }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Daily Ritual Note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 max-w-3xl mx-auto text-center"
          style={{
            background: 'rgba(230,183,173,0.04)',
            border: '1px solid rgba(230,183,173,0.1)',
            borderRadius: '4px',
          }}
        >
          <p className="font-heading" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            <span style={{ color: '#E6AC45', fontWeight: 600 }}>Why These Ingredients Matter:</span>{' '}
            Each component works synergistically to support your physical and mental performance throughout the day. 
            Whether you're seeking focused energy, immune support, or simply a moment of calm in your busy routine, 
            this blend provides the tools you need to show up fully for what matters most.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}