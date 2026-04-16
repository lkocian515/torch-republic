import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, RotateCcw, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    id: 'roast',
    question: 'How do you like your roast?',
    sub: 'This sets the base character of your cup.',
    options: [
      { label: 'Light & Bright', value: 'light', icon: '☀️', desc: 'Fruity, floral, vibrant' },
      { label: 'Smooth & Balanced', value: 'medium', icon: '⚖️', desc: 'Versatile, round, clean' },
      { label: 'Bold & Rich', value: 'dark', icon: '🔥', desc: 'Deep, intense, full-body' },
      { label: 'Extra Dark', value: 'extra-dark', icon: '⚫', desc: 'Smoky, powerful, commanding' },
    ],
  },
  {
    id: 'caffeine',
    question: 'What\'s your caffeine mission?',
    sub: 'Choose the intensity that matches your day.',
    options: [
      { label: 'Easy Start', value: 'low', icon: '🌅', desc: 'Gentle wake-up, smooth energy' },
      { label: 'Steady Focus', value: 'medium', icon: '🎯', desc: 'Consistent, reliable lift' },
      { label: 'Full Power', value: 'high', icon: '⚡', desc: 'Maximum fuel, no compromise' },
      { label: 'All Day', value: 'allday', icon: '🕯️', desc: 'Sippable throughout the day' },
    ],
  },
  {
    id: 'flavor',
    question: 'Which flavor profile calls to you?',
    sub: 'Your palate defines your blend.',
    options: [
      { label: 'Chocolate & Caramel', value: 'chocolate', icon: '🍫', desc: 'Rich, indulgent, sweet' },
      { label: 'Citrus & Honey', value: 'citrus', icon: '🍋', desc: 'Bright, clean, lively' },
      { label: 'Nutty & Toasty', value: 'nutty', icon: '🌰', desc: 'Warm, earthy, grounded' },
      { label: 'Smoky & Bold', value: 'smoky', icon: '🌫️', desc: 'Intense, complex, commanding' },
    ],
  },
];

// Recommendation engine — maps quiz answers to a specific blend
const BLENDS = [
  {
    name: 'Washington Blend',
    tagline: 'The Commander\'s Choice',
    roast: 'Medium-Dark',
    notes: 'Dark Chocolate · Almond · Bold',
    route: '/WashingtonBlend',
    handle: 'washington-blend',
    color: '#8B6914',
    match: (r, c, f) => r === 'dark' && f === 'chocolate',
  },
  {
    name: 'Jefferson Blend',
    tagline: 'The Visionary\'s Cup',
    roast: 'Medium',
    notes: 'Citrus · Honey · Clean Finish',
    route: '/JeffersonBlend',
    handle: 'jefferson-blend',
    color: '#7A8B45',
    match: (r, c, f) => r === 'medium' && f === 'citrus',
  },
  {
    name: 'Adams Blend',
    tagline: 'Principled. Persistent. Pure.',
    roast: 'Medium-Light',
    notes: 'Citrus · Floral · Light Body',
    route: '/AdamsBlend',
    handle: 'adams-blend',
    color: '#5A7A6B',
    match: (r, c, f) => r === 'light' && f === 'citrus',
  },
  {
    name: 'Franklin Blend',
    tagline: 'Wit. Wisdom. Warmth.',
    roast: 'Medium',
    notes: 'Honey · Praline · Smooth',
    route: '/FranklinBlend',
    handle: 'franklin-blend',
    color: '#8B7A30',
    match: (r, c, f) => f === 'nutty' || (r === 'medium' && c === 'allday'),
  },
  {
    name: 'Lincoln Blend',
    tagline: 'Steadfast. Resolute. Bold.',
    roast: 'Medium-Dark',
    notes: 'Bittersweet Chocolate · Caramel · Smooth',
    route: '/LincolnBlend',
    handle: 'lincoln-blend',
    color: '#6B4A2A',
    match: (r, c, f) => r === 'dark' && c === 'high',
  },
  {
    name: 'Roosevelt Blend',
    tagline: 'Speak Softly. Drink Boldly.',
    roast: 'Dark',
    notes: 'Smoke · Dark Chocolate · Full Body',
    route: '/RooseveltBlend',
    handle: 'roosevelt-blend',
    color: '#8B4E2A',
    match: (r, c, f) => r === 'extra-dark' || (r === 'dark' && f === 'smoky'),
  },
  {
    name: 'Liberty Torch Blend',
    tagline: 'Freedom in Every Cup',
    roast: 'Medium',
    notes: 'Caramel · Vanilla · Sweet Cream',
    route: '/LibertyTorchBlend',
    handle: 'liberty-torch-blend',
    color: '#C9A24A',
    match: (r, c, f) => r === 'medium' && f === 'chocolate' && c !== 'high',
  },
  {
    name: 'Old Glory House Blend',
    tagline: 'Classic American, Every Morning',
    roast: 'Medium',
    notes: 'Warm Spice · Honey · Citrus',
    route: '/OldGloryHouseBlend',
    handle: 'old-glory-house-blend',
    color: '#8B6020',
    match: (r, c, f) => c === 'low' || c === 'allday',
  },
  {
    name: 'Uncle Sam\'s Bold Brew',
    tagline: 'We Want YOU Awake',
    roast: 'Extra Dark',
    notes: 'Deep Roast · Bittersweet Chocolate · Roasted Peanuts',
    route: '/UncleSamsBoldBrew',
    handle: 'uncle-sams-bold-brew',
    color: '#8B3A2A',
    match: (r, c, f) => c === 'high' && (r === 'dark' || r === 'extra-dark'),
  },
  {
    name: 'Eagles Flight Blend',
    tagline: 'Rise Above. Every Cup.',
    roast: 'Medium-Light',
    notes: 'Sundried Citrus · Floral · Clean',
    route: '/EaglesFlightBlend',
    handle: 'eagles-flight-blend',
    color: '#6B8B9A',
    match: (r, c, f) => r === 'light',
  },
];

function getRecommendation(answers) {
  const { roast, caffeine, flavor } = answers;
  // Find first exact match
  const match = BLENDS.find(b => b.match(roast, caffeine, flavor));
  return match || BLENDS[6]; // fallback to Liberty Torch
}

function ProgressBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-0.5 transition-all duration-500"
          style={{ background: i < step ? '#C9A24A' : 'rgba(201,162,74,0.15)' }}
        />
      ))}
    </div>
  );
}

function QuizOption({ option, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(option.value)}
      className="w-full flex items-center gap-4 p-5 text-left transition-all duration-200"
      style={{
        background: selected ? 'rgba(201,162,74,0.08)' : '#0D0D0D',
        border: selected ? '1px solid rgba(201,162,74,0.55)' : '1px solid rgba(255,255,255,0.07)',
        outline: 'none',
      }}
    >
      <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{option.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-serif font-bold text-sm" style={{ color: selected ? '#C9A24A' : '#F0EBE1' }}>
          {option.label}
        </p>
        <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(240,235,225,0.38)' }}>
          {option.desc}
        </p>
      </div>
      {selected && (
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A24A' }} />
      )}
    </button>
  );
}

function ResultCard({ blend, answers, onReset }) {
  const shopifyUrl = `https://torch-republic.com/products/${blend.handle}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-4" style={{ color: '#C9A24A' }}>
        Your Torch Profile
      </p>

      <div className="mb-8 p-8 relative overflow-hidden"
        style={{ background: '#0D0D0D', border: '1px solid rgba(201,162,74,0.2)' }}>

        {/* Glow accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${blend.color}18 0%, transparent 70%)` }} />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl"
            style={{ background: `${blend.color}20`, border: `1px solid ${blend.color}40` }}>
            ☕
          </div>

          <h3 className="font-serif font-bold mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {blend.name}
          </h3>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: blend.color }}>
            {blend.tagline}
          </p>

          <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
            <span className="px-3 py-1 font-mono text-[9px] tracking-widest uppercase"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,235,225,0.45)' }}>
              {blend.roast} Roast
            </span>
          </div>

          <p className="font-heading text-sm mb-6" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.8 }}>
            {blend.notes}
          </p>

          {/* Answer summary */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
            {Object.entries(answers).map(([key, val]) => (
              <span key={key} className="px-2.5 py-1 font-mono text-[9px] tracking-wide"
                style={{ background: 'rgba(201,162,74,0.07)', border: '1px solid rgba(201,162,74,0.15)', color: 'rgba(201,162,74,0.6)' }}>
                {val}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={shopifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase py-4 px-8 transition-all hover:opacity-85 btn-glow"
              style={{ background: '#D4AE57', color: '#080808', fontWeight: 800 }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </a>
            <Link
              to={blend.route}
              className="inline-flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase py-4 px-6 transition-all hover:opacity-70"
              style={{ border: '1px solid rgba(201,162,74,0.3)', color: 'rgba(201,162,74,0.7)' }}
            >
              Learn More <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55"
        style={{ color: 'rgba(255,255,255,0.25)' }}
      >
        <RotateCcw className="w-3 h-3" /> Retake Quiz
      </button>
    </motion.div>
  );
}

export default function CoffeeQuiz() {
  const [step, setStep] = useState(0); // 0 = intro
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const currentStep = STEPS[step - 1];

  const handleSelect = (value) => {
    const key = currentStep.id;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < STEPS.length) {
      setTimeout(() => setStep(s => s + 1), 220);
    } else {
      setTimeout(() => setResult(getRecommendation(newAnswers)), 220);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(196,163,90,0.1)' }}>
      <div className="max-w-[580px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#C9A24A' }}>
            Torch Profile
          </p>
          <h2 className="font-serif leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Find Your Blend.
          </h2>
          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.8 }}>
            3 questions. Your perfect Torch Republic coffee.
          </p>
        </motion.div>

        {/* Intro */}
        <AnimatePresence mode="wait">
          {step === 0 && !result && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <div className="mb-8 p-10"
                style={{ background: '#0D0D0D', border: '1px solid rgba(201,162,74,0.14)' }}>
                <div className="text-5xl mb-5">🔥</div>
                <p className="font-heading text-sm mb-8" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.9 }}>
                  Answer 3 quick questions and we'll match you to the exact Torch Republic blend built for your palate and purpose.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.35em] uppercase py-4 px-10 transition-all hover:opacity-85 btn-glow"
                  style={{ background: '#D4AE57', color: '#080808', fontWeight: 800 }}
                >
                  Start the Quiz →
                </button>
              </div>
            </motion.div>
          )}

          {/* Active question */}
          {step > 0 && !result && currentStep && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <ProgressBar step={step} total={STEPS.length} />

              <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>
                Question {step} of {STEPS.length}
              </p>
              <h3 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {currentStep.question}
              </h3>
              <p className="font-heading text-sm mb-7" style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.7 }}>
                {currentStep.sub}
              </p>

              <div className="flex flex-col gap-2">
                {currentStep.options.map(opt => (
                  <QuizOption
                    key={opt.value}
                    option={opt}
                    selected={answers[currentStep.id] === opt.value}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ResultCard blend={result} answers={answers} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}