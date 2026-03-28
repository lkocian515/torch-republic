import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Lock, Star, Phone } from 'lucide-react';

const SIGNALS = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $75' },
  { icon: ShieldCheck, label: 'Secure Checkout', sub: '256-bit SSL encrypted' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '30-day hassle-free' },
  { icon: Lock, label: '100% Safe Payment', sub: 'Visa, MC, PayPal & more' },
  { icon: Star, label: '5-Star Rated', sub: 'Thousands of happy patriots' },
  { icon: Phone, label: 'Real Support', sub: 'We actually respond' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-card/60 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SIGNALS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 py-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C8A44D18', border: '1px solid #C8A44D55' }}>
                <Icon className="w-5 h-5" style={{ color: '#C8A44D' }} />
              </div>
              <div>
                <p className="text-xs font-heading font-bold uppercase tracking-wide text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}