import React from 'react';
import { ShieldCheck, Zap, MapPin, RotateCcw } from 'lucide-react';

const RG = '#E6AC45';

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Secure Checkout' },
  { icon: Zap, label: 'No Machine Needed' },
  { icon: MapPin, label: 'U.S.-Based Small Business' },
  { icon: RotateCcw, label: '30-Day Guarantee' },
];

export default function ProductTrustBar({ compact = false }) {
  return (
    <div
      className={`flex flex-wrap items-center ${compact ? 'gap-4 py-3' : 'gap-5 md:gap-8 py-5'} justify-center md:justify-start`}
      style={{ borderTop: '1px solid rgba(230,183,173,0.1)', borderBottom: '1px solid rgba(230,183,173,0.1)' }}
    >
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon size={compact ? 12 : 14} style={{ color: RG, flexShrink: 0 }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: compact ? '0.6rem' : '0.65rem', letterSpacing: '0.2em', color: 'rgba(230,183,173,0.55)' }}
          >
            {label}
          </span>
        </div>
      ))}
      <div className="w-full flex flex-wrap gap-4 justify-center md:justify-start mt-2" style={{ borderTop: '1px solid rgba(230,183,173,0.06)', paddingTop: '8px' }}>
        <a href="mailto:info@torchrepublic.com" className="font-mono text-[9px] tracking-[0.15em] hover:opacity-80" style={{ color: 'rgba(230,183,173,0.35)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          info@torchrepublic.com
        </a>
      </div>
    </div>
  );
}