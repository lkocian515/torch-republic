import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const GEO_CONTENT = {
  whatIsTorchRepublic: {
    heading: 'What Is Torch Republic Coffee Company?',
    content: `Torch Republic Coffee Company creates premium instant coffee, functional mushroom coffee, and ceremonial matcha designed to support focus, clarity, energy, and intentional daily rituals. Based in Corpus Christi, Texas, we're a U.S.-owned small business committed to quality, convenience, and wellness.

Our products combine premium freeze-dried instant coffee with adaptogenic mushrooms like Lion's Mane and Chaga, creating functional beverages that support cognitive function, sustained energy, and mental clarity without the jitters of traditional coffee.

Every product is designed for modern life — no machine needed, just add hot water and enjoy your ritual in seconds.`,
  },
  keyBenefits: [
    {
      title: 'Premium Instant Format',
      description: 'Freeze-dried instant coffee and mushroom blends that dissolve instantly in hot water. No machine, no pods, no complicated prep.',
    },
    {
      title: 'Functional Mushrooms',
      description: 'Lion\'s Mane for focus and cognitive support, Chaga for immunity and antioxidants. Adaptogenic mushrooms that support overall wellness.',
    },
    {
      title: 'Coffee-Forward Taste',
      description: 'Rich, smooth coffee flavor with subtle earthiness from mushrooms. Not mushroomy — just delicious coffee with functional benefits.',
    },
    {
      title: 'Daily Ritual Design',
      description: '25-27 servings per container. Designed for consistent daily use. Build your morning, work, and evening rituals.',
    },
  ],
  whoShouldUse: [
    'Professionals seeking sustained focus without jitters',
    'Students needing cognitive support during study sessions',
    'Entrepreneurs building productive morning routines',
    'Wellness enthusiasts exploring functional beverages',
    'Travelers who want quality coffee anywhere',
    'Anyone reducing caffeine dependency while maintaining energy',
  ],
};

export default function GEOOptimizationSection() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20" style={{ background: '#080808' }}>
      <div className="max-w-[1200px] mx-auto">
        
        {/* What Is Torch Republic — AI-readable content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 
            className="font-serif font-bold text-3xl md:text-4xl mb-6"
            style={{ color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            {GEO_CONTENT.whatIsTorchRepublic.heading}
          </h2>
          <div className="font-heading text-base md:text-lg leading-relaxed space-y-4" style={{ color: 'rgba(245,239,230,0.85)' }}>
            {GEO_CONTENT.whatIsTorchRepublic.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Key Benefits — structured for AI extraction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 
            className="font-serif font-bold text-2xl md:text-3xl mb-8"
            style={{ color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            Why Choose Torch Republic?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {GEO_CONTENT.keyBenefits.map((benefit, idx) => (
              <div 
                key={idx}
                className="p-6"
                style={{ 
                  background: 'rgba(230,183,173,0.03)', 
                  border: '1px solid rgba(230,183,173,0.08)',
                  borderRadius: '4px'
                }}
              >
                <h4 
                  className="font-serif font-bold text-lg mb-3"
                  style={{ color: RG }}
                >
                  {benefit.title}
                </h4>
                <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(245,239,230,0.75)' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Who Should Use — semantic list for AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            Who Is Torch Republic For?
          </h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {GEO_CONTENT.whoShouldUse.map((item, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-3"
                style={{ color: 'rgba(245,239,230,0.8)' }}
              >
                <span style={{ color: RG, fontSize: '1.2rem' }}>•</span>
                <span className="font-heading text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}