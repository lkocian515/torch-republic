import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Brain, Moon, Sparkles, Zap, Book, Coffee, Clock, Leaf, Wind, Flame, Star, Share2 } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from '@/lib/mushroomProducts';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

const PRODUCT_LOOKUP = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS, ...MATCHA_PRODUCTS]
  .reduce((acc, p) => {
    [p.shopifyHandle, p.slug, p.id, p.name].filter(Boolean).forEach(key => { acc[key] = p; });
    return acc;
  }, {});

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

// slug values must match the `slug` field in mushroomProducts.js
const RESULTS = {
  energy: {
    title: 'Your Ritual: Morning Energy',
    products: ['SunCap Rise', 'Ember Reserve'],
    desc: 'Start with a ritual designed for momentum, fresh starts, and simple daily energy.',
    link: '/products/suncap-rise',
    compareLink: '/shop',
    imageHandle: 'suncap-rise-instant-mushroom-coffee',
    accent: '#C2A66E',
  },
  focus: {
    title: 'Your Ritual: Clear Focus',
    products: ['GlowMind Clarity', 'The Monk'],
    desc: 'Choose a focused ritual for worktables, notebooks, and routines that deserve your attention.',
    link: '/products/glowmind-clarity-blend',
    compareLink: '/shop',
    imageHandle: 'glowmind-clarity-instant-mushroom-coffee',
    accent: '#4A6FA5',
  },
  calm: {
    title: 'Your Ritual: Quiet Reset',
    products: ['MoonCap Restore', 'The Monk'],
    desc: 'A calmer ritual for deliberate mornings, resets, and simple presence.',
    link: '/products/mooncap-restore',
    compareLink: '/shop',
    imageHandle: 'mooncap-restore-instant-mushroom-coffee',
    accent: '#9EAD95',
  },
  creativity: {
    title: 'Your Ritual: Creative Matcha',
    products: ['The Alchemist', 'GlowMind Clarity'],
    desc: 'A versatile matcha ritual for lattes, iced drinks, exploration, and creative routines.',
    link: '/products/the-alchemist-matcha-blend',
    compareLink: '/shop/matcha',
    imageHandle: 'the-alchemist-matcha-blend',
    accent: '#9EAD95',
  },
  discipline: {
    title: 'Your Ritual: Disciplined Presence',
    products: ['The Monk', 'GlowMind Clarity'],
    desc: 'Commit to a simple matcha or mushroom coffee ritual for steady, intentional focus.',
    link: '/products/the-monk-matcha-blend',
    compareLink: '/shop/matcha',
    imageHandle: 'the-monk-matcha-blend',
    accent: '#9EAD95',
  },
  reflection: {
    title: 'Your Ritual: Slow Clarity',
    products: ['MoonCap Restore', 'Torchbearer'],
    desc: 'A quiet coffee ritual for journaling, planning, and easing into the next part of the day.',
    link: '/products/mooncap-restore',
    compareLink: '/shop',
    imageHandle: 'mooncap-restore-instant-mushroom-coffee',
    accent: '#9EAD95',
  },
  simple: {
    title: 'Your Ritual: Classic Coffee',
    products: ['Torchbearer', 'Ember Reserve'],
    desc: 'Premium instant coffee — clean, simple, and ready without equipment.',
    link: '/products/torchbearer',
    compareLink: '/shop/instant-coffee',
    imageHandle: 'torchbearer-instant-coffee',
    accent: '#B86543',
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
                  <img
                    src={getProductImage(PRODUCT_LOOKUP[result.imageHandle])}
                    alt={getProductAltText(PRODUCT_LOOKUP[result.imageHandle], result.products[0])}
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                    style={{ filter: 'none' }}
                  />
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

                    {/* Share Row */}
                    <div className="pt-4" style={{ borderTop: `1px solid ${result.accent}20` }}>
                      <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(240,235,225,0.3)' }}>
                        Share your result
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const text = `I just took the @TorchRepublic blend quiz and got "${result.title}" ✨ Find yours at torchrepubliccoffee.com/quiz`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="flex-1 font-mono text-[7px] tracking-[0.2em] uppercase py-2.5 transition-all hover:opacity-80"
                          style={{ background: 'rgba(29,161,242,0.12)', color: '#1DA1F2', border: '1px solid rgba(29,161,242,0.25)', borderRadius: '4px' }}
                        >
                          𝕏 Twitter
                        </button>
                        <button
                          onClick={() => {
                            const url = `https://torchrepubliccoffee.com/quiz`;
                            const text = `I got "${result.title}" on the Torch Republic ritual quiz!`;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="flex-1 font-mono text-[7px] tracking-[0.2em] uppercase py-2.5 transition-all hover:opacity-80"
                          style={{ background: 'rgba(24,119,242,0.12)', color: '#1877F2', border: '1px solid rgba(24,119,242,0.25)', borderRadius: '4px' }}
                        >
                          Facebook
                        </button>
                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: result.title,
                                text: `I got "${result.title}" on the Torch Republic ritual quiz! Find yours:`,
                                url: `${window.location.origin}/quiz`,
                              });
                            } else {
                              navigator.clipboard.writeText(`${window.location.origin}/quiz`);
                              alert('Quiz link copied to clipboard!');
                            }
                          }}
                          className="flex items-center justify-center gap-1 flex-1 font-mono text-[7px] tracking-[0.2em] uppercase py-2.5 transition-all hover:opacity-80"
                          style={{ background: 'rgba(230,183,173,0.1)', color: RG, border: `1px solid ${RG}30`, borderRadius: '4px' }}
                        >
                          <Share2 size={10} /> Copy Link
                        </button>
                      </div>
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