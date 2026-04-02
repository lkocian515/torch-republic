import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden" style={{ minHeight: '88vh' }}>

      {/* Subtle background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(14,42,47,0.45) 0%, transparent 65%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 40% 40% at 20% 80%, rgba(200,164,77,0.04) 0%, transparent 70%)'
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16 py-20 md:py-28 min-h-[88vh]">

        {/* ── LEFT COLUMN ── */}
        <div className="flex-1 flex flex-col justify-center order-2 md:order-1">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 flex-shrink-0" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono uppercase tracking-[0.35em] text-[10px]" style={{ color: '#C8A44D' }}>
              Faith &nbsp;•&nbsp; Freedom &nbsp;•&nbsp; Truth
            </span>
            <div className="h-px w-8 flex-shrink-0" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="font-heading font-black leading-[1.05] tracking-tight text-white mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Premium Patriot Gear<br />
            <span style={{ color: '#D4AF5A' }}>Built for the Bold.</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="font-mono text-sm leading-relaxed mb-10 max-w-[400px]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Rugged apparel, accessories, and collectibles for patriots,
            believers, and freedom-lovers. Designed to last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to={createPageUrl('BestSellers')}
              className="inline-flex items-center justify-center font-heading font-black text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 hover:brightness-110 rounded-sm"
              style={{
                background: 'linear-gradient(135deg, #C8A44D 0%, #F0D080 50%, #C8A44D 100%)',
                color: '#000',
                boxShadow: '0 4px 28px rgba(200,164,77,0.35)',
              }}
            >
              Shop Bestsellers
            </Link>
            <Link
              to={createPageUrl('Collections')}
              className="inline-flex items-center justify-center font-heading font-black text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 rounded-sm border hover:bg-white/5"
              style={{ borderColor: 'rgba(200,164,77,0.4)', color: '#C8A44D' }}
            >
              Explore Collections
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-6 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { icon: ShieldCheck, label: 'Secure Checkout' },
              { icon: Truck, label: 'Ships from USA' },
              { icon: Star, label: '5-Star Rated' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C8A44D' }} />
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — Hero Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex-1 flex items-center justify-center order-1 md:order-2 w-full"
          style={{ maxWidth: 540 }}
        >
          <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-sm pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, rgba(200,164,77,0.12) 0%, transparent 70%)',
              transform: 'scale(1.08)',
            }} />
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/56cf651fe_ggrtgtrgrt.png"
              alt="Torch Republic Premium Patriot Gear"
              className="w-full h-full rounded-sm"
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                backgroundColor: '#080808',
                boxShadow: '0 0 0 1px rgba(200,164,77,0.15), 0 32px 80px rgba(0,0,0,0.7)',
              }}
            />
            {/* Bottom fade on image */}
            <div className="absolute bottom-0 left-0 right-0 h-24 rounded-b-sm pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
          </div>
        </motion.div>

      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000, transparent)' }} />
    </section>
  );
}