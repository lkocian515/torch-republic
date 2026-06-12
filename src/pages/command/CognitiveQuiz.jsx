import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const GOLD = '#D4AF37';
const BG = '#0A0A0A';

const QUESTIONS = [
  {
    id: 'q1',
    question: 'What is the biggest friction point in your current daily routine?',
    options: [
      { label: 'The 2 PM brain fog and energy crash.', weight: 'Focus' },
      { label: 'Racing thoughts when I need to be winding down.', weight: 'Recovery' },
      { label: 'Task-switching and struggling to lock into deep work.', weight: 'Focus' },
      { label: 'Waking up feeling unrecovered and groggy.', weight: 'Recovery' },
    ],
  },
  {
    id: 'q2',
    question: 'How do you currently manage your high-output work sessions?',
    options: [
      { label: 'Unstructured chaos. I just grind until I\'m burnt out.', weight: 'Recovery' },
      { label: 'I try to block time, but distractions usually win.', weight: 'Focus' },
      { label: 'Back-to-back meetings. My actual work happens at night.', weight: 'Recovery' },
      { label: 'I use timers and strict protocols to stay locked in.', weight: 'Focus' },
    ],
  },
  {
    id: 'q3',
    question: 'If you could instantly upgrade one aspect of your mental performance, what would it be?',
    options: [
      { label: 'Sustained, tunnel-vision focus without the caffeine jitters.', weight: 'Focus' },
      { label: 'The ability to completely detach from work and relax.', weight: 'Recovery' },
      { label: 'Rapid task-initiation (beating procrastination).', weight: 'Focus' },
      { label: 'Achieving deep, restorative sleep every single night.', weight: 'Recovery' },
    ],
  },
  {
    id: 'q4',
    question: 'What time of day do you feel your cognitive baseline is at its weakest?',
    options: [
      { label: 'Mid-morning. I need coffee just to get back to zero.', weight: 'Focus' },
      { label: 'Late evening. I\'m exhausted but wired.', weight: 'Recovery' },
      { label: 'Early afternoon. My processing speed drops off a cliff.', weight: 'Focus' },
      { label: 'First thing in the morning. I hit snooze repeatedly.', weight: 'Recovery' },
    ],
  },
];

const RESULTS = {
  GlowMind: {
    blend: 'GlowMind',
    profile: 'The Deep Work Architect',
    protocol: 'The 90-Minute Sprint Protocol',
    description: 'Your cognitive bottlenecks happen during execution and sustained attention. You need steady-state energy without the crash.',
    productDescription: "Lion's Mane and Chaga infused coffee to lock you into flow state.",
    ctaLabel: 'Optimize Your Focus — Shop GlowMind',
    buyUrl: 'https://torchrepublic.com/products/glowmind-clarity-blend',
    image: 'https://cdn.shopify.com/s/files/1/0752/6435/7395/files/glowmind-clarity-blend.png',
  },
  MoonCap: {
    blend: 'MoonCap',
    profile: 'The Restorative Operator',
    protocol: 'The Digital Sunset Protocol',
    description: "Your cognitive bottleneck isn't a lack of effort; it's a lack of true recovery. You are stuck in a sympathetic nervous system loop.",
    productDescription: 'A calming, restorative mushroom blend designed to down-regulate your nervous system.',
    ctaLabel: 'Optimize Your Recovery — Shop MoonCap',
    buyUrl: 'https://torchrepublic.com/products/mooncap-restore',
    image: 'https://cdn.shopify.com/s/files/1/0752/6435/7395/files/mooncap-restore.png',
  },
};

function computeResult(weights) {
  return weights.Focus > weights.Recovery ? 'GlowMind' : 'MoonCap';
}

export default function CognitiveQuiz() {
  const [step, setStep] = useState(0); // 0=intro, 1-4=questions, 5=email, 6=results
  const [weights, setWeights] = useState({ Focus: 0, Recovery: 0 });
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resultKey, setResultKey] = useState(null);

  const currentQ = QUESTIONS[step - 1];

  const handleAnswer = (weight) => {
    const newWeights = { ...weights, [weight]: weights[weight] + 1 };
    setWeights(newWeights);
    if (step < 4) {
      setTimeout(() => setStep(s => s + 1), 250);
    } else {
      setTimeout(() => setStep(5), 250);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const key = computeResult(weights);
    setResultKey(key);
    const result = RESULTS[key];
    try {
      await base44.entities.CognitiveQuizLead.create({
        email,
        answers: weights,
        result_blend: result.blend,
        result_profile: result.profile,
      });
    } catch (_) {}
    setStep(6);
    setSubmitting(false);
  };

  const handleRetake = () => {
    setStep(0);
    setWeights({ Focus: 0, Recovery: 0 });
    setEmail('');
    setResultKey(null);
  };

  const result = resultKey ? RESULTS[resultKey] : null;

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#F0EBE1' }} className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Torch Command</span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,175,55,0.5)' }}>Cognitive Profile Quiz</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">

            {/* INTRO */}
            {step === 0 && (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-full"
                  style={{ border: `2px solid ${GOLD}`, background: `${GOLD}10` }}>
                  <span style={{ fontSize: '1.8rem' }}>🔥</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: GOLD }}>4-Question Assessment</p>
                <h1 className="font-serif font-bold mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#FFFFFF' }}>
                  Discover Your<br />Cognitive Profile
                </h1>
                <p className="mb-10 leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.95rem' }}>
                  Answer 4 questions about your energy patterns, focus blockers, and recovery habits. We'll diagnose your cognitive bottleneck and match you to your optimal Torch Republic protocol.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="w-full font-mono text-[11px] tracking-[0.4em] uppercase font-bold py-4 transition-all hover:opacity-90"
                  style={{ background: GOLD, color: '#0A0A0A' }}
                >
                  Begin Assessment →
                </button>
              </motion.div>
            )}

            {/* QUESTIONS */}
            {step >= 1 && step <= 4 && (
              <motion.div key={`q${step}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-10">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex-1 h-0.5 rounded-full transition-all"
                      style={{ background: i <= step ? GOLD : 'rgba(212,175,55,0.2)' }} />
                  ))}
                  <span className="font-mono text-[9px] ml-2" style={{ color: `${GOLD}80`, whiteSpace: 'nowrap' }}>
                    Step {step} of 4
                  </span>
                </div>

                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${GOLD}70` }}>
                  Question {step}
                </p>
                <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#FFFFFF', lineHeight: 1.35 }}>
                  {currentQ.question}
                </h2>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.weight)}
                      className="text-left px-5 py-4 transition-all"
                      style={{
                        background: 'rgba(212,175,55,0.04)',
                        border: `1px solid rgba(212,175,55,0.2)`,
                        color: 'rgba(240,235,225,0.8)',
                        fontSize: '0.9rem',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = `${GOLD}10`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
                    >
                      <span className="font-mono text-[9px] tracking-[0.25em] uppercase mr-3" style={{ color: `${GOLD}60` }}>
                        {String.fromCharCode(65 + i)})
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* EMAIL CAPTURE */}
            {step === 5 && (
              <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center rounded-full"
                  style={{ border: `2px solid ${GOLD}`, background: `${GOLD}10` }}>
                  <span style={{ fontSize: '1.5rem' }}>⚡</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: GOLD }}>Analysis Complete</p>
                <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#FFFFFF' }}>
                  Analyzing Your Profile
                </h2>
                <p className="mb-8" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  Enter your email to unlock your custom optimization protocol.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-transparent focus:outline-none font-mono"
                    style={{ border: `1px solid rgba(212,175,55,0.4)`, color: '#F0EBE1', fontSize: '0.9rem' }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full font-mono text-[11px] tracking-[0.4em] uppercase font-bold py-4 transition-all hover:opacity-90"
                    style={{ background: submitting ? `${GOLD}60` : GOLD, color: '#0A0A0A', cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? 'Analyzing...' : 'Unlock My Protocol →'}
                  </button>
                </form>
                <p className="mt-4 font-mono text-[8px] tracking-[0.2em]" style={{ color: 'rgba(212,175,55,0.4)' }}>
                  No spam. Unsubscribe anytime.
                </p>
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 6 && result && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3 text-center" style={{ color: GOLD }}>
                  Your Cognitive Profile
                </p>
                <h2 className="font-serif font-bold mb-2 text-center" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#FFFFFF' }}>
                  {result.profile}
                </h2>

                {/* Protocol banner */}
                <div className="my-6 px-5 py-4 text-center" style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}25` }}>
                  <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: `${GOLD}80` }}>
                    Your Protocol
                  </p>
                  <p className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>{result.protocol}</p>
                  <p style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.875rem', lineHeight: 1.75 }}>{result.description}</p>
                </div>

                {/* Product card */}
                <div className="p-6 mb-6" style={{ background: '#111', border: `1px solid ${GOLD}35` }}>
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: `${GOLD}80` }}>
                    Your Recommended Blend
                  </p>
                  <div className="flex items-center gap-5 mb-5">
                    <img
                      src={result.image}
                      alt={result.blend}
                      className="w-24 h-24 object-contain flex-shrink-0"
                      style={{ background: '#0A0A0A', padding: '8px' }}
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div>
                      <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.3rem' }}>{result.blend}</p>
                      <p style={{ color: 'rgba(240,235,225,0.6)', fontSize: '0.875rem', lineHeight: 1.7 }}>{result.productDescription}</p>
                    </div>
                  </div>
                  <a
                    href={result.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-mono text-[10px] tracking-[0.4em] uppercase font-bold py-4 transition-all hover:opacity-90"
                    style={{ background: GOLD, color: '#0A0A0A', textDecoration: 'none' }}
                  >
                    {result.ctaLabel} →
                  </a>
                </div>

                <button
                  onClick={handleRetake}
                  className="w-full font-mono text-[9px] tracking-[0.3em] uppercase py-3 transition-all hover:opacity-70"
                  style={{ border: `1px solid rgba(212,175,55,0.2)`, color: 'rgba(212,175,55,0.6)' }}
                >
                  Retake Quiz
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}