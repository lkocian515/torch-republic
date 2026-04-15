import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BrandExplainer from '../components/home/v2/BrandExplainer';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import FeaturedCollections from '../components/home/v2/FeaturedCollections';
import FoundersStarterPack from '../components/bundles/FoundersStarterPack';
import WhyTorchRepublic from '../components/home/v2/WhyTorchRepublic';
import BundleSection from '../components/home/v2/BundleSection';
import ApparelSection from '../components/home/v2/ApparelSection';
import SocialProof from '../components/home/v2/SocialProof';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Brand explainer */}
      <BrandExplainer />

      {/* 3. Best Selling Coffee — "Start Here" */}
      <BestSellersStrip />

      {/* 4. Founders Series + Liberty Icons collections */}
      <FeaturedCollections />

      {/* 5. Founders Starter Pack bundle */}
      <FoundersStarterPack />

      {/* 6. Why Torch Republic brand pillars */}
      <WhyTorchRepublic />

      {/* 7. Bundle builder CTA */}
      <BundleSection />

      {/* 8. Apparel & Gear — secondary section */}
      <ApparelSection />

      {/* 9. Social proof */}
      <SocialProof />

      {/* 10. Final CTA */}
      <FinalCTA />

      <ExitIntentPopup />
    </div>
  );
}