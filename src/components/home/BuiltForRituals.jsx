import React from 'react';
import { Zap, Leaf, Coffee, Flame } from 'lucide-react';

const RG = '#E6B7AD';

const PILLARS = [
  { icon: Zap, label: 'Instant Rituals', sub: 'Ready in seconds, no machine required' },
  { icon: Leaf, label: 'Transparent Ingredients', sub: 'You know exactly what is in your cup' },
  { icon: Coffee, label: 'No Machine Needed', sub: 'Just hot water, a scoop, and intention' },
  { icon: Flame, label: 'Small-Batch Wellness Brand', sub: 'Founder-led, craft-focused, care-driven' },
];

export default function BuiltForRituals() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20 relative" style={{ background: '#0A0908' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
              Our Purpose
            </p>
            <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
              Built for Better Daily Rituals
            </h2>
            <p className="font-heading mb-6" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.9)', fontWeight: 400, lineHeight: 1.9 }}>
              Torch Republic was created for people who want the convenience of instant coffee without sacrificing intention, quality, or wellness. Our blends are designed to support focused mornings, calmer routines, and a more meaningful daily ritual — no pods, no machines, no complicated prep.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['No pods', 'No machine', 'Just your ritual'].map((item) => (
                <span key={item} className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: RG }}>
                  ✦ {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right — pillar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                className="p-5 flex flex-col gap-3"
                style={{ background: '#111', border: `1px solid rgba(230,183,173,0.09)`, borderRadius: '4px' }}
              >
                <p.icon className="w-5 h-5" style={{ color: RG }} />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: RG }}>
                    {p.label}
                  </p>
                  <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.95)', fontWeight: 400 }}>
                    {p.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}