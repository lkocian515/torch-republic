/**
 * Dynamic FAQ Page — renders any FAQ from the FAQ_PAGES data array
 * Route: /faq/:slug
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { FAQ_PAGES, TOPIC_CLUSTERS, ALL_BLOG_TOPICS } from '@/lib/seoContent';

const RG = '#E6B7AD';

export default function FAQPage() {
  const { slug } = useParams();
  const faq = FAQ_PAGES.find(f => f.slug === slug);

  // Related FAQs
  const relatedFaqs = faq?.relatedFaqs
    ? FAQ_PAGES.filter(f => faq.relatedFaqs.includes(f.slug))
    : [];

  // Cluster articles
  const clusterArticles = faq?.cluster
    ? ALL_BLOG_TOPICS.filter(t => t.cluster === faq.cluster && t.exists && t.slug !== slug).slice(0, 4)
    : [];

  const cluster = faq?.cluster ? TOPIC_CLUSTERS[faq.cluster] : null;

  useSEO({
    title: faq?.metaTitle || (faq ? `${faq.question} | Torch Republic` : 'FAQ | Torch Republic'),
    description: faq?.metaDescription || 'Common questions about mushroom coffee, matcha, and instant coffee answered by Torch Republic.',
    url: faq ? `/faq/${faq.slug}` : '/faq',
    type: 'website',
    faq: faq ? [{ question: faq.question, answer: faq.answer }] : undefined,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' },
      ...(faq ? [{ name: faq.question, url: `/faq/${faq.slug}` }] : []),
    ],
  });

  if (!faq) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center px-6">
          <p className="font-serif text-2xl text-white mb-4">Question not found</p>
          <Link to="/faq" className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: RG }}>
            Browse All FAQs →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <div className="max-w-4xl mx-auto flex items-center gap-2 flex-wrap">
          <Link to="/" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>Home</Link>
          <ChevronRight size={10} style={{ color: 'rgba(230,183,173,0.2)' }} />
          <Link to="/faq" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-70" style={{ color: 'rgba(230,183,173,0.4)' }}>FAQ</Link>
          <ChevronRight size={10} style={{ color: 'rgba(230,183,173,0.2)' }} />
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>{faq.question.substring(0, 40)}...</span>
        </div>
      </div>

      {/* Main Answer */}
      <section className="px-6 md:px-10 pt-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {cluster && (
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5" style={{ background: `${cluster.color}12`, border: `1px solid ${cluster.color}30` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: cluster.color }} />
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: cluster.color }}>{cluster.label}</span>
              </div>
            )}

            <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', lineHeight: 1.15 }}>
              {faq.question}
            </h1>

            {/* Answer Box */}
            <div className="p-6 md:p-8 mb-8" style={{ background: '#0F0E0D', border: `1px solid ${RG}20` }}>
              <p className="font-heading" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.85)', lineHeight: 1.9, fontWeight: 300 }}>
                {faq.answer}
              </p>
            </div>

            {/* FDA Disclaimer if health-related */}
            {(faq.cluster === 'mushroom-coffee' || faq.cluster === 'matcha') && (
              <p className="font-mono text-[8px] tracking-[0.15em] mb-8" style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1.8 }}>
                These statements have not been evaluated by the FDA. Torch Republic products are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            )}

            {/* Product CTAs */}
            {faq.products?.length > 0 && (
              <div className="mb-10">
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>Explore Products</p>
                <div className="flex flex-wrap gap-3">
                  {faq.products.map((p, i) => (
                    <Link key={i} to={p.path}
                      className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-90"
                      style={{ background: i === 0 ? RG : 'transparent', color: i === 0 ? '#080808' : RG, border: `1px solid ${RG}${i === 0 ? '' : '50'}`, fontWeight: 700 }}>
                      {p.name}
                      <ArrowRight size={10} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Related FAQs */}
          {relatedFaqs.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="font-serif font-bold mb-5" style={{ fontSize: '1.3rem', color: '#F5EFE6' }}>Related Questions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedFaqs.map((rf, i) => (
                  <Link key={i} to={`/faq/${rf.slug}`}
                    className="p-4 block transition-all group"
                    style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                    <p className="font-heading text-sm font-medium mb-2" style={{ color: '#F5EFE6', lineHeight: 1.35 }}>{rf.question}</p>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}70` }}>Read Answer</span>
                      <ArrowRight size={10} style={{ color: `${RG}70` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Articles */}
          {clusterArticles.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-5" style={{ fontSize: '1.3rem', color: '#F5EFE6' }}>Deep-Dive Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clusterArticles.map((a, i) => (
                  <Link key={i} to={`/journal/${a.slug}`}
                    className="p-4 flex items-start gap-3 transition-all"
                    style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                    <BookOpen size={14} className="flex-shrink-0 mt-0.5" style={{ color: RG }} />
                    <p className="font-heading text-sm" style={{ color: '#F5EFE6' }}>{a.title}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Index Link */}
      <div className="px-6 py-10 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <Link to="/faq" className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
          ← Browse All Questions
        </Link>
      </div>
    </div>
  );
}