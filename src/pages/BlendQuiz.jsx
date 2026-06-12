import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Brain, Moon, Sparkles, Zap, Book, Coffee, Clock, Leaf, Wind, Flame, Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from '@/lib/mushroomProducts';

// Build a quick handle→image lookup from local product catalog
const PRODUCT_IMAGE_MAP = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS, ...MATCHA_PRODUCTS]
  .reduce((acc, p) => { if (p.shopifyHandle && p.image) acc[p.shopifyHandle] = p.image; return acc; }, {});

const RG = '#E6B7AD';

// Each option contributes weight to result keys
const QUESTIONS = [
  {
    q: 'What do you need most today?',
    options: [
      { label: 'Energy', icon: Sun, weights: { energy: 3, simple: 1 } },
      { label: 'Focus', icon: Brain, weights: { focus: 3, discipline: 1 } },
      { label: 'Calm', icon: Moon, weights: { calm: 3, reflection: 1 } },
      { label: 'Creativity', icon: Sparkles, weights: { creativity: 3, focus: 1 } },
      { label: 'Discipline', icon: Zap, weights: { discipline: 3, focus: 1 } },
      { label: 'Reflection', icon: Book, weights: { reflection: 3, calm: 1 } },
      { label: 'Just Great Coffee', icon: Coffee, weights: { simple: 3, energy: 1 } },
    ],
  },
  {
    q: 'When do you usually drink your ritual?',
    options: [
      { label: 'Before 7am', icon: Star, weights: { energy: 2, simple: 2 } },
      { label: 'Morning 7–10am', icon: Sun, weights: { energy: 1, focus: 1, simple: 1 } },
      { label: 'Midday Work Session', icon: Brain, weights: { focus: 2, discipline: 1 } },
      { label: 'Afternoon Reset', icon: Wind, weights: { calm: 2, creativity: 1 } },
      { label: 'Evening Wind-Down', icon: Moon, weights: { calm: 2, reflection: 2 } },
    ],
  },
  {
    q: "What's your current relationship with caffeine?",
    options: [
      { label: 'The more the better', icon: Flame, weights: { energy: 2, simple: 1 } },
      { label: 'Moderate — I like balance', icon: Leaf, weights: { focus: 1, discipline: 1, calm: 1 } },
      { label: 'Sensitive — I want less jitter', icon: Wind, weights: { calm: 2, discipline: 1 } },
      { label: 'I prefer a slow burn', icon: Moon, weights: { calm: 1, reflection: 2, creativity: 1 } },
      { label: 'I love the ritual more than the buzz', icon: Book, weights: { reflection: 2, discipline: 1 } },
    ],
  },
  {
    q: 'How would you describe your morning vibe right now?',
    options: [
      { label: 'Fire me up — I\'m ready to execute', icon: Flame, weights: { energy: 2, discipline: 1 } },
      { label: 'Lock me in — I have deep work to do', icon: Brain, weights: { focus: 3 } },
      { label: 'Slow it down — I need to reset', icon: Moon, weights: { calm: 2, reflection: 1 } },
      { label: 'Inspire me — I want flow and ideas', icon: Sparkles, weights: { creativity: 3 } },
      { label: 'Steady and smooth — no drama', icon: Clock, weights: { simple: 2, calm: 1 } },
    ],
  },
];

const RESULTS = {
  energy: {
    title: 'Your Ritual: Raw Energy',
    products: ['SunCap Rise', 'Ember Rise'],
    desc: 'Start with a blend designed for morning momentum, bold energy, and fresh starts. No crash, just sustained drive.',
    link: '/blends/suncap-rise-instant-mushroom-coffee',
    compareLink: '/shop',
    imageHandle: 'suncap-rise-instant-mushroom-coffee',
    accent: '#D6B27A',
  },
  focus: {
    title: 'Your Ritual: Deep Focus',
    products: ['GlowMind Clarity', 'The Ascendant'],
    desc: "Lion's Mane and Chaga dial in clarity and presence. Built for deep work, flow states, and mental sharpness.",
    link: '/blends/glowmind-clarity-instant-mushroom-coffee',
    compareLink: '/shop',
    imageHandle: 'glowmind-clarity-instant-mushroom-coffee',
    accent: '#E6B7AD',
  },
  calm: {
    title: 'Your Ritual: Calm Presence',
    products: ['MoonCap Restore', 'DreamCap'],
    desc: 'Grounding, restorative blends for those who need to slow down without switching off. Recovery starts here.',
    link: '/blends/mooncap-restore-instant-mushroom-coffee',
    compareLink: '/shop',
    imageHandle: 'mooncap-restore-instant-mushroom-coffee',
    accent: '#C98F86',
  },
  creativity: {
    title: 'Your Ritual: Creative Flow',
    products: ['The Alchemist', 'Mystic Bloom'],
    desc: 'Unlock inspired focus and creative energy. These blends support open thinking and artistic presence.',
    link: '/blends/the-alchemist-matcha-blend',
    compareLink: '/shop/matcha',
    imageHandle: 'the-alchemist-matcha-blend',
    accent: '#6CBD5A',
  },
  discipline: {
    title: 'Your Ritual: Disciplined Clarity',
    products: ['The Monk', 'GlowMind Clarity'],
    desc: 'Commit to a ceremonial matcha or mushroom ritual for calm, unwavering focus. Built for operators, not reactors.',
    link: '/blends/the-monk-matcha-blend',
    compareLink: '/shop/matcha',
    imageHandle: 'the-monk-matcha-blend',
    accent: '#6CBD5A',
  },
  reflection: {
    title: 'Your Ritual: Inner Clarity',
    products: ['The Oracle', 'Midnight Watch'],
    desc: 'Honor your intuition with a blend for journaling, stillness, and inner clarity. The best ideas come in quiet.',
    link: '/blends/the-oracle-instant-mushroom-coffee',
    compareLink: '/shop',
    imageHandle: 'the-oracle-instant-mushroom-coffee',
    accent: '#C4A8A0',
  },
  simple: {
    title: 'Your Ritual: Pure Coffee',
    products: ['Torchbearer', 'Ember Rise'],
    desc: 'Premium instant coffee — bold, clean, no complication. The foundation of a great morning.',
    link: '/blends/torchbearer-instant-coffee',
    compareLink: '/shop/instant-coffee',
    imageHandle: 'torchbearer-instant-coffee',
    accent: '#C4A35A',
  },
};

function computeResult(answers) {
  const scores = {};
  answers.forEach((weights) => {
    Object.entries(weights).forEach(([key, val]) => {
      scores[key] = (scores[key] || 0) + val;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export default function FindYourRitual() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = result
  const [answers, setAnswers] = useState([]);
  const [resultKey, setResultKey] = useState(null);

  useSEO({
    title: 'Find Your Blend | Torch Republic Coffee Company',
    description: 'Take the Torch Republic blend quiz to discover the coffee, mushroom coffee, or matcha ritual that fits your focus, energy, calm, or creativity.',
    url: '/quiz',
    type: 'website',
  });

  const handleAnswer = (weights) => {
    const newAnswers = [...answers, weights];
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(s => s + 1);
    }
    if (newAnswers.length === QUESTIONS.length) {
      setResultKey(computeResult(newAnswers));
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setResultKey(null);
  };

  const currentQ = QUESTIONS[step - 1];
  const result = resultKey ? RESULTS[resultKey] : null;
  const isResult = answers.length === QUESTIONS.length && result;

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            Ritual Finder
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
            Find Your Ritual
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            {isResult ? 'Your personalized blend match is ready.' : 'Answer a few questions and discover the blend made for your morning.'}
          </p>
        </motion.div>

        {/* Progress Bar */}
        {step >= 1 && !isResult && (
          <div className="flex gap-2 mb-8 max-w-sm mx-auto">
            {QUESTIONS.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-300"
                style={{ background: i < step ? RG : `${RG}20` }} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* Intro */}
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(240,235,225,0.35)' }}>
                4 questions · ~1 minute
              </p>
              <button
                onClick={() => setStep(1)}
                className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-12"
                style={{ background: RG, color: '#080808', borderRadius: '4px' }}
              >
                Find My Blend →
              </button>
            </motion.div>
          )}

          {/* Questions */}
          {step >= 1 && !isResult && currentQ && (
            <motion.div key={`q${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-center mb-2" style={{ color: `${RG}50` }}>
                Question {step} of {QUESTIONS.length}
              </p>
              <p className="font-serif font-bold text-white text-center mb-8" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}>
                {currentQ.q}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.weights)}
                    className="p-5 flex flex-col items-center gap-3 transition-all hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: '#0F0E0D', border: `1px solid ${RG}20`, borderRadius: '6px' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${RG}15`, border: `1px solid ${RG}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <opt.icon size={20} style={{ color: RG }} />
                    </div>
                    <span className="font-heading text-xs tracking-[0.1em] text-center" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.4 }}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {isResult && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ borderRadius: '6px', overflow: 'hidden', border: `1px solid ${result.accent}30` }}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="flex items-center justify-center p-8 sm:p-12"
                  style={{ background: `linear-gradient(135deg, ${result.accent}12 0%, #0C0C0C 100%)`, minHeight: '260px' }}>
                  {PRODUCT_IMAGE_MAP[result.imageHandle] ? (
                    <img
                      src={PRODUCT_IMAGE_MAP[result.imageHandle]}
                      alt={result.products[0]}
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                      style={{ filter: 'drop-shadow(0 0 32px rgba(0,0,0,0.6))' }}
                    />
                  ) : (
                    <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center" style={{ background: `${result.accent}10`, borderRadius: '8px' }}>
                      <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-center" style={{ color: result.accent }}>{result.products[0]}</p>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col justify-center text-center sm:text-left" style={{ background: '#0F0E0D' }}>
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
                        onClick={handleReset}
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

        </AnimatePresence>
      </div>
    </section>
  );
}