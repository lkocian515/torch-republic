import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

// Compact Torch Republic vs traditional brewing comparison.
// Balanced tone — does not disparage traditional coffee or make
// unsupported environmental claims.
const TORCH_ROWS = [
  'Ready in seconds',
  'No machine required',
  'No pods or capsules',
  'Minimal cleanup',
  'Easy to make hot or iced',
  'One pouch travels easily',
];

const TRADITIONAL_ROWS = [
  'Brewing time required',
  'Equipment commonly needed',
  'Filters, pods, or extra components',
  'More cleanup',
  'Less convenient away from home',
  'Tied to a counter or outlet',
];

export default function RitualConvenienceComparison() {
  return (
    <section style={{ background: '#F7F2E9' }}>
      <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#E6AC45' }}>
            Why Instant
          </p>
          <h2
            className="mt-4 font-serif font-semibold"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#32190F', textWrap: 'balance' }}
          >
            Your ritual, without the equipment.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Torch Republic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-torch p-6 md:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: '#EFE5D6' }}
              >
                <Check size={18} style={{ color: '#264A35' }} />
              </div>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.15rem', color: '#32190F' }}>
                Torch Republic
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {TORCH_ROWS.map((row) => (
                <li key={row} className="flex items-start gap-3">
                  <span
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#264A35', marginTop: 8, flexShrink: 0,
                    }}
                  />
                  <span className="font-heading text-sm" style={{ color: '#32190F', lineHeight: 1.6 }}>
                    {row}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Traditional brewing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="p-6 md:p-7"
            style={{
              background: '#F7F2E9',
              border: '1px solid #B89A6D',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: '#F0E7DB' }}
              >
                <X size={18} style={{ color: '#5E4639' }} />
              </div>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.15rem', color: '#5E4639' }}>
                Traditional brewing
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {TRADITIONAL_ROWS.map((row) => (
                <li key={row} className="flex items-start gap-3">
                  <span
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#D8C9B6', marginTop: 8, flexShrink: 0,
                    }}
                  />
                  <span className="font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.6 }}>
                    {row}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}