/**
 * Competitor Comparison Center — Index Page
 * Route: /compare
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, Scale } from 'lucide-react';

const RG = '#E6B7AD';

const COMPARISONS = [
  {
    slug: 'ryze-vs-torch-republic',
    competitor: 'Ryze',
    headline: 'Ryze vs. Torch Republic',
    tagline: 'Blend variety, value, and ritual — compared.',
    badge: 'Most Searched',
    badgeColor: '#E6B7AD',
  },
  {
    slug: 'four-sigmatic-vs-torch-republic',
    competitor: 'Four Sigmatic',
    headline: 'Four Sigmatic vs. Torch Republic',
    tagline: 'The category pioneer vs. the ritual-first newcomer.',
    badge: null,
  },
  {
    slug: 'mudwtr-vs-torch-republic',
    competitor: 'MUD\\WTR',
    headline: 'MUD/WTR vs. Torch Republic',
    tagline: 'Coffee-free adaptogen blend vs. premium instant coffee ritual.',
    badge: null,
  },
  {
    slug: 'everyday-dose-vs-torch-republic',
    competitor: 'Everyday Dose',
    headline: 'Everyday Dose vs. Torch Republic',
    tagline: 'The collagen mushroom latte vs. the instant coffee ritual.',
    badge: null,
  },
  {
    slug: 'mushroom-coffee-vs-regular-coffee-comparison',
    competitor: 'Regular Coffee',
    headline: 'Mushroom Coffee vs. Regular Coffee',
    tagline: 'What actually changes when you add functional mushrooms.',
    badge: null,
  },
  {
    slug: 'instant-coffee-vs-pods-comparison',
    competitor: 'Coffee Pods',
    headline: 'Instant Coffee vs. K-Cups',
    tagline: 'Cost, waste, and convenience — instant coffee vs. K-Cups compared.',
    badge: null,
  },
];

export default function ComparisonCenter() {
  useSEO({
    title: 'Mushroom Coffee Comparison Center | Ryze, Four Sigmatic, MUD/WTR vs Torch Republic',
    description: 'Compare Torch Republic to Ryze, Four Sigmatic, MUD/WTR, and Everyday Dose — ingredients, price per serving, taste, blend variety, and subscription options. Honest, factual comparisons.',
    url: '/compare',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }],
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)' }}>
            <Scale size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: RG }}>Comparison Center</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#F5EFE6', lineHeight: 1.1 }}>
            How Torch Republic<br />Compares to Every Brand
          </h1>
          <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.9, fontWeight: 300 }}>
            Honest, factual comparisons — ingredients, price, taste, servings, and subscriptions. We don't hide the areas where competitors have advantages.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-10 py-14">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          {COMPARISONS.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Link to={`/compare/${c.slug}`}
                className="p-6 block transition-all group"
                style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}>
                <div className="flex items-start justify-between mb-3">
                  <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>{c.competitor}</p>
                  {c.badge && (
                    <span className="font-mono text-[7px] tracking-[0.2em] uppercase px-2 py-0.5" style={{ background: `${c.badgeColor}15`, color: c.badgeColor, border: `1px solid ${c.badgeColor}30` }}>
                      {c.badge}
                    </span>
                  )}
                </div>
                <h2 className="font-serif font-bold mb-2" style={{ color: '#F5EFE6', fontSize: '1.15rem' }}>{c.headline}</h2>
                <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300, lineHeight: 1.6 }}>{c.tagline}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}70` }}>Read Comparison</span>
                  <ArrowRight size={11} style={{ color: `${RG}70` }} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-10 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-xl mx-auto">
          <p className="font-heading mb-6 text-sm" style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.85, fontWeight: 300 }}>
            Ready to skip the research? Take our 60-second blend quiz — we'll match you to the right ritual.
          </p>
          <Link to="/quiz"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808' }}>
            Find My Blend <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}