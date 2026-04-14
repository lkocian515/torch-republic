import React from 'react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

export default function Patriots() {
  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1569025591790-f54b6a9f4c2c?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Patriots"
      subtitle="For those who stand firm. Everyday courage, brewed strong."
      description="Patriotism isn't a bumper sticker. It's the quiet discipline of showing up — to your family, your community, your country — when it would be easier not to. The Patriots collection honors that daily commitment."
      quote="Endurance is the real flex."
      accentColor="#C9A24A"
    >
      <div className="text-center py-20">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.35)' }}>
          Coming Soon
        </p>
        <p className="font-serif text-2xl mt-4" style={{ color: 'rgba(240,235,225,0.3)' }}>
          This series is being crafted.
        </p>
      </div>
    </CollectionPageTemplate>
  );
}