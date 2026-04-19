import React from 'react';
import { Star, Coffee, Zap, CheckCircle } from 'lucide-react';

const BENEFITS = [
  { icon: Coffee, label: 'Bold Dark Roast', sub: 'Full-bodied & smooth' },
  { icon: Zap, label: 'Keurig Compatible', sub: 'Works in any K-Cup brewer' },
  { icon: CheckCircle, label: 'Consistent Every Cup', sub: 'Small-batch precision' },
];

export default function HeroConversionStrip() {
  return (
    <div
      className="w-full"
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(201,162,74,0.12)',
        borderBottom: '1px solid rgba(201,162,74,0.08)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

        {/* Star review */}
        <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left md:min-w-[280px]">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#C9A24A' }} />
            ))}
          </div>
          <p
            className="font-heading"
            style={{ fontSize: '0.875rem', color: 'rgba(240,235,225,0.75)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5, maxWidth: '280px' }}
          >
            "Best coffee I've had in years — bold but smooth."
          </p>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Verified Customer
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block" style={{ width: '1px', height: '56px', background: 'rgba(201,162,74,0.12)' }} />

        {/* Benefits */}
        <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-8 flex-1 justify-center md:justify-end">
          {BENEFITS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 36, height: 36, background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.18)' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#C9A24A' }} />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: '#F0EBE1' }}>{label}</p>
                <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block" style={{ width: '1px', height: '56px', background: 'rgba(201,162,74,0.12)' }} />

        {/* Made in USA */}
        <div className="flex flex-col items-center gap-1 text-center md:min-w-[160px]">
          <span style={{ fontSize: '1.5rem' }}>🇺🇸</span>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold" style={{ color: 'rgba(201,162,74,0.7)' }}>
            Proudly Made in the USA
          </p>
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Small Batch · Premium Coffee
          </p>
        </div>

      </div>
    </div>
  );
}