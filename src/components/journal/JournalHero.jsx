import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Brain, Sparkles } from 'lucide-react';

const RG = '#E6AC45';

export default function JournalHero() {
  return (
    <section
      className="px-6 md:px-10 pt-20 pb-16 text-center"
      style={{
        borderBottom: '1px solid rgba(230,183,173,0.08)',
        background: 'radial-gradient(ellipse at top, rgba(230,183,173,0.08) 0%, transparent 70%)',
      }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: `${RG}60` }}>
          Torch Republic Coffee Company
        </p>
        <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
          The Ritual Journal
        </h1>
        <p
          className="font-heading max-w-2xl mx-auto mb-8"
          style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.85 }}
        >
          Explore the science behind functional mushrooms, master your morning ritual, and discover tips for intentional living.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Brain size={18} style={{ color: RG }} />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Science-Backed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee size={18} style={{ color: RG }} />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Daily Rituals
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: RG }} />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Wellness Tips
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#latest-articles"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8 rounded-sm"
            style={{ background: RG, color: '#050505' }}
          >
            Read Articles →
          </a>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8 rounded-sm"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}
          >
            Browse Topics
          </a>
        </div>
      </motion.div>
    </section>
  );
}