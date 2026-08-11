import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Brain, Moon, Sparkles, Zap, Book, Coffee, Clock, Leaf, Wind, Flame, Star, Share2, ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from '@/lib/mushroomProducts';
import { getProductImage, getProductAltText, getProductImageDragProps } from '@/lib/productImageHelpers';

const PRODUCT_LOOKUP = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS, ...MATCHA_PRODUCTS]
  .reduce((acc, p) => {
    [p.shopifyHandle, p.slug, p.id, p.name].filter(Boolean).forEach(key => { acc[key] = p; });
    return acc;
  }, {});

const THEME = {
  page: '#F7F1E7',
  cream: '#FBF8F1',
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  border: '#E4D8C9',
  clay: '#B7653E',
  moss: '#566047',
};

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
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, result when done
  const [selections, setSelections] = useState([]); // [optionIndex, ...] per question
  const [resultKey, setResultKey] = useState(null);

  useSEO({
    title: 'Find Your Blend | Torch Republic Coffee Company',
    description: 'Take the Torch Republic blend quiz to discover the coffee, mushroom coffee, or matcha ritual that fits your focus, energy, calm, or creativity.',
    url: '/quiz',
    type: 'website',
  });

  const selectOption = (i) => {
    setSelections(prev => {
      const next = [...prev];
      next[step - 1] = i;
      return next;
    });
  };

  const handleNext = () => {
    const current = selections[step - 1];
    if (current === undefined) return;
    if (step < QUESTIONS.length) {
      setStep(s => s + 1);
    } else {
      const weights = selections.map((idx, qi) => QUESTIONS[qi].options[idx].weights);
      setResultKey(computeResult(weights));
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
    else setStep(0);
  };

  const handleReset = () => {
    setStep(0);
    setSelections([]);
    setResultKey(null);
  };

  const currentQ = QUESTIONS[step - 1];
  const currentSel = selections[step - 1];
  const result = resultKey ? RESULTS[resultKey] : null;
  const isResult = !!result;

  return (
    <section className="px-6 md:px-10 py-16 md:py-20" style={{ background: THEME.page }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="eyebrow mb-3" style={{ color: THEME.clay }}>Ritual Finder</p>
          <h1 className="h1 mb-3">Find Your Ritual</h1>
          <p className="body-lg">
            {isResult ? 'Your personalized blend match is ready.' : 'Answer a few questions and we’ll match you to the Torch Republic blend made for your morning.'}
          </p>
        </motion.div>

        {/* Progress Bar */}
        {step >= 1 && !isResult && (
          <div className="mb-8 max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: THEME.secondary }}>
                Question {step} of {QUESTIONS.length}
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: THEME.secondary }}>
                {Math.round((step / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{ background: i < step ? THEME.clay : THEME.border }} />
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* Intro */}
          {step === 0 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center">
              <div className="card-torch p-8 mb-8 text-left">
                <p className="font-heading mb-4" style={{ color: THEME.text, lineHeight: 1.75, fontSize: '1rem' }}>
                  This quick quiz helps you choose the Torch Republic blend that fits your day — whether that’s a mushroom coffee for focus, a classic instant coffee for simple energy, or a ceremonial matcha for calm.
                </p>
                <div className="flex flex-col gap-3 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
                  {[
                    { label: '4 questions', sub: 'about your morning and what you need' },
                    { label: 'About 1 minute', sub: 'no email or account required' },
                    { label: 'A clear match', sub: 'a blend and ritual based on your answers' },
                  ].map(({ label, sub }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Check size={18} style={{ color: THEME.moss, flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p className="font-serif font-bold" style={{ color: THEME.text, fontSize: '0.95rem' }}>{label}</p>
                        <p className="font-heading text-sm" style={{ color: THEME.secondary }}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(1)} className="btn btn-primary" style={{ minWidth: 260 }}>
                Find My Blend
              </button>
            </motion.div>
          )}

          {/* Questions */}
          {step >= 1 && !isResult && currentQ && (
            <motion.div key={`q${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h2 className="font-serif font-bold text-center mb-8" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', color: THEME.text, lineHeight: 1.3 }}>
                {currentQ.q}
              </h2>
              <div className="flex flex-col gap-3 mb-8">
                {currentQ.options.map((opt, i) => {
                  const selected = currentSel === i;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => selectOption(i)}
                      className="flex items-center gap-4 p-4 text-left transition-all w-full"
                      style={{
                        background: selected ? `${THEME.clay}0D` : THEME.card,
                        border: `1.5px solid ${selected ? THEME.clay : THEME.border}`,
                        borderRadius: 10,
                        minHeight: 60,
                        cursor: 'pointer',
                      }}
                      aria-pressed={selected}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                        background: selected ? `${THEME.clay}1A` : THEME.cream,
                        border: `1px solid ${selected ? THEME.clay : THEME.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={20} style={{ color: selected ? THEME.clay : THEME.secondary }} />
                      </div>
                      <span className="font-heading flex-1" style={{ color: THEME.text, fontSize: '1rem', fontWeight: selected ? 600 : 400 }}>
                        {opt.label}
                      </span>
                      {selected && <Check size={20} style={{ color: THEME.clay, flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <button onClick={handleBack} className="btn btn-ghost" aria-label="Back">
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentSel === undefined}
                  className="btn btn-primary flex-1"
                  style={currentSel === undefined ? { opacity: 0.45, cursor: 'not-allowed' } : {}}
                >
                  {step < QUESTIONS.length ? 'Next' : 'See My Match'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Result */}
          {isResult && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-torch overflow-hidden">
              <div className="flex items-center justify-center p-8"
                style={{ background: `linear-gradient(135deg, ${result.accent}14 0%, ${THEME.cream} 100%)` }}>
                <img
                  src={getProductImage(PRODUCT_LOOKUP[result.imageHandle])}
                  alt={getProductAltText(PRODUCT_LOOKUP[result.imageHandle], result.products[0])}
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
                  {...getProductImageDragProps({ filter: 'none' })}
                />
              </div>
              <div className="p-8">
                <p className="eyebrow mb-3" style={{ color: result.accent }}>Your Match</p>
                <h3 className="font-serif font-bold mb-3" style={{ fontSize: '1.5rem', color: THEME.text }}>
                  {result.title}
                </h3>
                <p className="font-heading mb-5" style={{ color: THEME.secondary, lineHeight: 1.7, fontSize: '1rem' }}>
                  {result.desc}
                </p>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-6" style={{ color: THEME.secondary }}>
                  Recommended: {result.products.join(' · ')}
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  <Link to={result.link} className="btn btn-primary w-full">
                    Start This Ritual
                  </Link>
                  <button onClick={handleReset} className="btn btn-ghost w-full">
                    <RotateCcw size={16} /> Retake Quiz
                  </button>
                  <Link to={result.compareLink} className="font-heading text-sm text-center" style={{ color: THEME.secondary, textDecoration: 'none' }}>
                    <span style={{ color: THEME.clay, textDecoration: 'underline' }}>Compare all blends →</span>
                  </Link>
                </div>

                {/* Share Row */}
                <div className="pt-5" style={{ borderTop: `1px solid ${THEME.border}` }}>
                  <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-3" style={{ color: THEME.secondary }}>
                    Share your result
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const text = `I just took the @TorchRepublic blend quiz and got "${result.title}" ✨ Find yours at torchrepubliccoffee.com/quiz`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="flex-1 font-mono text-[8px] tracking-[0.15em] uppercase py-2.5 transition-all hover:opacity-80"
                      style={{ background: 'rgba(29,161,242,0.08)', color: '#1DA1F2', border: '1px solid rgba(29,161,242,0.3)', borderRadius: 6, minHeight: 44 }}
                    >
                      𝕏 Twitter
                    </button>
                    <button
                      onClick={() => {
                        const url = `https://torchrepubliccoffee.com/quiz`;
                        const text = `I got "${result.title}" on the Torch Republic ritual quiz!`;
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="flex-1 font-mono text-[8px] tracking-[0.15em] uppercase py-2.5 transition-all hover:opacity-80"
                      style={{ background: 'rgba(24,119,242,0.08)', color: '#1877F2', border: '1px solid rgba(24,119,242,0.3)', borderRadius: 6, minHeight: 44 }}
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
                      className="flex items-center justify-center gap-1.5 flex-1 font-mono text-[8px] tracking-[0.15em] uppercase py-2.5 transition-all hover:opacity-80"
                      style={{ background: `${THEME.clay}12`, color: THEME.clay, border: `1px solid ${THEME.clay}40`, borderRadius: 6, minHeight: 44 }}
                    >
                      <Share2 size={12} /> Copy
                    </button>
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