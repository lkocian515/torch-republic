import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analyticsEvents';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Brain, Sparkles, Zap, Book, Coffee, Clock, Leaf, Wind, Flame, Star, Share2, ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '@/lib/mushroomProducts';
import { getProductImage, getProductAltText, getProductImageDragProps } from '@/lib/productImageHelpers';

// Single source of truth — only the two current products.
const PRODUCT_LOOKUP = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS]
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

// Each option contributes weight to one of two result keys:
//   classic  → Instant Classic Coffee (traditional, bold, higher caffeine, straightforward energy)
//   mushroom → Instant Mushroom Coffee (coffee + functional mushrooms, focus, work sessions, balanced)
const QUESTIONS = [
  {
    q: 'What do you need most today?',
    options: [
      { label: 'Energy', icon: Sun, weights: { classic: 3 } },
      { label: 'Focus', icon: Brain, weights: { mushroom: 3 } },
      { label: 'Calm', icon: Wind, weights: { mushroom: 2 } },
      { label: 'Creativity', icon: Sparkles, weights: { mushroom: 2 } },
      { label: 'Discipline', icon: Zap, weights: { mushroom: 3 } },
      { label: 'Reflection', icon: Book, weights: { mushroom: 2 } },
      { label: 'Just Great Coffee', icon: Coffee, weights: { classic: 3 } },
    ],
  },
  {
    q: 'When do you usually drink your ritual?',
    options: [
      { label: 'Before 7am', icon: Star, weights: { classic: 2, mushroom: 1 } },
      { label: 'Morning 7-10am', icon: Sun, weights: { classic: 1, mushroom: 1 } },
      { label: 'Midday Work Session', icon: Brain, weights: { mushroom: 3 } },
      { label: 'Afternoon Reset', icon: Wind, weights: { mushroom: 2 } },
      { label: 'Evening Wind-Down', icon: Coffee, weights: { mushroom: 2 } },
    ],
  },
  {
    q: "What's your current relationship with caffeine?",
    options: [
      { label: 'The more the better', icon: Flame, weights: { classic: 3 } },
      { label: 'Moderate - I like balance', icon: Leaf, weights: { mushroom: 2 } },
      { label: 'Sensitive - I want less jitter', icon: Wind, weights: { mushroom: 3 } },
      { label: 'I prefer a slow burn', icon: Coffee, weights: { mushroom: 2 } },
      { label: 'I love the ritual more than the buzz', icon: Book, weights: { mushroom: 2, classic: 1 } },
    ],
  },
  {
    q: 'How would you describe your morning vibe right now?',
    options: [
      { label: "Fire me up - I'm ready to execute", icon: Flame, weights: { classic: 3 } },
      { label: 'Lock me in - I have deep work to do', icon: Brain, weights: { mushroom: 3 } },
      { label: 'Slow it down - I need to reset', icon: Wind, weights: { mushroom: 3 } },
      { label: 'Inspire me - I want flow and ideas', icon: Sparkles, weights: { mushroom: 2 } },
      { label: 'Steady and smooth - no drama', icon: Clock, weights: { classic: 2, mushroom: 1 } },
    ],
  },
];

// Results map to the two current products only.
const RESULTS = {
  classic: {
    title: 'Your Ritual: Classic Coffee Energy',
    product: 'Instant Classic Coffee',
    slug: 'instant-classic-coffee',
    desc: 'A traditional instant coffee with bold flavor and higher caffeine — straightforward energy, ready in seconds with no machine.',
    link: '/products/instant-classic-coffee',
    compareLink: '/shop',
    accent: '#B86543',
  },
  mushroom: {
    title: 'Your Ritual: Focused Mushroom Coffee',
    product: 'Instant Mushroom Coffee',
    slug: 'instant-mushroom-coffee',
    desc: 'Coffee plus functional mushrooms (Lion\u2019s Mane + Chaga) for focus and work sessions — balanced energy without the crash.',
    link: '/products/instant-mushroom-coffee',
    compareLink: '/shop',
    accent: '#2F4A73',
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
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useSEO({
    title: 'Find Your Blend | Torch Republic Coffee Company',
    description: 'Take the Torch Republic quiz to discover whether Instant Classic Coffee or Instant Mushroom Coffee fits your focus, energy, or calm.',
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

  // Fire quiz_completed once when the results screen appears.
  // Unique dedupKey allows retakes to count as new completions.
  useEffect(() => {
    if (resultKey && result) {
      trackEvent('quiz_completed', { blend: result.product }, `quiz_completed::${Date.now()}`);
    }
  }, [resultKey, result]);

  // Auto-send welcome email when a valid email is entered on the results screen.
  // No button required — fires as soon as the email passes basic validation.
  useEffect(() => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValidEmail && !emailSent && result) {
      setEmailSent(true);
      base44.functions
        .invoke('sendQuizWelcomeEmail', { data: { email, result_blend: result.product } })
        .catch(() => {});
    }
  }, [email, emailSent, result]);

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
            {isResult ? 'Your personalized match is ready.' : 'Answer a few questions and we\u2019ll match you to the Torch Republic ritual made for your morning.'}
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
                  This quick quiz helps you choose the Torch Republic ritual that fits your day — a classic instant coffee for bold energy or a mushroom coffee for focus.
                </p>
                <div className="flex flex-col gap-3 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
                  {[
                    { label: '4 questions', sub: 'about your morning and what you need' },
                    { label: 'About 1 minute', sub: 'no email or account required' },
                    { label: 'A clear match', sub: 'one of our two rituals, based on your answers' },
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
                  src={getProductImage(PRODUCT_LOOKUP[result.slug])}
                  alt={getProductAltText(PRODUCT_LOOKUP[result.slug], result.product)}
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
                  Recommended: {result.product}
                </p>

                <div className="mb-6">
                  <label htmlFor="quiz-email" className="block font-mono text-[8px] tracking-[0.2em] uppercase mb-2" style={{ color: THEME.secondary }}>
                    Get your 10% off code
                  </label>
                  <input
                    id="quiz-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full"
                    style={{ minHeight: 44 }}
                  />
                  {emailSent && (
                    <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-2" style={{ color: THEME.moss }}>
                      &#10003; Your results &amp; discount are on the way
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <Link to={result.link} className="btn btn-primary w-full">
                    Start This Ritual
                  </Link>
                  <button onClick={handleReset} className="btn btn-ghost w-full">
                    <RotateCcw size={16} /> Retake Quiz
                  </button>
                  <Link to={result.compareLink} className="font-heading text-sm text-center" style={{ color: THEME.secondary, textDecoration: 'none' }}>
                    <span style={{ color: THEME.clay, textDecoration: 'underline' }}>Compare all rituals &rarr;</span>
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
                        const text = `I just took the Torch Republic ritual quiz and got "${result.product}". Find yours at ${window.location.origin}/quiz`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      className="flex-1 font-mono text-[8px] tracking-[0.15em] uppercase py-2.5 transition-all hover:opacity-80"
                      style={{ background: 'rgba(29,161,242,0.08)', color: '#1DA1F2', border: '1px solid rgba(29,161,242,0.3)', borderRadius: 6, minHeight: 44 }}
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/quiz`;
                        const text = `I got "${result.product}" on the Torch Republic ritual quiz!`;
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
                            title: result.product,
                            text: `I got "${result.product}" on the Torch Republic ritual quiz! Find yours:`,
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