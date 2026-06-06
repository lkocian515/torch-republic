import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const MUSHROOMS = [
  {
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    association: 'Focus & Mental Clarity',
    description: 'Traditionally associated with cognitive support and mental clarity. Used in wellness routines for centuries across East Asia.',
  },
  {
    name: 'Chaga',
    latin: 'Inonotus obliquus',
    association: 'Antioxidant Support',
    description: 'Known for its rich antioxidant content and its place in traditional wellness practices as a daily immune-supportive ingredient.',
  },
  {
    name: 'Reishi',
    latin: 'Ganoderma lucidum',
    association: 'Calm & Balance',
    description: 'Often called the "mushroom of calm," Reishi is traditionally used to support relaxation and a balanced state of mind.',
  },
  {
    name: 'Cordyceps',
    latin: 'Cordyceps militaris',
    association: 'Energy & Stamina',
    description: 'Traditionally used in Himalayan and Tibetan wellness for physical energy and endurance support during active days.',
  },
  {
    name: 'Turkey Tail',
    latin: 'Trametes versicolor',
    association: 'Immune Wellness',
    description: 'One of the most widely studied functional mushrooms, Turkey Tail is known for its role in immune-supportive wellness routines.',
  },
];

export default function IngredientTransparency() {
  return (
    <section
      style={{
        background: '#0E0E0E',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 52px)' }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(230,183,173,0.5)', marginBottom: '12px' }}
          >
            Inside the Ritual
          </p>
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: '#F5EFE6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Five Functional Mushrooms. One Daily Cup.
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.65)',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            Each Torch Republic blend is formulated with a specific combination of these five functional mushrooms — selected for their traditional wellness associations and used in meaningful, clearly-labeled doses.
          </p>
        </motion.div>

        {/* Mushroom list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          {MUSHROOMS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: '#0E0E0E',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 'clamp(16px, 3vw, 40px)',
                padding: 'clamp(18px, 2.5vw, 26px) clamp(20px, 3vw, 32px)',
                alignItems: 'start',
              }}
            >
              {/* Left: name + association */}
              <div>
                <p className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F5EFE6', marginBottom: '4px', lineHeight: 1.2 }}>
                  {m.name}
                </p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: RG, marginBottom: '4px' }}>
                  {m.association}
                </p>
                <p className="font-mono text-[7px] tracking-[0.1em]" style={{ color: 'rgba(230,183,173,0.3)', fontStyle: 'italic' }}>
                  {m.latin}
                </p>
              </div>
              {/* Right: description */}
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono text-[8px] tracking-[0.12em] text-center"
          style={{
            color: 'rgba(230,183,173,0.28)',
            marginTop: 'clamp(20px, 3vw, 28px)',
            paddingTop: '16px',
            borderTop: '1px solid rgba(230,183,173,0.06)',
            lineHeight: 1.8,
          }}
        >
          These blends are crafted for everyday wellness rituals and are not intended to diagnose, treat, cure, or prevent any disease. Statements have not been evaluated by the FDA. Consult a healthcare professional if you are pregnant, nursing, or managing a medical condition.
        </motion.p>
      </div>
    </section>
  );
}