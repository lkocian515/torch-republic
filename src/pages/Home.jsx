import React from 'react';
import PremiumHero from '../components/home/PremiumHero';
import TrustBar from '../components/home/TrustBar';
import FoundersFeatured from '../components/home/FoundersFeatured';
import CollectionTiles from '../components/home/CollectionTiles';
import WhyTorchRepublic from '../components/home/WhyTorchRepublic';
import LuxuryTestimonials from '../components/home/LuxuryTestimonials';
import JournalTeaser from '../components/home/JournalTeaser';
import TorchbearerCTA from '../components/home/TorchbearerCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';
import BrandMission from '../components/home/BrandMission';
import CoffeeCollectionMenu from '../components/home/CoffeeCollectionMenu';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050508' }}>
      <PremiumHero />
      <TrustBar />
      <BrandMission />
      <CoffeeCollectionMenu />
      <FoundersFeatured />
      <CollectionTiles />
      <WhyTorchRepublic />
      <LuxuryTestimonials />
      <JournalTeaser />
      <TorchbearerCTA />
      <ExitIntentPopup />
    </div>
  );
}