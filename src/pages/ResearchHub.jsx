import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Brain, Shield, Zap, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import NewsletterSignup from '../components/mushroom/NewsletterSignup';

const RG = '#E6B7AD';

const RESEARCH_TOPICS = [
  {
    icon: Brain,
    title: 'Lion\'s Mane & NGF',
    description: 'The only food known to stimulate Nerve Growth Factor production in the human brain',
    link: '/journal/lions-mane-mushroom-coffee',
    color: RG,
  },
  {
    icon: Shield,
    title: 'Chaga Antioxidants',
    description: 'Highest ORAC value ever recorded — 15x more antioxidants than wild blueberries',
    link: '/journal/chaga-mushroom-coffee',
    color: '#C98F86',
  },
  {
    icon: Zap,
    title: 'L-Theanine & Matcha',
    description: 'Calm focus without the crash — 3-6 hour sustained energy from ceremonial grade matcha',
    link: '/journal/instant-ceremonial-matcha',
    color: '#10B981',
  },
];

const KEY_FINDINGS = [
  {
    year: '2020',
    study: 'Frontiers in Aging Neuroscience',
    finding: 'Lion\'s Mane supplementation showed significantly lower cognitive deterioration in mild Alzheimer\'s patients with measurably higher plasma NGF levels',
  },
  {
    year: '2023',
    study: 'Journal of Neurochemistry',
    finding: 'University of Queensland researchers identified hericene A as enhancing memory through ERK1/2 signaling pathway',
  },
  {
    year: '2023',
    study: 'RCT (PMID: 38004235)',
    finding: 'Single dose of Lion\'s Mane improved Stroop test performance (processing speed + selective attention) in healthy young adults',
  },
  {
    year: '2004',
    study: 'Biofactors',
    finding: 'Chaga extract produced over 40% reduction in DNA fragmentation in human cells exposed to oxidative stress',
  },
  {
    year: '2022',
    study: 'PMC Critical Review',
    finding: 'Matcha documented to enhance cognitive function, cardio-metabolic health, and demonstrate anti-tumorogenesis properties',
  },
];

const SCIENCE_HIGHLIGHTS = [
  {
    title: '2,000+ Years',
    subtitle: 'Traditional Use',
    description: 'Medicinal mushrooms documented in Asian medicine since 200 AD',
  },
  {
    title: '26 Studies',
    subtitle: 'Clinical Evidence',
    description: '2025 systematic review confirms neuroprotective effects across multiple mechanisms',
  },
  {
    title: '146,700 ORAC',
    subtitle: 'Antioxidant Power',
    description: 'Chaga holds the highest ORAC value ever recorded for any natural food',
  },
  {
    title: '3-6 Hours',
    subtitle: 'Sustained Energy',
    description: 'Matcha\'s L-theanine extends caffeine release from 1.5 hours to 3-6 hours',
  },
];

export default function ResearchHub() {
  useSEO({
    title: 'Research Hub | Internal',
    description: 'Internal research and science documentation.',
    url: '/research',
    noindex: true,
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            The Science
          </p>
          <h1 className="font-serif font-bold mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Research & Science
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg"
            style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Three decades of clinical research. Two thousand years of traditional use. Modern science is now validating what ancient healers knew: functional mushrooms and ceremonial matcha offer measurable cognitive, immune, and metabolic benefits.
          </p>
        </motion.div>
      </section>

      {/* Science Highlights */}
      <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCIENCE_HIGHLIGHTS.map((highlight, i) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <h3 className="font-serif font-bold text-2xl mb-1" style={{ color: RG }}>
                  {highlight.title}
                </h3>
                <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(240,235,225,0.4)' }}>
                  {highlight.subtitle}
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Topics */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl mb-10 text-center"
            style={{ color: '#FFFFFF' }}
          >
            Deep Dive Articles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_TOPICS.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${topic.color}30` }}
                >
                  <div className="flex items-center justify-center mb-6"
                    style={{ width: '64px', height: '64px', borderRadius: '50%', background: `${topic.color}12`, margin: '0 auto 24px' }}>
                    <Icon className="w-7 h-7" style={{ color: topic.color }} />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3 text-center" style={{ color: '#FFFFFF' }}>
                    {topic.title}
                  </h3>
                  <p className="font-heading text-sm text-center mb-6" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
                    {topic.description}
                  </p>
                  <Link to={topic.link}
                    className="flex items-center justify-center gap-2 font-mono text-[8px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
                    style={{ color: topic.color }}>
                    Read Full Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-3xl md:text-4xl mb-10 text-center"
            style={{ color: '#FFFFFF' }}
          >
            Key Research Findings
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {KEY_FINDINGS.map((finding, i) => (
              <motion.div
                key={finding.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-3 py-1.5 rounded"
                    style={{ background: 'rgba(230,183,173,0.08)', color: RG }}>
                    {finding.year}
                  </span>
                  <BookOpen className="w-4 h-4" style={{ color: 'rgba(230,183,173,0.5)' }} />
                </div>
                <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(240,235,225,0.35)' }}>
                  {finding.study}
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.7 }}>
                  {finding.finding}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Ready to Experience the Science?
          </p>
          <h2 className="font-serif font-bold mb-6 text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
            Shop All Blends
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop"
              className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#080808' }}>
              Shop Now →
            </Link>
            <Link to="/recipes"
              className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              View Recipes →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Scientific caveat: While mechanisms are well-characterized, researchers note that many studies use whole mushroom preparations or isolated extracts in varying doses, making direct translation to commercial instant coffee formats complex. Larger, longer-duration trials are still needed. Statements on this site have not been evaluated by the FDA.
        </p>
      </div>
    </div>
  );
}