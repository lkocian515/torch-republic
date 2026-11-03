/**
 * Dynamic Comparison Page
 * Route: /compare/:slug
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { COMPARISON_PAGES, TOPIC_CLUSTERS, ALL_BLOG_TOPICS } from '@/lib/seoContent';

const RG = '#E6AC45';
const EMERALD = '#264A35';

export default function ComparisonPage() {
  const { slug } = useParams();
  const comparison = COMPARISON_PAGES.find(c => c.slug === slug);

  const cluster = comparison?.cluster ? TOPIC_CLUSTERS[comparison.cluster] : null;
  const relatedArticles = comparison?.cluster
    ? ALL_BLOG_TOPICS.filter(t => t.cluster === comparison.cluster && t.exists).slice(0, 4)
    : [];

  useSEO({
    title: comparison?.metaTitle || `${comparison?.title || 'Comparison'} | Torch Republic`,
    description: comparison?.metaDescription || 'Honest product comparison from Torch Republic Coffee Company.',
    url: comparison ? `/compare/${comparison.slug}` : '/compare',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Compare', url: '/compare' },
      ...(comparison ? [{ name: comparison.title, url: `/compare/${comparison.slug}` }] : []),
    ],
  });

  if (!comparison) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center px-6">
          <p className="font-serif text-2xl text-white mb-4">Comparison not found</p>
          <Link to="/journal" className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: RG }}>
            Browse Journal →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Home</Link>
          <ChevronRight size={10} style={{ color: 'rgba(230,183,173,0.2)' }} />
          <Link to="/journal" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Journal</Link>
          <ChevronRight size={10} style={{ color: 'rgba(230,183,173,0.2)' }} />
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>Comparison</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-12 pb-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {cluster && (
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5" style={{ background: `${cluster.color}12`, border: `1px solid ${cluster.color}30` }}>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: cluster.color }}>Comparison Guide</span>
              </div>
            )}
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F7F2E9', lineHeight: 1.15 }}>
              {comparison.title}
            </h1>
            <p className="font-heading max-w-2xl" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.85 }}>
              {comparison.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Torch Republic */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-6" style={{ background: '#0F0E0D', border: `2px solid ${RG}30` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: EMERALD }} />
                <h2 className="font-serif font-bold" style={{ color: '#F7F2E9', fontSize: '1.1rem' }}>Torch Republic</h2>
                {comparison.winner === 'mushroom-coffee' || comparison.winner === 'instant' || comparison.winner === 'ceremonial' ? (
                  <span className="font-mono text-[7px] tracking-[0.25em] uppercase px-2 py-1" style={{ background: `${EMERALD}15`, color: EMERALD, border: `1px solid ${EMERALD}30` }}>Our Pick</span>
                ) : null}
              </div>
              <ul className="space-y-3">
                {comparison.ourEdge.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: EMERALD }} />
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.5 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Competitor */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
                <h2 className="font-serif font-bold" style={{ color: '#F7F2E9', fontSize: '1.1rem' }}>{comparison.competitor}</h2>
              </div>
              <ul className="space-y-3">
                {comparison.theirEdge.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300, lineHeight: 1.5 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-6 mb-10" style={{ background: `${RG}08`, border: `1px solid ${RG}20` }}>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: RG }}>Our Verdict</p>
            <p className="font-heading" style={{ color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.85, fontSize: '0.95rem' }}>
              {comparison.summary}
            </p>
          </motion.div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            {cluster?.products?.slice(0, 2).map((p, i) => (
              <Link key={i} to={p.path}
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90"
                style={{ background: i === 0 ? RG : 'transparent', color: i === 0 ? '#080808' : RG, border: `1px solid ${RG}${i === 0 ? '' : '50'}` }}>
                {p.name} <ArrowRight size={11} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="px-6 md:px-10 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif font-bold mb-6" style={{ fontSize: '1.4rem', color: '#F7F2E9' }}>Deep-Dive Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedArticles.map((a, i) => (
                <Link key={i} to={`/journal/${a.slug}`}
                  className="p-4 block transition-all"
                  style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                  <p className="font-heading text-sm mb-2" style={{ color: '#F7F2E9', lineHeight: 1.35 }}>{a.title}</p>
                  <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}60` }}>Read →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}