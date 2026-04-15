import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import WhyTorchRepublic from '../components/home/v2/WhyTorchRepublic';
import FeaturedCollections from '../components/home/v2/FeaturedCollections';
import BundleSection from '../components/home/v2/BundleSection';
import SocialProof from '../components/home/v2/SocialProof';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <HeroSection />
      <BestSellersStrip />
      <WhyTorchRepublic />
      <FeaturedCollections />
      <BundleSection />
      <SocialProof />
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}