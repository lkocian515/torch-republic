import React from 'react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

export default function Visionaries() {
  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Visionaries"
      subtitle="Ideas that changed the world. Coffee for those who think ahead."
      description="History wasn't built by those who accepted the world as it was. It was built by those who saw what it could become — and had the nerve to say so. The Visionaries collection is coming for the ones who still think that way."
      quote="The future belongs to those who prepare for it today."
      quoteAttrib="Malcolm X"
      accentColor="#9BB8CC"
    >
      <div className="text-center py-20">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(155,184,204,0.35)' }}>
          Coming Soon
        </p>
        <p className="font-serif text-2xl mt-4" style={{ color: 'rgba(240,235,225,0.3)' }}>
          This series is being crafted.
        </p>
      </div>
    </CollectionPageTemplate>
  );
}