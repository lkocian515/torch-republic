import React from 'react';
import { Shield, RotateCcw, Truck, Star } from 'lucide-react';

const ITEMS = [
  { icon: Shield, label: 'Secure Checkout', sub: 'SSL encrypted · all major cards' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: Star, label: '10,000+ Proud Owners', sub: 'Verified 4.9 star rating' },
];

export default function TrustBar() {
  return (
    <div style={{ background: '#070707', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.5)' }} />
              <div>
                <p className="font-mono text-[10px] font-bold text-white">{label}</p>
                <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}