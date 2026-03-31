import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Check } from 'lucide-react';

const BULLETS = [
  'Exclusive patriotic gear each month',
  'Faith & freedom curated content',
  'Premium quality items, never generic',
  'Three tiers: Ember · Beacon · Blaze',
];

export default function TorchBoxBanner() {
  return (
    <section style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid rgba(201,162,74,0.08)', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden"
            style={{ minHeight: 'clamp(320px, 45vw, 600px)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80"
              alt="The Torch Box"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.5) saturate(0.7)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #0D0D0D 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.04) 0%, transparent 70%)' }} />

            {/* Box label overlay */}
            <div className="absolute bottom-8 left-8">
              <div className="inline-flex items-center gap-2 px-4 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(201,162,74,0.3)' }}>
                <Flame className="w-3.5 h-3.5" style={{ color: '#C9A24A' }} />
                <span className="font-mono text-[11px] tracking-[0.35em] uppercase" style={{ color: '#C9A24A' }}>Monthly Box</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center px-8 md:px-14 py-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
              <span className="font-mono text-[11px] tracking-[0.45em] uppercase" style={{ color: '#C9A24A' }}>Premium Subscription</span>
            </div>

            <h2
              className="font-serif font-bold text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              The Torch Box
            </h2>

            <p className="font-heading font-light text-base mb-10" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', maxWidth: '400px' }}>
              A monthly delivery for those who carry the flame. Curated gear for patriots who live what they believe.
            </p>

            <ul className="space-y-3 mb-12">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#C9A24A' }} />
                  <span className="font-mono text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.55)' }}>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://torchbearer-nation.sintra.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-mono text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }}
              >
                View Plans
              </a>
              <a
                href="https://torchbearer-nation.sintra.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-mono text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-300"
                style={{ border: '1px solid rgba(201,162,74,0.35)', color: 'rgba(201,162,74,0.85)' }}
              >
                Learn More →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}