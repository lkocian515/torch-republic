import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Check } from 'lucide-react';

/**
 * SubscribeToggle
 * Shown above Add-to-Cart on coffee product pages.
 * Defaults to "Subscribe & Save" selection.
 * Props: accent (color string), price (string like "$18.99")
 */
export default function SubscribeToggle({ accent = '#C9A24A', price = '$18.99' }) {
  const [mode, setMode] = useState('subscribe');

  const isSubscribe = mode === 'subscribe';

  return (
    <div className="mb-5">
      {/* Toggle */}
      <div className="grid grid-cols-2 gap-1.5 mb-3" style={{ background: '#0A0A0A', padding: '4px', border: '1px solid rgba(201,162,74,0.12)' }}>
        <button
          onClick={() => setMode('onetime')}
          className="relative py-2.5 px-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-all"
          style={{
            background: !isSubscribe ? 'rgba(255,255,255,0.06)' : 'transparent',
            color: !isSubscribe ? 'rgba(240,235,225,0.8)' : 'rgba(240,235,225,0.3)',
            border: !isSubscribe ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
          }}
        >
          One-Time
        </button>
        <button
          onClick={() => setMode('subscribe')}
          className="relative py-2.5 px-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-all"
          style={{
            background: isSubscribe ? `rgba(201,162,74,0.12)` : 'transparent',
            color: isSubscribe ? accent : 'rgba(240,235,225,0.3)',
            border: isSubscribe ? `1px solid ${accent}45` : '1px solid transparent',
            boxShadow: isSubscribe ? `0 0 16px rgba(201,162,74,0.08)` : 'none',
          }}
        >
          <span className="relative flex items-center justify-center gap-1.5">
            <Zap className="w-3 h-3 flex-shrink-0" />
            Subscribe & Save
          </span>
        </button>
      </div>

      {/* Best Value badge + subscribe detail */}
      {isSubscribe && (
        <div className="flex flex-col gap-2 px-3 py-3"
          style={{ background: `rgba(201,162,74,0.06)`, border: `1px solid ${accent}25` }}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-2 py-0.5"
              style={{ background: accent, color: '#0B0B0B' }}>
              Best Value
            </span>
            <span className="font-mono text-xs font-black" style={{ color: accent }}>
              Save 15%
            </span>
          </div>
          <div className="flex items-start gap-2 mt-1">
            <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: accent }} />
            <p className="font-heading" style={{ fontSize: '0.78rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.65, fontWeight: 300 }}>
              Get this blend in your monthly Torch Box and save + unlock exclusive releases.{' '}
              <Link to="/TheTorchBox" style={{ color: accent, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}