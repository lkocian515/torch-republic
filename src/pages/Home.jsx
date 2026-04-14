import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeBrandStatement from '../components/home/HomeBrandStatement';
import HomeCollectionGrid from '../components/home/HomeCollectionGrid';
import HomeFeaturedProducts from '../components/home/HomeFeaturedProducts';
import HomeStoryStrip from '../components/home/HomeStoryStrip';
import HomeFinalCTA from '../components/home/HomeFinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <HomeHero />
      <HomeBrandStatement />
      <HomeCollectionGrid />
      <HomeFeaturedProducts />
      <HomeStoryStrip />
      <HomeFinalCTA />
      <ExitIntentPopup />
    </div>
  );
}