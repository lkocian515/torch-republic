import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Check } from 'lucide-react';

const PERKS = [
  'Freshly roasted blends delivered monthly',
  'First access to limited & retiring drops',
  'Exclusive Torchbearer pricing & bonuses',
];

export default function TorchBoxIntro() {
  return (
    <section
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(196,163,90,0.05) 0%, transparent 70%)'
      }} />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: '#111' }}>
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5b60912f0_generated_image.png"
                alt="The Torch Box"
                className="w-full h-full object-cover"
                style={{ opacity: 0.78, filter: 'brightness(1.08) contrast(1.05)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
              <div className="absolute bottom-6 left-6">
                <p className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: 'rgba(201,162,74,0.7)' }}>
                  Starting at
                </p>
                <p className="font-serif font-black" style={{ fontSize: '2.4rem', color: '#FFFCF7', lineHeight: 1 }}>
                  $39<span className="text-lg font-mono font-normal" style={{ color: 'rgba(255,255,255,0.5)' }}>/mo</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Flame className="w-4 h-4" style={{ color: '#E6AC45' }} />
              <p className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#E6AC45' }}>
                Subscription
              </p>
            </div>

            <h2 className="font-serif leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#FFFCF7', letterSpacing: '-0.02em' }}>
              The Torch Box
            </h2>

            <div className="h-px w-12 mb-6" style={{ background: 'linear-gradient(90deg, #E6AC45, transparent)' }} />

            <p className="font-heading mb-8" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.82)', fontWeight: 400, lineHeight: 1.95 }}>
              A monthly ritual for those who carry the flame. Fresh small-batch coffee, curated for your commitment.
            </p>

            <ul className="space-y-3 mb-10">
              {PERKS.map((perk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#E6AC45' }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.85)', lineHeight: 1.7 }}>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/TheTorchBox"
                className="inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-85 btn-glow"
                style={{ background: '#E6AC45', color: '#080808', fontWeight: 800, padding: '17px 40px' }}
              >
                Join the Torch Box →
              </Link>
              <Link
                to="/TheTorchBox"
                className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:opacity-75"
                style={{ color: 'rgba(196,163,90,0.7)', border: '1px solid rgba(196,163,90,0.25)', padding: '17px 28px' }}
              >
                Learn More
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}