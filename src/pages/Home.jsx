import React from 'react';
import PremiumHero from '../components/home/PremiumHero';
import FoundersFeatured from '../components/home/FoundersFeatured';
import BrandStatement from '../components/home/BrandStatement';
import CollectionTiles from '../components/home/CollectionTiles';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
      <PremiumHero />
      <FoundersFeatured />
      <BrandStatement />
      <CollectionTiles />
      <NewsletterSection />
    </div>
  );
}