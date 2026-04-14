import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import BrandStatement from '../components/home/v2/BrandStatement';
import CollectionGrid from '../components/home/v2/CollectionGrid';
import FeaturedProducts from '../components/home/v2/FeaturedProducts';
import StoryStrip from '../components/home/v2/StoryStrip';
import TorchbearerSignup from '../components/home/v2/TorchbearerSignup';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <HeroSection />
      <BrandStatement />
      <CollectionGrid />
      <FeaturedProducts />
      <StoryStrip />
      <TorchbearerSignup />
      <ExitIntentPopup />
    </div>
  );
}