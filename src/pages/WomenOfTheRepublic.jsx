import React from 'react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

export default function WomenOfTheRepublic() {
  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Women of the Republic"
      subtitle="Strength, influence, and legacy — honoring the women who shaped history."
      description="Behind every great movement, there were women who refused to be quiet. Who organized, who marched, who built institutions, raised leaders, and changed the course of history without always receiving credit. This collection is for them — and for you."
      quote="Well-behaved women seldom make history."
      quoteAttrib="Laurel Thatcher Ulrich"
      accentColor="#D4A0C0"
    >
      <div className="text-center py-20">
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(212,160,192,0.35)' }}>
          Coming Soon
        </p>
        <p className="font-serif text-2xl mt-4" style={{ color: 'rgba(240,235,225,0.3)' }}>
          This series is being crafted.
        </p>
      </div>
    </CollectionPageTemplate>
  );
}