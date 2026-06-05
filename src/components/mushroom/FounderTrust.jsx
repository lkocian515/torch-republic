import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Coffee, Heart, Users } from 'lucide-react';

const RG = '#E6B7AD';

const VALUES = [
  {
    icon: Coffee,
    title: 'Intentional Ritual',
    description: 'Coffee is more than caffeine. It\'s a moment of pause, preparation, and presence in a chaotic world.',
  },
  {
    icon: Heart,
    title: 'Functional Wellness',
    description: 'We blend premium instant coffee with adaptogenic mushrooms to support focus, calm, and daily balance.',
  },
  {
    icon: Shield,
    title: 'Clean Ingredients',
    description: 'No fillers, no artificial additives. Just pure instant coffee and organic mushroom extracts.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Built for people who value quality, transparency, and a more intentional approach to their daily routine.',
  },
];

export default function FounderTrust() {
  return (
    <section
      style={{
        background: '#0B0B0B',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(56px, 7vw, 96px) 24px',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(230,183,173,0.5)', marginBottom: '14px' }}
          >
            Our Story
          </p>
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
              color: '#F5EFE6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Created for the Intentional Drinker
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '1rem',
              color: 'rgba(210,195,175,0.7)',
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Torch Republic was founded on a simple idea: the daily coffee ritual should do more than just wake you up. It should support your focus, your calm, your balance — your whole day.
          </p>
        </motion.div>

        {/* Story Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'rgba(230,183,173,0.03)',
            border: '1px solid rgba(230,183,173,0.1)',
            borderRadius: '3px',
            padding: 'clamp(24px, 3.5vw, 40px)',
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          <p
            className="font-heading"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(247,241,232,0.7)',
              fontWeight: 300,
              lineHeight: 1.9,
              marginBottom: '20px',
            }}
          >
            We love the ritual of coffee — the warmth of the cup, the aroma, the quiet moment before the day begins. But we wanted more than just a caffeine jolt. We wanted a cup that supports mental clarity without jitters, calm energy without crashes, and daily wellness without compromise.
          </p>
          <p
            className="font-heading"
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(247,241,232,0.7)',
              fontWeight: 300,
              lineHeight: 1.9,
            }}
          >
            That's why we created Torch Republic: premium instant mushroom coffee for people who want their daily cup to work as hard as they do. No brewing equipment needed. No weird taste. Just smooth, functional coffee that fits your life.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                textAlign: 'center',
                padding: 'clamp(20px, 3vw, 28px)',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(230,183,173,0.08)',
                  border: '1px solid rgba(230,183,173,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <value.icon size={19} style={{ color: RG }} />
              </div>

              {/* Title */}
              <h3
                className="font-serif font-bold"
                style={{
                  fontSize: '1.1rem',
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {value.title}
              </h3>

              {/* Description */}
              <p
                className="font-heading"
                style={{
                  fontSize: '0.88rem',
                  color: 'rgba(247,241,232,0.5)',
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}