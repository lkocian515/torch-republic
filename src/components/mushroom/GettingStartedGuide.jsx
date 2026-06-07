import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sun, Moon, Coffee, Zap, Brain, Heart, Shield } from 'lucide-react';

const RG = '#E6B7AD';

const DAYS = [
  {
    day: 1,
    title: 'The First Cup',
    focus: 'Morning Clarity',
    blend: 'SunCap — Rise & Focus',
    icon: Sun,
    instruction: 'Start your morning with SunCap. Mix one scoop into 8-10oz of hot water. Take 3 deep breaths before your first sip.',
    tip: 'Set an intention for your day while the powder dissolves.',
  },
  {
    day: 2,
    title: 'Building Momentum',
    focus: 'Sustained Energy',
    blend: 'SunCap — Rise & Focus',
    icon: Zap,
    instruction: 'Same time, same ritual. Notice how the energy feels different — smooth, not jittery.',
    tip: 'Keep your cup in the same spot each morning. Consistency anchors the habit.',
  },
  {
    day: 3,
    title: 'Deepening Focus',
    focus: 'Mental Clarity',
    blend: 'GlowMind — Clarity & Flow',
    icon: Brain,
    instruction: "Switch to GlowMind today. Lion's Mane supports cognitive function and focus.",
    tip: 'Use this cup before your most important work block of the day.',
  },
  {
    day: 4,
    title: 'Finding Balance',
    focus: 'Calm Energy',
    blend: 'GlowMind — Clarity & Flow',
    icon: Heart,
    instruction: 'Continue with GlowMind. Notice the L-theanine providing calm without drowsiness.',
    tip: 'Journal for 2 minutes after finishing your cup.',
  },
  {
    day: 5,
    title: 'The Afternoon Shift',
    focus: 'Sustained Focus',
    blend: 'Classic Coffee or SunCap',
    icon: Coffee,
    instruction: 'Try your second cup in the early afternoon if needed. Classic for pure energy, SunCap for focus.',
    tip: "Avoid caffeine after 2pm if you're sensitive to sleep disruption.",
  },
  {
    day: 6,
    title: 'Evening Transition',
    focus: 'Wind Down Ritual',
    blend: 'MoonCap — Restore & Unwind',
    icon: Moon,
    instruction: 'Introduce MoonCap in the evening. Reishi and Chamomile support relaxation and sleep quality.',
    tip: 'Make this a screen-free ritual 1-2 hours before bed.',
  },
  {
    day: 7,
    title: 'Your Ritual, Established',
    focus: 'Integration',
    blend: 'Choose Your Path',
    icon: Shield,
    instruction: "You've built the foundation. Choose blends based on what your body and mind need today.",
    tip: 'Reflect: Which blend serves you best in the morning? In the evening?',
  },
];

export default function GettingStartedGuide() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[900px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 12 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-12 text-center"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Getting Started
          </p>
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1.2 }}>
            The 7-Day Ritual Framework
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Transform your morning from rushed to intentional. This guided week helps you build a sustainable coffee ritual that supports your energy, focus, and well-being.
          </p>
        </motion.div>

        <div className="space-y-4">
          {DAYS.map((day, i) => {
            const Icon = day.icon;
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 md:p-7"
                style={{ 
                  background: '#0F0E0D', 
                  border: '1px solid rgba(230,183,173,0.08)',
                  borderRadius: '4px'
                }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Day Number & Icon */}
                  <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `rgba(230,183,173,0.12)` }}>
                      <Icon className="w-5 h-5" style={{ color: RG }} strokeWidth={1.5} />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Day {day.day}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>
                      {day.title}
                    </h3>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: `${RG}80` }}>
                      {day.focus} · {day.blend}
                    </p>
                    <p className="font-heading text-sm leading-relaxed mb-3" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300 }}>
                      {day.instruction}
                    </p>
                    <div className="flex items-start gap-2">
                      <span className="text-lg" style={{ opacity: 0.6 }}>💡</span>
                      <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
                        {day.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="font-heading text-sm mb-6" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
            Ready to begin your ritual?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808', padding: '14px 36px', borderRadius: '4px' }}
            >
              Shop All Blends →
            </Link>
            <Link
              to="/bundle"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)', padding: '14px 36px', borderRadius: '4px' }}
            >
              Get the Full Set →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}