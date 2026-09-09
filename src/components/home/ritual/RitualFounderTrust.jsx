import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Short, authentic founder introduction near the bottom of the homepage.
// Uses only approved themes from the Founder Story page — no invented
// press coverage, awards, credentials, or company milestones.
export default function RitualFounderTrust() {
  return (
    <section style={{ background: '#F7F1E7' }}>
      <div className="mx-auto max-w-[900px] px-6 py-16 md:px-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#A97B32' }}>
            Why Torch Republic Exists
          </p>
          <blockquote
            className="mx-auto mt-6 max-w-2xl font-serif"
            style={{ fontSize: 'clamp(1.3rem,2.5vw,1.6rem)', color: '#292622', lineHeight: 1.4, textWrap: 'balance' }}
          >
            &ldquo;I wanted a morning ritual that removed friction, not added it.
            No machine, no pods, no overwhelming catalog &mdash; just a better cup,
            made intentionally.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-heading text-sm font-semibold" style={{ color: '#292622' }}>
              The Torch Republic Team
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mt-1" style={{ color: '#8A8076' }}>
              Corpus Christi, TX
            </p>
          </div>
          <Link
            to="/founder-story"
            className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold transition-opacity hover:opacity-75"
            style={{ color: '#B7653E' }}
          >
            Read the Founder Story <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}