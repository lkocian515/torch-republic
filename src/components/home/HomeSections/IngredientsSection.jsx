import React from 'react';
import { motion } from 'framer-motion';

const INGREDIENTS = [
  {
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    badge: 'Focus & Clarity',
    color: '#C4A35A',
    body: 'Known as the "smart mushroom," Lion\'s Mane supports nerve growth factor (NGF) production, cognitive function, and mental clarity. Used for centuries in traditional Eastern medicine.',
  },
  {
    name: 'Chaga',
    latin: 'Inonotus obliquus',
    badge: 'Resilience & Immunity',
    color: '#A07850',
    body: 'The "King of Medicinal Mushrooms." Chaga is extraordinarily rich in antioxidants and beta-glucans that support immune health and help the body adapt to stress.',
  },
  {
    name: 'Premium Instant Coffee',
    latin: 'Arabica & Robusta Blend',
    badge: 'Energy & Taste',
    color: '#E6B7AD',
    body: 'We start with specialty-grade instant coffee — smooth, bold, and dissolves instantly in hot or cold water. No brewer, no wait, no compromise on flavor.',
  },
];

export default function IngredientsSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ background: '#0c0b0a', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Ingredients
          </p>
          <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            What's Inside Every Tube
          </h2>
          <p className="font-heading mt-4 max-w-lg mx-auto" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.7 }}>
            Three ingredients. Nothing hidden. No fillers, no artificial flavors, no proprietary blends that obscure what you're actually drinking.
          </p>
        </div>

        {/* Ingredient list */}
        <div className="flex flex-col gap-4">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="flex flex-col sm:flex-row sm:items-start gap-5 p-6"
              style={{ background: '#111010', border: '1px solid rgba(230,183,173,0.08)' }}
            >
              <div className="flex-shrink-0">
                <span
                  className="font-mono text-[7.5px] tracking-[0.3em] uppercase px-3 py-1.5 inline-block"
                  style={{ background: `${ing.color}15`, color: ing.color, border: `1px solid ${ing.color}25` }}
                >
                  {ing.badge}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif font-bold text-white text-lg">{ing.name}</h3>
                <p className="font-mono text-[8px] tracking-[0.2em] italic mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {ing.latin}
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.75 }}>
                  {ing.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Net weight note */}
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-center mt-8" style={{ color: 'rgba(255,255,255,0.22)' }}>
          1.9 oz / 54g per tube · 27 servings · No artificial colors or preservatives
        </p>
      </div>
    </section>
  );
}