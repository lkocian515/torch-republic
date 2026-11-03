import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Brain, Moon, Sparkles, Zap, Coffee, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';

const QUICK_OPTIONS = [
  { label: 'Energy', icon: Sun, desc: 'Morning momentum', link: '/quiz?result=energy' },
  { label: 'Focus', icon: Brain, desc: 'Deep work', link: '/quiz?result=focus' },
  { label: 'Calm', icon: Moon, desc: 'Grounding', link: '/quiz?result=calm' },
  { label: 'Creativity', icon: Sparkles, desc: 'Creative flow', link: '/quiz?result=creativity' },
  { label: 'Discipline', icon: Zap, desc: 'Steady focus', link: '/quiz?result=discipline' },
  { label: 'Simple Coffee', icon: Coffee, desc: 'No mushrooms', link: '/quiz?result=simple' },
];

export default function BlendQuizTeaser() {
  const [hoveredOption, setHoveredOption] = useState(null);

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15` }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Personalized Recommendations
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F7F2E9' }}>
            Find Your Perfect Blend
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Not sure where to start? Take our quick quiz to discover the coffee or mushroom coffee ritual that matches your goals.
          </p>
        </motion.div>

        {/* Quick Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {QUICK_OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.a
                key={opt.label}
                href={opt.link}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredOption(opt.label)}
                onMouseLeave={() => setHoveredOption(null)}
                className="group flex flex-col items-center p-5 transition-all duration-300"
                style={{
                  background: hoveredOption === opt.label ? 'rgba(230,183,173,0.08)' : 'rgba(230,183,173,0.04)',
                  border: `1px solid ${hoveredOption === opt.label ? RG + '40' : RG + '15'}`,
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `${RG}15`,
                  border: `1px solid ${RG}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  transition: 'all 0.3s ease',
                  transform: hoveredOption === opt.label ? 'scale(1.1)' : 'scale(1)',
                }}>
                  <Icon size={22} style={{ color: RG }} />
                </div>
                <span className="font-heading text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#F7F2E9' }}>
                  {opt.label}
                </span>
                <span className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(240,235,225,0.4)' }}>
                  {opt.desc}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/quiz"
            className="inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-10"
            style={{ background: RG, color: '#080808', borderRadius: '4px' }}
          >
            Take the Full Quiz
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
          <p className="font-mono text-[7px] tracking-[0.2em] mt-4" style={{ color: 'rgba(240,235,225,0.35)' }}>
            6 questions · 2 minutes · Personalized results
          </p>
        </motion.div>
      </div>
    </section>
  );
}