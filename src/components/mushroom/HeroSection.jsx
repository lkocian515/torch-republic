import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '../../lib/mushroomProducts';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';
const BG_DESKTOP = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1563af3fd_LIVEFREESTAYREADY3.png';

// ─── Shared CTA buttons ───────────────────────────────────────────────────────
function CTAButtons({ mobile }) {
  return (
    <div
      className={
        mobile
          ? 'flex flex-col items-center gap-3 w-full'
          : 'flex flex-col sm:flex-row items-center gap-4'
      }
    >
      <Link
        to="/shop"
        className="font-mono tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 btn-glow text-center"
        style={{
          background: RG,
          color: '#050505',
          padding: mobile ? '14px 20px' : '14px 36px',
          fontSize: mobile ? '0.72rem' : '0.625rem',
          borderRadius: mobile ? '999px' : '0',
          width: mobile ? '90%' : 'auto',
          maxWidth: mobile ? '360px' : 'none',
        }}
      >
        Shop the Blends
      </Link>
      <Link
        to="/subscription"
        className="font-mono tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 text-center"
        style={{
          border: `1px solid ${RG}88`,
          color: `${RG_DEEP}`,
          padding: mobile ? '13px 20px' : '14px 36px',
          fontSize: mobile ? '0.72rem' : '0.625rem',
          borderRadius: mobile ? '999px' : '0',
          background: 'rgba(0,0,0,0.35)',
          width: mobile ? '90%' : 'auto',
          maxWidth: mobile ? '360px' : 'none',
        }}
      >
        Build Your Monthly Ritual
      </Link>
    </div>
  );
}

// ─── MOBILE HERO ──────────────────────────────────────────────────────────────
function MobileHero() {
  return (
    <div
      className="md:hidden flex flex-col items-center text-center w-full"
      style={{ backgroundColor: '#050505', paddingBottom: '40px' }}
    >
      {/* Brand eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          color: RG_DEEP,
          fontSize: '0.6rem',
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          paddingTop: '20px',
          paddingBottom: '12px',
        }}
      >
        Torch Republic Coffee Company
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.07 }}
        className="font-serif font-bold px-5"
        style={{
          fontSize: 'clamp(2rem, 8vw, 3.4rem)',
          color: '#FFFFFF',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '18px',
        }}
      >
        Instant Mushroom Coffee
        <br />
        <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
      </motion.h1>

      {/* Product tube lineup — horizontal scroll if needed, no crop */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="w-full overflow-x-auto"
        style={{ marginBottom: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '6px',
            padding: '0 12px',
            minWidth: 'max-content',
            margin: '0 auto',
          }}
        >
          {MUSHROOM_PRODUCTS.map((product) => (
            <Link key={product.id} to={`/blends/${product.slug}`} style={{ display: 'block' }}>
              <img
                src={product.image}
                alt={product.alt}
                style={{
                  width: '80px',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.7))',
                }}
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28 }}
        style={{
          color: '#C8B8A6',
          fontSize: '1rem',
          lineHeight: 1.65,
          fontWeight: 300,
          maxWidth: '90%',
          marginBottom: '24px',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings,
        clearer routines, and a little everyday magic — without the mess of brewing.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.38 }}
        className="flex flex-col items-center gap-3 w-full"
      >
        <CTAButtons mobile />
      </motion.div>
    </div>
  );
}

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
function DesktopHero() {
  return (
    <div
      className="hidden md:block relative w-full overflow-hidden"
      style={{ minHeight: '580px' }}
    >
      {/* Cinematic background */}
      <img
        src={BG_DESKTOP}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,5,10,0.38) 0%, rgba(6,5,10,0.18) 45%, rgba(6,5,10,0.78) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-10 pt-14 pb-16 flex flex-col items-center text-center">
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
        >
          <CTAButtons mobile={false} />
        </motion.div>
      </div>
    </div>
  );
}

// ─── DEFAULT EXPORT ───────────────────────────────────────────────────────────
export default function MushroomHero() {
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <MobileHero />
      <DesktopHero />
    </div>
  );
}