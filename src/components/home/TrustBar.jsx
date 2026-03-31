import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Star } from 'lucide-react';

const SIGNALS = [
  { icon: ShieldCheck, label: 'Secure Checkout', sub: '256-bit SSL encrypted' },
  { icon: Truck, label: 'Ships from USA', sub: 'Orders out in 1–3 days' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'Hassle-free, no questions' },
  { icon: Star, label: '4.9 Star Rated', sub: 'Thousands of patriots served' },
];

export default function TrustBar() {
  return (
    <section
      style={{
        backgroundColor: '#080808',
        borderTop: '1px solid rgba(201,162,74,0.08)',
        borderBottom: '1px solid rgba(201,162,74,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x" style={{ '--tw-divide-opacity': 1 }}>
          {SIGNALS.map(({ icon: Icon, label, sub }, i) => (
            <div key={label} className={`flex items-center gap-4 ${i > 0 ? 'md:pl-8' : ''}`}>
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.7)' }} />
              <div>
                <p className="font-heading font-semibold text-xs uppercase tracking-wider text-white">{label}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}