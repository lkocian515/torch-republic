import React from 'react';

export default function CollectionIntro({ eyebrow, title, intro, accent = '#9B4E2F', align = 'center' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      {eyebrow && <p className="eyebrow mb-3" style={{ color: accent }}>{eyebrow}</p>}
      <h2 className="h2 mb-4">{title}</h2>
      {intro && <p className="body-lg">{intro}</p>}
    </div>
  );
}