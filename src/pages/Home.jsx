import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '../components/mobile/PullToRefresh';
import PremiumHero from '../components/home/PremiumHero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSellersSection from '../components/home/BestSellersSection';
import TrustPillars from '../components/home/TrustPillars';
import BrandStoryPreview from '../components/home/BrandStoryPreview';
import SocialProof from '../components/home/SocialProof';
import FinalCTA from '../components/home/FinalCTA';
import NewsletterSection from '../components/home/NewsletterSection';

export default function Home() {
  const queryClient = useQueryClient();
  
  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen">
        <PremiumHero />
        <FeaturedCategories />
        <BestSellersSection />
        <TrustPillars />
        <BrandStoryPreview />
        <SocialProof />
        <FinalCTA />
        <NewsletterSection />
      </div>
    </PullToRefresh>
  );
}