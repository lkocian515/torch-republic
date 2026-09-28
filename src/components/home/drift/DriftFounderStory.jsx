import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';

export default function DriftFounderStory() {
  return (
    <section style={{ background: D.cream, borderTop: '1px solid rgba(184,115,77,0.10)' }}>
      <div className="mx-auto max-w-[800px] px-6 py-16 md:py-24 text-center">
        <motion.div {...fadeUp}>
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 2rem' }}>
            Our Story
          </p>
          <blockquote style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.3, color: D.ink, margin: '0 0 2rem', textWrap: 'balance' }}>
            &ldquo;I wanted a morning ritual that removed friction, not added it. No machine, no pods &mdash; just a better cup, made intentionally.&rdquo;
          </blockquote>
          <Link
            to="/our-story"
            className="inline-flex items-center gap-2"
            style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Read Our Story <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}