import React from 'react';

export default function TopBar() {
  return (
    <div
      className="w-full flex items-center justify-center px-6"
      style={{
        height: '22px',
        backgroundColor: '#070709',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      <p className="font-mono text-center" style={{ fontSize: '8.5px', letterSpacing: '0.42em', color: 'rgba(230,183,173,0.45)', textTransform: 'uppercase' }}>
        Free Shipping Over $75 &nbsp;·&nbsp; Lion's Mane + Chaga &nbsp;·&nbsp; 27 Servings Per Tube
      </p>
    </div>
  );
}