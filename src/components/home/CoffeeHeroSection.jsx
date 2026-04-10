import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CoffeeHeroSection() {
  return (
    <div className="relative w-full min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#000' }}>

      {/* Background image — founders coffee */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/499adec76_file_00000000457c71f58ce4377bbc72d356.png"
          alt="Founders Series Coffee"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center', opacity: 0.55 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }} />
      </div>

      {/* Gold grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
      }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 py-32">
        <div className="max-w-[640px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>
              Founders Series — Now Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif leading-[1.0] tracking-tight text-white mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 800 }}
          >
            Carry the<br />
            <span style={{ color: '#C8A44D' }}>Flame.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="leading-relaxed mb-10"
            style={{ color: 'rgba(232,223,175,0.75)', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', maxWidth: '500px' }}
          >
            Coffee for those who think, build, and refuse to follow.
            Premium small-batch roasts honoring history's greatest figures — one collectible blend at a time.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="https://torch-republic.com/collections/coffee"
              className="inline-flex items-center justify-center px-8 py-4 font-heading font-black text-sm tracking-[0.2em] uppercase transition-all"
              style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C9A24A 100%)', color: '#fff', boxShadow: '0 4px 30px rgba(200,164,77,0.2)' }}
            >
              Shop the Founders Series
            </a>
            <a
              href="/TheTorchBox"
              className="inline-flex items-center justify-center px-8 py-4 font-heading font-black text-sm tracking-[0.2em] uppercase transition-all"
              style={{ background: 'transparent', border: '1px solid rgba(200,164,77,0.4)', color: '#C8A44D' }}
            >
              Join Torch Box →
            </a>
          </motion.div>

          {/* Trust micro-line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-10"
          >
            {['Small-Batch Roasted', 'Premium Arabica', 'Collectible Series'].map((item, i) => (
              <span key={i} className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(200,164,77,0.5)' }}>
                {i > 0 && <span className="mr-4" style={{ color: 'rgba(200,164,77,0.2)' }}>·</span>}
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #000, transparent)' }} />
    </div>
  );
}