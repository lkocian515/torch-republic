import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Sun, Moon, Leaf, Zap, Brain, Heart, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';
const DARK_BG = '#0A0A0A';

const QUESTIONS = [
  {
    id: 'wake_up',
    question: 'How do you start your morning?',
    icon: Sun,
    options: [
      { value: 'early', label: 'Before sunrise — I rise with intention', icon: Sun },
      { value: 'gradual', label: 'Natural light — I ease into the day', icon: Coffee },
      { value: 'rush', label: 'Alarm panic — I need instant energy', icon: Zap },
      { value: 'slow', label: 'Multiple alarms — I need gentle awakening', icon: Moon },
    ],
  },
  {
    id: 'energy',
    question: 'What kind of energy do you need?',
    icon: Zap,
    options: [
      { value: 'focused', label: 'Deep work mode — laser focus', icon: Brain },
      { value: 'calm', label: 'Sustained calm — no jitters', icon: Heart },
      { value: 'creative', label: 'Creative flow — open and inspired', icon: Leaf },
      { value: 'physical', label: 'Active morning — movement and strength', icon: Zap },
    ],
  },
  {
    id: 'taste',
    question: 'What is your ideal flavor profile?',
    icon: Coffee,
    options: [
      { value: 'bold', label: 'Bold and rich — dark roast intensity', icon: Coffee },
      { value: 'smooth', label: 'Smooth and balanced — medium roast', icon: Coffee },
      { value: 'earthy', label: 'Earthy and grounding — natural tones', icon: Leaf },
      { value: 'subtle', label: 'Light and delicate — barely there', icon: Leaf },
    ],
  },
  {
    id: 'ritual',
    question: 'What does your perfect ritual look like?',
    icon: Moon,
    options: [
      { value: 'minimal', label: 'Quick and simple — in and out', icon: Zap },
      { value: 'mindful', label: 'Meditative moment — slow and intentional', icon: Heart },
      { value: 'cozy', label: 'Warm and comforting — wrapped in calm', icon: Moon },
      { value: 'energized', label: 'Bright and upbeat — ready to conquer', icon: Sun },
    ],
  },
];

// Product matching logic
const PRODUCT_MATCHES = {
  'suncap-rise': {
    scores: { early: 3, gradual: 2, rush: 3, slow: 1, focused: 2, calm: 1, creative: 1, physical: 3, bold: 2, smooth: 3, earthy: 1, subtle: 1, minimal: 3, mindful: 1, cozy: 1, energized: 3 },
    name: 'SunCap Rise',
    tagline: 'Morning Energy & Fresh Starts',
    description: 'Bright, uplifting blend for those who seize the day.',
  },
  'glowmind-clarity': {
    scores: { early: 2, gradual: 3, rush: 1, slow: 2, focused: 3, calm: 2, creative: 2, physical: 1, bold: 1, smooth: 3, earthy: 2, subtle: 2, minimal: 2, mindful: 3, cozy: 1, energized: 2 },
    name: 'GlowMind Clarity',
    tagline: 'Deep Work & Daily Focus',
    description: 'Lion\'s Mane-powered clarity for sustained mental performance.',
  },
  'mooncap-restore': {
    scores: { early: 1, gradual: 1, rush: 1, slow: 3, focused: 1, calm: 3, creative: 2, physical: 1, bold: 1, smooth: 2, earthy: 3, subtle: 3, minimal: 1, mindful: 3, cozy: 3, energized: 1 },
    name: 'MoonCap Restore',
    tagline: 'Calm Evenings & Restoration',
    description: 'Chaga-infused wind-down ritual for restful restoration.',
  },
  'the-oracle': {
    scores: { early: 2, gradual: 2, rush: 1, slow: 2, focused: 2, calm: 2, creative: 3, physical: 1, bold: 2, smooth: 2, earthy: 2, subtle: 2, minimal: 1, mindful: 3, cozy: 2, energized: 1 },
    name: 'The Oracle',
    tagline: 'Creative Flow & Intuition',
    description: 'Mystic blend for artists, writers, and deep thinkers.',
  },
  'mystic-bloom': {
    scores: { early: 2, gradual: 3, rush: 1, slow: 3, focused: 1, calm: 3, creative: 2, physical: 1, bold: 1, smooth: 3, earthy: 2, subtle: 3, minimal: 2, mindful: 3, cozy: 3, energized: 1 },
    name: 'Mystic Bloom',
    tagline: 'Balance & Gentle Mornings',
    description: 'Harmonious blend for balanced energy and calm presence.',
  },
  'dreamcap-blend': {
    scores: { early: 1, gradual: 2, rush: 1, slow: 3, focused: 1, calm: 3, creative: 3, physical: 1, bold: 1, smooth: 2, earthy: 3, subtle: 2, minimal: 1, mindful: 3, cozy: 3, energized: 1 },
    name: 'DreamCap Blend',
    tagline: 'Evening Ritual & Nighttime Creativity',
    description: 'Caffeine-free evening blend for wind-down creativity.',
  },
  'torchbearer': {
    scores: { early: 3, gradual: 2, rush: 3, slow: 1, focused: 2, calm: 1, creative: 1, physical: 3, bold: 3, smooth: 2, earthy: 1, subtle: 1, minimal: 3, mindful: 1, cozy: 1, energized: 3 },
    name: 'Torchbearer Classic',
    tagline: 'Pure Arabica Energy',
    description: '100% premium Arabica for those who love classic coffee.',
  },
  'the-monk': {
    scores: { early: 2, gradual: 3, rush: 1, slow: 3, focused: 2, calm: 3, creative: 2, physical: 1, bold: 1, smooth: 3, earthy: 2, subtle: 3, minimal: 2, mindful: 3, cozy: 3, energized: 1 },
    name: 'The Monk',
    tagline: 'Ceremonial Calm',
    description: 'Pure ceremonial matcha for meditation and mindful presence.',
  },
  'the-ascendant': {
    scores: { early: 3, gradual: 2, rush: 2, slow: 1, focused: 3, calm: 2, creative: 2, physical: 2, bold: 2, smooth: 3, earthy: 2, subtle: 2, minimal: 2, mindful: 2, cozy: 1, energized: 3 },
    name: 'The Ascendant',
    tagline: 'Growth & Vitality',
    description: 'Vibrant matcha blend for growth and sustained energy.',
  },
  'the-alchemist': {
    scores: { early: 2, gradual: 2, rush: 1, slow: 2, focused: 2, calm: 2, creative: 3, physical: 1, bold: 1, smooth: 2, earthy: 3, subtle: 2, minimal: 1, mindful: 3, cozy: 2, energized: 1 },
    name: 'The Alchemist',
    tagline: 'Creative Transformation',
    description: 'Matcha blend for creative alchemy and mindful creation.',
  },
};

export default function BlendQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [topMatches, setTopMatches] = useState([]);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 250);
    } else {
      calculateResults({ ...answers, [questionId]: value });
    }
  };

  const calculateResults = (finalAnswers) => {
    const scored = Object.entries(PRODUCT_MATCHES).map(([slug, product]) => {
      const score = Object.entries(finalAnswers).reduce((total, [qId, answer]) => {
        return total + (product.scores[answer] || 0);
      }, 0);
      return { slug, ...product, score };
    });

    const sorted = scored.sort((a, b) => b.score - a.score).slice(0, 3);
    setTopMatches(sorted);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTopMatches([]);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const q = QUESTIONS[currentQuestion];
  const Icon = q?.icon;

  return (
    <div
      className="min-h-screen"
      style={{
        background: DARK_BG,
        padding: 'clamp(40px, 6vw, 80px) 24px',
      }}
    >
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Flavor Discovery
            </p>
            <h1
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                color: '#F5EFE6',
                lineHeight: 1.1,
              }}
            >
              Find Your Perfect Blend
            </h1>
            <p
              className="font-heading mt-3"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(210,195,175,0.6)',
                fontWeight: 300,
              }}
            >
              Answer 4 questions about your morning routine and we'll match you with your ideal coffee or matcha.
            </p>
          </motion.div>
        )}

        {/* Progress Bar */}
        {!showResults && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ height: '2px', background: 'rgba(230,183,173,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{
                  height: '100%',
                  background: RG,
                  borderRadius: '2px',
                }}
              />
            </div>
            <p className="font-mono text-[7px] tracking-[0.25em] uppercase mt-2 text-center" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResults ? (
            // Questions
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(230,183,173,0.1)',
                  borderRadius: '3px',
                  padding: 'clamp(28px, 5vw, 40px)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(230,183,173,0.1)',
                      border: `1px solid ${RG}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} style={{ color: RG }} />
                  </div>
                  <h2
                    className="font-serif font-bold"
                    style={{
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                      color: '#F5EFE6',
                    }}
                  >
                    {q.question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt, i) => {
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(q.id, opt.value)}
                        className="w-full text-left p-4 transition-all hover:scale-[1.01]"
                        style={{
                          background: 'rgba(255,255,255,0.015)',
                          border: '1px solid rgba(230,183,173,0.08)',
                          borderRadius: '2px',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = RG;
                          e.currentTarget.style.background = 'rgba(230,183,173,0.06)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: 'rgba(230,183,173,0.08)',
                              border: `1px solid ${RG}25`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <OptIcon size={14} style={{ color: RG }} />
                          </div>
                          <span
                            className="font-heading text-sm"
                            style={{
                              color: 'rgba(210,195,175,0.85)',
                              fontWeight: 400,
                            }}
                          >
                            {opt.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            // Results
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: `rgba(230,183,173,0.15)`,
                    border: `2px solid ${RG}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <Check size={28} style={{ color: RG }} />
                </motion.div>
                <h2
                  className="font-serif font-bold mb-3"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                    color: '#F5EFE6',
                  }}
                >
                  Your Perfect Blends
                </h2>
                <p
                  className="font-heading"
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(210,195,175,0.6)',
                    maxWidth: '500px',
                    margin: '0 auto',
                  }}
                >
                  Based on your morning routine, here are your top 3 matches.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {topMatches.map((match, i) => (
                  <motion.div
                    key={match.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                  >
                    <Link
                      to={`/products/${match.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="p-5 transition-all hover:scale-[1.01]"
                        style={{
                          background: i === 0 ? 'rgba(230,183,173,0.06)' : 'rgba(255,255,255,0.015)',
                          border: i === 0 ? `2px solid ${RG}` : '1px solid rgba(230,183,173,0.08)',
                          borderRadius: '3px',
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {i === 0 && (
                                <span
                                  className="font-mono text-[7px] tracking-[0.25em] uppercase px-2 py-0.5"
                                  style={{
                                    background: RG,
                                    color: '#080808',
                                    fontWeight: 700,
                                  }}
                                >
                                  Best Match
                                </span>
                              )}
                              <span
                                className="font-mono text-[7px] tracking-[0.2em] uppercase"
                                style={{ color: 'rgba(230,183,173,0.5)' }}
                              >
                                {i === 0 ? 'Top Recommendation' : i === 1 ? 'Also Great' : 'Worth Exploring'}
                              </span>
                            </div>
                            <h3
                              className="font-serif font-bold mb-1"
                              style={{
                                fontSize: '1.3rem',
                                color: '#F5EFE6',
                              }}
                            >
                              {match.name}
                            </h3>
                            <p
                              className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2"
                              style={{ color: RG }}
                            >
                              {match.tagline}
                            </p>
                            <p
                              className="font-heading text-xs"
                              style={{
                                color: 'rgba(210,195,175,0.55)',
                                fontWeight: 300,
                                lineHeight: 1.6,
                              }}
                            >
                              {match.description}
                            </p>
                          </div>
                          <ArrowRight
                            size={20}
                            style={{
                              color: RG,
                              flexShrink: 0,
                              marginTop: '4px',
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/shop"
                  className="font-mono uppercase tracking-[0.28em] text-center transition-all hover:opacity-90"
                  style={{
                    background: RG,
                    color: '#050505',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '14px 36px',
                    borderRadius: '2px',
                    flex: '1',
                    maxWidth: '280px',
                  }}
                >
                  Shop All Blends
                </Link>
                <button
                  onClick={resetQuiz}
                  className="font-mono uppercase tracking-[0.28em] text-center transition-all hover:opacity-80"
                  style={{
                    background: 'transparent',
                    color: RG,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '14px 36px',
                    borderRadius: '2px',
                    border: `1px solid ${RG}`,
                    flex: '1',
                    maxWidth: '280px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <RefreshCw size={14} />
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}