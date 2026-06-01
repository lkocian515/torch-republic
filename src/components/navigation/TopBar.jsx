import React from 'react';

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-center px-4"
      style={{
        height: '28px',
        backgroundColor: '#000',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
      }}
    >
      <p className="font-mono text-center whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ fontSize: '8px', letterSpacing: '0.42em', color: 'rgba(230,183,173,0.55)', textTransform: 'uppercase' }}>
        Free Shipping Over $75 &nbsp;·&nbsp; Code{' '}
        <span style={{ color: '#E6B7AD', fontWeight: 700 }}>TORCH20</span>
        {' '}— 20% Off &nbsp;·&nbsp; Focus. Flow. Ritual.
      </p>
    </div>
  );
}