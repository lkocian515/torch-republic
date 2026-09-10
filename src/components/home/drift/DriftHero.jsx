import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';

export default function DriftHero() {
  const [classic, mushroom] = CORE_PRODUCTS;
  return (
    <section id="top" style={{ background: D.paper, scrollMarginTop: '72px' }}>
      <div className="grid md:grid-cols-[45fr_55fr] min-h-[85vh] md:min-h-[90vh]">
        {/* Left: copy */}
        <div className="flex items-center px-6 md:px-12 lg:px-16 py-14 md:py-0 order-1">
          <motion.div {...fadeUp} className="max-w-[460px]">
            <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1.5rem' }}>
              Premium Coffee &middot; Zero Equipment
            </p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.02, letterSpacing: '-0.02em', color: D.ink, margin: '0 0 1.25rem', textWrap: 'balance' }}>
              Better mornings, in an instant.
            </h1>
            <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 2rem', maxWidth: '40ch' }}>
              Premium coffee made for real mornings. Scoop. Stir. Sip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 transition-opacity"
                style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
              >
                Shop Coffee <ArrowRight size={16} />
              </Link>
              <a
                href="#comparison"
                style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.espresso, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                Compare the two <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
        {/* Right: product imagery */}
        <div
          className="relative flex items-center justify-center overflow-hidden order-2"
          style={{ background: `radial-gradient(ellipse 90% 70% at 50% 45%, ${D.accentSoft} 0%, ${D.cream} 55%, ${D.paper} 100%)` }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex items-center justify-center gap-4 md:gap-6 w-full px-8 py-10"
          >
            <img src={classic.image} alt={classic.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[42%] max-w-[280px]" />
            <img src={mushroom.image} alt={mushroom.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[42%] max-w-[280px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}