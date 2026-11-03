import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';

export default function QuizTeaser() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-sm"
          style={{
            background: `linear-gradient(135deg, ${RG}15 0%, rgba(230,183,173,0.05) 100%)`,
            border: `2px solid ${RG}40`,
            padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Animated background accent */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${RG}20 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-4">
            {/* Icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={32} style={{ color: RG }} strokeWidth={1.5} />
            </motion.div>

            {/* Headline */}
            <h2
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                color: '#F7F2E9',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Not sure where to start?
            </h2>

            {/* Subheading */}
            <p
              className="font-heading max-w-lg"
              style={{
                fontSize: '1rem',
                color: 'rgba(245,239,230,0.75)',
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Take our personalized ritual quiz to discover your perfect blend based on your goals, energy, and vibe.
            </p>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mt-2 px-4 py-1.5"
              style={{
                background: `${RG}15`,
                border: `1px solid ${RG}35`,
                borderRadius: '999px',
              }}
            >
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>
                ✨ Personalized Recommendation
              </span>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6"
            >
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 px-8 py-4 rounded-sm"
                style={{
                  background: RG,
                  color: '#080808',
                  boxShadow: `0 8px 32px ${RG}30`,
                }}
              >
                Take the Quiz
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Subtext */}
            <p className="font-mono text-[8px] tracking-[0.15em] uppercase mt-4" style={{ color: `${RG}50` }}>
              2 minutes · Free · No commitments
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}