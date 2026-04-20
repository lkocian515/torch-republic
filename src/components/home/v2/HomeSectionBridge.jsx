import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

/**
 * HomeSectionBridge — conversion bridge between page sections.
 * Drives users from Product → Collection → Subscription.
 */
export default function HomeSectionBridge({ label, heading, body, ctaLabel, ctaHref, secondary, compact = false }) {
  const py = compact ? 'py-12 md:py-16' : 'py-16 md:py-24';

  return (
    <section style={{ background: '#060606', borderTop: '1px solid rgba(201,162,74,0.1)', borderBottom: '1px solid rgba(201,162,74,0.1)' }}>
      <div className={`max-w-[860px] mx-auto px-6 md:px-12 ${py} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {label && (
            <div className="flex items-center justify-center gap-3 mb-5">
              <div style={{ width: 24, height: 1, background: 'rgba(201,162,74,0.4)' }} />
              <p className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>{label}</p>
              <div style={{ width: 24, height: 1, background: 'rgba(201,162,74,0.4)' }} />
            </div>
          )}

          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {heading}
          </h2>

          {body && (
            <p className="font-heading mb-8" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.5)', fontWeight: 400, lineHeight: 1.85, maxWidth: '480px', margin: '0 auto 2rem' }}>
              {body}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 font-mono font-black text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-90 btn-glow"
              style={{ background: '#C9A24A', color: '#080808', padding: '16px 36px' }}
            >
              <Flame className="w-3.5 h-3.5" />
              {ctaLabel}
            </Link>
            {secondary && (
              <Link
                to={secondary.href}
                className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
                style={{ color: 'rgba(201,162,74,0.55)', borderBottom: '1px solid rgba(201,162,74,0.2)', paddingBottom: '2px' }}
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}