import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Crown, ChevronRight } from 'lucide-react';

const RG = '#E6B7AD';

const TIERS = [
  { name: 'EMBER', icon: Flame, color: '#C98F86', desc: 'Entry tier' },
  { name: 'BEACON', icon: Sparkles, color: '#E6B7AD', desc: 'Mid tier' },
  { name: 'FLAMEKEEPER', icon: Crown, color: '#D4AF37', desc: 'VIP tier' },
];

export default function TorchbearersRewardsSection() {
  return (
    <section className="px-4 md:px-10 py-16 md:py-24 relative" style={{ background: '#0F0E0D' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-5 h-5" style={{ color: RG }} />
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Torchbearer Rewards
            </p>
          </div>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Carry the Flame. Earn Torchbearer Rewards.
          </h2>
          <p className="font-heading max-w-2xl mx-auto mb-8"
            style={{ fontSize: '1.05rem', color: 'rgba(245,239,230,0.7)', fontWeight: 300, lineHeight: 1.85 }}>
            Join our loyalty program and earn points on every purchase, review, and referral.
            Advance through tiers and unlock exclusive rewards.
          </p>
          <Link
            to="/torchbearers-rewards"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808' }}
          >
            Learn More
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tier Preview */}
        <div className="grid md:grid-cols-3 gap-4">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div
                key={i}
                className="p-6 text-center"
                style={{
                  background: `rgba(${tier.color === '#C98F86' ? '201,143,134' : tier.color === '#E6B7AD' ? '230,183,173' : '212,175,55'},0.06)`,
                  border: `1px solid ${tier.color}30`,
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}30` }}>
                  <Icon className="w-6 h-6" style={{ color: tier.color }} />
                </div>
                <h3 className="font-serif font-bold mb-1" style={{ fontSize: '1.1rem', color: tier.color }}>
                  {tier.name}
                </h3>
                <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
                  {tier.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}