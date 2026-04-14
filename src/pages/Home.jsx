import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import StartHere from '../components/home/v2/StartHere';
import SocialProof from '../components/home/v2/SocialProof';
import CollectionHighlight from '../components/home/v2/CollectionHighlight';
import TorchBoxFeature from '../components/home/v2/TorchBoxFeature';
import MissionSection from '../components/home/v2/MissionSection';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <HeroSection />
      <StartHere />
      <SocialProof />
      <CollectionHighlight />
      <TorchBoxFeature />
      <MissionSection />
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}