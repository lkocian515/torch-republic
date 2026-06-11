import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Brain, Moon, Sparkles, Zap, Book, Coffee } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6B7AD';

const QUESTIONS = [
  {
    q: 'What do you need most today?',
    options: [
      { label: 'Energy', icon: Sun, result: 'energy' },
      { label: 'Focus', icon: Brain, result: 'focus' },
      { label: 'Calm', icon: Moon, result: 'calm' },
      { label: 'Creativity', icon: Sparkles, result: 'creativity' },
      { label: 'Discipline', icon: Zap, result: 'discipline' },
      { label: 'Reflection', icon: Book, result: 'reflection' },
      { label: 'Simple Coffee', icon: Coffee, result: 'simple' },
    ]
  }
];

const RESULTS = {
  energy: {
    title: 'You Need Energy',
    products: ['SunCap Rise', 'Ember Rise'],
    desc: 'Start with a blend designed for morning momentum and fresh starts.',
    link: '/products/suncap-rise-instant-mushroom-coffee',
    compareLink: '/shop',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/suncap-rise.png',
    accent: '#D6B27A',
  },
  focus: {
    title: 'You Need Focus',
    products: ['GlowMind Clarity', 'The Ascendant'],
    desc: 'Choose a blend crafted for deep work, clarity, and mental presence.',
    link: '/products/glowmind-clarity-instant-mushroom-coffee',
    compareLink: '/shop',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/glowmind-clarity.png',
    accent: '#E6B7AD',
  },
  calm: {
    title: 'You Need Calm',
    products: ['MoonCap Restore', 'DreamCap'],
    desc: 'Reach for a blend that supports grounding and restoration.',
    link: '/products/mooncap-restore-instant-mushroom-coffee',
    compareLink: '/shop',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/mooncap-restore.png',
    accent: '#C98F86',
  },
  creativity: {
    title: 'You Need Creativity',
    products: ['The Alchemist', 'Mystic Bloom'],
    desc: 'Select a blend designed for inspired focus and creative flow.',
    link: '/products/the-alchemist-matcha-blend',
    compareLink: '/shop',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffc347224_17.png',
    accent: '#6CBD5A',
  },
  discipline: {
    title: 'You Need Discipline',
    products: ['The Monk'],
    desc: 'Commit to a ceremonial matcha ritual for calm, steady focus.',
    link: '/products/the-monk-matcha-blend',
    compareLink: '/matcha',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/the-monk.png',
    accent: '#6CBD5A',
  },
  reflection: {
    title: 'You Need Reflection',
    products: ['The Oracle', 'Midnight Watch'],
    desc: 'Honor your intuition with a blend for journaling and inner clarity.',
    link: '/products/the-oracle-instant-mushroom-coffee',
    compareLink: '/shop',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/the-oracle.png',
    accent: '#C4A8A0',
  },
  simple: {
    title: 'You Want Simple Coffee',
    products: ['Torchbearer'],
    desc: 'Pure premium instant coffee — no mushrooms, no complication.',
    link: '/products/torchbearer-instant-coffee',
    compareLink: '/classic-coffee',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torchbearer.png',
    accent: '#C4A35A',
  }
};

export default function FindYourRitual() {
  const [selected, setSelected] = useState(null);
  const result = selected ? RESULTS[selected] : null;

  useSEO({
    title: 'Find Your Blend | Torch Republic Coffee Company',
    description: 'Take the Torch Republic blend quiz to discover the coffee, mushroom coffee, or matcha ritual that fits your focus, energy, calm, or creativity.',
    url: '/quiz',
    type: 'website',
  });

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            Ritual Finder
          </p>
          <h2 className="font-serif font-bold mb-4" style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            color: '#FFFFFF'
          }}>
            Find Your Ritual
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{
            fontSize: '0.95rem',
            color: 'rgba(240,235,225,0.55)',
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            Answer a simple question and discover the Torch Republic blend that fits your morning.
          </p>
        </motion.div>

        {/* Question */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-serif font-bold text-white text-center mb-8" style={{ fontSize: '1.3rem' }}>
              {QUESTIONS[0].q}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {QUESTIONS[0].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(opt.result)}
                  className="p-5 flex flex-col items-center gap-3 transition-all hover:opacity-90"
                  style={{
                    background: '#0F0E0D',
                    border: `1px solid ${RG}20`,
                    borderRadius: '6px'
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: `${RG}15`,
                    border: `1px solid ${RG}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <opt.icon size={20} style={{ color: RG }} />
                  </div>
                  <span className="font-heading text-xs tracking-[0.15em] uppercase" style={{
                    color: 'rgba(240,235,225,0.7)'
                  }}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ borderRadius: '6px', overflow: 'hidden', border: `1px solid ${result.accent}30` }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Image panel */}
              <div className="flex items-center justify-center p-8 sm:p-12"
                style={{ background: `linear-gradient(135deg, ${result.accent}12 0%, #0C0C0C 100%)`, minHeight: '260px' }}>
                <img
                  src={result.image}
                  alt={result.products[0]}
                  className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                  style={{ filter: 'drop-shadow(0 0 32px rgba(0,0,0,0.6))' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              {/* Text panel */}
              <div className="p-8 flex flex-col justify-center text-center sm:text-left"
                style={{ background: '#0F0E0D' }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: result.accent }}>
                  Your Match
                </p>
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.5rem' }}>
                  {result.title}
                </h3>
                <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
                  {result.desc}
                </p>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(240,235,225,0.4)' }}>
                  Recommended: {result.products.join(' · ')}
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    to={result.link}
                    className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
                    style={{ background: result.accent, color: '#080808', borderRadius: '4px' }}
                  >
                    Start This Ritual
                  </Link>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={result.compareLink}
                      className="flex-1 inline-flex items-center justify-center font-mono text-[8px] tracking-[0.25em] uppercase transition-all hover:opacity-70 py-3 px-6"
                      style={{ border: `1px solid ${result.accent}50`, color: result.accent, borderRadius: '4px' }}
                    >
                      Compare All Blends
                    </Link>
                    <button
                      onClick={() => setSelected(null)}
                      className="inline-flex items-center justify-center font-mono text-[8px] tracking-[0.25em] uppercase transition-all hover:opacity-70 py-3 px-6"
                      style={{ color: 'rgba(240,235,225,0.4)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px' }}
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}