import React from 'react';
import { Flag, Award, ShieldCheck } from 'lucide-react';

const SIGNALS = [
  { icon: Flag, label: 'American Made', sub: 'Designed & operated in the USA' },
  { icon: Award, label: 'Premium Quality', sub: 'Built to last, not to fill a drawer' },
  { icon: ShieldCheck, label: 'Secure Checkout', sub: '256-bit SSL encrypted' },
];

export default function TrustBar() {
  return (
    <section style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.08)', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIGNALS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ border: '1px solid rgba(201,162,74,0.25)', backgroundColor: 'rgba(201,162,74,0.04)' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#C9A24A' }} />
              </div>
              <div>
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-white mb-1">{label}</p>
                <p className="font-heading font-light text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}