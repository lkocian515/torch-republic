import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sparkles, Book, PenTool, Gamepad2, Lightbulb } from 'lucide-react';

const EVENING_ACTIVITIES = [
  { icon: Moon, label: 'Evening Ritual' },
  { icon: Sparkles, label: 'Creative Flow' },
  { icon: Book, label: 'Late-Night Reading' },
  { icon: PenTool, label: 'Writing & Journaling' },
  { icon: Gamepad2, label: 'Gaming Sessions' },
  { icon: Lightbulb, label: 'Deep Thinking' },
];

const ActivityIcon = ({ activity, ...props }) => {
  const icons = {
    'Evening Ritual': Moon,
    'Creative Flow': Sparkles,
    'Late-Night Reading': Book,
    'Writing & Journaling': PenTool,
    'Gaming Sessions': Gamepad2,
    'Deep Thinking': Lightbulb,
  };
  const Icon = icons[activity];
  return Icon ? <Icon {...props} /> : null;
};

export default function DreamCapEveningRitual() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0A0A0E 0%, #0D0D14 50%, #0A0A0E 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle moonlight glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '10%',
          width: '40%',
          height: '60%',
          background: 'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(184,168,200,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Star-like dots */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.25), transparent)
          `,
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-16 md:py-20" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: 'rgba(184,168,200,0.6)' }}
          >
            Why DreamCap?
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
              color: '#F5EFE6',
              letterSpacing: '-0.02em',
            }}
          >
            For Those Who Think Best After Dark
          </h2>
          <p
            className="font-heading max-w-2xl mx-auto"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(250,245,235,0.75)',
              lineHeight: 1.9,
              fontWeight: 300,
            }}
          >
            While most coffee brands focus on early risers, DreamCap celebrates those who find energy, creativity, and inspiration after dark.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12"
        >
          {[
            { check: '✓', text: 'Perfect for late-night creators and thinkers' },
            { check: '✓', text: 'Rich coffee flavor with functional mushrooms' },
            { check: '✓', text: 'Designed for evening rituals and quiet moments' },
            { check: '✓', text: 'Instant preparation — just add hot water' },
            { check: '✓', text: 'Crafted for inspiration, creativity, and reflection' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4"
              style={{
                background: 'rgba(184,168,200,0.05)',
                border: '1px solid rgba(184,168,200,0.12)',
              }}
            >
              <span style={{ color: '#B8A8C8', fontSize: '1rem', lineHeight: 1, marginTop: '2px' }}>
                {item.check}
              </span>
              <span
                className="font-heading text-sm"
                style={{ color: 'rgba(250,245,235,0.8)', fontWeight: 300 }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Evening Activities */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <p
            className="font-mono text-[8px] tracking-[0.5em] uppercase text-center mb-6"
            style={{ color: 'rgba(184,168,200,0.5)' }}
          >
            Perfect For
          </p>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {EVENING_ACTIVITIES.map(({ icon: ActivityIcon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 p-5 text-center"
                style={{
                  background: 'rgba(184,168,200,0.04)',
                  border: '1px solid rgba(184,168,200,0.1)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184,168,200,0.25)';
                  e.currentTarget.style.background = 'rgba(184,168,200,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(184,168,200,0.1)';
                  e.currentTarget.style.background = 'rgba(184,168,200,0.04)';
                }}
              >
                <ActivityIcon size={22} style={{ color: '#B8A8C8' }} />
                <span
                  className="font-mono text-[7px] tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(250,245,235,0.7)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lifestyle Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 md:p-10 text-center"
          style={{
            background: 'rgba(184,168,200,0.04)',
            border: '1px solid rgba(184,168,200,0.12)',
          }}
        >
          <h3
            className="font-serif font-bold mb-4"
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              color: '#F5EFE6',
              letterSpacing: '-0.01em',
            }}
          >
            Not Every Cup Belongs To The Morning
          </h3>
          <p
            className="font-heading max-w-3xl mx-auto"
            style={{
              fontSize: '0.92rem',
              color: 'rgba(250,245,235,0.75)',
              lineHeight: 1.9,
              fontWeight: 300,
            }}
          >
            While most coffee brands focus on early risers, DreamCap celebrates those who find energy, creativity, and inspiration after dark. For the readers, writers, artists, entrepreneurs, gamers, and lifelong dreamers — this blend was made for you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}