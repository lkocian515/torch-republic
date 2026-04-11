import React from 'react';

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-center px-6"
      style={{
        height: '28px',
        backgroundColor: '#0A0A0D',
        borderBottom: '1px solid rgba(196,163,90,0.12)',
      }}
    >
      <p className="font-mono text-center" style={{ fontSize: '9px', letterSpacing: '0.38em', color: 'rgba(196,163,90,0.55)', textTransform: 'uppercase' }}>
        Free Shipping Over $150 &nbsp;·&nbsp; Use <span style={{ color: '#C4A35A' }}>TORCH20</span> for 20% Off &nbsp;·&nbsp; Join the Legacy
      </p>
    </div>
  );
}