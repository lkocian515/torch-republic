import React from 'react';
import CollectionPageTemplate from '../components/collections/CollectionPageTemplate';

export default function CommandersSeries() {
  return (
    <CollectionPageTemplate
      bannerImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&q=85"
      eyebrow="Torch Republic"
      title="Commanders Series"
      subtitle="Leadership under pressure. Built for those who take command."
      description="The Commanders Series is being forged. Each blend in this collection will honor the men and women who led with conviction — not comfort. Those who studied history, prepared relentlessly, and acted when others hesitated. Check back soon."
      quote="Leadership is not a rank. It's a decision made daily."
      accentColor="#A8893A"
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