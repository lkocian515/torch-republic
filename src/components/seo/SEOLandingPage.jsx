import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';

const RG = '#E6B7AD';

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-heading text-sm font-medium" style={{ color: '#F5EFE6', lineHeight: 1.45 }}>{question}</span>
        <ChevronDown size={16} style={{ color: 'rgba(230,183,173,0.4)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
      </button>
      {open && <p className="pb-5 font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.85 }}>{answer}</p>}
    </div>
  );
}

export default function SEOLandingPage({ seo, breadcrumb, hero, sections, features, faqs, products, cta }) {
  useSEO(seo);

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <div className="max-w-4xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Home</Link>
          <span style={{ color: 'rgba(230,183,173,0.2)', fontSize: 10 }}>›</span>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>{breadcrumb}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-12 pb-14" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>{hero.eyebrow}</p>
            <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', color: '#F5EFE6', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
              {hero.title}
            </h1>
            <p className="font-heading max-w-2xl" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.9 }}>
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', color: '#F5EFE6' }}>{s.heading}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="font-heading mb-4" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.62)', fontWeight: 300, lineHeight: 1.95 }}>{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-2 mt-4">
                  {s.bullets.map((b, k) => (
                    <li key={k} className="flex items-start gap-3">
                      <Check size={14} className="flex-shrink-0 mt-1" style={{ color: RG }} />
                      <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.7 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      {features && (
        <section className="px-6 md:px-10 py-10" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                  <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.1rem', color: '#F5EFE6' }}>{f.title}</h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{f.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="px-6 md:px-10 py-14" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Frequently Asked</p>
            <div>{faqs.map((f, i) => <FAQItem key={i} {...f} />)}</div>
          </div>
        </section>
      )}

      {/* Product Recommendations */}
      {products && products.length > 0 && (
        <section className="px-6 md:px-10 py-10" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>Recommended Products</p>
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
      )}

      {/* CTA */}
      {cta && (
        <section className="px-6 md:px-10 py-14 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6' }}>{cta.title}</h2>
            <p className="font-heading mb-6 text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>{cta.subtitle}</p>
            <Link to={cta.buttonLink}
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              {cta.buttonText} <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      )}

      {/* FDA Disclaimer */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.18)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}