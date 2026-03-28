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
    <section style={{ borderBottom: '1px solid rgba(200,164,77,0.12)', backgroundColor: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SIGNALS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(200,164,77,0.1)', border: '1px solid rgba(200,164,77,0.3)' }}>
                <Icon className="w-4 h-4" style={{ color: '#C8A44D' }} />
              </div>
              <div>
                <p className="text-xs font-heading font-bold uppercase tracking-wide text-white">{label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}