import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Check, Droplet, Thermometer } from 'lucide-react';

const RG = '#E6AC45';

const REASSURANCES = [
  {
    icon: Coffee,
    title: 'Tastes Like Coffee',
    description: 'Roasty, smooth, coffee-forward flavor. The mushrooms are undetectable.',
  },
  {
    icon: Check,
    title: 'No Mushroom Chunks',
    description: 'Fine instant powder dissolves completely. No texture, no grit.',
  },
  {
    icon: Droplet,
    title: 'Mixes Easily',
    description: 'Stirs into hot water, milk, or your favorite creamer in seconds.',
  },
  {
    icon: Thermometer,
    title: 'Hot or Iced',
    description: 'Works beautifully both ways. Dissolve in hot water first for iced.',
  },
];

export default function TastesLikeCoffee() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(230,183,173,0.5)', marginBottom: '12px' }}
          >
            Taste Promise
          </p>
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: '#F7F2E9',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Tastes Like Coffee, Not Mushrooms
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.7)',
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            We get it — "mushroom coffee" sounds strange. But this is smooth, roasty, delicious coffee first. The functional mushrooms are completely undetectable in taste.
          </p>
        </motion.div>

        {/* Reassurance Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          {REASSURANCES.map((item, i) => (
            <motion.div
              key={item.title}
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
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(230,183,173,0.08)',
                  border: '1px solid rgba(230,183,173,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <item.icon size={20} style={{ color: RG }} />
              </div>

              {/* Title */}
              <h3
                className="font-serif font-bold"
                style={{
                  fontSize: '1.15rem',
                  color: '#FFFCF7',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
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
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Taste testimonial box */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            background: 'rgba(230,183,173,0.04)',
            border: '1px solid rgba(230,183,173,0.12)',
            borderRadius: '3px',
            padding: 'clamp(20px, 3vw, 32px)',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'rgba(247,241,232,0.75)',
              lineHeight: 1.8,
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            "I was skeptical about mushroom coffee, but this genuinely just tastes like really good, smooth coffee. No weird aftertaste. No earthiness. Just coffee."
          </p>
          <p
            className="font-mono text-[8px] tracking-[0.25em] uppercase text-center"
            style={{ color: 'rgba(230,183,173,0.5)' }}
          >
            — First-time customer review
          </p>
        </motion.div>
      </div>
    </section>
  );
}