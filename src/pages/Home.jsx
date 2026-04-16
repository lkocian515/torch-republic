import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import FoundersStarterPack from '../components/bundles/FoundersStarterPack';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import LibertyIconsStrip from '../components/home/v2/LibertyIconsStrip';
import BrandExplainer from '../components/home/v2/BrandExplainer';
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
      {/* 2. Founders Starter Pack — coffee first */}
      <FoundersStarterPack />
      {/* 3. All 6 Founders Series blends — dynamic from DB */}
      <BestSellersStrip />
      {/* 4. Liberty Icons Coffee Collection — dynamic from DB */}
      <LibertyIconsStrip />
      {/* 5. Brand story */}
      <BrandExplainer />
      {/* 6. Why Choose Us */}
      <WhyTorchRepublic />
      {/* 7. Coffee Discovery Quiz */}
      <CoffeeQuiz />
      {/* 8. Torch Box subscription */}
      <TorchBoxIntro />
      {/* 9. Apparel — secondary, below all coffee */}
      <ApparelSection />
      {/* 10. Social proof */}
      <SocialProof />
      {/* 11. Final CTA */}
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}