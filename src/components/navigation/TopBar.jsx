import React from 'react';
import { WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT, FREE_SHIPPING_THRESHOLD_DISPLAY } from '@/lib/siteConfig';

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-center px-4"
      style={{
        height: '28px',
        background: 'linear-gradient(90deg, #0B2D2A 0%, #08101A 50%, #1A1208 100%)',
        borderBottom: '1px solid rgba(214,178,122,0.15)',
      }}
    >
      <p className="font-mono text-center whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ fontSize: '8px', letterSpacing: '0.42em', color: 'rgba(214,195,160,0.75)', textTransform: 'uppercase' }}>
        {WELCOME_DISCOUNT_PERCENT}% OFF YOUR FIRST ORDER &nbsp;&middot;&nbsp; CODE{' '}
        <span style={{ color: '#D6B87A', fontWeight: 700 }}>{WELCOME_DISCOUNT_CODE}</span>
      </p>
    </div>
  );
}