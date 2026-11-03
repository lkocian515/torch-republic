/**
 * FAQ Index Page — lists every FAQ page organized by cluster
 * Route: /faq
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { FAQ_PAGES, TOPIC_CLUSTERS } from '@/lib/seoContent';

const RG = '#E6AC45';

const CLUSTER_ORDER = ['mushroom-coffee', 'instant-coffee', 'wellness-rituals', 'focus-productivity'];

export default function FAQIndex() {
  const [activeCluster, setActiveCluster] = useState('all');

  useSEO({
    title: 'Frequently Asked Questions | Mushroom Coffee & Instant Coffee | Torch Republic',
    description: 'Find answers to common questions about mushroom coffee, instant coffee, ingredients, subscriptions, and wellness rituals from Torch Republic.',
    url: '/faq',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'FAQ', url: '/faq' },
    ],
    faq: FAQ_PAGES.slice(0, 10).map(f => ({ question: f.question, answer: f.answer })),
  });

  const clusters = CLUSTER_ORDER.map(key => ({
    key,
    ...TOPIC_CLUSTERS[key],
    faqs: FAQ_PAGES.filter(f => f.cluster === key),
  }));

  const filteredFaqs = activeCluster === 'all'
    ? FAQ_PAGES
    : FAQ_PAGES.filter(f => f.cluster === activeCluster);

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Torch Republic
          </p>
          <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h1>
          <p className="font-heading max-w-xl mx-auto" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.85 }}>
            Honest answers to common questions about mushroom coffee, instant coffee, ingredients, and wellness rituals.
          </p>
        </motion.div>
      </section>

      {/* Cluster Filter */}
      <div className="px-6 md:px-10 py-6 sticky top-0 z-20" style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCluster('all')}
            className="px-4 py-2 font-mono text-[8px] tracking-[0.25em] uppercase transition-all"
            style={{
              background: activeCluster === 'all' ? `${RG}15` : 'transparent',
              border: `1px solid ${activeCluster === 'all' ? RG : `${RG}20`}`,
              color: activeCluster === 'all' ? RG : `${RG}50`,
            }}>
            All ({FAQ_PAGES.length})
          </button>
          {clusters.map(c => (
            <button key={c.key}
              onClick={() => setActiveCluster(c.key)}
              className="px-4 py-2 font-mono text-[8px] tracking-[0.25em] uppercase transition-all"
              style={{
                background: activeCluster === c.key ? `${c.color}15` : 'transparent',
                border: `1px solid ${activeCluster === c.key ? c.color : `${c.color}20`}`,
                color: activeCluster === c.key ? c.color : `${c.color}50`,
              }}>
              {c.label} ({c.faqs.length})
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <section className="px-6 md:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          {activeCluster === 'all' ? (
            <div className="space-y-12">
              {clusters.map((cluster, ci) => (
                <motion.div key={cluster.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: ci * 0.04 }}>
                  <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: `1px solid ${cluster.color}20` }}>
                    <div className="w-1 h-6" style={{ background: cluster.color }} />
                    <h2 className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#F7F2E9' }}>{cluster.label}</h2>
                    <span className="font-mono text-[8px] tracking-[0.2em]" style={{ color: cluster.color }}>({cluster.faqs.length} questions)</span>
                  </div>
                  <div className="space-y-2">
                    {cluster.faqs.map((faq, fi) => (
                      <Link key={fi} to={`/faq/${faq.slug}`}
                        className="flex items-center justify-between p-4 group transition-all"
                        style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.07)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${cluster.color}30`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.07)'}>
                        <div className="flex items-start gap-3">
                          <HelpCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: `${cluster.color}60` }} />
                          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.85)', lineHeight: 1.4 }}>{faq.question}</p>
                        </div>
                        <ChevronRight size={14} className="flex-shrink-0 ml-4 transition-transform group-hover:translate-x-0.5" style={{ color: `${cluster.color}50` }} />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFaqs.map((faq, i) => {
                const cluster = TOPIC_CLUSTERS[faq.cluster];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={`/faq/${faq.slug}`}
                      className="flex items-center justify-between p-4 group transition-all"
                      style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.07)' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${cluster?.color || RG}30`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.07)'}>
                      <div className="flex items-start gap-3">
                        <HelpCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: `${cluster?.color || RG}60` }} />
                        <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.85)', lineHeight: 1.4 }}>{faq.question}</p>
                      </div>
                      <ChevronRight size={14} className="flex-shrink-0 ml-4 transition-transform group-hover:translate-x-0.5" style={{ color: `${cluster?.color || RG}50` }} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.4)' }}>Still have questions?</p>
        <h2 className="font-serif font-bold mb-5" style={{ fontSize: '1.6rem', color: '#F7F2E9' }}>We're here to help</h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact" className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3 px-8 transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808' }}>Contact Us</Link>
          <Link to="/shop" className="font-mono text-[9px] tracking-[0.3em] uppercase py-3 px-8 transition-all hover:opacity-70"
            style={{ border: `1px solid ${RG}40`, color: RG }}>Shop All Blends</Link>
        </div>
      </section>
    </div>
  );
}