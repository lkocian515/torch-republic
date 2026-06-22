/**
 * Competitor Comparison Center — Index Page
 * Route: /compare
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, Scale, Coffee, Leaf, Zap } from 'lucide-react';
import { trackCompareCTA } from '@/lib/analyticsEvents';

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
    slug: 'mushroom-coffee-vs-coffee-pods',
    competitor: 'Coffee Pods',
    headline: 'Mushroom Coffee vs. Coffee Pods',
    tagline: 'Functional coffee vs. single-use pods — convenience, waste, and quality compared.',
    badge: null,
  },
  {
    slug: 'instant-coffee-vs-k-cups',
    competitor: 'K-Cups',
    headline: 'Premium Instant Coffee vs. K-Cups',
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

  const COLLECTION_CARDS = [
    {
      icon: Coffee,
      label: 'Classic Instant Coffee',
      bestFor: 'A familiar, premium coffee ritual without pods or a machine.',
      points: [
        'Coffee-forward taste',
        'Freeze-dried convenience',
        '27 servings per tube',
        'Ready in seconds',
      ],
      buttonLabel: 'Shop Classic Coffee',
      path: '/shop/instant-coffee',
      accent: '#E6B7AD',
      ctaLocation: 'compare_classic_card',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=70&auto=format',
      imageAlt: 'Classic instant coffee',
    },
    {
      icon: Zap,
      label: 'Mushroom Coffee',
      bestFor: 'A more intentional coffee ritual with functional mushroom ingredients.',
      points: [
        'Coffee-forward blends',
        "Lion's Mane + Chaga varieties",
        '27 servings per tube',
        'Instant and convenient',
      ],
      buttonLabel: 'Shop Mushroom Coffee',
      path: '/shop/instant-mushroom-coffee',
      accent: '#10B981',
      ctaLocation: 'compare_mushroom_card',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=70&auto=format',
      imageAlt: 'Mushroom coffee blends',
    },
    {
      icon: Leaf,
      label: 'Ceremonial Matcha',
      bestFor: 'A smooth, grounded alternative to a traditional coffee ritual.',
      points: [
        'Ceremonial-grade matcha',
        'Smooth focus and calm ritual',
        '25 servings per tin',
        'No machine needed',
      ],
      buttonLabel: 'Shop Matcha',
      path: '/shop/matcha',
      accent: '#7DC98A',
      ctaLocation: 'compare_matcha_card',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=70&auto=format',
      imageAlt: 'Ceremonial matcha ritual',
    },
  ];

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

      {/* ── Shopping Decision Tool ── */}
      <section className="px-6 md:px-10 py-16" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-center mb-3" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Choose Your Collection
          </p>
          <h2 className="font-serif font-bold text-center mb-10" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#F5EFE6', lineHeight: 1.15 }}>
            Which Ritual Is Right for You?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {COLLECTION_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex flex-col"
                  style={{ background: '#0F0E0D', border: `1px solid ${card.accent}20` }}
                >
                  {/* Card image */}
                  <div className="overflow-hidden" style={{ height: '140px' }}>
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      loading="lazy"
                      width="400"
                      height="140"
                      className="w-full h-full object-cover"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {/* Icon + label */}
                    <div className="flex items-center gap-2">
                      <Icon size={14} style={{ color: card.accent }} />
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: card.accent }}>
                        {card.label}
                      </span>
                    </div>
                    {/* Best for */}
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.65 }}>
                      <strong style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 500 }}>Best for:</strong> {card.bestFor}
                    </p>
                    {/* Points */}
                    <ul className="space-y-1.5 flex-1">
                      {card.points.map(pt => (
                        <li key={pt} className="flex items-center gap-2">
                          <span style={{ color: card.accent, fontSize: '0.5rem', flexShrink: 0 }}>◆</span>
                          <span className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    {/* CTA button */}
                    <Link
                      to={card.path}
                      onClick={() => trackCompareCTA({ ctaLocation: card.ctaLocation, destination: card.path })}
                      className="w-full text-center font-mono text-[9px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90 py-3 mt-2 block"
                      style={{ background: card.accent, color: '#050505' }}
                    >
                      {card.buttonLabel}
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Still Deciding? */}
          <div className="mt-12 p-8 text-center" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
            <h3 className="font-serif font-bold mb-3" style={{ fontSize: '1.35rem', color: '#F5EFE6' }}>Still Deciding?</h3>
            <p className="font-heading mb-6 text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
              Start with the ritual that best matches how you want your morning to feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                onClick={() => trackCompareCTA({ ctaLocation: 'compare_still_deciding_shop_all', destination: '/shop' })}
                className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
                style={{ background: RG, color: '#050505' }}
              >
                Shop All Rituals
              </Link>
              <Link
                to="/build-your-ritual"
                onClick={() => trackCompareCTA({ ctaLocation: 'compare_still_deciding_build_ritual', destination: '/build-your-ritual' })}
                className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3.5 px-8"
                style={{ border: `1px solid ${RG}35`, color: `${RG}80` }}
              >
                Build Your Ritual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Competitor Comparisons ── */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-center mb-8" style={{ color: 'rgba(230,183,173,0.35)' }}>Brand Comparisons</p>
        </div>
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

      {/* Related Guides — internal linking to SEO landing pages */}
      <section className="px-6 md:px-10 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6 text-center" style={{ color: 'rgba(230,183,173,0.4)' }}>Related Guides</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { slug: '/coffee-pod-alternatives', label: 'Coffee Pod Alternatives' },
              { slug: '/coffee-without-a-machine', label: 'Coffee Without a Machine' },
              { slug: '/camping-coffee', label: 'Best Coffee for Camping' },
              { slug: '/healthy-coffee-alternatives', label: 'Healthy Coffee Alternatives' },
              { slug: '/matcha-vs-coffee', label: 'Matcha vs. Coffee' },
              { slug: '/papua-new-guinea-coffee', label: 'Papua New Guinea Coffee' },
              { slug: '/coffee-rituals', label: 'Coffee Rituals' },
              { slug: '/mushroom-coffee-benefits', label: 'Mushroom Coffee Benefits' },
              { slug: '/ingredients/freeze-dried-instant-coffee', label: 'Freeze-Dried Coffee' },
            ].map((g, i) => (
              <Link key={i} to={g.slug}
                className="font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-3 text-center transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(230,183,173,0.15)', color: 'rgba(230,183,173,0.5)' }}>
                {g.label}
              </Link>
            ))}
          </div>
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