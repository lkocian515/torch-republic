import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
});

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
            {...fadeUp(0)}
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
              <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.5))' }} />
              <Flame className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.8)' }} />
              <div className="h-px w-24" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.5), transparent)' }} />
            </div>
          </motion.div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

            {/* Left: Text */}
            <motion.div
              {...fadeUp(0.1)}
              className="flex-1 space-y-5"
            >
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                Torch Republic started small—just an idea during a time when the world felt uncertain.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                But it didn't stay small.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                What began as a creative outlet became a clear mission as conversations around freedom, responsibility, and independent thought took center stage. It became obvious that what you wear should stand for something.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                Built on a deep respect for the Constitution and what it represents, Torch Republic was established as an LLC in 2025—not just to grow, but to build something lasting.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                Not just a brand.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                A standard.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                Every piece reflects that commitment—intentional, grounded, and unapologetically clear in its message.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                This is for those who don't follow noise.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                They carry meaning.
              </p>
              <p className="text-base leading-[1.9]" style={{ color: '#EAEAEA' }}>
                Carry the flame.
              </p>
              <p
                className="text-sm font-mono tracking-[0.3em] uppercase pt-2"
                style={{ color: '#C9A24A' }}
              >
                — Lisa M. Kocian
              </p>
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