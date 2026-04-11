import React from 'react';
import PremiumHero from '../components/home/PremiumHero';
import FoundersFeatured from '../components/home/FoundersFeatured';
import WhyTorchRepublic from '../components/home/WhyTorchRepublic';
import LuxuryTestimonials from '../components/home/LuxuryTestimonials';
import CollectionTiles from '../components/home/CollectionTiles';
import NewsletterSection from '../components/home/NewsletterSection';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
      <PremiumHero />
      <FoundersFeatured />
      <WhyTorchRepublic />
      <LuxuryTestimonials />
      <CollectionTiles />
      <NewsletterSection />
      <ExitIntentPopup />
    </div>
  );
}