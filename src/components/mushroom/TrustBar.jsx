import React from 'react';
import { Zap, Coffee, Leaf, Cpu, MapPin } from 'lucide-react';

const ITEMS = [
  { icon: Cpu, label: 'Instant Powder Mix' },
  { icon: Leaf, label: "Lion's Mane + Chaga" },
  { icon: Coffee, label: 'Coffee-Forward Taste' },
  { icon: Zap, label: 'No Machine Needed' },
  { icon: MapPin, label: 'Ships from USA' },
];

export default function MushroomTrustBar() {
  return (
    <div className="w-full overflow-x-auto"
      style={{
        background: 'linear-gradient(90deg, #0E1A18 0%, #111820 50%, #141210 100%)',
        borderBottom: '1px solid rgba(230,183,173,0.1)',
        borderTop: '1px solid rgba(26,74,62,0.3)',
      }}>
      <div className="flex items-center justify-center min-w-max mx-auto px-4">
        {ITEMS.map(({ icon: Icon, label }, i) => (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2.5 whitespace-nowrap py-3.5 px-5 md:px-7">
              <Icon size={13} style={{ color: '#C4A35A', flexShrink: 0 }} />
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(214,195,160,0.7)' }}>
                {label}
              </span>
            </div>
            {i < ITEMS.length - 1 && (
              <span style={{ color: 'rgba(196,163,90,0.2)', fontSize: '10px' }}>·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}