import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Leaf, Zap, Droplets, Clock, Star } from 'lucide-react';

const RG = '#E6AC45';

const CARDS = [
  {
    icon: Zap,
    title: 'Instant Powder Mix',
    text: 'Fine instant mushroom coffee powder designed to dissolve easily in hot water, milk, or your favorite creamer.',
  },
  {
    icon: Leaf,
    title: 'Functional Mushrooms',
    text: "Crafted with functional mushrooms such as Lion's Mane, Cordyceps and Reishi to support clarity, focus, and daily wellness.",
  },
  {
    icon: Coffee,
    title: 'Taste Profile',
    text: 'Smooth coffee-forward flavor with cocoa-like depth, gentle earthiness, and a rounded finish.',
  },
  {
    icon: Droplets,
    title: 'How to Use',
    text: 'Scoop, mix, and sip. No grinder, coffee maker, French press, or pods required.',
  },
  {
    icon: Clock,
    title: 'Daily Ritual',
    text: 'Created for an easy daily coffee ritual that fits into mornings, work sessions, or quiet moments.',
  },
  {
    icon: Star,
    title: 'Servings',
    text: 'Each tube contains 27 servings.',
  },
];

export default function BlendCompositionCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full mb-12"
    >
      <div style={{
        border: `1px solid ${RG}25`,
        borderRadius: '2px',
        padding: '32px 28px',
        background: 'rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${RG}80` }}>
            What's Inside
          </p>
          <h2 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.6rem', lineHeight: 1.1 }}>
            Product Details
          </h2>
          <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
            Instant mushroom coffee powder — not ground coffee, not pods, and no coffee maker required.
          </p>
        </div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-3 p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${RG}14` }}>
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
                <p className="font-mono text-[8px] tracking-[0.28em] uppercase" style={{ color: `${RG}90` }}>
                  {title}
                </p>
              </div>
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Preparation line */}
        <div className="flex items-center gap-3 pt-6 mt-2" style={{ borderTop: `1px solid ${RG}12` }}>
          <Droplets className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
          <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>
            <span style={{ color: 'rgba(247,241,232,0.7)' }}>Preparation:</span> Mix one serving with hot water, milk, or your favorite creamer. Stir until dissolved and enjoy.
          </p>
        </div>
      </div>
    </motion.div>
  );
}