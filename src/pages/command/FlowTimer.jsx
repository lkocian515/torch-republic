import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GOLD = '#D4AF37';
const BG = '#0A0A0A';
const TOTAL = 90 * 60; // 90 minutes in seconds

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function FlowTimer() {
  const [timeLeft, setTimeLeft] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setCompleted(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const progress = (TOTAL - timeLeft) / TOTAL;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const handleReset = () => {
    setRunning(false);
    setTimeLeft(TOTAL);
    setCompleted(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#F0EBE1' }} className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Torch Command</span>
        <Link to="/command" className="font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
          style={{ color: 'rgba(212,175,55,0.5)', textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 gap-12">

        {/* Title */}
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(212,175,55,0.6)' }}>
            Flow State Timer
          </p>
          <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#FFFFFF' }}>
            The 90-Minute Sprint
          </h1>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em]" style={{ color: 'rgba(240,235,225,0.35)' }}>
            One session. Zero distractions. Full output.
          </p>
        </div>

        {/* Circular Timer */}
        <div className="relative flex items-center justify-center">
          <svg width="280" height="280" className="-rotate-90">
            {/* Track */}
            <circle
              cx="140" cy="140" r="120"
              fill="none"
              stroke="rgba(212,175,55,0.1)"
              strokeWidth="4"
            />
            {/* Progress */}
            <circle
              cx="140" cy="140" r="120"
              fill="none"
              stroke={completed ? '#6EBD8E' : GOLD}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s ease' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            {completed ? (
              <>
                <span style={{ fontSize: '2.5rem' }}>✓</span>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: '#6EBD8E' }}>
                  Session Complete
                </p>
              </>
            ) : (
              <>
                <span className="font-mono font-bold" style={{ fontSize: 'clamp(2.8rem, 8vw, 3.8rem)', color: running ? '#FFFFFF' : 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {formatTime(timeLeft)}
                </span>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase mt-2" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  {running ? 'Stay locked in' : 'Ready to begin'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs">
          {!completed ? (
            <button
              onClick={() => setRunning(r => !r)}
              className="w-full font-mono text-[11px] tracking-[0.4em] uppercase font-bold py-4 transition-all hover:opacity-90"
              style={{ background: GOLD, color: '#0A0A0A' }}
            >
              {running ? 'Pause' : timeLeft === TOTAL ? 'Start Session' : 'Resume'}
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full font-mono text-[11px] tracking-[0.4em] uppercase font-bold py-4 transition-all hover:opacity-90"
              style={{ background: GOLD, color: '#0A0A0A' }}
            >
              New Session
            </button>
          )}
          {timeLeft < TOTAL && !completed && (
            <button
              onClick={handleReset}
              className="w-full font-mono text-[10px] tracking-[0.3em] uppercase py-4 transition-all hover:opacity-70"
              style={{ border: `1px solid rgba(212,175,55,0.25)`, color: 'rgba(212,175,55,0.6)' }}
            >
              Reset
            </button>
          )}
        </div>

        {/* GlowMind Product Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md p-6 flex items-center gap-5"
          style={{ background: `${GOLD}06`, border: `1px solid ${GOLD}25` }}
        >
          <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full"
            style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}30` }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: `${GOLD}80` }}>
              Fuel Your Sprint
            </p>
            <p className="font-serif font-bold text-white text-sm mb-1">GlowMind Clarity Blend</p>
            <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>
              Lion's Mane + Chaga to lock you into flow state.
            </p>
          </div>
          <a
            href="https://torchrepublic.com/products/glowmind-clarity-blend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-2.5 px-4 transition-all hover:opacity-90"
            style={{ background: GOLD, color: '#0A0A0A', textDecoration: 'none' }}
          >
            Shop →
          </a>
        </motion.div>

      </div>
    </div>
  );
}