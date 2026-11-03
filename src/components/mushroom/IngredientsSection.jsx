import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Zap, Leaf, Droplet, Heart } from 'lucide-react';

const RG = '#E6AC45';

const MUSHROOMS = [
  {
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    icon: Brain,
    color: '#E6AC45',
    benefits: [
      'Supports cognitive function & mental clarity',
      'Promotes nerve growth factor (NGF) production',
      'Enhances focus, memory, and concentration',
      'Supports overall brain health',
    ],
    description: 'Known as the "Mind Mushroom," Lion\'s Mane has been used for centuries to support cognitive function and mental clarity. Its unique compounds stimulate nerve growth factor production.',
  },
  {
    name: 'Cordyceps',
    latin: 'Cordyceps militaris',
    icon: Zap,
    color: '#9B4E2F',
    benefits: [
      'Traditionally used for daily energy',
      'Supports stamina and physical performance',
      'Naturally occurring cordycepin compounds',
      'Supports an active, focused routine',
    ],
    description: 'Cordyceps is a functional mushroom with centuries of use in traditional East Asian practice, where it was associated with energy and stamina. It is a natural fit for mornings that ask for momentum.',
  },
  {
    name: 'Reishi',
    latin: 'Ganoderma lucidum',
    icon: Heart,
    color: '#E6AC45',
    benefits: [
      'Promotes relaxation & stress management',
      'Supports restful sleep & calm',
      'Adaptogenic properties for balance',
      'Supports cardiovascular health',
    ],
    description: 'Known as the "Mushroom of Immortality," Reishi is an adaptogen that helps the body manage stress. It\'s traditionally used for relaxation and overall wellness.',
  },
];

export default function IngredientsSection() {
  return (
    <section
      className="px-5 md:px-10 py-16 md:py-20"
      style={{
        background: '#0F0F0F',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      {/* Subtle atmospheric glow */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '300px', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(230,183,173,0.08) 0%, transparent 100%)',
      }} />

      <div className="max-w-[1200px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Our Ingredients
          </p>
          <h2 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Premium Functional Mushrooms
          </h2>
          <p className="font-heading max-w-2xl mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Each blend is crafted with carefully sourced functional mushrooms, known for their unique health-promoting properties and centuries of traditional use.
          </p>
        </motion.div>

        {/* Mushroom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MUSHROOMS.map((mushroom, i) => (
            <motion.div
              key={mushroom.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col"
              style={{
                background: '#141414',
                border: '1px solid rgba(230,183,173,0.1)',
                padding: '32px 28px',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = mushroom.color;
                e.currentTarget.style.boxShadow = `0 8px 32px ${mushroom.color}20, inset 0 0 0 1px ${mushroom.color}10`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div className="mb-6" style={{ color: mushroom.color }}>
                <mushroom.icon className="w-10 h-10" strokeWidth={1.5} />
              </div>

              {/* Name & Latin */}
              <h3 className="font-serif font-bold mb-1"
                style={{ fontSize: '1.4rem', color: '#F7F2E9' }}>
                {mushroom.name}
              </h3>
              <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-4"
                style={{ color: 'rgba(230,183,173,0.4)', fontStyle: 'italic' }}>
                {mushroom.latin}
              </p>

              {/* Description */}
              <p className="font-heading mb-6"
                style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.7, fontWeight: 300 }}>
                {mushroom.description}
              </p>

              {/* Benefits List */}
              <div className="flex-1">
                <ul className="space-y-2.5">
                  {mushroom.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Leaf className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: mushroom.color, opacity: 0.7 }} />
                      <span className="font-heading text-xs"
                        style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.6 }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 py-4 px-6"
            style={{
              background: 'rgba(230,183,173,0.05)',
              border: '1px solid rgba(230,183,173,0.12)',
            }}>
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4" style={{ color: RG }} />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(230,183,173,0.5)' }}>
                Dual-Extracted for Maximum Potency
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ background: 'rgba(230,183,173,0.2)' }} />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: RG }} />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(230,183,173,0.5)' }}>
                Third-Party Tested for Purity
              </span>
            </div>
            <div className="hidden sm:block w-px h-4" style={{ background: 'rgba(230,183,173,0.2)' }} />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: RG }} />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(230,183,173,0.5)' }}>
                Sustainably Sourced
              </span>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 font-mono text-[7px] tracking-[0.15em]"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          These statements have not been evaluated by the FDA. Mushroom supplements are not intended to diagnose, treat, cure, or prevent any disease.
        </motion.p>
      </div>
    </section>
  );
}