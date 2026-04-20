import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock } from 'lucide-react';

const AC = '#C9A24A';

export default function ThisMonthFeature() {
  return (
    <section style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(201,162,74,0.15) 0%, transparent 65%)`,
                  filter: 'blur(40px)',
                }}
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/washington-blend-hero.jpg"
                alt="This Month's Feature"
                className="relative z-10 max-w-[300px] w-full object-contain"
                style={{ opacity: 0.9 }}
              />
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4" style={{ color: AC }} />
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: AC }}>
                    April 2026 Feature
                  </p>
                </div>
                <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Washington Blend Pods
                </h2>
                <p style={{ color: 'rgba(240,235,225,0.6)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>
                  Bold. Disciplined. The foundation of every collection. This month's featured blend in all three tiers — plus exclusive collector insert with Washington historical facts and member-only QR experience.
                </p>
              </div>

              <div className="flex items-center gap-3 p-5" style={{ background: `${AC}12`, border: `1px solid ${AC}30` }}>
                <Clock className="w-5 h-5 flex-shrink-0" style={{ color: AC }} />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: AC }}>
                    Subscription Window
                  </p>
                  <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.85rem', fontWeight: 300 }}>
                    Next shipment closes April 30. Secure your box today.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#tiers"
                  className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.28em] uppercase transition-all hover:opacity-90"
                  style={{ background: AC, color: '#0B0B0B', fontWeight: 800, padding: '14px 32px' }}
                >
                  Join for This Month
                </a>
                <a
                  href="https://torch-republic.com/products/washington-blend-coffee-pods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.25em] uppercase transition-all hover:opacity-75"
                  style={{ color: AC, border: `1px solid ${AC}45`, padding: '14px 24px' }}
                >
                  Buy One-Time
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}