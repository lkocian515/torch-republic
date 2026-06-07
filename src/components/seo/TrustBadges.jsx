import React from 'react';
import { Shield, Truck, RefreshCcw, CreditCard } from 'lucide-react';

/**
 * TrustBadges - Displays trust signals for product pages
 * Improves conversion by showing security, shipping, and guarantee information
 */
export default function TrustBadges({ compact = false }) {
  const badges = [
    {
      icon: Shield,
      label: 'Secure Checkout',
      description: '256-bit SSL encryption'
    },
    {
      icon: Truck,
      label: 'Free Shipping',
      description: 'Orders $75+'
    },
    {
      icon: RefreshCcw,
      label: '30-Day Guarantee',
      description: 'Satisfaction guaranteed'
    },
    {
      icon: CreditCard,
      label: 'Secure Payment',
      description: 'All major cards accepted'
    }
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {badges.map(badge => (
          <div key={badge.label} className="flex items-center gap-2">
            <badge.icon className="w-4 h-4" style={{ color: 'rgba(230,183,173,0.6)' }} />
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(247,241,232,0.4)' }}>
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-12 px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-center mb-8" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Why Shop With Us
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div key={badge.label} className="text-center">
              <div className="flex items-center justify-center mb-3"
                style={{ 
                  width: 48, 
                  height: 48, 
                  margin: '0 auto 12px',
                  borderRadius: '50%',
                  background: 'rgba(230,183,173,0.08)',
                  border: '1px solid rgba(230,183,173,0.15)'
                }}>
                <badge.icon className="w-5 h-5" style={{ color: '#E6B7AD' }} />
              </div>
              <h3 className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(247,241,232,0.7)' }}>
                {badge.label}
              </h3>
              <p className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.35)', fontWeight: 300 }}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}