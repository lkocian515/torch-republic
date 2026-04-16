import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import BrandExplainer from '../components/home/v2/BrandExplainer';
import FeaturedCollections from '../components/home/v2/FeaturedCollections';
import FoundersStarterPack from '../components/bundles/FoundersStarterPack';
import WhyTorchRepublic from '../components/home/v2/WhyTorchRepublic';
import CoffeeQuiz from '../components/home/CoffeeQuiz';
import TorchBoxIntro from '../components/home/v2/TorchBoxIntro';
import ApparelSection from '../components/home/v2/ApparelSection';
import SocialProof from '../components/home/v2/SocialProof';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* 1. Hero */}
      <HeroSection />
      {/* 2. Start Here — top 4 coffee products */}
      <BestSellersStrip />
      {/* 3. What is Torch Republic */}
      <BrandExplainer />
      {/* 4. Featured Collections — Founders + Liberty Icons */}
      <FeaturedCollections />
      {/* 5. Founders Starter Pack bundle */}
      <FoundersStarterPack />
      {/* 6. Why Choose Us */}
      <WhyTorchRepublic />
      {/* 7. Coffee Discovery Quiz */}
      <CoffeeQuiz />
      {/* 8. Torch Box subscription intro */}
      <TorchBoxIntro />
      {/* 8. Apparel — secondary */}
      <ApparelSection />
      {/* 9. Social proof */}
      <SocialProof />
      {/* 10. Final CTA */}
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}