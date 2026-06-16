import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const RG = '#E6B7AD';

const COMPARISON_ROWS = [
  { feature: 'No machine or pods needed', tr: true, generic: false },
  { feature: 'Premium freeze-dried Arabica', tr: true, generic: false },
  { feature: "Lion's Mane + Chaga mushrooms", tr: true, generic: false },
  { feature: 'Ceremonial grade matcha', tr: true, generic: false },
  { feature: '27 servings per tube', tr: true, generic: false },
  { feature: 'Subscribe & Save 20%', tr: true, generic: false },
  { feature: 'Texas-based small business', tr: true, generic: false },
  { feature: 'Supports focus & daily wellness', tr: true, generic: false },
  { feature: 'Clear, transparent ingredients', tr: true, generic: false },
];

const PILLARS = [
  {
    icon: '⚡',
    title: 'Instant Convenience',
    body: 'No pods, no machine, no cleanup. One scoop into hot water and your ritual is ready in 30 seconds — at home, at the office, or anywhere.',
  },
  {
    icon: '🍄',
    title: "Functional Mushrooms",
    body: "Every mushroom blend includes Lion's Mane and Chaga — two of the most studied functional mushrooms for daily wellness and focus support.",
  },
  {
    icon: '🍵',
    title: 'Ceremonial Matcha',
    body: 'Our matcha is 100% ceremonial grade — shade-grown, stone-milled whole leaves. Not culinary powder. The real thing, in instant format.',
  },
  {
    icon: '🔍',
    title: 'Ingredient Transparency',
    body: 'No artificial flavors, no fillers, no mystery. Every ingredient is listed clearly. You know exactly what is in your cup and why.',
  },
  {
    icon: '💰',
    title: 'Only $0.74–$1.00 Per Cup',
    body: 'Premium wellness coffee that costs less per cup than your daily café stop — starting at $0.74 per serving for classic blends.',
  },
  {
    icon: '🔄',
    title: 'Subscribe & Save 20%',
    body: 'Build your ritual subscription and save 20% on every order. Pause, swap, or cancel anytime in two clicks — no hassle.',
  },
  {
    icon: '🕯️',
    title: 'Founder-Led Brand',
    body: 'Built by a real person in Corpus Christi, TX — not a faceless wellness conglomerate. Every product was created from a genuine search for better daily ritual.',
  },
  {
    icon: '🌿',
    title: 'Ritual-Based Wellness',
    body: 'Blends designed around intention — morning momentum, midday focus, calm evenings. A different ritual for every part of your day.',
  },
];

export default function WhyTorchRepublic() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
            Why Choose Torch Republic?
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            A Better Daily Ritual
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '1.05rem', color: 'rgba(245,239,230,0.9)', fontWeight: 400, lineHeight: 1.9 }}>
            Torch Republic was built for people who want the convenience of instant coffee without sacrificing quality, wellness, or intention.
          </p>
        </div>

        {/* 8-pillar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {PILLARS.map((b, i) => (
            <div
              key={b.title}
              className="p-6 flex flex-col gap-3"
              style={{ background: '#111', border: '1px solid rgba(230,183,173,0.08)' }}
            >
              <span className="text-2xl">{b.icon}</span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1rem' }}>{b.title}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.9)', fontWeight: 400, lineHeight: 1.75 }}>
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-12">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-center mb-6" style={{ color: RG }}>
            How We Compare
          </p>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: 'collapse', maxWidth: 680, margin: '0 auto' }}>
              <thead>
                <tr>
                  <th className="text-left pb-3 font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.7)', width: '55%' }}></th>
                  <th className="pb-3 font-mono text-[11px] tracking-[0.2em] uppercase text-center" style={{ color: RG }}>Torch Republic</th>
                  <th className="pb-3 font-mono text-[11px] tracking-[0.2em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.7)' }}>Generic Instant</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.feature} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <td className="py-2.5 font-heading text-sm" style={{ color: 'rgba(245,239,230,0.95)', fontWeight: 400 }}>{row.feature}</td>
                    <td className="py-2.5 text-center">
                      {row.tr
                        ? <Check className="w-4 h-4 mx-auto" style={{ color: '#10B981' }} />
                        : <X className="w-4 h-4 mx-auto" style={{ color: 'rgba(255,255,255,0.2)' }} />}
                    </td>
                    <td className="py-2.5 text-center">
                      {row.generic
                        ? <Check className="w-4 h-4 mx-auto" style={{ color: '#10B981' }} />
                        : <X className="w-4 h-4 mx-auto" style={{ color: 'rgba(255,255,255,0.2)' }} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: '30-Day Satisfaction Guarantee', sub: 'Not right? We make it right.' },
            { label: 'Free Shipping Over $75', sub: 'Ships in 1–3 business days.' },
            { label: 'Subscribe & Save 20%', sub: 'Cancel or pause anytime.' },
            { label: 'Texas-Based Small Business', sub: 'Corpus Christi, TX.' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: RG }}>{item.label}</p>
              <p className="font-heading text-sm mt-0.5" style={{ color: 'rgba(240,235,225,0.9)', fontWeight: 400 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 px-8 py-4"
            style={{ background: RG, color: '#080808' }}
          >
            Shop All Blends →
          </Link>
        </div>
      </div>
    </section>
  );
}