import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';

const GOLD = '#D4AF37';

const FEATURES = [
  {
    icon: '🧠',
    title: 'Cognitive Profile Quiz',
    desc: '4 questions. A custom daily protocol. Your ideal Torch Republic blend.',
    cta: 'Take the Quiz',
    href: '/command/quiz',
    tag: 'Lead Capture',
  },
  {
    icon: '⏱',
    title: 'Flow State Timer',
    desc: 'A 90-minute deep work timer built for elite focus sessions.',
    cta: 'Start Session',
    href: '/command/timer',
    tag: 'Productivity Tool',
  },
  {
    icon: '📋',
    title: 'Performance Protocols',
    desc: 'Evidence-based mental and physical optimization routines for peak performers.',
    cta: 'Browse Protocols',
    href: '/command/protocols',
    tag: 'SEO Directory',
  },
];

export default function TorchCommandHome() {
  useSEO({
    title: 'Torch Command · Internal Performance Hub',
    description: 'Internal performance and productivity tools.',
    url: '/command',
    noindex: true,
  });
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F0EBE1' }} className="flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase font-bold" style={{ color: GOLD }}>Torch Command</span>
        <div className="hidden sm:flex items-center gap-6">
          {[['Quiz', '/command/quiz'], ['Timer', '/command/timer'], ['Protocols', '/command/protocols']].map(([label, href]) => (
            <Link key={label} to={href} className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80" style={{ color: 'rgba(212,175,55,0.65)' }}>{label}</Link>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-full" style={{ border: `2px solid ${GOLD}`, background: `${GOLD}10` }}>
            <span style={{ fontSize: '2rem' }}>🔥</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.7em] uppercase mb-5" style={{ color: `${GOLD}70` }}>Torch Republic · Performance Hub</p>
          <h1 className="font-serif font-bold mb-6 leading-tight" style={{ fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Torch Command
          </h1>
          <p className="mb-10 leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 40px' }}>
            Your central hub for cognitive optimization, deep work rituals, and elite performance protocols — powered by Torch Republic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/command/quiz" className="font-mono text-[11px] tracking-[0.4em] uppercase font-bold px-8 py-4 transition-all hover:opacity-90" style={{ background: GOLD, color: '#0A0A0A' }}>
              Discover Your Profile →
            </Link>
            <Link to="/command/protocols" className="font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-4 transition-all hover:opacity-70" style={{ border: `1px solid rgba(212,175,55,0.35)`, color: `${GOLD}80` }}>
              Browse Protocols
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <Link to={f.href} className="block p-6 h-full transition-all group" style={{ background: 'rgba(212,175,55,0.04)', border: `1px solid rgba(212,175,55,0.15)`, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(212,175,55,0.4)`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `rgba(212,175,55,0.15)`}
              >
                <span className="text-3xl block mb-4">{f.icon}</span>
                <p className="font-mono text-[7px] tracking-[0.35em] uppercase mb-2" style={{ color: `${GOLD}60` }}>{f.tag}</p>
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.1rem' }}>{f.title}</h3>
                <p className="mb-5" style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.85rem', lineHeight: 1.7 }}>{f.desc}</p>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all group-hover:translate-x-1 inline-block" style={{ color: GOLD }}>{f.cta} →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="px-6 py-5 text-center" style={{ borderTop: `1px solid rgba(212,175,55,0.08)` }}>
        <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(212,175,55,0.3)' }}>
          © 2025 Torch Republic Coffee Company · <a href="/" style={{ color: 'rgba(212,175,55,0.4)', textDecoration: 'none' }}>Back to Store</a>
        </p>
      </div>
    </div>
  );
}