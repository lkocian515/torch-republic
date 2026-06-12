import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const GOLD = '#D4AF37';
const BG = '#0A0A0A';

const QUESTIONS = [
  {
    id: 'energy',
    question: 'When does your energy crash hardest?',
    options: [
      { label: 'Mid-morning (10–11am)', value: 'morning' },
      { label: 'Post-lunch (1–3pm)', value: 'afternoon' },
      { label: 'Late evening (8–10pm)', value: 'evening' },
      { label: 'Constantly throughout the day', value: 'all_day' },
    ],
  },
  {
    id: 'focus',
    question: 'What kills your focus the most?',
    options: [
      { label: 'Phone notifications & social media', value: 'digital' },
      { label: 'Mental fog & brain fatigue', value: 'fog' },
      { label: 'Anxiety & racing thoughts', value: 'anxiety' },
      { label: 'Physical restlessness', value: 'physical' },
    ],
  },
  {
    id: 'sleep',
    question: 'How would you describe your sleep?',
    options: [
      { label: 'Trouble falling asleep', value: 'onset' },
      { label: 'Wake up in the middle of the night', value: 'maintenance' },
      { label: 'Wake up groggy, never rested', value: 'quality' },
      { label: 'Sleep is actually fine', value: 'fine' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your #1 performance goal right now?',
    options: [
      { label: 'Deep work & creative output', value: 'deep_work' },
      { label: 'Stress reduction & calm clarity', value: 'calm' },
      { label: 'More consistent daily energy', value: 'energy' },
      { label: 'Better recovery & sleep quality', value: 'recovery' },
    ],
  },
];

function computeResult(answers) {
  const sleepIssue = answers.sleep !== 'fine';
  const focusGoal = answers.goal === 'deep_work' || answers.goal === 'calm';
  const recoveryGoal = answers.goal === 'recovery';

  if (recoveryGoal || sleepIssue) {
    return {
      blend: 'MoonCap',
      profile: 'The Restorative Architect',
      routine: [
        'Wind down all screens 60 minutes before bed.',
        'Brew a warm MoonCap ritual at 8 PM — let the Lion\'s Mane calm your mind.',
        'Journal 3 things you accomplished today.',
        'Set tomorrow\'s top 3 priorities before closing your laptop.',
        'Meditate or use a breathing protocol (4-7-8 method) for 5 minutes.',
        'Sleep in a fully dark, cool room (65–68°F).',
      ],
      description: 'Your cognitive signature is a deep thinker who needs quality restoration. Your edge is unlocked through evening rituals that signal safety to your nervous system.',
      buyUrl: 'https://torchrepublic.com/products/mooncap',
    };
  }

  return {
    blend: 'GlowMind',
    profile: 'The Flow State Engineer',
    routine: [
      'Start your morning with a GlowMind ritual — brew within 30 minutes of waking.',
      'Block your first 90 minutes for deep, undistracted work (no phone, no email).',
      'Use a physical notebook for your session\'s single most important goal.',
      'At the 90-minute mark, take a 15-minute walk outside.',
      'Eat a protein-forward, low-carb lunch to avoid the afternoon crash.',
      'Reserve low-cognitive tasks (email, admin) for after 3 PM.',
    ],
    description: 'Your cognitive signature is a high-performance operator who needs flow-state activation. Your edge is maximizing your peak morning focus window with ruthless clarity.',
    buyUrl: 'https://torchrepublic.com/products/glowmind',
  };
}

export default function CognitiveQuiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = email, 6 = results
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const currentQ = QUESTIONS[step - 1];

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (step < 4) {
      setTimeout(() => setStep(s => s + 1), 300);
    } else {
      setTimeout(() => setStep(5), 300);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const computed = computeResult(answers);
    setResult(computed);
    try {
      await base44.entities.CognitiveQuizLead.create({
        email,
        answers,
        result_blend: computed.blend,
        result_profile: computed.profile,
      });
    } catch (err) {
      // Silent — still show results
    }
    setStep(6);
    setSubmitting(false);
  };

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
                <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-full" style={{ border: `2px solid ${GOLD}`, background: `${GOLD}10` }}>
                  <span style={{ fontSize: '1.8rem' }}>🔥</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: GOLD }}>4-Question Assessment</p>
                <h1 className="font-serif font-bold mb-5 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#FFFFFF' }}>
                  Discover Your<br />Cognitive Profile
                </h1>
                <p className="mb-10 leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.95rem' }}>
                  Answer 4 questions about your energy patterns, focus blockers, and sleep quality. We'll build you a custom daily optimization protocol and match you to your ideal Torch Republic blend.
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
                {/* Progress */}
                <div className="flex items-center gap-2 mb-10">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex-1 h-0.5 rounded-full transition-all" style={{ background: i <= step ? GOLD : 'rgba(212,175,55,0.2)' }} />
                  ))}
                  <span className="font-mono text-[9px] ml-2" style={{ color: `${GOLD}80`, whiteSpace: 'nowrap' }}>{step}/4</span>
                </div>

                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: `${GOLD}70` }}>Question {step}</p>
                <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#FFFFFF', lineHeight: 1.3 }}>
                  {currentQ.question}
                </h2>

                <div className="flex flex-col gap-3">
                  {currentQ.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(currentQ.id, opt.value)}
                      className="text-left px-5 py-4 transition-all hover:border-opacity-100 group"
                      style={{
                        background: 'rgba(212,175,55,0.04)',
                        border: `1px solid rgba(212,175,55,0.2)`,
                        color: 'rgba(240,235,225,0.8)',
                        fontSize: '0.9rem',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = `${GOLD}10`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'; e.currentTarget.style.background = 'rgba(212,175,55,0.04)'; }}
                    >
                      <span className="font-mono text-[9px] tracking-[0.25em] uppercase mr-3" style={{ color: `${GOLD}60` }}>→</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* EMAIL CAPTURE */}
            {step === 5 && (
              <motion.div key="email" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
                <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center rounded-full" style={{ border: `2px solid ${GOLD}`, background: `${GOLD}10` }}>
                  <span style={{ fontSize: '1.5rem' }}>⚡</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: GOLD }}>Analysis Complete</p>
                <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#FFFFFF' }}>
                  Your Protocol is Ready
                </h2>
                <p className="mb-8" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.9rem' }}>
                  Enter your email to unlock your custom cognitive optimization protocol and blend recommendation.
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
                <p className="mt-4 font-mono text-[8px] tracking-[0.2em]" style={{ color: 'rgba(212,175,55,0.4)' }}>No spam. Unsubscribe anytime.</p>
              </motion.div>
            )}

            {/* RESULTS */}
            {step === 6 && result && (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3 text-center" style={{ color: GOLD }}>Your Profile</p>
                <h2 className="font-serif font-bold mb-2 text-center" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#FFFFFF' }}>
                  {result.profile}
                </h2>
                <p className="text-center mb-8" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.9rem' }}>{result.description}</p>

                {/* Blend Card */}
                <div className="p-6 mb-6" style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}40` }}>
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: `${GOLD}80` }}>Your Recommended Blend</p>
                  <p className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.5rem' }}>{result.blend}</p>
                  <a
                    href={result.buyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-mono text-[10px] tracking-[0.4em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90"
                    style={{ background: GOLD, color: '#0A0A0A' }}
                  >
                    Buy {result.blend} →
                  </a>
                </div>

                {/* Protocol */}
                <div className="p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: `${GOLD}80` }}>Your Daily Protocol</p>
                  <ol className="flex flex-col gap-3">
                    {result.routine.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-[9px] pt-0.5 flex-shrink-0" style={{ color: GOLD }}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ color: 'rgba(240,235,225,0.7)', fontSize: '0.875rem', lineHeight: 1.7 }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <button
                  onClick={() => { setStep(0); setAnswers({}); setEmail(''); setResult(null); }}
                  className="w-full mt-4 font-mono text-[9px] tracking-[0.3em] uppercase py-3 transition-all hover:opacity-70"
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