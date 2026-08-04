import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const SPOTLIGHT_DATA = {
  'mushroom-coffee': [
    {
      id: 'lions-mane',
      name: "Lion's Mane",
      latin: 'Hericium erinaceus',
      tagline: 'The Focus Mushroom',
      color: '#C8A96E',
      emoji: '🧠',
      heroStat: { value: '16', unit: 'weeks', label: 'to notice cognitive improvements in clinical studies' },
      description:
        "Lion's Mane is one of the most studied functional mushrooms on the planet. It's named for its shaggy white appearance — but it's what happens inside your brain that matters.",
      howItWorks:
        "Compounds called hericenones and erinacines stimulate production of Nerve Growth Factor (NGF), a protein essential for the maintenance and growth of neurons. More NGF = sharper thinking over time.",
      bestFor: ['Morning focus', 'Deep work sessions', 'Creative thinking', 'Mental endurance'],
      callout: {
        label: 'Key Compound',
        text: 'Hericenones & Erinacines — NGF synthesis stimulators found only in Lion\'s Mane',
      },
    },
    {
      id: 'chaga',
      name: 'Chaga',
      latin: 'Inonotus obliquus',
      tagline: 'The Antioxidant Powerhouse',
      color: '#9B7B5C',
      emoji: '🛡️',
      heroStat: { value: '3x', unit: '', label: 'higher antioxidant activity than acai berry (ORAC score)' },
      description:
        'Chaga grows on birch trees in cold northern climates and has been used in Siberian folk medicine for centuries. Modern research confirms what traditional healers knew — it is an extraordinary source of antioxidants.',
      howItWorks:
        'Chaga is packed with polyphenols, beta-glucans, and melanin compounds. Beta-glucans modulate immune response. Polyphenols fight oxidative stress at the cellular level. Together, they form a powerful daily defense.',
      bestFor: ['Daily immune support', 'Antioxidant protection', 'Stress resilience', 'Long-term wellness'],
      callout: {
        label: 'Key Compound',
        text: 'Beta-glucans — the same immune-modulating polysaccharides found across the most researched medicinal mushrooms',
      },
    },
  ],
  matcha: [
    {
      id: 'l-theanine',
      name: 'L-Theanine',
      latin: 'Found naturally in Camellia sinensis',
      tagline: 'The Calm-Focus Amino Acid',
      color: '#6CBD5A',
      emoji: '🍵',
      heroStat: { value: '~25mg', unit: '', label: 'of L-Theanine per serving — naturally occurring in ceremonial matcha' },
      description:
        'L-Theanine is a rare amino acid found almost exclusively in tea leaves. It is the reason matcha feels different from coffee — clear-headed and calm, not wired and anxious.',
      howItWorks:
        'L-Theanine occurs naturally in matcha and is traditionally associated with mindful tea rituals. Research continues to evaluate how it pairs with naturally occurring caffeine for different drinkers.',
      bestFor: ['Calm, jitter-free focus', 'Creative work', 'Reducing coffee anxiety', 'Meditation and flow states'],
      callout: {
        label: 'The Combination',
        text: 'L-Theanine + Caffeine together outperform caffeine alone in focus, attention, and sustained performance tasks',
      },
    },
    {
      id: 'egcg',
      name: 'EGCG',
      latin: 'Epigallocatechin gallate',
      tagline: 'The Master Antioxidant',
      color: '#4AAF7C',
      emoji: '🌿',
      heroStat: { value: '137x', unit: '', label: 'more EGCG than regular brewed green tea' },
      description:
        'Matcha contains the whole tea leaf ground to a fine powder — meaning you consume significantly more EGCG than steeped green tea, where most compounds are discarded with the leaves.',
      howItWorks:
        'EGCG (epigallocatechin gallate) is one of the most potent plant antioxidants known to science. It combats oxidative stress, supports metabolic health, and has been associated with improved cognitive performance in multiple clinical trials.',
      bestFor: ['Cellular antioxidant defense', 'Metabolic support', 'Anti-aging', 'Long-term brain health'],
      callout: {
        label: 'Why Ceremonial Grade',
        text: "Lower grades of matcha contain less EGCG and more bitterness. We use ceremonial grade specifically for maximum compound density.",
      },
    },
  ],
  'classic-coffee': [
    {
      id: 'arabica-polyphenols',
      name: 'Coffee Polyphenols',
      latin: 'Chlorogenic acids & beyond',
      tagline: 'The Antioxidant Most People Miss',
      color: '#C4A35A',
      emoji: '☕',
      heroStat: { value: '#1', unit: '', label: 'dietary source of antioxidants in the average Western diet (Journal of Nutrition, 2004)' },
      description:
        'Most people drink coffee for caffeine. But premium Arabica coffee is also one of the richest sources of dietary antioxidants available — particularly chlorogenic acids, which are largely destroyed in over-roasted beans.',
      howItWorks:
        'Chlorogenic acids slow glucose absorption, support healthy inflammation response, and protect neurons from oxidative damage. Specialty-grade, lighter-roasted Arabica preserves significantly more of these compounds than commodity dark roast.',
      bestFor: ['Daily antioxidant intake', 'Metabolic support', 'Brain health over time', 'Clean, sustained energy'],
      callout: {
        label: 'Why Arabica Matters',
        text: 'Robusta has higher caffeine but lower quality polyphenols and harsher flavor. Premium Arabica delivers the full package — taste, aroma, and functional compounds.',
      },
    },
    {
      id: 'caffeine',
      name: 'Natural Caffeine',
      latin: 'From Coffea arabica',
      tagline: 'The World\'s Most Studied Stimulant',
      color: '#D67A5A',
      emoji: '⚡',
      heroStat: { value: '~80mg', unit: '', label: 'of natural caffeine per serving — enough to activate focus without overdoing it' },
      description:
        "Caffeine is one of the most extensively researched dietary compounds on earth. At the right dose, it's a performance enhancer — improving alertness, reaction time, mood, and physical endurance.",
      howItWorks:
        'Caffeine works by blocking adenosine receptors — the receptors that signal your brain it\'s time to slow down. The result: improved alertness and reduced perception of fatigue. Unlike synthetic caffeine, coffee\'s natural matrix also delivers polyphenols that modulate the experience.',
      bestFor: ['Morning alertness', 'Pre-workout energy', 'Focus and productivity', 'Mood elevation'],
      callout: {
        label: 'Dose Matters',
        text: '~80mg per serving is the clinical sweet spot — enough to activate without triggering the anxiety or crash of high-dose energy drinks.',
      },
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function IngredientCard({ ingredient, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-200"
      style={{
        background: isActive ? `${ingredient.color}12` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isActive ? ingredient.color + '50' : 'rgba(230,183,173,0.08)'}`,
        padding: '16px 18px',
        borderRadius: '2px',
      }}
    >
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{ingredient.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-sm" style={{ color: isActive ? ingredient.color : '#F7F1E8' }}>
            {ingredient.name}
          </p>
          <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(247,241,232,0.35)' }}>
            {ingredient.tagline}
          </p>
        </div>
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: isActive ? ingredient.color : 'transparent', border: `1px solid ${ingredient.color}50` }}
        />
      </div>
    </button>
  );
}

function IngredientDetail({ ingredient }) {
  return (
    <motion.div
      key={ingredient.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Latin name */}
      <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: `${ingredient.color}70` }}>
        {ingredient.latin}
      </p>

      {/* Hero stat */}
      <div
        className="flex items-center gap-4 p-4 mb-6"
        style={{ background: `${ingredient.color}08`, border: `1px solid ${ingredient.color}20` }}
      >
        <div className="flex-shrink-0 text-center" style={{ minWidth: '64px' }}>
          <p className="font-mono font-black leading-none" style={{ fontSize: '2rem', color: ingredient.color }}>
            {ingredient.heroStat.value}
          </p>
          {ingredient.heroStat.unit && (
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-0.5" style={{ color: `${ingredient.color}70` }}>
              {ingredient.heroStat.unit}
            </p>
          )}
        </div>
        <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300 }}>
          {ingredient.heroStat.label}
        </p>
      </div>

      {/* Description */}
      <p className="font-heading text-sm leading-relaxed mb-5" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300, lineHeight: 1.85 }}>
        {ingredient.description}
      </p>

      {/* How It Works */}
      <div className="mb-5">
        <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: `${ingredient.color}80` }}>
          How It Works
        </p>
        <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300, lineHeight: 1.85 }}>
          {ingredient.howItWorks}
        </p>
      </div>

      {/* Best For tags */}
      <div className="mb-5">
        <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2.5" style={{ color: `${ingredient.color}80` }}>
          Best For
        </p>
        <div className="flex flex-wrap gap-2">
          {ingredient.bestFor.map(b => (
            <span
              key={b}
              className="font-mono text-[7px] tracking-[0.2em] uppercase px-2.5 py-1.5"
              style={{ background: `${ingredient.color}10`, border: `1px solid ${ingredient.color}25`, color: `${ingredient.color}90` }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Callout box */}
      <div
        className="p-4"
        style={{ background: `${ingredient.color}08`, border: `1px solid ${ingredient.color}30`, borderLeft: `3px solid ${ingredient.color}` }}
      >
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1.5" style={{ color: ingredient.color }}>
          {ingredient.callout.label}
        </p>
        <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.65)', fontWeight: 300 }}>
          {ingredient.callout.text}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function IngredientSpotlight({ product }) {
  const ingredients = SPOTLIGHT_DATA[product.category];
  const [activeId, setActiveId] = useState(ingredients?.[0]?.id);

  if (!ingredients || ingredients.length === 0) return null;

  const active = ingredients.find(i => i.id === activeId) || ingredients[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-14"
    >
      {/* Section header */}
      <div className="mb-8">
        <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.45)' }}>
          Ingredient Spotlight
        </p>
        <h2 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#F7F1E8', letterSpacing: '-0.02em' }}>
          {product.category === 'matcha'
            ? "What's Inside Every Cup of Matcha"
            : product.category === 'classic-coffee'
            ? "What Makes Premium Arabica Different"
            : "Meet the Mushrooms in Your Blend"}
        </h2>
        <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, maxWidth: '560px' }}>
          {product.category === 'matcha'
            ? "Matcha isn't just green tea. Here's a plain-English breakdown of what's actually happening in your cup."
            : product.category === 'classic-coffee'
            ? "Premium Arabica coffee is more than caffeine. Here's what the research shows about what's in every serving."
            : "First time with mushroom coffee? Here's everything you need to know about the ingredients driving the benefits."}
        </p>
      </div>

      {/* Two-column layout: sidebar tabs + detail panel */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
        {/* Left: ingredient selector */}
        <div className="flex flex-row md:flex-col gap-2">
          {ingredients.map(ingredient => (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              isActive={ingredient.id === activeId}
              onClick={() => setActiveId(ingredient.id)}
            />
          ))}
          {/* First-timer note */}
          <div
            className="hidden md:block mt-4 p-3"
            style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}
          >
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(230,183,173,0.5)' }}>
              New to this?
            </p>
            <p className="font-heading text-[11px] leading-relaxed" style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300 }}>
              Tap each ingredient to learn what it does and why it's in your blend.
            </p>
          </div>
        </div>

        {/* Right: detail panel */}
        <div
          className="p-6"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.08)' }}
        >
          <AnimatePresence mode="wait">
            <IngredientDetail key={active.id} ingredient={active} />
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom disclaimer */}
      <p className="font-mono text-[7px] tracking-[0.15em] leading-relaxed mt-5" style={{ color: 'rgba(255,255,255,0.18)' }}>
        These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use if pregnant, nursing, or managing a medical condition.
      </p>
    </motion.section>
  );
}