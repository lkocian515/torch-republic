import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function FounderSection() {
  return (
    <>
      {/* Founder Section */}
      <section
        className="py-24 px-6"
        style={{ background: 'linear-gradient(180deg, #0B0B0B 0%, #111111 100%)', borderTop: '1px solid rgba(201,162,74,0.15)' }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-xs tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.6)' }}>
              Established 2025
            </p>
            <h2
              className="text-3xl md:text-4xl font-serif tracking-wide"
              style={{ color: '#C9A24A', letterSpacing: '0.06em' }}
            >
              Meet the Founder
            </h2>
            {/* Gold divider */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.5))' }} />
              <Flame className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.7)' }} />
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.5), transparent)' }} />
            </div>
          </motion.div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 space-y-5"
            >
              <p className="text-base leading-[1.85]" style={{ color: '#EAEAEA' }}>
                Torch Republic began as a small Etsy shop during the COVID era—created during a time when the world felt uncertain and the meaning of freedom felt more personal than ever. What started as a creative outlet quickly became something more intentional.
              </p>
              <p className="text-base leading-[1.85]" style={{ color: '#EAEAEA' }}>
                As conversations around rights, responsibility, and individual thought became more prominent, so did the purpose behind the brand. Built on a deep respect for the Constitution and the principles it represents, Torch Republic was officially established as an LLC in 2025—marking its transition from a small independent shop into a structured, mission-driven company.
              </p>
              <p className="text-base leading-[1.85]" style={{ color: '#EAEAEA' }}>
                Every piece created reflects that foundation: thoughtful, deliberate, and grounded in the belief that what you stand for should be reflected in what you wear.
              </p>
              <p className="text-base leading-[1.85]" style={{ color: '#CCCCCC' }}>
                Behind the brand is a founder committed to building something lasting—not just a store, but a standard. One rooted in clarity, independence, and quiet confidence.
              </p>
              <p
                className="text-base font-serif tracking-widest uppercase pt-2"
                style={{ color: '#C9A24A', letterSpacing: '0.2em' }}
              >
                Carry the flame.
              </p>
            </motion.div>

            {/* Right: Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 flex flex-col items-center md:items-start"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: '220px',
                  borderRadius: '4px',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,162,74,0.18)',
                }}
              >
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
                    opacity: 0.35,
                    mixBlendMode: 'overlay',
                  }}
                />
                <img
                  src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/bcb486ec5_ghgyugf.png"
                  alt="Torch Republic Founder"
                  className="w-full block"
                  style={{
                    filter: 'grayscale(100%) contrast(0.88) brightness(0.95)',
                    display: 'block',
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Micro trust strip */}
      <div
        className="py-5 px-6 text-center"
        style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.1)' }}
      >
        <p className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>
          Established 2025 &nbsp;•&nbsp; USA-Based &nbsp;•&nbsp; Small Business &nbsp;•&nbsp; Built with Purpose. Not Mass-Produced.
        </p>
      </div>
    </>
  );
}