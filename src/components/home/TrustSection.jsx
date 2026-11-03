import React from 'react';
import { Shield, Leaf, Award, Truck, Star, User } from 'lucide-react';

const RG = '#E6AC45';

const TRUST_ITEMS = [
  { icon: Shield, label: 'Secure Checkout', sub: 'SSL encrypted & protected' },
  { icon: Leaf, label: 'Premium Ingredients', sub: 'Sourced with intention' },
  { icon: Award, label: 'Satisfaction Guarantee', sub: '30-day guarantee' },
  { icon: Truck, label: 'Free Shipping $45+', sub: 'Ships in 1–3 business days' },
  { icon: Star, label: 'Customer Reviews', sub: '4.9 average · store-wide' },
  { icon: User, label: 'Founder-Led', sub: 'Small business, big care' },
];

export default function TrustSection() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20" style={{ background: '#0D0C0B' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.9)' }}>
            Why Customers Trust Torch Republic
          </p>
          <h2
            className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}
          >
            Built on Trust & Quality
          </h2>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center p-4"
              style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}
            >
              <item.icon className="w-6 h-6 mb-3" style={{ color: RG }} />
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase font-semibold mb-1" style={{ color: RG }}>
                {item.label}
              </p>
              <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.95)', fontWeight: 400 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Founder Statement */}
        <div
          className="max-w-2xl mx-auto text-center"
          style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)', padding: '32px', borderRadius: '4px' }}
        >
          <p className="font-serif font-bold text-lg mb-3" style={{ color: '#F7F2E9' }}>
            A Note from the Founder
          </p>
          <p className="font-heading text-base mb-4" style={{ color: 'rgba(245,239,230,0.9)', fontWeight: 400, lineHeight: 1.8, fontStyle: 'italic' }}>
            "Torch Republic was created to make daily coffee feel more intentional — less rushed, less generic, and more aligned with the person you're becoming. Every blend is crafted for clarity, focus, and the rituals that matter most."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full" style={{ background: RG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-serif font-bold text-xs" style={{ color: '#080808' }}>TR</span>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase font-bold" style={{ color: RG }}>Torch Republic</p>
              <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.92)' }}>Corpus Christi, TX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}