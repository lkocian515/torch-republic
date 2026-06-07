import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const RG = '#E6B7AD';

export default function FlavorQuizBanner() {
  return (
    <section
      style={{
        background: `linear-gradient(135deg, rgba(230,183,173,0.04) 0%, rgba(230,183,173,0.02) 100%)`,
        padding: 'clamp(50px, 7vw, 80px) 24px',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={18} style={{ color: RG }} />
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Find Your Perfect Match
            </p>
            <Sparkles size={18} style={{ color: RG }} />
          </div>

          <h2
            className="font-serif font-bold mb-4"
            style={{
              fontSize: 'clamp(1.7rem, 3.5vw, 2.2rem)',
              color: '#F5EFE6',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Not Sure Which Blend Is Right for You?
          </h2>

          <p
            className="font-heading mb-8 max-w-2xl mx-auto"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.65)',
              fontWeight: 300,
              lineHeight: 1.8,
            }}
          >
            Take our 4-question flavor discovery quiz. We'll match you with your perfect coffee or matcha based on your morning routine, energy needs, and taste preferences.
          </p>

          <Link
            to="/blend-quiz"
            className="inline-flex items-center gap-3 font-mono uppercase tracking-[0.28em] transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#050505',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '15px 42px',
              borderRadius: '2px',
              boxShadow: '0 4px 20px rgba(230,183,173,0.2)',
            }}
          >
            Take the Quiz
            <ArrowRight size={16} />
          </Link>

          <p
            className="font-mono text-[7px] tracking-[0.2em] uppercase mt-4"
            style={{ color: 'rgba(230,183,173,0.4)' }}
          >
            Takes less than 1 minute · Personalized recommendations
          </p>
        </motion.div>
      </div>
    </section>
  );
}