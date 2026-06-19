import React from 'react';
import { ShieldCheck, Truck, BadgeCheck, Store } from 'lucide-react';

const RG = '#E6B7AD';

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Truck, label: 'Tracked Shipping' },
  { icon: BadgeCheck, label: 'Satisfaction Guarantee' },
  { icon: Store, label: 'Small Business Owned' },
];

export default function CartTrustBlock() {
  return (
    <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="grid grid-cols-2 gap-3">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase" style={{ color: 'rgba(245,239,230,0.55)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}