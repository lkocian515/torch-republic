/**
 * Shared layout component for all rich competitor comparison pages
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, X, ChevronDown, Scale } from 'lucide-react';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

// ── Comparison table row
function TableRow({ label, tr, them, trWins }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
      <td className="py-3.5 pr-4 font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, width: '30%' }}>{label}</td>
      <td className="py-3.5 px-3 font-heading text-sm text-center" style={{ color: trWins ? '#F5EFE6' : 'rgba(240,235,225,0.8)', background: trWins ? `${RG}08` : 'transparent', width: '35%' }}>
        {trWins && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 mb-0.5 align-middle" style={{ background: EMERALD }} />}
        {tr}
      </td>
      <td className="py-3.5 pl-3 font-heading text-sm text-center" style={{ color: 'rgba(240,235,225,0.45)', width: '35%' }}>{them}</td>
    </tr>
  );
}

// ── FAQ accordion item
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-heading text-sm font-medium" style={{ color: '#F5EFE6', lineHeight: 1.45 }}>{question}</span>
        <ChevronDown size={16} style={{ color: 'rgba(230,183,173,0.4)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </button>
      {open && (
        <p className="pb-5 font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.85 }}>{answer}</p>
      )}
    </div>
  );
}

export default function ComparisonDetailPage({ data }) {
  const {
    competitor, title, metaTitle, intro, tableRows, bodySection, ourEdge, theirEdge,
    products, faqs, relatedComparisons, verdict, researchLink
  } = data;

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Home</Link>
          <span style={{ color: 'rgba(230,183,173,0.2)', fontSize: 10 }}>›</span>
          <Link to="/compare" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Compare</Link>
          <span style={{ color: 'rgba(230,183,173,0.2)', fontSize: 10 }}>›</span>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>{competitor}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-12 pb-14" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)' }}>
              <Scale size={10} style={{ color: RG }} />
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>Honest Comparison</span>
            </div>
            <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', color: '#F5EFE6', lineHeight: 1.12 }}>
              {title}
            </h1>
            <p className="font-heading max-w-2xl" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.9 }}>
              {intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Side-by-Side Table */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.45)' }}>At a Glance</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.2)' }}>
                  <th className="py-3 pr-4 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)', width: '30%' }}>Category</th>
                  <th className="py-3 px-3 text-center font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: RG, width: '35%' }}>Torch Republic</th>
                  <th className="py-3 pl-3 text-center font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)', width: '35%' }}>{competitor}</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <TableRow key={i} {...row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pros/Cons Cards */}
      <section className="px-6 md:px-10 py-6 pb-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-6" style={{ background: '#0F0E0D', border: `2px solid ${RG}28` }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>Torch Republic Advantages</p>
            <ul className="space-y-3">
              {ourEdge.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.55 }}>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>{competitor} Advantages</p>
            <ul className="space-y-3">
              {theirEdge.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.4)', fontWeight: 300, lineHeight: 1.55 }}>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Body Content Sections */}
      <section className="px-6 md:px-10 py-10" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-3xl mx-auto space-y-12">
          {bodySection.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', color: '#F5EFE6' }}>{s.heading}</h2>
              {s.body.split('\n\n').map((para, j) => (
                <p key={j} className="font-heading mb-4" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.62)', fontWeight: 300, lineHeight: 1.95 }}>{para}</p>
              ))}
            </motion.div>
          ))}

          {/* Cross-link to the full research article — concise, not duplicated content */}
          {researchLink && (
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-8 p-5" style={{ background: `${RG}06`, border: `1px solid ${RG}20`, borderLeft: `3px solid ${RG}` }}>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: RG }}>{researchLink.eyebrow || 'The Deeper Research'}</p>
              <p className="font-heading mb-3" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.75, fontSize: '0.95rem' }}>
                {researchLink.text}
              </p>
              <Link to={researchLink.to} className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.25em] uppercase font-bold transition-opacity hover:opacity-80" style={{ color: RG }}>
                {researchLink.label || 'Read the full research guide'} <ArrowRight size={11} />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
      <section className="px-6 md:px-10 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-7" style={{ background: `${RG}08`, border: `1px solid ${RG}22` }}>
            <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>Our Verdict</p>
            <p className="font-heading" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.85)', fontWeight: 300, lineHeight: 1.9 }}>{verdict}</p>
          </motion.div>
        </div>
      </section>

      {/* Product CTAs */}
      <section className="px-6 md:px-10 py-10" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>Try Torch Republic</p>
          <div className="flex flex-wrap gap-3">
            {products.map((p, i) => (
              <Link key={i} to={p.path}
                className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase font-bold py-3 px-5 transition-all hover:opacity-90"
                style={{ background: i === 0 ? RG : 'transparent', color: i === 0 ? '#080808' : RG, border: `1px solid ${RG}${i === 0 ? '' : '45'}` }}>
                {p.name} <ArrowRight size={11} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs?.length > 0 && (
        <section className="px-6 md:px-10 py-14" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Frequently Asked</p>
            <div>
              {faqs.map((f, i) => <FAQItem key={i} {...f} />)}
            </div>
          </div>
        </section>
      )}

      {/* Other Comparisons */}
      {relatedComparisons?.length > 0 && (
        <section className="px-6 md:px-10 py-12" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>More Comparisons</p>
            <div className="flex flex-wrap gap-3">
              {relatedComparisons.map((r, i) => (
                <Link key={i} to={`/compare/${r.slug}`}
                  className="font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: '1px solid rgba(230,183,173,0.15)', color: 'rgba(230,183,173,0.5)' }}>
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.18)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease. Competitor information is based on publicly available data as of June 2025.
        </p>
      </div>
    </div>
  );
}