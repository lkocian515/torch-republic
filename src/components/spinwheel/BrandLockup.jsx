import React from 'react';
import CupFlameMark from '@/components/spinwheel/CupFlameMark';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { gold, goldLight, cream, navyDeep } = BRAND_COLORS;

/**
 * The Torch Republic lockup: cup and flame, the wordmark, and a gold rule
 * interrupted by a coffee bean.
 */
export default function BrandLockup() {
  return (
    <div className="flex flex-col items-center text-center px-6 pt-6 pb-1">
      <CupFlameMark size={40} />
      <p
        className="font-serif font-bold uppercase"
        style={{ color: cream, fontSize: '1.05rem', letterSpacing: '0.14em', marginTop: '6px' }}
      >
        Torch Republic
      </p>
      <p
        className="font-mono uppercase"
        style={{ color: gold, fontSize: '0.5rem', letterSpacing: '0.4em', marginTop: '3px' }}
      >
        Coffee Company
      </p>

      <div className="flex items-center" style={{ width: '100%', maxWidth: 170, marginTop: 10 }}>
        <span
          style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent 0%, ${gold} 100%)` }}
        />
        <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, margin: '0 8px' }} aria-hidden="true">
          <ellipse cx="12" cy="12" rx="6.4" ry="8.8" transform="rotate(28 12 12)" fill={goldLight} />
          <path
            d="M12 3.4 C 9.4 8, 9.4 16, 12 20.6"
            transform="rotate(28 12 12)"
            fill="none"
            stroke={navyDeep}
            strokeWidth="1.5"
          />
        </svg>
        <span
          style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${gold} 0%, transparent 100%)` }}
        />
      </div>
    </div>
  );
}