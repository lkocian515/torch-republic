import React from 'react';
import { ShieldCheck, Truck, BadgeCheck, Store } from 'lucide-react';

const ACCENT = '#B86543';
const MUTED = '#6A5A4A';
const BORDER = '#E4D8C9';

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Truck, label: 'Tracked Shipping' },
  { icon: BadgeCheck, label: 'Satisfaction Guarantee' },
  { icon: Store, label: 'Small Business Owned' },
];

export default function CartTrustBlock() {
  return (
    <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="grid grid-cols-2 gap-3">
        {TRUST_ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} />
            <span className="font-mono text-[8px] tracking-[0.1em] uppercase" style={{ color: MUTED }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}