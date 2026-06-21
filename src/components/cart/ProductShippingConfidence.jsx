import React from 'react';
import { Truck, Package, Lock, Leaf } from 'lucide-react';

const RG = '#E6B7AD';

const ITEMS = [
  { icon: Truck, label: 'Fast Shipping', sub: 'Ships from the USA' },
  { icon: Package, label: 'Tracked Delivery', sub: 'Order tracking included' },
  { icon: Lock, label: 'Secure Checkout', sub: 'Protected payment processing' },
  { icon: Leaf, label: 'Premium Ingredients', sub: 'Quality-focused sourcing' },
];

export default function ProductShippingConfidence() {
  return (
    <div className="w-full">
      {/* Desktop: horizontal row */}
      <div className="hidden sm:grid grid-cols-4 gap-2">
        {ITEMS.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.08)' }}
          >
            <Icon className="w-4 h-4 mb-2" style={{ color: RG }} />
            <p className="font-mono text-[8px] tracking-[0.15em] uppercase font-bold mb-0.5" style={{ color: 'rgba(245,239,230,0.8)' }}>
              {label}
            </p>
            <p className="font-mono text-[7px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.4)' }}>
              {sub}
            </p>
          </div>
        ))}
      </div>
      {/* Mobile: stacked */}
      <div className="sm:hidden space-y-2">
        {ITEMS.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-2.5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.08)' }}
          >
            <Icon className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
            <div>
              <p className="font-mono text-[8px] tracking-[0.15em] uppercase font-bold" style={{ color: 'rgba(245,239,230,0.8)' }}>
                {label}
              </p>
              <p className="font-mono text-[7px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.4)' }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}