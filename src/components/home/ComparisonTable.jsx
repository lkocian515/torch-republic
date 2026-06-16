import React from 'react';

const RG = '#E6B7AD';
const CHECK = '✓';
const PARTIAL = '◐';
const CROSS = '—';

const ROWS = [
  { feature: 'Instant preparation',        torch: CHECK,   typical: CROSS,    mush: PARTIAL, alt: CHECK  },
  { feature: 'Coffee-forward options',      torch: CHECK,   typical: CHECK,    mush: PARTIAL, alt: CROSS  },
  { feature: 'Mushroom coffee options',     torch: CHECK,   typical: CROSS,    mush: CHECK,   alt: CROSS  },
  { feature: 'Matcha options',             torch: CHECK,   typical: CROSS,    mush: CROSS,   alt: CHECK  },
  { feature: 'No machine needed',          torch: CHECK,   typical: CROSS,    mush: PARTIAL, alt: CHECK  },
  { feature: 'Bundle ritual system',       torch: CHECK,   typical: CROSS,    mush: PARTIAL, alt: CROSS  },
  { feature: 'Clear caffeine information', torch: CHECK,   typical: PARTIAL,  mush: PARTIAL, alt: PARTIAL },
  { feature: 'Ingredient transparency',    torch: CHECK,   typical: PARTIAL,  mush: PARTIAL, alt: PARTIAL },
  { feature: 'Founder-led brand',          torch: CHECK,   typical: CROSS,    mush: PARTIAL, alt: PARTIAL },
  { feature: 'Daily ritual positioning',   torch: CHECK,   typical: CROSS,    mush: CHECK,   alt: PARTIAL },
];

const COLS = [
  { label: 'Feature',                  key: 'feature',  highlight: false },
  { label: 'Torch Republic',           key: 'torch',    highlight: true  },
  { label: 'Typical Coffee',           key: 'typical',  highlight: false },
  { label: 'Typical Mushroom Coffee',  key: 'mush',     highlight: false },
  { label: 'Coffee Alternative',       key: 'alt',      highlight: false },
];

function Cell({ value, highlight }) {
  const color = value === CHECK
    ? '#10B981'
    : value === PARTIAL
    ? 'rgba(230,183,173,0.6)'
    : 'rgba(255,255,255,0.2)';
  return (
    <td
      className="text-center p-3 font-mono text-sm"
      style={{
        color,
        background: highlight ? 'rgba(230,183,173,0.06)' : 'transparent',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
      }}
    >
      {value}
    </td>
  );
}

export default function ComparisonTable() {
  return (
    <section className="px-4 md:px-10 py-16 md:py-24 relative" style={{ background: '#0D0C0B' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.9)' }}>
            How Torch Republic Compares
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            The Complete Ritual Brand
          </h2>
          <p className="font-heading max-w-xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.9)', fontWeight: 400, lineHeight: 1.85 }}>
            Torch Republic is one of the few brands offering classic coffee, mushroom coffee, and matcha in a single ritual collection — all instant, no machine required.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {COLS.map(col => (
                  <th
                    key={col.key}
                    className="p-3 text-left"
                    style={{
                      background: col.highlight ? `rgba(230,183,173,0.12)` : '#111',
                      color: col.highlight ? RG : 'rgba(240,235,225,0.85)',
                      fontSize: col.highlight ? '0.85rem' : '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      borderBottom: `2px solid ${col.highlight ? RG : 'rgba(230,183,173,0.12)'}`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#0F0E0D' : '#111' }}>
                  <td className="p-3" style={{ color: 'rgba(240,235,225,0.95)', fontSize: '0.83rem', borderBottom: '1px solid rgba(230,183,173,0.07)', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
                    {row.feature}
                  </td>
                  <Cell value={row.torch}   highlight />
                  <Cell value={row.typical} />
                  <Cell value={row.mush}    />
                  <Cell value={row.alt}     />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-mono text-[8px] tracking-[0.12em] mt-6 text-center" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>
          ✓ = Yes · ◐ = Varies by brand · — = Generally no. This is a general comparison and individual brands may differ.
        </p>
      </div>
    </section>
  );
}