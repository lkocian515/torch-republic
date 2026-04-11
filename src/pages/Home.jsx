import React from 'react';
import PremiumHero from '../components/home/PremiumHero';
import FoundersFeatured from '../components/home/FoundersFeatured';
import BrandStatement from '../components/home/BrandStatement';
import CollectionTiles from '../components/home/CollectionTiles';
import WhyTorchRepublic from '../components/home/WhyTorchRepublic';
import TestimonialsSection from '../components/home/TestimonialsSection';
import JournalTeaser from '../components/home/JournalTeaser';
import NewsletterSection from '../components/home/NewsletterSection';
import TrustBar from '../components/home/TrustBar';
import TorchbearerCTA from '../components/home/TorchbearerCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
      <PremiumHero />
      <TrustBar />
      <FoundersFeatured />
      <BrandStatement />
      <CollectionTiles />
      <WhyTorchRepublic />
      <TestimonialsSection />
      <JournalTeaser />
      <TorchbearerCTA />
      <NewsletterSection />
      <ExitIntentPopup />
    </div>
  );
}