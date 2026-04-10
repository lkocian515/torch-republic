import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TorchBoxFeature() {
  return (
    <section style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase block mb-8" style={{ color: 'rgba(201,162,74,0.5)' }}>
              Monthly Subscription
            </span>
            <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#F0EBE1', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Join the<br />Torchbearers.
            </h2>
            <p className="mb-10" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.4)', lineHeight: 1.9, fontWeight: 300, maxWidth: '400px' }}>
              Monthly drops. Limited releases. No noise.
            </p>

            <div className="space-y-4 mb-12">
              {['Exclusive monthly coffee drops', 'Limited-edition collector items', 'Early access before the public'].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C9A24A' }} />
                  <span className="font-mono text-xs" style={{ color: 'rgba(240,235,225,0.45)' }}>{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/TheTorchBox"
              className="inline-flex items-center gap-3 px-8 py-4 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-200"
              style={{ background: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Learn More
            </Link>
          </motion.div>

          {/* Right: Box image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/d7b6f1c99_Untitleddesign_20260310_044300_0000.png"
                alt="The Torch Box"
                className="w-full"
                style={{ opacity: 0.9 }}
              />
              {/* Subtle glow behind box */}
              <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-20" style={{ background: '#C9A24A', transform: 'scale(0.7)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}