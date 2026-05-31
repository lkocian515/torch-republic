import React from 'react';
import MushroomHero from '../components/mushroom/HeroSection';
import MushroomTrustBar from '../components/mushroom/TrustBar';
import FeaturedCollection from '../components/mushroom/FeaturedCollection';
import WhyInstant from '../components/mushroom/WhyInstant';
import BlendCompare from '../components/mushroom/BlendCompare';
import BundleSection from '../components/mushroom/BundleSection';
import HowToUse from '../components/mushroom/HowToUse';
import EmailCapture from '../components/mushroom/EmailCapture';
import FAQSection from '../components/mushroom/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      <MushroomHero />
      <MushroomTrustBar />
      <FeaturedCollection />
      <WhyInstant />
      <BlendCompare />
      <BundleSection />
      <HowToUse />
      <EmailCapture />
      <FAQSection />
    </div>
  );
}