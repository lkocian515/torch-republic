import React from 'react';
import { Shield, RotateCcw, Truck, Award } from 'lucide-react';

const ITEMS = [
  { icon: Shield, label: 'Secure Checkout', sub: 'SSL · All major cards' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
  { icon: Truck, label: 'Free Shipping $50+', sub: 'Fast, tracked delivery' },
  { icon: Award, label: 'Flame Guarantee', sub: 'Quality or your money back' },
];

export default function TrustBar() {
  return (
    <div style={{ background: '#0A0A0D', borderTop: '1px solid rgba(196,163,90,0.06)', borderBottom: '1px solid rgba(196,163,90,0.06)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.5)' }} />
              <div>
                <p className="font-mono text-[10px] font-bold text-white">{label}</p>
                <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.22)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}