import React from 'react';

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-center px-6"
      style={{
        height: '22px',
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(196,163,90,0.08)',
      }}
    >
      <p className="font-mono text-center" style={{ fontSize: '8.5px', letterSpacing: '0.42em', color: 'rgba(196,163,90,0.48)', textTransform: 'uppercase' }}>
        Free Shipping Over $150 &nbsp;·&nbsp; Use <span style={{ color: '#C4A35A', fontWeight: 700 }}>TORCH20</span> for 20% Off &nbsp;·&nbsp; Join the Legacy
      </p>
    </div>
  );
}