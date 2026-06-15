import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Percent, Package, HeartHandshake } from 'lucide-react';

const RG = '#E6B7AD';

const PERKS = [
  { icon: Percent, label: '20% Off Every Order', desc: 'Save automatically on each delivery.' },
  { icon: Package, label: 'Flexible Delivery', desc: 'Set your schedule — every 2–8 weeks.' },
  { icon: RefreshCw, label: 'Cancel Anytime', desc: 'No commitments. Pause or cancel easily.' },
  { icon: HeartHandshake, label: 'Priority Support', desc: 'Members get first-access service.' },
];

export default function SubscribeAndSaveSection() {
  return (
    <section className="px-4 md:px-10 py-16 md:py-24 relative" style={{ background: '#0A0B0A' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: `${RG}55` }}>
              Subscribe &amp; Save
            </p>
            <h2 className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Never run out.<br />
              <span style={{ color: RG }}>Save 20% every time.</span>
            </h2>
            <p className="font-heading mb-8"
              style={{ fontSize: '1rem', color: 'rgba(245,239,230,0.55)', fontWeight: 300, lineHeight: 1.85 }}>
              Coffee is a daily ritual — your supply should be automatic. Subscribe and save 20% on every order, with zero commitment.
            </p>
            <Link
              to="/subscription"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase font-bold px-8 py-4 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}
            >
              Start My Subscription →
            </Link>
            <p className="font-mono text-[8px] tracking-[0.2em] mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Cancel or pause anytime · No commitments
            </p>
          </div>

          {/* Right: Perks grid */}
          <div className="grid grid-cols-2 gap-3">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div key={i} className="p-5"
                  style={{ background: `${RG}06`, border: `1px solid ${RG}18` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
                    style={{ background: `${RG}12`, border: `1px solid ${RG}25` }}>
                    <Icon className="w-4 h-4" style={{ color: RG }} />
                  </div>
                  <p className="font-serif font-bold text-white text-sm mb-1">{perk.label}</p>
                  <p className="font-mono text-[8px] tracking-[0.12em] leading-relaxed"
                    style={{ color: 'rgba(247,241,232,0.4)' }}>{perk.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}