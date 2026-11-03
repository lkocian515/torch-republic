/**
 * Author / Founder Page — E-E-A-T signal for Google
 * Route: /about/torch-republic-team
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Star, Shield, Mail } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { TORCH_AUTHOR, ALL_BLOG_TOPICS } from '@/lib/seoContent';

const RG = '#E6AC45';

export default function AuthorPage() {
  const publishedTopics = ALL_BLOG_TOPICS.filter(t => t.exists);

  useSEO({
    title: 'About the Torch Republic Team | Research & Content Policy',
    description: "Meet the Torch Republic team — our content research policy, ingredient transparency standards, and commitment to honest functional wellness education.",
    url: '/about/torch-republic-team',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/mission' },
      { name: 'Our Team', url: '/about/torch-republic-team' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-14" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>Content & Research Policy</p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
              {TORCH_AUTHOR.name}
            </h1>
            <p className="font-heading max-w-2xl mb-6" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.85 }}>
              {TORCH_AUTHOR.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              {TORCH_AUTHOR.credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.06)', border: '1px solid rgba(230,183,173,0.15)' }}>
                  <Shield size={10} style={{ color: RG }} />
                  <span className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.7)' }}>{cred}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Policy */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: '1.4rem', color: '#F7F2E9' }}>Our Content Philosophy</h2>
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'No Exaggerated Health Claims', detail: 'We never state that our products treat, cure, or prevent disease. All content about functional mushrooms and matcha reflects the current state of peer-reviewed research — with honest caveats about limitations.' },
                { icon: BookOpen, title: 'Source-Referenced Research', detail: 'When we cite research benefits, we reference the actual studies. We distinguish between in vitro research, animal studies, and human clinical trials.' },
                { icon: Star, title: 'Grounded in Real Product Use', detail: 'Our team tests and uses every product we write about. Our flavor descriptions, preparation guides, and ritual suggestions come from real daily practice.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                  <item.icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: RG }} />
                  <div>
                    <p className="font-heading font-semibold text-sm text-white mb-1">{item.title}</p>
                    <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: '1.4rem', color: '#F7F2E9' }}>About Torch Republic</h2>
            <div className="p-6" style={{ background: '#0F0E0D', border: `1px solid ${RG}20` }}>
              <div className="space-y-4">
                {[
                  { label: 'Founded', value: '2023' },
                  { label: 'Location', value: 'Corpus Christi, TX' },
                  { label: 'Specialty', value: 'Instant Mushroom Coffee, Classic Coffee' },
                  { label: 'Collection', value: 'Instant coffee and mushroom coffee rituals' },
                  { label: 'Format', value: 'Premium instant powder — no machine required' },
                  { label: 'Contact', value: 'info@torchrepublic.com' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 py-2" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.45)' }}>{item.label}</span>
                    <span className="font-heading text-sm text-right" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link to="/mission" className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase py-2.5 px-4 transition-all hover:opacity-90"
                  style={{ background: RG, color: '#080808', fontWeight: 700 }}>
                  Our Mission <ArrowRight size={10} />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase py-2.5 px-4 transition-all hover:opacity-70"
                  style={{ border: `1px solid ${RG}40`, color: RG }}>
                  <Mail size={10} /> Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Published Articles */}
      <section className="px-6 md:px-10 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: '1.4rem', color: '#F7F2E9' }}>Published Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {publishedTopics.map((topic, i) => (
              <Link key={i} to={`/journal/${topic.slug}`}
                className="flex items-start gap-3 p-4 transition-all"
                style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.07)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.07)'}>
                <BookOpen size={12} className="flex-shrink-0 mt-1" style={{ color: `${RG}50` }} />
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.8)', lineHeight: 1.4 }}>{topic.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}