import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const RG = '#E6B7AD';

const BRANDS = [
  { name: 'Torch Republic', short: 'Torch Republic', highlight: true },
  { name: 'Ryze', short: 'Ryze', highlight: false },
  { name: 'Four Sigmatic', short: '4 Sigmatic', highlight: false },
  { name: 'MUD/WTR', short: 'MUD/WTR', highlight: false },
  { name: 'Everyday Dose', short: 'Everyday Dose', highlight: false },
];

// 'yes' | 'partial' | 'no'
const FEATURES = [
  { feature: 'Single-Origin Papua New Guinea Coffee', values: ['yes', 'no', 'no', 'no', 'no'] },
  { feature: 'Freeze-Dried Coffee',                   values: ['yes', 'partial', 'partial', 'no', 'partial'] },
  { feature: 'No Machine Needed',                    values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'No Pods Required',                      values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Instant Preparation',                   values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Mushroom Coffee Options',               values: ['yes', 'yes', 'yes', 'no', 'yes'] },
  { feature: 'Traditional Coffee Options',            values: ['yes', 'no', 'no', 'no', 'no'] },
  { feature: 'Matcha Options',                        values: ['yes', 'no', 'partial', 'no', 'no'] },
  { feature: 'Travel Friendly',                      values: ['yes', 'yes', 'yes', 'yes', 'yes'] },
  { feature: 'Wellness Ritual Focus',                values: ['yes', 'partial', 'partial', 'yes', 'partial'] },
];

function StatusCell({ status, highlight }) {
  if (status === 'yes') {
    return <Check size={16} style={{ color: highlight ? RG : '#10B981', display: 'inline-block' }} />;
  }
  const symbol = status === 'partial' ? '◐' : '—';
  const color = status === 'partial' ? 'rgba(230,183,173,0.5)' : 'rgba(255,255,255,0.2)';
  return <span style={{ color, fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>{symbol}</span>;
}

export default function PremiumComparisonTable() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: '#0D0C0B', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            How We Compare
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            One Brand. Three Rituals. Zero Compromise.
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.9 }}>
            A factual look at how Torch Republic compares to other brands in the instant coffee and wellness space — focused on what each brand actually offers.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="p-4 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)', borderBottom: '2px solid rgba(230,183,173,0.12)', width: '32%' }}>
                  Feature
                </th>
                {BRANDS.map((brand, i) => (
                  <th
                    key={i}
                    className="p-4 text-center font-mono text-[8px] tracking-[0.2em] uppercase"
                    style={{
                      color: brand.highlight ? RG : 'rgba(240,235,225,0.5)',
                      background: brand.highlight ? `${RG}10` : 'transparent',
                      borderBottom: `2px solid ${brand.highlight ? RG : 'rgba(230,183,173,0.12)'}`,
                    }}
                  >
                    {brand.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#0F0E0D' : '#11100F' }}>
                  <td className="p-4 font-heading text-sm" style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 400, borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
                    {row.feature}
                  </td>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className="p-4 text-center"
                      style={{
                        background: BRANDS[j].highlight ? `${RG}06` : 'transparent',
                        borderBottom: '1px solid rgba(230,183,173,0.06)',
                      }}
                    >
                      <StatusCell status={val} highlight={BRANDS[j].highlight} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <Check size={14} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.5)' }}>Yes</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'rgba(230,183,173,0.5)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>◐</span>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.5)' }}>Limited / Varies</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>—</span>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.5)' }}>No</span>
          </div>
        </div>

        <p className="font-mono text-[8px] tracking-[0.1em] mt-6 text-center max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1.8 }}>
          Based on publicly available product information as of 2025. Competitor offerings may change. This comparison is intended to be factual and educational, not a claim of superiority.
        </p>
      </div>
    </section>
  );
}