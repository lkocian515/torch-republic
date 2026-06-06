import React from 'react';
import { Truck } from 'lucide-react';

const RG = '#E6B7AD';

export default function ScarcityBadge({ productSlug }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5"
      style={{
        background: 'rgba(230,183,173,0.06)',
        border: `1px solid ${RG}20`,
      }}
    >
      <Truck size={12} style={{ color: RG, flexShrink: 0 }} />
      <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: `${RG}80` }}>
        Ships within 1–3 business days
      </span>
    </div>
  );
}