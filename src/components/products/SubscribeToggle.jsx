import React, { useState } from 'react';
import { Zap, Check, RefreshCw } from 'lucide-react';

/**
 * SubscribeToggle
 * Defaults to "Subscribe & Save". Shows discounted vs original pricing.
 * Props:
 *   accent      - brand color string
 *   price       - original price string like "$18.99" or number
 *   onModeChange - callback(mode: 'subscribe'|'onetime')
 */
export default function SubscribeToggle({ accent = '#C9A24A', price = '$18.99', onModeChange }) {
  const [mode, setMode] = useState('subscribe');
  const isSubscribe = mode === 'subscribe';

  const raw = parseFloat(String(price).replace(/[^0-9.]/g, '')) || 18.99;
  const subPrice = (raw * 0.85).toFixed(2);
  const origPrice = raw.toFixed(2);

  const handleMode = (m) => {
    setMode(m);
    onModeChange?.(m);
  };

  return (
    <div className="mb-6">
      {/* Label */}
      <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Purchase Option
      </p>

      {/* Option 1 — One-Time */}
      <button
        onClick={() => handleMode('onetime')}
        className="w-full flex items-center justify-between px-4 py-3.5 mb-2 transition-all"
        style={{
          background: !isSubscribe ? 'rgba(255,255,255,0.05)' : 'transparent',
          border: !isSubscribe ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Radio indicator */}
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ border: !isSubscribe ? '2px solid rgba(255,255,255,0.5)' : '2px solid rgba(255,255,255,0.18)' }}>
            {!isSubscribe && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.7)' }} />}
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: !isSubscribe ? 'rgba(240,235,225,0.8)' : 'rgba(240,235,225,0.3)' }}>
            One-Time Purchase
          </span>
        </div>
        <span className="font-mono text-sm font-bold"
          style={{ color: !isSubscribe ? 'rgba(240,235,225,0.7)' : 'rgba(240,235,225,0.25)' }}>
          ${origPrice}
        </span>
      </button>

      {/* Option 2 — Subscribe & Save (default selected) */}
      <button
        onClick={() => handleMode('subscribe')}
        className="w-full transition-all"
        style={{
          background: isSubscribe ? 'rgba(201,162,74,0.08)' : 'transparent',
          border: isSubscribe ? `1px solid ${accent}55` : '1px solid rgba(201,162,74,0.15)',
          boxShadow: isSubscribe ? `0 0 20px rgba(201,162,74,0.12), inset 0 0 12px rgba(201,162,74,0.04)` : 'none',
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            {/* Radio indicator */}
            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ border: isSubscribe ? `2px solid ${accent}` : '2px solid rgba(201,162,74,0.25)' }}>
              {isSubscribe && <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />}
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 flex-shrink-0" style={{ color: isSubscribe ? accent : 'rgba(201,162,74,0.3)' }} />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold"
                style={{ color: isSubscribe ? accent : 'rgba(201,162,74,0.4)' }}>
                Subscribe &amp; Save
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isSubscribe && (
              <span className="font-mono text-[9px] font-black tracking-[0.25em] uppercase px-2 py-0.5"
                style={{ background: accent, color: '#0B0B0B' }}>
                Best Value
              </span>
            )}
            <div className="text-right">
              <span className="font-mono text-base font-black block" style={{ color: accent }}>${subPrice}</span>
              <span className="font-mono text-[9px] line-through block" style={{ color: 'rgba(255,255,255,0.22)' }}>${origPrice}</span>
            </div>
          </div>
        </div>

        {/* Expanded detail when selected */}
        {isSubscribe && (
          <div className="px-4 pb-4 pt-0">
            <div className="pt-3" style={{ borderTop: `1px solid ${accent}18` }}>
              {/* Main copy */}
              <p className="font-heading mb-3" style={{ fontSize: '0.82rem', color: 'rgba(240,235,225,0.8)', lineHeight: 1.7, fontWeight: 400 }}>
                Delivered monthly. Save money. Unlock exclusive blends.
              </p>
              {/* Bullets */}
              <div className="space-y-1.5 mb-3">
                {[
                  'Save 15% on every bag',
                  'Early access to limited & exclusive roasts',
                  'Free shipping on subscription orders',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: accent }} />
                    <span className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
              {/* Micro trust */}
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-2.5 h-2.5 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.45)' }} />
                <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
                  Pause, skip, or cancel anytime. No commitment.
                </p>
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}