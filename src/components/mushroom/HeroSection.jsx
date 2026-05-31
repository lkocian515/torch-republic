import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';
const BG_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8f372ff32_LIVEFREESTAYREADY3.png';

export default function MushroomHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: '#06050A',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.55,
        }}
      />
      {/* Dark overlay to keep text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(6,5,10,0.45) 0%, rgba(6,5,10,0.25) 40%, rgba(6,5,10,0.7) 100%)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 pt-14 pb-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono tracking-[0.45em] uppercase mb-6"
          style={{ color: 'rgba(230,183,173,0.7)', fontSize: '0.6rem', letterSpacing: '0.38em' }}
        >
          Torch Republic Coffee Company
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="font-serif font-bold leading-tight mb-8"
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textShadow: '0 2px 40px rgba(0,0,0,0.6)',
          }}
        >
          Instant Mushroom Coffee<br />
          <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
        </motion.h1>

        {/* Product row — 6 cans, full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18 }}
          className="w-full flex items-end justify-center gap-2 sm:gap-3 md:gap-4 mb-10"
        >
          {MUSHROOM_PRODUCTS.map((p, i) => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="flex-1 min-w-0 group"
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28 + i * 0.07 }}
                className="relative flex flex-col items-center"
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                {/* Glow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${p.accent}40` }}
                />
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="eager"
                  className="w-full object-contain drop-shadow-2xl"
                  style={{ height: 'clamp(200px, 34vw, 440px)' }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-heading max-w-2xl mb-8"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(247,241,232,0.62)',
            lineHeight: 1.85,
            fontWeight: 300,
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for
          smoother mornings, clearer routines, and a little everyday magic — without
          the mess of brewing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
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
            to="/bundle"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
            style={{ border: `1px solid ${RG}88`, color: `${RG}DD`, padding: '14px 36px', background: 'rgba(0,0,0,0.35)' }}
          >
            Build Your Bundle
          </Link>
        </motion.div>
      </div>
    </div>
  );
}