import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const AC = '#E6AC45';

export default function BecomeATorchbearer() {
  return (
    <section style={{ backgroundColor: '#080808', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[960px] mx-auto px-6 md:px-12 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Flame className="w-8 h-8 mx-auto mb-8" style={{ color: AC }} />

          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.5)' }}>
            What It Means to Be a Torchbearer
          </p>

          <h2 className="font-serif mb-7" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F7F2E9', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Carry the Flame.<br />
            <span style={{ color: AC }}>Build the Legacy.</span>
          </h2>

          <div className="space-y-5 max-w-[640px] mx-auto">
            <p style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.85 }}>
              A Torchbearer isn't just someone who drinks coffee. You're a collector, a historian, and a custodian of American legacy.
            </p>

            <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              Every monthly delivery connects you to the patriots and icons who shaped this nation. Every box tells a story. Every blend carries intention. Every membership is a deliberate act of purpose.
            </p>

            <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              This is premium coffee. This is collected history. This is a membership worth keeping.
            </p>
          </div>

          <div className="flex items-center justify-center gap-1 mt-12">
            <Flame className="w-3 h-3" style={{ color: AC }} />
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: AC }}>
              Limited Spots Monthly
            </p>
            <Flame className="w-3 h-3" style={{ color: AC }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}