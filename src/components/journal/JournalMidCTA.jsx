/**
 * JournalMidCTA — Inline editorial CTA for mid-article placement.
 * Feels contextual and helpful, not intrusive.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { trackJournalCTA } from '@/lib/analyticsEvents';

const RG = '#E6AC45';

const TOPIC_MAP = [
  {
    keywords: ['matcha', 'ceremonial'],
    label: 'Explore Torch Republic\'s ceremonial matcha — instant ritual, no machine.',
    buttonLabel: 'Explore Matcha',
    path: '/shop/matcha',
  },
  {
    keywords: ['mushroom', 'lions-mane', 'lion', 'chaga', 'adaptogen', 'reishi'],
    label: 'Looking for an easier daily ritual? Explore Torch Republic\'s mushroom coffee blends.',
    buttonLabel: 'Explore Mushroom Coffee',
    path: '/shop/instant-mushroom-coffee',
  },
  {
    keywords: ['instant', 'freeze-dried', 'pod', 'k-cup', 'machine', 'arabica'],
    label: 'Looking for premium instant coffee without the machine? Explore the collection.',
    buttonLabel: 'Explore the Collection',
    path: '/shop/instant-coffee',
  },
];

const DEFAULT = {
  label: 'Looking for an easier daily ritual? Explore Torch Republic\'s premium instant collections.',
  buttonLabel: 'Explore the Collection',
  path: '/shop',
};

function getConfig(slug = '', category = '') {
  const text = `${slug} ${category}`.toLowerCase();
  for (const cfg of TOPIC_MAP) {
    if (cfg.keywords.some(kw => text.includes(kw.toLowerCase()))) return cfg;
  }
  return DEFAULT;
}

function track(path) {
  trackJournalCTA({ ctaLocation: 'journal_mid_article', destination: path });
}

export default function JournalMidCTA({ slug, category }) {
  const cfg = getConfig(slug, category);

  return (
    <div
      className="my-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4"
      style={{
        background: `${RG}07`,
        borderLeft: `2px solid ${RG}45`,
      }}
    >
      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.7, flex: 1 }}>
        {cfg.label}
      </p>
      <Link
        to={cfg.path}
        onClick={() => track(cfg.path)}
        className="flex-shrink-0 font-mono text-[8px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-85 py-2.5 px-5 whitespace-nowrap"
        style={{ background: RG, color: '#050505' }}
      >
        {cfg.buttonLabel}
      </Link>
    </div>
  );
}