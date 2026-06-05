import React from 'react';

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
        New customers: use code{' '}
        <span style={{ color: '#D6B87A', fontWeight: 700 }}>WELCOME10</span>
        {' '}for 10% off your first order &nbsp;·&nbsp; Free Shipping Over $75
      </p>
    </div>
  );
}