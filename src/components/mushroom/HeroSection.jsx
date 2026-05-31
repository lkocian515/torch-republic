import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';

export default function MushroomHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #06050A 0%, #0A080F 40%, #060508 100%)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      {/* Subtle radial glow behind products */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 50% 65%, rgba(80,40,120,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 pt-14 pb-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[9px] tracking-[0.55em] uppercase mb-5"
          style={{ color: 'rgba(230,183,173,0.55)', letterSpacing: '0.28em' }}
        >
          Torch Republic Coffee Company
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="font-serif font-bold leading-tight mb-6"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            lineHeight: 1.12,
          }}
        >
          Instant Mushroom Coffee<br />
          <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
        </motion.h1>

        {/* Product row — 6 tubes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18 }}
          className="w-full my-6 md:flex md:items-end md:justify-center md:gap-4"
          style={{ maxWidth: '960px' }}
        >
          {/* Mobile: 3-column grid */}
          <div className="grid grid-cols-3 gap-3 md:hidden w-full">
            {MUSHROOM_PRODUCTS.map((p, i) => (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.07 }}
                  className="relative flex flex-col items-center"
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full blur-xl pointer-events-none"
                    style={{ background: `${p.accent}30` }}
                  />
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="eager"
                    className="w-full object-contain drop-shadow-2xl"
                    style={{ height: '260px' }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Desktop: single flex row */}
          {MUSHROOM_PRODUCTS.map((p, i) => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="hidden md:block flex-1 min-w-0 group"
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.07 }}
                className="relative flex flex-col items-center"
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${p.accent}30` }}
                />
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="eager"
                  className="w-full object-contain drop-shadow-2xl"
                  style={{ maxHeight: 'clamp(200px, 28vw, 340px)' }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-heading max-w-2xl mb-8"
          style={{
            fontSize: 'clamp(0.88rem, 1.6vw, 1.05rem)',
            color: 'rgba(247,241,232,0.6)',
            lineHeight: 2,
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
          transition={{ duration: 0.6, delay: 0.65 }}
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