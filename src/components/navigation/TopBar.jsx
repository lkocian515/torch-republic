import React from 'react';

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-center px-4"
      style={{
        height: '30px',
        backgroundColor: '#000000',
        borderBottom: '1px solid rgba(230,183,173,0.1)',
      }}
    >
      <p className="font-mono text-center whitespace-nowrap overflow-hidden text-ellipsis"
        style={{ fontSize: '9px', letterSpacing: '0.38em', color: 'rgba(230,183,173,0.85)', textTransform: 'uppercase' }}>
        Free Shipping Over $75 &nbsp;·&nbsp; Use{' '}
        <span style={{ color: '#E6B7AD', fontWeight: 700 }}>TORCH20</span>
        {' '}for 20% Off &nbsp;·&nbsp; Focus. Flow. Ritual.
      </p>
    </div>
  );
}