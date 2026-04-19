import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import HeroConversionStrip from '../components/home/v2/HeroConversionStrip';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
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
      {/* Conversion strip directly under hero */}
      <HeroConversionStrip />
      {/* 2. Founders Series — primary coffee */}
      <BestSellersStrip />
      {/* 3. Torch Box — primary conversion driver */}
      <TorchBoxSection />
      {/* 4. Liberty Icons */}
      <LibertyIconsStrip />
      {/* 5. Commanders Series */}
      <CommandersStrip />
      {/* 5b. Women of the Republic — Coming Soon */}
      <WomenOfTheRepublicStrip />
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