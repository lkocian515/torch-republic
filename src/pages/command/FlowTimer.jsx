import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';

const GOLD = '#D4AF37';
const BG = '#0A0A0A';
const TOTAL = 90 * 60; // 90 minutes in seconds

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function FlowTimer() {
  useSEO({ title: 'Flow State Timer', description: '90-minute deep work timer for focused sessions.', url: '/command/timer', noindex: true });
  const [secondsLeft, setSecondsLeft] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setSecondsLeft(TOTAL);
    setCompleted(false);
  };

  const progress = (TOTAL - secondsLeft) / TOTAL;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#F0EBE1' }} className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Torch Command</span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(212,175,55,0.5)' }}>Flow State Timer</span>
      </div>

      {/* Timer */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
          <p className="font-mono text-[10px] tracking-[0.6em] uppercase mb-8" style={{ color: `${GOLD}60` }}>
            90-Minute Deep Work Session
          </p>

          {/* SVG Ring */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <svg width="280" height="280" style={{ transform: 'rotate(-90deg)' }}>
              {/* Track */}
              <circle
                cx="140" cy="140" r={radius}
                fill="none"
                stroke="rgba(212,175,55,0.1)"
                strokeWidth="4"
              />
              {/* Progress */}
              <circle
                cx="140" cy="140" r={radius}
                fill="none"
                stroke={completed ? '#7CBF8E' : GOLD}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono font-bold" style={{ fontSize: '3.5rem', color: completed ? '#7CBF8E' : '#FFFFFF', letterSpacing: '-0.02em' }}>
                {completed ? 'DONE' : formatTime(secondsLeft)}
              </span>
              {!completed && (
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: `${GOLD}50` }}>
                  {running ? 'In Flow' : secondsLeft === TOTAL ? 'Ready' : 'Paused'}
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {!completed ? (
              <>
                <button
                  onClick={() => setRunning(r => !r)}
                  className="font-mono text-[11px] tracking-[0.4em] uppercase font-bold px-10 py-4 transition-all hover:opacity-90"
                  style={{ background: running ? 'rgba(212,175,55,0.15)' : GOLD, color: running ? GOLD : '#0A0A0A', border: running ? `1px solid ${GOLD}` : 'none', minWidth: '160px' }}
                >
                  {running ? '⏸ Pause' : secondsLeft === TOTAL ? '▶ Start' : '▶ Resume'}
                </button>
                <button
                  onClick={handleReset}
                  className="font-mono text-[10px] tracking-[0.35em] uppercase px-6 py-4 transition-all hover:opacity-70"
                  style={{ border: `1px solid rgba(212,175,55,0.2)`, color: 'rgba(212,175,55,0.5)' }}
                >
                  Reset
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="font-serif font-bold text-white mb-4" style={{ fontSize: '1.5rem' }}>Session Complete 🔥</p>
                <p className="mb-6" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.9rem' }}>
                  You just completed a 90-minute deep work sprint. Recover intentionally.
                </p>
                <button
                  onClick={handleReset}
                  className="font-mono text-[10px] tracking-[0.35em] uppercase px-8 py-3 transition-all hover:opacity-90"
                  style={{ background: GOLD, color: '#0A0A0A' }}
                >
                  Start New Session
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* GlowMind Banner */}
        {!completed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md p-5 text-center"
            style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}25` }}
          >
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-2" style={{ color: `${GOLD}60` }}>Fuel Your Session</p>
            <p className="font-serif font-bold text-white mb-1">GlowMind Clarity Blend</p>
            <p className="mb-4" style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.8rem' }}>
              Lion's Mane + Chaga mushroom coffee — engineered for deep work.
            </p>
            <a
              href="https://torchrepublic.com/products/glowmind-clarity-blend"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold px-6 py-2.5 inline-block transition-all hover:opacity-90"
              style={{ background: GOLD, color: '#0A0A0A' }}
            >
              Shop GlowMind →
            </a>
          </motion.div>
        )}
      </div>

      {/* Footer Nav */}
      <div className="px-6 py-5 text-center" style={{ borderTop: `1px solid rgba(212,175,55,0.08)` }}>
        <Link to="/command" className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(212,175,55,0.35)', textDecoration: 'none' }}>
          ← Back to Torch Command
        </Link>
      </div>
    </div>
  );
}