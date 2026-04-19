import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    icon: '☕',
    label: 'Pods',
    sub: 'Daily use',
    desc: 'Start every morning with precision. One pod, one perfect cup.',
    cta: 'Shop Pods',
    href: 'https://torch-republic.com/products/washington-blend-coffee-pods',
    external: true,
    accent: '#C9A24A',
  },
  {
    icon: '⚗️',
    label: 'Bags',
    sub: 'Weekend / Slow Brew',
    desc: 'Whole or ground. Take your time. Savor the craft.',
    cta: 'Shop Bags',
    href: '/CoffeeCollection',
    external: false,
    accent: 'rgba(201,162,74,0.7)',
  },
  {
    icon: '🔥',
    label: 'Torch Box',
    sub: 'Subscription',
    desc: 'Monthly curated blends. Exclusive access. Never run out.',
    cta: 'Join Torch Box',
    href: '/TheTorchBox',
    external: false,
    accent: 'rgba(201,162,74,0.5)',
  },
];

export default function BuildYourRoutine() {
  return (
    <section style={{ background: '#080808', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14 text-center"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Find Your Fit
          </p>
          <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
            Build Your Routine
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col p-6 md:p-8"
              style={{ background: '#0C0C0C', border: `1px solid ${step.accent}22` }}
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: `${step.accent}60` }}>
                  0{i + 1}
                </span>
                <div style={{ flex: 1, height: '1px', background: `${step.accent}20` }} />
                <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
              </div>

              <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color: step.accent }}>
                {step.label}
              </p>
              <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {step.sub}
              </p>
              <p className="font-heading text-sm mb-6 flex-1" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.75 }}>
                {step.desc}
              </p>

              {step.external ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-px self-start"
                  style={{ color: step.accent, borderBottom: `1px solid ${step.accent}35`, textDecoration: 'none' }}
                >
                  {step.cta} →
                </a>
              ) : (
                <Link
                  to={step.href}
                  className="font-mono text-[9px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-px self-start"
                  style={{ color: step.accent, borderBottom: `1px solid ${step.accent}35` }}
                >
                  {step.cta} →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}