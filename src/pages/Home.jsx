import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCollections from '../components/home/FeaturedCollections';
import TrustBar from '../components/home/TrustBar';
import TrustSection from '../components/home/TrustSection';
import BestSellersSection from '../components/home/BestSellersSection';
import CategoryGrid from '../components/home/CategoryGrid';
import JoinMovementBanner from '../components/home/JoinMovementBanner';
import ManifestoSection from '../components/home/ManifestoSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <JoinMovementBanner />
      <FeaturedCollections />
      <BestSellersSection />
      <ManifestoSection />
      <TrustSection />
      <NewsletterSection />
    </div>
  );
}