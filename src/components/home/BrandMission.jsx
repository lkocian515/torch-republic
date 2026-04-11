import React from 'react';
import { motion } from 'framer-motion';

export default function BrandMission() {
  return (
    <section style={{ backgroundColor: '#06070D', borderTop: '1px solid rgba(196,163,90,0.07)', borderBottom: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[860px] mx-auto px-6 md:px-12 py-28 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.4))' }} />
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.45)' }}>
            Why We Exist
          </span>
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.4), transparent)' }} />
        </motion.div>

        {/* Mission statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-white"
          style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)', fontWeight: 600, lineHeight: 1.65, letterSpacing: '-0.01em', marginBottom: '2.5rem' }}
        >
          "Torch Republic exists to preserve, teach, and pass down<br className="hidden md:block" /> the ideas that built civilization — through everyday ritual.<br className="hidden md:block" />
          <span style={{ color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', fontWeight: 400 }}>
            {' '}Coffee is the medium. History is the message.<br className="hidden md:block" /> The flame is yours to carry.
          </span>"
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mb-10"
          style={{ height: '1px', width: '80px', background: 'rgba(196,163,90,0.35)', transformOrigin: 'center' }}
        />

        {/* Philosophy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.35)', lineHeight: 2, fontWeight: 300, maxWidth: '620px', margin: '0 auto 3rem' }}
        >
          Coffee is the most universal daily ritual on earth. By binding it to the greatest minds, warriors, and builders in history, Torch Republic turns a mundane act into a moment of intentionality. Every cup is a choice to engage with something bigger than yourself.
        </motion.p>

        {/* Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-mono uppercase tracking-[0.45em]" style={{ fontSize: '10px', color: 'rgba(196,163,90,0.65)' }}>
            Carry the Flame.
          </span>
          <span className="font-mono uppercase tracking-[0.35em]" style={{ fontSize: '9px', color: 'rgba(196,163,90,0.38)' }}>
            Live Free. &nbsp;·&nbsp; Stay Ready.
          </span>
        </motion.div>

      </div>
    </section>
  );
}