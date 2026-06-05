import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Coffee, Moon, Sun, Zap, Heart } from 'lucide-react';

const RG = '#E6B7AD';

const RITUALS = [
  {
    name: 'Focus',
    blend: 'GlowMind Clarity',
    slug: 'glowmind-clarity',
    accent: '#E6B7AD',
    icon: Zap,
    bestTime: 'Morning · Deep work sessions',
    taste: 'Smooth medium roast, cocoa, balanced finish',
    supports: 'Mental clarity + focused energy',
    roast: 'Medium Roast',
  },
  {
    name: 'Energy',
    blend: 'SunCap Rise',
    slug: 'suncap-rise',
    accent: '#D6B27A',
    icon: Sun,
    bestTime: 'Early morning · Fresh starts',
    taste: 'Bright coffee, light cocoa, clean finish',
    supports: 'Morning momentum + balanced energy',
    roast: 'Light Roast',
  },
  {
    name: 'Calm',
    blend: 'MoonCap Restore',
    slug: 'mooncap-restore',
    accent: '#C98F86',
    icon: Moon,
    bestTime: 'Evening · Wind-down ritual',
    taste: 'Dark cocoa, smooth coffee, mellow finish',
    supports: 'Calm evenings + restoration',
    roast: 'Dark Roast',
  },
  {
    name: 'Evening Ritual',
    blend: 'DreamCap Blend',
    slug: 'dreamcap-blend',
    accent: '#B8A8C8',
    icon: Moon,
    bestTime: 'Night · Creative hours',
    taste: 'Smooth coffee, dark cocoa, earthy finish',
    supports: 'Nighttime creativity + reflection',
    roast: 'Medium Roast',
  },
  {
    name: 'Daily Balance',
    blend: 'Mystic Bloom',
    slug: 'mystic-bloom',
    accent: '#E6B7C8',
    icon: Heart,
    bestTime: 'Anytime · Self-care moments',
    taste: 'Smooth coffee, soft cocoa, rounded finish',
    supports: 'Harmony + daily wellness',
    roast: 'Medium Roast',
  },
];

export default function ChooseYourRitual() {
  return (
    <section
      id="find-your-ritual"
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
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
            Choose Your Ritual
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
            Find Your Perfect Blend
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.7)',
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            Each blend is crafted for a specific moment in your day. Choose based on the energy you need, the time you drink, and the ritual you want to create.
          </p>
        </motion.div>

        {/* Ritual Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {RITUALS.map((ritual, i) => (
            <motion.div
              key={ritual.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                border: `1px solid ${ritual.accent}20`,
                borderRadius: '4px',
                padding: 'clamp(20px, 3vw, 28px)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${ritual.accent}45`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${ritual.accent}20`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Accent glow */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle 60% 60% at 80% 20%, ${ritual.accent}08 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: `${ritual.accent}12`,
                  border: `1px solid ${ritual.accent}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ritual.icon size={18} style={{ color: ritual.accent }} />
              </div>

              {/* Ritual name */}
              <h3
                className="font-serif font-bold"
                style={{
                  fontSize: '1.35rem',
                  color: '#FFFFFF',
                  marginBottom: '4px',
                  lineHeight: 1.2,
                }}
              >
                {ritual.name}
              </h3>

              {/* Blend name */}
              <p
                className="font-mono text-[8px] tracking-[0.25em] uppercase"
                style={{ color: ritual.accent, marginBottom: '14px' }}
              >
                {ritual.blend}
              </p>

              {/* Details */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                  <Clock size={13} style={{ color: 'rgba(230,183,173,0.5)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)', marginBottom: '3px' }}>
                      Best Time
                    </p>
                    <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.65)', fontWeight: 300 }}>
                      {ritual.bestTime}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                  <Coffee size={13} style={{ color: 'rgba(230,183,173,0.5)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)', marginBottom: '3px' }}>
                      Taste Profile
                    </p>
                    <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.65)', fontWeight: 300 }}>
                      {ritual.taste}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Heart size={13} style={{ color: 'rgba(230,183,173,0.5)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)', marginBottom: '3px' }}>
                      Supports
                    </p>
                    <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.65)', fontWeight: 300 }}>
                      {ritual.supports}
                    </p>
                  </div>
                </div>
              </div>

              {/* Roast badge */}
              <div
                style={{
                  display: 'inline-block',
                  padding: '5px 10px',
                  background: `${ritual.accent}08`,
                  border: `1px solid ${ritual.accent}20`,
                  borderRadius: '2px',
                  marginBottom: '16px',
                }}
              >
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: ritual.accent }}>
                  {ritual.roast}
                </span>
              </div>

              {/* Shop button */}
              <Link
                to={`/blends/${ritual.slug}`}
                className="block w-full text-center font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all py-3.5"
                style={{
                  background: ritual.accent,
                  color: '#080808',
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Shop {ritual.blend}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vw, 48px)' }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: RG, textDecoration: 'none' }}
          >
            View All Blends →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}