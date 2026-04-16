import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import LibertyIconsStrip from '../components/home/v2/LibertyIconsStrip';
import CommandersStrip from '../components/home/v2/CommandersStrip';
import ApparelSection from '../components/home/v2/ApparelSection';
import TorchBoxIntro from '../components/home/v2/TorchBoxIntro';
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
      {/* 3. Liberty Icons — "Symbols that outlive time" */}
      <LibertyIconsStrip />
      {/* 4. Commanders Series — "Built for those who lead" */}
      <CommandersStrip />
      {/* 5. Shirts — secondary expression, tighter weight */}
      <ApparelSection />
      {/* 6. Torch Box subscription */}
      <TorchBoxIntro />
      {/* 7. Social proof */}
      <SocialProof />
      {/* 8. Final CTA */}
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}