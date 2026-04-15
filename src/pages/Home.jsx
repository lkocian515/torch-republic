import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BrandExplainer from '../components/home/v2/BrandExplainer';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import WhyTorchRepublic from '../components/home/v2/WhyTorchRepublic';
import FeaturedCollections from '../components/home/v2/FeaturedCollections';
import BundleSection from '../components/home/v2/BundleSection';
import FoundersStarterPack from '../components/bundles/FoundersStarterPack';
import SocialProof from '../components/home/v2/SocialProof';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <HeroSection />
      <BrandExplainer />
      <BestSellersStrip />
      <WhyTorchRepublic />
      <FeaturedCollections />
      <BundleSection />
      <FoundersStarterPack />
      <SocialProof />
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}