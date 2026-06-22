/**
 * JournalRitualCTA — "Continue Your Ritual" conversion section
 * Placed near the end of every Journal article, before related articles.
 * Topic-aware: personalizes destination & copy based on article slug/category.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { trackJournalCTA } from '@/lib/analyticsEvents';

const RG = '#E6B7AD';

// Topic map: keywords in slug/category → collection config
const TOPIC_MAP = [
  {
    keywords: ['matcha', 'ceremonial'],
    collection: 'Ceremonial Matcha',
    description: 'Smooth, grounded energy from 100% ceremonial-grade matcha — no machine, no pods, ready in 30 seconds.',
    primaryLabel: 'Shop Matcha',
    primaryPath: '/shop/matcha',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=480&q=75&auto=format',
    imageAlt: 'Ceremonial matcha ritual — Torch Republic',
    ctaLocation: 'journal_end_article_matcha',
  },
  {
    keywords: ['mushroom', 'lions-mane', 'lion', 'chaga', 'adaptogen', 'functional', 'reishi'],
    collection: 'Mushroom Coffee',
    description: 'Premium instant mushroom coffee with Lion\'s Mane and Chaga — coffee-forward taste, functional ritual, no machine needed.',
    primaryLabel: 'Shop Mushroom Coffee',
    primaryPath: '/shop/instant-mushroom-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=480&q=75&auto=format',
    imageAlt: 'Mushroom coffee ritual — Torch Republic',
    ctaLocation: 'journal_end_article_mushroom',
  },
  {
    keywords: ['instant', 'freeze-dried', 'pod', 'k-cup', 'machine', 'Papua', 'arabica', 'classic'],
    collection: 'Classic Instant Coffee',
    description: 'Single-origin Papua New Guinea Arabica, freeze-dried for premium taste — no machine, no pods, 27 servings.',
    primaryLabel: 'Shop Classic Coffee',
    primaryPath: '/shop/instant-coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&q=75&auto=format',
    imageAlt: 'Premium instant coffee ritual — Torch Republic',
    ctaLocation: 'journal_end_article_classic',
  },
];

const DEFAULT_CTA = {
  collection: 'Premium Coffee & Matcha',
  description: 'Explore premium instant coffee, functional mushroom coffee, and ceremonial matcha — no pods, no machine, no complicated preparation.',
  primaryLabel: 'Shop Your Ritual',
  primaryPath: '/shop',
  image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&q=75&auto=format',
  imageAlt: 'Torch Republic ritual coffee',
  ctaLocation: 'journal_end_article_default',
};

function getCtaConfig(slug = '', category = '') {
  const text = `${slug} ${category}`.toLowerCase();
  for (const config of TOPIC_MAP) {
    if (config.keywords.some(kw => text.includes(kw.toLowerCase()))) {
      return config;
    }
  }
  return DEFAULT_CTA;
}

function trackCta(location, path) {
  trackJournalCTA({ ctaLocation: location, destination: path });
}

export default function JournalRitualCTA({ slug, category }) {
  const cta = getCtaConfig(slug, category);

  return (
    <div
      className="mt-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F0E0D 0%, #141210 60%, #0A0908 100%)',
        border: `1px solid ${RG}20`,
      }}
    >
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Image */}
        <div
          className="sm:w-48 flex-shrink-0 overflow-hidden"
          style={{ minHeight: '180px' }}
        >
          <img
            src={cta.image}
            alt={cta.imageAlt}
            loading="lazy"
            width="192"
            height="220"
            className="w-full h-full object-cover"
            style={{ minHeight: '180px', opacity: 0.75 }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-4 p-6 flex-1">
          {/* Label */}
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase" style={{ color: `${RG}60` }}>
            Continue Your Ritual — {cta.collection}
          </p>

          {/* Headline */}
          <h3
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)', color: '#F5EFE6', lineHeight: 1.25 }}
          >
            Ready to Upgrade Your Daily Ritual?
          </h3>

          {/* Body */}
          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            {cta.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              to={cta.primaryPath}
              onClick={() => trackCta(cta.ctaLocation, cta.primaryPath)}
              className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-3 px-6"
              style={{ background: RG, color: '#050505' }}
            >
              {cta.primaryLabel}
            </Link>
            <Link
              to="/compare"
              onClick={() => trackCta('journal_end_article_compare', '/compare')}
              className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3 px-6"
              style={{ border: `1px solid ${RG}35`, color: `${RG}80` }}
            >
              Compare the Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}