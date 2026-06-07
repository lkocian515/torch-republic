import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Shield, Zap, Moon, Flame, Leaf } from 'lucide-react';

const RG = '#E6B7AD';
const EMERALD = '#10B981';
const TEAL = '#06B6D4';

const MUSHROOMS = [
  {
    id: 'lions-mane',
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    tagline: 'The Brain Mushroom',
    color: RG,
    glow: 'rgba(230,183,173,0.18)',
    border: 'rgba(230,183,173,0.25)',
    icon: Brain,
    heroStat: '2,000+',
    heroStatLabel: 'years of documented use',
    description: "The only widely consumed food proven to stimulate your brain's own Nerve Growth Factor (NGF) — the protein responsible for maintaining and repairing neurons.",
    benefits: [
      { icon: Brain, label: 'NGF Production', desc: 'Stimulates Nerve Growth Factor synthesis — supports memory, focus, and neuron repair' },
      { icon: Zap, label: 'Calm Energy', desc: 'Clean alertness without the cortisol spike — roughly half the caffeine of regular coffee' },
      { icon: Flame, label: 'BDNF Support', desc: 'Hericene A activates brain-derived neurotrophic factor in memory-forming hippocampal neurons' },
      { icon: Moon, label: 'Mood Balance', desc: 'Consistent with serotonin and BDNF pathway support — better mood baseline over weeks' },
    ],
    quote: "Lion's Mane is the only food known to cross the blood-brain barrier and rebuild the brain from within.",
    link: '/journal/lions-mane-mushroom-coffee',
    linkLabel: 'Read the full research',
  },
  {
    id: 'chaga',
    name: 'Chaga',
    latin: 'Inonotus obliquus',
    tagline: 'The King of Mushrooms',
    color: EMERALD,
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.25)',
    icon: Shield,
    heroStat: '146,700+',
    heroStatLabel: 'ORAC units per 100g',
    description: 'Chaga holds the highest antioxidant value ever recorded for any natural food — 15x wild blueberries. Grown over decades on Siberian birch trees.',
    benefits: [
      { icon: Shield, label: 'Antioxidant Power', desc: '146,700+ ORAC units — the highest ever recorded for any natural food substance' },
      { icon: Leaf, label: 'Immune Support', desc: 'Beta-glucans regulate Th1/Th2 cytokine balance — activating without overstimulating' },
      { icon: Flame, label: 'Cell Defense', desc: '40%+ reduction in DNA fragmentation from oxidative stress in a 2004 clinical study' },
      { icon: Zap, label: 'Anti-Inflammation', desc: 'Suppresses TNF-alpha, iNOS, and IL-1beta — the inflammatory markers behind chronic fatigue' },
    ],
    quote: 'A 2023 peer-reviewed review called Chaga a "super-fungus with countless facets" — the most antioxidant-dense substance in nature.',
    link: '/journal/chaga-mushroom-coffee',
    linkLabel: 'Read the full research',
  },
];

function BenefitPill({ icon: Icon, label, desc, color, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all duration-200"
      style={{
        padding: '14px 18px',
        background: isActive ? `${color}12` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isActive ? color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '3px',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full"
          style={{ background: isActive ? `${color}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${isActive ? color + '30' : 'rgba(255,255,255,0.08)'}` }}>
          <Icon className="w-3.5 h-3.5" style={{ color: isActive ? color : 'rgba(255,255,255,0.3)' }} />
        </div>
        <div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1"
            style={{ color: isActive ? color : 'rgba(255,255,255,0.35)' }}>
            {label}
          </p>
          <p className="font-heading text-xs font-light leading-relaxed"
            style={{ color: isActive ? 'rgba(240,235,225,0.75)' : 'rgba(240,235,225,0.35)' }}>
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}

function MushroomPanel({ mushroom, isActive, onClick }) {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const Icon = mushroom.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="cursor-pointer transition-all duration-300"
      style={{
        border: `1px solid ${isActive ? mushroom.border : 'rgba(255,255,255,0.06)'}`,
        background: isActive ? `${mushroom.glow}` : 'rgba(255,255,255,0.01)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      {/* Panel Header */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 flex items-center justify-center rounded-full flex-shrink-0"
              style={{ background: `${mushroom.color}15`, border: `1px solid ${mushroom.color}30` }}>
              <Icon className="w-5 h-5" style={{ color: mushroom.color }} />
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-0.5" style={{ color: `${mushroom.color}90` }}>
                {mushroom.latin}
              </p>
              <h3 className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#FFFFFF' }}>
                {mushroom.name}
              </h3>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: mushroom.color }}>
                {mushroom.tagline}
              </p>
            </div>
          </div>

          {/* Hero stat */}
          <div className="text-right hidden sm:block">
            <p className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: mushroom.color }}>
              {mushroom.heroStat}
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {mushroom.heroStatLabel}
            </p>
          </div>
        </div>

        <p className="font-heading text-sm font-light leading-relaxed mb-6"
          style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.85 }}>
          {mushroom.description}
        </p>

        {/* Benefits grid — always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {mushroom.benefits.map((b, i) => (
            <BenefitPill
              key={i}
              {...b}
              color={mushroom.color}
              isActive={isActive && activeBenefit === i}
              onClick={(e) => { e.stopPropagation(); setActiveBenefit(i); }}
            />
          ))}
        </div>

        {/* Animated detail callout */}
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={activeBenefit}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 overflow-hidden"
            >
              <div className="p-4" style={{ background: `${mushroom.color}08`, border: `1px solid ${mushroom.color}20`, borderRadius: '2px' }}>
                <p className="font-heading text-sm font-light italic leading-relaxed" style={{ color: mushroom.color }}>
                  "{mushroom.quote}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between">
          <Link
            to={mushroom.link}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-opacity hover:opacity-70"
            style={{ color: mushroom.color }}
          >
            {mushroom.linkLabel} <ArrowRight className="w-3 h-3" />
          </Link>
          <div className="sm:hidden text-right">
            <p className="font-serif font-bold" style={{ fontSize: '1.3rem', color: mushroom.color }}>
              {mushroom.heroStat}
            </p>
            <p className="font-mono text-[8px] tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {mushroom.heroStatLabel}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MushroomBenefitsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 -z-0 opacity-10 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${RG}, transparent)` }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 -z-0 opacity-10 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${EMERALD}, transparent)` }} />

      <div className="relative z-10 max-w-[960px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${RG})` }} />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: RG }}>
              The Science Inside
            </span>
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${EMERALD}, transparent)` }} />
          </div>
          <h2 className="font-serif font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Two Mushrooms.<br />Two Systems.
          </h2>
          <p className="font-heading text-sm font-light max-w-md mx-auto"
            style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85 }}>
            Every Torch Republic blend combines Lion's Mane and Chaga — one sharpens the brain, one defends the body. Both in every cup.
          </p>
        </motion.div>

        {/* Mushroom panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MUSHROOMS.map((m, i) => (
            <MushroomPanel
              key={m.id}
              mushroom={m}
              isActive={active === i}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TEAL})`, color: '#080808', padding: '14px 32px' }}
          >
            Shop All Blends <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}