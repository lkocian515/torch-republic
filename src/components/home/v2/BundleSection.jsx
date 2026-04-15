import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const INCLUDES = [
  'Washington Blend — Dark & Smoky',
  'Lincoln Blend — Bold & Full-Bodied',
  'Liberty Torch Blend — Rich & Smooth',
  'Founders tasting notes card',
  'Free shipping on your first order',
];

export default function BundleSection() {
  return (
    <section
      className="py-24 px-6 md:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(196,163,90,0.05) 0%, transparent 65%)' }} />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5" style={{ color: '#C9A24A' }}>
              Best Value · Starter Bundle
            </p>
            <h2 className="font-serif leading-tight mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Your First Order,<br />Done Right.
            </h2>
            <div className="h-px w-14 mb-7" style={{ background: 'linear-gradient(90deg, #C9A24A, transparent)' }} />
            <p className="font-heading mb-8" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.82)', fontWeight: 400, lineHeight: 1.95 }}>
              Not sure where to start? This 3-pack gives you the full Torch Republic experience — three legendary blends, one decision.
            </p>
            <ul className="space-y-3 mb-10">
              {INCLUDES.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C9A24A' }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 400, lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/Bundles"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-85 btn-glow"
              style={{ background: '#D4AE57', color: '#080808', fontWeight: 800, padding: '18px 44px' }}
            >
              Get the Bundle →
            </Link>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#111' }}>
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/24258672a_generated_image.png"
                alt="Founders Bundle"
                className="w-full h-full object-cover"
                style={{ opacity: 0.72, filter: 'brightness(1.05) contrast(1.06)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />

              {/* Price badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: 'rgba(201,162,74,0.7)' }}>3-Bag Bundle</p>
                    <p className="font-serif font-black" style={{ fontSize: '2.2rem', color: '#FFFFFF', lineHeight: 1 }}>$49.99</p>
                    <p className="font-mono text-xs line-through mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>$65.97</p>
                  </div>
                  <div className="px-3 py-1.5" style={{ background: '#D4AE57' }}>
                    <span className="font-mono text-[9px] font-black tracking-widest uppercase" style={{ color: '#080808' }}>Save 24%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}