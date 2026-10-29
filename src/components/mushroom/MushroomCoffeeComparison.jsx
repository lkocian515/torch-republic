import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

const RG = '#E6B7AD';

// ─── Comparison Data ──────────────────────────────────────────────────────────

const COMPARISON_DATA = {
  'mushroom-coffee': {
    headline: 'How We Compare to Popular Mushroom Coffee Brands',
    subhead: "We did the ingredient homework so you don't have to. Here's how Torch Republic stacks up on the details that matter.",
    columns: [
      { key: 'torch', label: 'Torch Republic', accent: RG, highlight: true },
      { key: 'mudwtr', label: 'MUD\\WTR', accent: 'rgba(255,255,255,0.3)', highlight: false },
      { key: 'ryze', label: 'Ryze', accent: 'rgba(255,255,255,0.3)', highlight: false },
      { key: 'foursig', label: 'Four Sigmatic', accent: 'rgba(255,255,255,0.3)', highlight: false },
    ],
    rows: [
      {
        category: 'Ingredients',
        label: "Lion's Mane included",
        values: {
          torch: { type: 'yes', note: 'Dual mushroom blend' },
          mudwtr: { type: 'yes', note: 'Included' },
          ryze: { type: 'yes', note: 'Included' },
          foursig: { type: 'yes', note: 'Included' },
        },
      },
      {
        category: 'Ingredients',
        label: 'Reishi & Cordyceps included',
        values: {
          torch: { type: 'yes', note: 'Full Reishi + Cordyceps extract' },
          mudwtr: { type: 'yes', note: 'Included' },
          ryze: { type: 'yes', note: 'Included' },
          foursig: { type: 'partial', note: 'Select SKUs only' },
        },
      },
      {
        category: 'Ingredients',
        label: 'Real Arabica coffee base',
        values: {
          torch: { type: 'yes', note: 'Specialty Arabica' },
          mudwtr: { type: 'no', note: 'No coffee — masala chai base' },
          ryze: { type: 'yes', note: 'Included' },
          foursig: { type: 'yes', note: 'Included' },
        },
      },
      {
        category: 'Ingredients',
        label: 'No artificial flavors or fillers',
        values: {
          torch: { type: 'yes', note: 'Clean label' },
          mudwtr: { type: 'yes', note: 'Clean label' },
          ryze: { type: 'yes', note: 'Clean label' },
          foursig: { type: 'yes', note: 'Clean label' },
        },
      },
      {
        category: 'Format & Convenience',
        label: 'Instant — no machine or pods',
        values: {
          torch: { type: 'yes', note: 'Just add water' },
          mudwtr: { type: 'yes', note: 'Just add water' },
          ryze: { type: 'yes', note: 'Just add water' },
          foursig: { type: 'partial', note: 'Mix & pod options' },
        },
      },
      {
        category: 'Format & Convenience',
        label: 'Servings per container',
        values: {
          torch: { type: 'text', note: '27 servings' },
          mudwtr: { type: 'text', note: '30 servings' },
          ryze: { type: 'text', note: '30 servings' },
          foursig: { type: 'text', note: '10–30 servings' },
        },
      },
      {
        category: 'Format & Convenience',
        label: 'Cost per serving',
        values: {
          torch: { type: 'text', note: '~$1.30' },
          mudwtr: { type: 'text', note: '~$2.00+' },
          ryze: { type: 'text', note: '~$1.70' },
          foursig: { type: 'text', note: '~$2.50+' },
        },
      },
      {
        category: 'Experience',
        label: 'Coffee-forward taste',
        values: {
          torch: { type: 'yes', note: 'Tastes like premium coffee' },
          mudwtr: { type: 'no', note: 'Chai / spice flavored — no coffee' },
          ryze: { type: 'yes', note: 'Coffee taste' },
          foursig: { type: 'yes', note: 'Coffee taste' },
        },
      },
      {
        category: 'Experience',
        label: 'Classic coffee option (no mushrooms)',
        values: {
          torch: { type: 'yes', note: 'Dedicated classic line' },
          mudwtr: { type: 'no', note: 'All products have mushrooms' },
          ryze: { type: 'no', note: 'Mushroom-only' },
          foursig: { type: 'partial', note: 'Limited SKUs' },
        },
      },
      {
        category: 'Experience',
        label: 'Ceremonial matcha option',
        values: {
          torch: { type: 'yes', note: 'Dedicated matcha line' },
          mudwtr: { type: 'partial', note: 'Matcha SKU available' },
          ryze: { type: 'no', note: 'Not available' },
          foursig: { type: 'partial', note: 'Select products' },
        },
      },
    ],
  },

  matcha: {
    headline: 'How Our Matcha Compares to Leading Brands',
    subhead: 'Grade, sourcing, and format matter more than marketing. Here is exactly how Torch Republic matcha stacks up.',
    columns: [
      { key: 'torch', label: 'Torch Republic', accent: RG, highlight: true },
      { key: 'mudwtr', label: 'MUD\\WTR Matcha', accent: 'rgba(255,255,255,0.3)', highlight: false },
      { key: 'pique', label: 'Pique Tea', accent: 'rgba(255,255,255,0.3)', highlight: false },
      { key: 'ippodo', label: 'Typical Matcha', accent: 'rgba(255,255,255,0.3)', highlight: false },
    ],
    rows: [
      {
        category: 'Quality',
        label: '100% Ceremonial grade',
        values: {
          torch: { type: 'yes', note: 'Ceremonial grade' },
          mudwtr: { type: 'partial', note: 'Ceremonial blend' },
          pique: { type: 'yes', note: 'Ceremonial grade' },
          ippodo: { type: 'partial', note: 'Grade varies by product' },
        },
      },
      {
        category: 'Quality',
        label: 'No added sugars or flavors',
        values: {
          torch: { type: 'yes', note: 'Pure matcha only' },
          mudwtr: { type: 'yes', note: 'Clean label' },
          pique: { type: 'yes', note: 'Clean label' },
          ippodo: { type: 'partial', note: 'Check product label' },
        },
      },
      {
        category: 'Quality',
        label: 'High EGCG antioxidant content',
        values: {
          torch: { type: 'yes', note: 'Ceremonial-grade EGCG density' },
          mudwtr: { type: 'partial', note: 'Not specified' },
          pique: { type: 'yes', note: 'Triple-screen tested' },
          ippodo: { type: 'partial', note: 'Varies by processing' },
        },
      },
      {
        category: 'Format',
        label: 'Instant — no whisking required',
        values: {
          torch: { type: 'yes', note: 'Dissolves instantly' },
          mudwtr: { type: 'yes', note: 'Instant format' },
          pique: { type: 'yes', note: 'Crystal format' },
          ippodo: { type: 'no', note: 'Requires whisking' },
        },
      },
      {
        category: 'Format',
        label: 'Cost per serving',
        values: {
          torch: { type: 'text', note: '~$1.20' },
          mudwtr: { type: 'text', note: '~$2.00+' },
          pique: { type: 'text', note: '~$2.50+' },
          ippodo: { type: 'text', note: '~$2.00+' },
        },
      },
      {
        category: 'Benefits',
        label: 'Natural L-Theanine (calm focus)',
        values: {
          torch: { type: 'yes', note: 'Naturally present' },
          mudwtr: { type: 'yes', note: 'Naturally present' },
          pique: { type: 'yes', note: 'Naturally present' },
          ippodo: { type: 'yes', note: 'Naturally present' },
        },
      },
      {
        category: 'Benefits',
        label: 'No coffee anxiety / jitters',
        values: {
          torch: { type: 'yes', note: 'Smooth caffeine from matcha' },
          mudwtr: { type: 'yes', note: 'Low caffeine' },
          pique: { type: 'yes', note: 'Smooth caffeine' },
          ippodo: { type: 'partial', note: 'Depends on preparation' },
        },
      },
    ],
  },

  'classic-coffee': {
    headline: 'How We Compare to Other Premium Instant Coffees',
    subhead: 'Not all instant coffee is created equal. Arabica grade, roast profile, and format define the cup quality.',
    columns: [
      { key: 'torch', label: 'Torch Republic', accent: RG, highlight: true },
      { key: 'waka', label: 'Waka Coffee', accent: 'rgba(255,255,255,0.3)', highlight: false },
      { key: 'voila', label: 'Voilà', accent: 'rgba(255,255,255,0.3)', highlight: false },
      { key: 'nescafe', label: 'Nescafé Gold', accent: 'rgba(255,255,255,0.3)', highlight: false },
    ],
    rows: [
      {
        category: 'Quality',
        label: '100% Arabica beans',
        values: {
          torch: { type: 'yes', note: 'Specialty Arabica' },
          waka: { type: 'yes', note: '100% Arabica' },
          voila: { type: 'yes', note: '100% Arabica' },
          nescafe: { type: 'partial', note: 'Arabica/Robusta blend' },
        },
      },
      {
        category: 'Quality',
        label: 'No artificial additives',
        values: {
          torch: { type: 'yes', note: 'Clean label' },
          waka: { type: 'yes', note: 'Clean label' },
          voila: { type: 'yes', note: 'Clean label' },
          nescafe: { type: 'partial', note: 'Contains additives (Gold Blend)' },
        },
      },
      {
        category: 'Quality',
        label: 'Multiple roast profiles',
        values: {
          torch: { type: 'yes', note: 'Multiple roasts available' },
          waka: { type: 'yes', note: 'Light & medium' },
          voila: { type: 'partial', note: 'Limited options' },
          nescafe: { type: 'yes', note: 'Multiple roasts' },
        },
      },
      {
        category: 'Format',
        label: 'No pods or machine needed',
        values: {
          torch: { type: 'yes', note: 'Pure instant powder' },
          waka: { type: 'yes', note: 'Pure instant powder' },
          voila: { type: 'yes', note: 'Filter packet format' },
          nescafe: { type: 'yes', note: 'Pure instant powder' },
        },
      },
      {
        category: 'Format',
        label: 'Servings per container',
        values: {
          torch: { type: 'text', note: '27 servings' },
          waka: { type: 'text', note: '~30 servings' },
          voila: { type: 'text', note: '6–12 packets' },
          nescafe: { type: 'text', note: '~55 servings' },
        },
      },
      {
        category: 'Format',
        label: 'Cost per serving',
        values: {
          torch: { type: 'text', note: '~$1.30' },
          waka: { type: 'text', note: '~$1.50' },
          voila: { type: 'text', note: '~$2.50+' },
          nescafe: { type: 'text', note: '~$0.70' },
        },
      },
      {
        category: 'Experience',
        label: 'Functional mushroom option',
        values: {
          torch: { type: 'yes', note: 'Dedicated mushroom line' },
          waka: { type: 'no', note: 'Coffee only' },
          voila: { type: 'no', note: 'Coffee only' },
          nescafe: { type: 'no', note: 'Coffee only' },
        },
      },
      {
        category: 'Experience',
        label: 'Ceremonial matcha option',
        values: {
          torch: { type: 'yes', note: 'Dedicated matcha line' },
          waka: { type: 'no', note: 'Not available' },
          voila: { type: 'no', note: 'Not available' },
          nescafe: { type: 'no', note: 'Not available' },
        },
      },
    ],
  },
};

// ─── Cell renderer ────────────────────────────────────────────────────────────

function Cell({ value, accent, isHighlight }) {
  if (!value) return <td className="px-3 py-3.5" />;

  const { type, note } = value;

  if (type === 'yes') {
    return (
      <td className="px-3 py-3.5 text-center">
        <div className="flex flex-col items-center gap-1">
          <Check className="w-4 h-4" style={{ color: isHighlight ? RG : '#6CBD5A' }} />
          {note && (
            <span className="font-mono text-[7px] tracking-[0.1em]" style={{ color: isHighlight ? `${RG}80` : 'rgba(247,241,232,0.35)' }}>
              {note}
            </span>
          )}
        </div>
      </td>
    );
  }
  if (type === 'no') {
    return (
      <td className="px-3 py-3.5 text-center">
        <div className="flex flex-col items-center gap-1">
          <X className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
          {note && (
            <span className="font-mono text-[7px] tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {note}
            </span>
          )}
        </div>
      </td>
    );
  }
  if (type === 'partial') {
    return (
      <td className="px-3 py-3.5 text-center">
        <div className="flex flex-col items-center gap-1">
          <Minus className="w-4 h-4" style={{ color: 'rgba(255,200,100,0.5)' }} />
          {note && (
            <span className="font-mono text-[7px] tracking-[0.1em]" style={{ color: 'rgba(255,200,100,0.4)' }}>
              {note}
            </span>
          )}
        </div>
      </td>
    );
  }
  // type === 'text'
  return (
    <td className="px-3 py-3.5 text-center">
      <span className="font-mono text-[9px] tracking-[0.1em]" style={{ color: isHighlight ? '#F7F1E8' : 'rgba(247,241,232,0.45)' }}>
        {note}
      </span>
    </td>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function MushroomCoffeeComparison({ productName, product }) {
  // Support being called with either product object or just productName + category inferred
  const category = product?.category || 'mushroom-coffee';
  const data = COMPARISON_DATA[category] || COMPARISON_DATA['mushroom-coffee'];

  // Group rows by category
  const categories = [...new Set(data.rows.map(r => r.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="w-full my-14"
    >
      {/* Header */}
      <div className="mb-6">
        <p className="font-mono text-[8px] tracking-[0.45em] uppercase mb-2" style={{ color: `${RG}60` }}>
          Comparison
        </p>
        <h2 className="font-serif font-bold text-white mb-2" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          {data.headline}
        </h2>
        <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.7, maxWidth: '600px' }}>
          {data.subhead}
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-5 flex-wrap">
        {[
          { icon: Check, color: '#6CBD5A', label: 'Yes / Included' },
          { icon: Minus, color: 'rgba(255,200,100,0.6)', label: 'Partial / Varies' },
          { icon: X, color: 'rgba(255,255,255,0.2)', label: 'No / Not available' },
        ].map(({ icon: Icon, color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon className="w-3 h-3" style={{ color }} />
            <span className="font-mono text-[7.5px] tracking-[0.15em] uppercase" style={{ color: 'rgba(247,241,232,0.35)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Table — scrollable on mobile */}
      <div className="overflow-x-auto" style={{ border: '1px solid rgba(230,183,173,0.1)' }}>
        <table className="w-full min-w-[560px] border-collapse">
          {/* Column headers */}
          <thead>
            <tr>
              <th className="text-left px-4 py-4 w-48" style={{ borderBottom: '1px solid rgba(230,183,173,0.1)', background: 'rgba(0,0,0,0.3)' }}>
                <span className="font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  Feature
                </span>
              </th>
              {data.columns.map(col => (
                <th
                  key={col.key}
                  className="px-3 py-4 text-center"
                  style={{
                    borderBottom: `2px solid ${col.highlight ? RG + '50' : 'rgba(255,255,255,0.06)'}`,
                    background: col.highlight ? `${RG}08` : 'rgba(0,0,0,0.3)',
                  }}
                >
                  <span
                    className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold"
                    style={{ color: col.highlight ? RG : 'rgba(255,255,255,0.3)' }}
                  >
                    {col.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {categories.map((cat, catIdx) => {
              const catRows = data.rows.filter(r => r.category === cat);
              return (
                <React.Fragment key={cat}>
                  {/* Category divider row */}
                  <tr>
                    <td
                      colSpan={data.columns.length + 1}
                      className="px-4 py-2"
                      style={{ background: 'rgba(230,183,173,0.04)', borderTop: catIdx > 0 ? '1px solid rgba(230,183,173,0.06)' : 'none' }}
                    >
                      <span className="font-mono text-[7px] tracking-[0.4em] uppercase" style={{ color: `${RG}50` }}>
                        {cat}
                      </span>
                    </td>
                  </tr>

                  {/* Data rows */}
                  {catRows.map((row, rowIdx) => (
                    <tr
                      key={row.label}
                      style={{
                        background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.15)',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}
                    >
                      {/* Row label */}
                      <td className="px-4 py-3.5">
                        <span className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300 }}>
                          {row.label}
                        </span>
                      </td>

                      {/* Values per column */}
                      {data.columns.map(col => (
                        <Cell
                          key={col.key}
                          value={row.values[col.key]}
                          accent={col.accent}
                          isHighlight={col.highlight}
                        />
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <p className="font-mono text-[7px] tracking-[0.12em] leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
        Competitor information based on publicly available product labels and websites as of 2025. Formulations, pricing, and availability may change. Torch Republic is not affiliated with any competitor brands mentioned above.
      </p>
    </motion.div>
  );
}