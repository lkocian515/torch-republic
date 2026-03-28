import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, Shield, Heart, Users, ArrowRight } from 'lucide-react';
import FounderSection from '../components/mission/FounderSection';

/* ─── Shared animation presets ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: 'easeOut', delay },
});

/* ─── Gold torch divider ─── */
const GoldDivider = ({ className = '' }) => (
  <motion.div {...fadeIn(0.1)} className={`flex items-center justify-center gap-5 ${className}`}>
    <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.55))' }} />
    <Flame className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.8)' }} />
    <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.55), transparent)' }} />
  </motion.div>
);

/* ─── Section label ─── */
const SectionLabel = ({ text }) => (
  <p className="font-mono text-xs tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.65)' }}>{text}</p>
);

const MISSION_CARDS = [
  { icon: Flame,  title: 'Unite Patriots',          description: 'Around the values of Faith, Family, and Freedom.' },
  { icon: Shield, title: 'Inspire Courage',          description: 'Stand boldly for what matters, even when it costs you.' },
  { icon: Heart,  title: 'Wear the Message',         description: 'Let the world know exactly where you stand.' },
  { icon: Users,  title: 'Build Community',          description: 'Together, we carry the flame forward.' },
];

export default function Mission() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5d69f9920_Untitleddesign12.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      >
        {/* Layered overlays for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.82) 50%, rgba(0,0,0,0.35) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 55%)' }} />
        {/* Gold ambient glow */}
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(201,162,74,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl w-full pt-24">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(14,42,47,1), #C9A24A)' }} />
              <span className="font-mono text-xs tracking-[0.45em] uppercase" style={{ color: 'rgba(201,162,74,0.75)' }}>Our Mission</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.02] tracking-tight mb-7"
              style={{ color: '#C9A24A' }}
            >
              CARRY THE<br />FLAME
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              className="text-base md:text-lg leading-relaxed mb-14 max-w-xl"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              Torch Republic stands for the power of people who{' '}
              <span className="font-bold text-white">REFUSE TO LIVE</span> without{' '}
              <span className="font-bold text-white">TRUTH.</span>
            </motion.p>

            {/* Three Principles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              {[
                { label: 'FAITH GIVES', value: 'LIFE MEANING.' },
                { label: 'FREEDOM REQUIRES', value: 'RESPONSIBILITY.' },
                { label: 'TRUTH IS', value: 'WORTH PROTECTING.' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Flame className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#C9A24A' }} />
                  <div>
                    <p className="text-xs tracking-wider uppercase font-bold mb-0.5" style={{ color: '#C9A24A' }}>{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── GOLD DIVIDER ─────────────────────────── */}
      <div className="py-12 px-6" style={{ backgroundColor: '#000' }}>
        <GoldDivider />
      </div>

      {/* ── MISSION CARDS ────────────────────────── */}
      <section className="pb-24 px-6" style={{ backgroundColor: '#000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <SectionLabel text="What We Stand For" />
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide" style={{ color: '#C9A24A' }}>
              OUR MISSION IS CLEAR
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MISSION_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp(i * 0.08)}
                  className="p-8 text-center group"
                  style={{
                    backgroundColor: '#080808',
                    border: '1px solid rgba(201,162,74,0.15)',
                    transition: 'border-color 0.3s ease',
                  }}
                  whileHover={{ borderColor: 'rgba(201,162,74,0.4)' }}
                >
                  <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.2)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#C9A24A' }} />
                  </div>
                  <h3 className="text-xs font-mono font-bold mb-3 tracking-widest uppercase text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(201,162,74,0.08)', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative gold mark */}
          <motion.div {...fadeIn(0)} className="mb-8">
            <span className="font-serif text-5xl leading-none" style={{ color: 'rgba(201,162,74,0.25)' }}>"</span>
          </motion.div>
          <motion.p
            {...fadeUp(0.1)}
            className="text-xl md:text-2xl lg:text-3xl font-serif leading-[1.5] tracking-wide"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            The flame survives because{' '}
            <span style={{ color: '#C9A24A' }}>people choose to pass it forward.</span>
          </motion.p>
          <GoldDivider className="mt-10" />
        </div>
      </section>

      {/* ── FAITH FREEDOM TRUTH ──────────────────── */}
      <section className="py-32 px-6" style={{ backgroundColor: '#000' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0)}>
              <SectionLabel text="The Foundation" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.05] tracking-tight">
                <span className="block text-white">FAITH.</span>
                <span className="block text-white">FREEDOM.</span>
                <span className="block" style={{ color: '#C9A24A' }}>TRUTH.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="space-y-6">
              <p className="text-base leading-[1.9]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Torch Republic exists to represent those who live by faith, value freedom, and refuse to blend in. Every design, every product, every collection is built to reflect these principles.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4 px-6 text-center"
                  style={{ backgroundColor: '#0A0A0A', border: '1px solid #C9A24A' }}
                >
                  <p className="font-mono text-sm tracking-widest" style={{ color: '#C9A24A' }}>
                    Welcome to the movement, Torchbearer.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 text-sm focus:outline-none"
                    style={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(201,162,74,0.25)', color: '#fff' }}
                  />
                  <motion.button
                    whileHover={{ backgroundColor: '#E4C46A' }}
                    type="submit"
                    className="px-8 py-4 font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                    style={{ backgroundColor: '#C9A24A', color: '#000' }}
                  >
                    Join the Torchbearers <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          <GoldDivider className="mt-20" />
        </div>
      </section>

      <FounderSection />
    </div>
  );
}