import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '../../lib/mushroomProducts';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';
const BG_DESKTOP = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1563af3fd_LIVEFREESTAYREADY3.png';

// ─── MOBILE HERO ──────────────────────────────────────────────────────────────
function MobileHero() {
  return (
    <div
      className="md:hidden flex flex-col items-center text-center w-full"
      style={{
        backgroundColor: '#050505',
        maxHeight: '85vh',
        overflow: 'hidden',
        paddingBottom: '24px',
      }}
    >
      {/* Brand eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          color: RG_DEEP,
          fontSize: '0.55rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          paddingTop: '16px',
          paddingBottom: '8px',
        }}
      >
        Torch Republic Coffee Company
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.06 }}
        className="font-serif font-bold px-5"
        style={{
          fontSize: 'clamp(1.85rem, 7.5vw, 3rem)',
          color: '#FFFFFF',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '14px',
        }}
      >
        Instant Mushroom Coffee
        <br />
        <span style={{ color: RG }}>for Focus, Flow &amp; Ritual</span>
      </motion.h1>

      {/* Product tube lineup */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14 }}
        style={{ width: '100%', marginBottom: '14px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '4px',
            padding: '0 8px',
          }}
        >
          {MUSHROOM_PRODUCTS.map((product) => (
            <Link key={product.id} to={`/blends/${product.slug}`} style={{ display: 'block', flex: '1', maxWidth: '70px' }}>
              <img
                src={product.image}
                alt={product.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.8))',
                }}
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Short subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        style={{
          color: '#C8B8A6',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          fontWeight: 300,
          maxWidth: '88%',
          marginBottom: '20px',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Premium instant coffee with Lion's Mane + Chaga. No brewer, no grinder — just scoop, stir, and sip.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        className="flex flex-col items-center gap-3 w-full"
        style={{ paddingBottom: '4px' }}
      >
        <Link
          to="/shop"
          style={{
            background: RG,
            color: '#050505',
            padding: '13px 20px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 700,
            borderRadius: '999px',
            width: '88%',
            maxWidth: '340px',
            textAlign: 'center',
            display: 'block',
          }}
        >
          Shop the Blends
        </Link>
        <Link
          to="/subscription"
          style={{
            border: `1px solid ${RG}77`,
            color: RG_DEEP,
            padding: '12px 20px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 700,
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.4)',
            width: '88%',
            maxWidth: '340px',
            textAlign: 'center',
            display: 'block',
          }}
        >
          Build Monthly Ritual
        </Link>
      </motion.div>
    </div>
  );
}

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
function DesktopHero() {
  return (
    <div
      className="hidden md:block relative w-full overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      <img
        src={BG_DESKTOP}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,5,10,0.38) 0%, rgba(6,5,10,0.18) 45%, rgba(6,5,10,0.8) 100%)',
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-10 pt-16 pb-20 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono tracking-[0.45em] uppercase mb-6"
          style={{ color: 'rgba(230,183,173,0.75)', fontSize: '0.6rem' }}
        >
          Torch Republic Coffee Company
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="font-serif font-bold mb-10"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.4rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.07,
            textShadow: '0 2px 40px rgba(0,0,0,0.7)',
          }}
        >
          Instant Mushroom Coffee
          <br />
          <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading max-w-2xl mb-10"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'rgba(247,241,232,0.7)',
            lineHeight: 1.85,
            fontWeight: 300,
            textShadow: '0 1px 12px rgba(0,0,0,0.5)',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings,
          clearer routines, and a little everyday magic — without the mess of brewing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/shop"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 btn-glow"
            style={{ background: RG, color: '#050505', padding: '14px 36px' }}
          >
            Shop the Blends
          </Link>
          <Link
            to="/subscription"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
            style={{ border: `1px solid ${RG}88`, color: RG_DEEP, padding: '14px 36px', background: 'rgba(0,0,0,0.35)' }}
          >
            Build Monthly Ritual
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function MushroomHero() {
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <MobileHero />
      <DesktopHero />
    </div>
  );
}