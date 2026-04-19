import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import HeroTrustBar from '../components/home/v2/HeroTrustBar';
import FeaturedProductSpotlight from '../components/home/v2/FeaturedProductSpotlight';
import PodsBenefitsStrip from '../components/home/v2/PodsBenefitsStrip';
import PodsSocialProof from '../components/home/v2/PodsSocialProof';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import BuildYourRoutine from '../components/home/v2/BuildYourRoutine';
import TorchBoxSection from '../components/home/v2/TorchBoxSection';
import LibertyIconsStrip from '../components/home/v2/LibertyIconsStrip';
import CommandersStrip from '../components/home/v2/CommandersStrip';
import WomenOfTheRepublicStrip from '../components/home/v2/WomenOfTheRepublicStrip';
import HomeReviewStrip from '../components/home/v2/HomeReviewStrip';
import GuaranteeBar from '../components/home/v2/GuaranteeBar';
import ApparelSection from '../components/home/v2/ApparelSection';
import SocialProof from '../components/home/v2/SocialProof';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* 1. Hero — Carry the Flame */}
      <HeroSection />
      {/* Trust bar directly under hero */}
      <HeroTrustBar />
      {/* 1b. Featured Product Spotlight — Washington Blend Pods */}
      <FeaturedProductSpotlight />
      {/* 1c. Pod benefits strip */}
      <PodsBenefitsStrip />
      {/* 1d. Social proof quote */}
      <PodsSocialProof />
      {/* 2. Founders Series — demoted slightly */}
      <BestSellersStrip />
      {/* 3. Torch Box — primary conversion driver */}
      <TorchBoxSection />
      {/* 4. Liberty Icons */}
      <LibertyIconsStrip />
      {/* 5. Commanders Series */}
      <CommandersStrip />
      {/* 5b. Women of the Republic — Coming Soon */}
      <WomenOfTheRepublicStrip />
      {/* 5c. Build Your Routine funnel */}
      <BuildYourRoutine />
      {/* 6. Review strip */}
      <HomeReviewStrip />
      {/* 7. Guarantee bar */}
      <GuaranteeBar />
      {/* 8. Shirts — reduced weight, below all coffee */}
      <ApparelSection />
      {/* 9. Social proof carousel */}
      <SocialProof />
      {/* 10. Final CTA */}
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}