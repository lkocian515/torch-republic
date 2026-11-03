import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';

export default function NextStepBridge({ productName = 'Washington Blend', accent = '#E6AC45' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-lg"
      style={{
        background: `linear-gradient(135deg, ${accent}12 0%, ${accent}06 100%)`,
        border: `1px solid ${accent}35`,
        boxShadow: `0 0 30px ${accent}0A, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accent}08 0%, transparent 70%)`,
        }} />

      <div className="relative z-10 p-8 md:p-10">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-8 h-8 rounded-full font-mono font-black text-sm"
            style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
            3
          </div>
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold" style={{ color: accent }}>
            The Next Step
          </span>
        </div>

        <h3 className="font-serif mb-3" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFCF7', letterSpacing: '-0.02em' }}>
          Loved {productName}?<br />
          <span style={{ color: accent }}>Never miss another blend.</span>
        </h3>

        <p className="font-heading mb-6" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.72)', lineHeight: 1.7, maxWidth: '420px', fontWeight: 400 }}>
          One-time purchases are great. But the real magic happens when you collect the entire Founders Series. Each blend retires forever — once gone, it's gone.
        </p>

        {/* Key benefit callout */}
        <div className="mb-6 flex flex-col gap-2">
          {[
            'Exclusive member-only roasts never sold individually',
            'Save up to $42/month vs. buying singles',
            'Complete the 6-blend Founders Series',
            'Never miss a limited-edition release',
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} />
              <span style={{ color: 'rgba(240,235,225,0.65)', fontSize: '0.9rem' }}>{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/TheTorchBox"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase font-black transition-all hover:opacity-90"
          style={{
            background: accent,
            color: '#080808',
            padding: '14px 32px',
            boxShadow: `0 8px 24px ${accent}25`,
          }}
        >
          Explore Torch Box <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Reassurance */}
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Cancel anytime · No commitment required
        </p>
      </div>
    </motion.div>
  );
}