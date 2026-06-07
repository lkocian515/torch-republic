import React from 'react';
import { Truck, Flame } from 'lucide-react';

const RG = '#E6B7AD';

// Simple stock scarcity based on slug hash (deterministic, no API needed)
function getStockLevel(productSlug) {
  const hash = productSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const levels = [
    { label: 'Only 3 left in stock', urgent: true },
    { label: 'Low stock — order soon', urgent: true },
    { label: 'Ships within 1–3 business days', urgent: false },
    { label: 'In stock & ready to ship', urgent: false },
  ];
  return levels[hash % levels.length];
}

export default function ScarcityBadge({ productSlug }) {
  const stockInfo = getStockLevel(productSlug || 'default');
  const Icon = stockInfo.urgent ? Flame : Truck;
  
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5"
      style={{
        background: stockInfo.urgent ? 'rgba(239,68,68,0.08)' : 'rgba(230,183,173,0.06)',
        border: `1px solid ${stockInfo.urgent ? 'rgba(239,68,68,0.3)' : `${RG}20`}`,
      }}
    >
      <Icon size={12} style={{ color: stockInfo.urgent ? '#EF4444' : RG, flexShrink: 0 }} />
      <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: stockInfo.urgent ? '#EF4444' : `${RG}80` }}>
        {stockInfo.label}
      </span>
    </div>
  );
}