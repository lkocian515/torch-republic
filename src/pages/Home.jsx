import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import TorchBoxSection from '../components/home/v2/TorchBoxSection';
import LibertyIconsStrip from '../components/home/v2/LibertyIconsStrip';
import CommandersStrip from '../components/home/v2/CommandersStrip';
import WomenOfTheRepublicStrip from '../components/home/v2/WomenOfTheRepublicStrip';
import ApparelSection from '../components/home/v2/ApparelSection';
import SocialProof from '../components/home/v2/SocialProof';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* 1. Hero — Carry the Flame */}
      <HeroSection />
      {/* 2. Founders Series — primary coffee, "Where it all began" */}
      <BestSellersStrip />
      {/* 3. Torch Box — primary conversion driver */}
      <TorchBoxSection />
      {/* 4. Liberty Icons — "Symbols that outlive time" */}
      <LibertyIconsStrip />
      {/* 5. Commanders Series — "Built for those who lead" */}
      <CommandersStrip />
      {/* 5b. Women of the Republic — Coming Soon */}
      <WomenOfTheRepublicStrip />
      {/* 6. Shirts — secondary expression, tighter weight */}
      <ApparelSection />
      {/* 7. Social proof */}
      <SocialProof />
      {/* 8. Final CTA */}
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}