import React from 'react';

const BADGE_STYLES = {
  'Best Seller': {
    bg: 'rgba(201,162,74,0.18)',
    color: '#E6AC45',
    border: '1px solid rgba(201,162,74,0.4)',
    label: '★ Best Seller',
  },
  'Most Popular': {
    bg: 'rgba(201,162,74,0.15)',
    color: '#E6AC45',
    border: '1px solid rgba(201,162,74,0.45)',
    label: '★ Most Popular',
  },
  'Recommended First': {
    bg: 'rgba(196,163,90,0.2)',
    color: '#E6AC45',
    border: '1px solid rgba(196,163,90,0.55)',
    label: '→ Recommended First',
  },
};

export default function ProductBadge({ type }) {
  if (!type || !BADGE_STYLES[type]) return null;
  
  const style = BADGE_STYLES[type];
  
  return (
    <span
      className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1.5 font-black rounded-sm inline-block"
      style={{
        background: style.bg,
        color: style.color,
        border: style.border,
      }}
    >
      {style.label}
    </span>
  );
}