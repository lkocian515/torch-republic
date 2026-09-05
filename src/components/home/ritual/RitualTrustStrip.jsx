import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Leaf } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD_DISPLAY, GUARANTEE_DISPLAY } from '@/lib/siteConfig';

// Compact, factual trust strip — social proof without fabricated testimonials
// or intrusive popups. Every value comes from siteConfig (single source of
// truth) so nothing here can drift out of sync.
const ITEMS = [
  { icon: Truck, label: `Free Shipping ${FREE_SHIPPING_THRESHOLD_DISPLAY}` },
  { icon: ShieldCheck, label: GUARANTEE_DISPLAY },
  { icon: RefreshCw, label: 'Cancel Anytime' },
  { icon: Leaf, label: 'Real Ingredients' },
];

export default function RitualTrustStrip() {
  return (
    <section style={{ background: '#F7F1E7' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-8 md:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2.5 text-center">
              <Icon className="h-4 w-4 flex-shrink-0" style={{ color: '#B7653E' }} aria-hidden="true" />
              <span className="font-heading text-sm font-semibold" style={{ color: '#292622' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}