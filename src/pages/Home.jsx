import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellersSection from '../components/home/BestSellersSection';
import CategoryGrid from '../components/home/CategoryGrid';
import ManifestoSection from '../components/home/ManifestoSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <div>
        <FeaturedCollections />
        <BestSellersSection />
        <ManifestoSection />
        <NewsletterSection />
      </div>
    </div>
  );
}