import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const QUESTIONS = [
  {
    q: 'What time of day do you usually drink your ritual?',
    options: [
      { text: 'Early morning', result: 'instant-classic-coffee' },
      { text: 'Mid-morning / Focus time', result: 'instant-mushroom-coffee' },
      { text: 'Afternoon', result: 'instant-mushroom-coffee' },
      { text: 'Evening', result: 'ceremonial-matcha' },
    ],
  },
  {
    q: 'What are you looking to support?',
    options: [
      { text: 'Energy & momentum', result: 'instant-classic-coffee' },
      { text: 'Focus & clarity', result: 'instant-mushroom-coffee' },
      { text: 'Creativity & insight', result: 'ceremonial-matcha' },
      { text: 'Calm & restoration', result: 'ceremonial-matcha' },
    ],
  },
  {
    q: 'What flavor profile do you prefer?',
    options: [
      { text: 'Bold & straightforward', result: 'instant-classic-coffee' },
      { text: 'Smooth & balanced', result: 'instant-mushroom-coffee' },
      { text: 'Bright & vegetal', result: 'ceremonial-matcha' },
      { text: 'Mellow & grounding', result: 'ceremonial-matcha' },
    ],
  },
];

export default function BlendQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (blendSlug) => {
    const newAnswers = [...answers, blendSlug];
    setAnswers(newAnswers);

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 200);
    } else {
      // Determine most common result
      const counts = {};
      newAnswers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
      const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setResult(winner);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setResult(null);
    setAnswers([]);
  };

  const getBlendInfo = (slug) => {
    const blends = {
      'instant-classic-coffee': { name: 'Instant Classic Coffee', tagline: 'Bold · Higher Caffeine', color: '#B86543', slug: 'instant-classic-coffee' },
      'instant-mushroom-coffee': { name: 'Instant Mushroom Coffee', tagline: 'Focus · Functional Mushrooms', color: '#2F4A73', slug: 'instant-mushroom-coffee' },
      'ceremonial-matcha': { name: 'Ceremonial Matcha', tagline: 'Calm · Smoother Energy', color: '#5E7A3E', slug: 'ceremonial-matcha' },
    };
    return blends[slug] || blends['instant-mushroom-coffee'];
  };

  return (
    <section className="py-14 md:py-20 px-4 md:px-6" style={{ background: '#0F0F0F', position: 'relative' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] md:text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}60` }}>
            Find Your Perfect Blend
          </p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Not sure where to start?
          </h2>
          <p className="font-heading mt-3" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300 }}>
            Take our quick quiz to discover your ideal coffee, mushroom coffee, or matcha ritual.
          </p>
        </motion.div>

        {!result ? (
          /* Quiz Questions */
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#141414] border rounded-lg p-6 md:p-8"
            style={{ borderColor: `${RG}20` }}
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all"
                  style={{ background: i <= currentQ ? RG : `${RG}20` }}
                />
              ))}
            </div>

            {/* Question */}
            <h3 className="font-serif font-bold mb-6" style={{ fontSize: '1.3rem', color: '#F5EFE6' }}>
              {QUESTIONS[currentQ].q}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentQ].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.result)}
                  className="w-full text-left p-4 rounded-lg transition-all hover:scale-[1.02]"
                  style={{
                    background: `${RG}08`,
                    border: `1px solid ${RG}20`,
                    color: 'rgba(240,235,225,0.8)',
                    fontSize: '0.95rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${RG}15`;
                    e.currentTarget.style.borderColor = RG;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${RG}08`;
                    e.currentTarget.style.borderColor = `${RG}20`;
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Result */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[#141414] border rounded-lg p-8 text-center"
            style={{ borderColor: `${RG}30` }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: RG }} />
            
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-2" style={{ color: `${RG}60` }}>
              Your Perfect Blend
            </p>
            
            <h3 className="font-serif font-bold mb-2" style={{ fontSize: '2rem', color: '#F5EFE6' }}>
              {getBlendInfo(result).name}
            </h3>
            
            <p className="font-heading mb-6" style={{ fontSize: '0.95rem', color: getBlendInfo(result).color }}>
              {getBlendInfo(result).tagline}
            </p>

            <div className="h-px w-16 mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${RG}, transparent)` }} />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/products/${getBlendInfo(result).slug}`}
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 px-6 py-3"
                style={{ background: RG, color: '#080808', borderRadius: '2px' }}
              >
                View This Blend <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/shop"
                className="inline-flex items-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-80 px-6 py-3"
                style={{ border: `1px solid ${RG}40`, color: `${RG}80`, borderRadius: '2px' }}
              >
                Shop All Blends
              </Link>
            </div>

            <button
              onClick={resetQuiz}
              className="mt-6 font-mono text-[8px] tracking-[0.25em] uppercase transition-colors hover:opacity-80"
              style={{ color: `${RG}40` }}
            >
              Retake Quiz
            </button>
          </motion.div>
        )}

        {/* Trust note */}
        <p className="text-center mt-8 font-mono text-[7px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Instant coffee & ceremonial matcha · No machine needed
        </p>
      </div>
    </section>
  );
}