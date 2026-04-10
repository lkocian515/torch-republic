import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import PullToRefresh from '../components/mobile/PullToRefresh';
import CoffeeHeroSection from '../components/home/CoffeeHeroSection';
import FoundersSeriesSection from '../components/home/FoundersSeriesSection';
import CoffeeBrandStory from '../components/home/CoffeeBrandStory';
import CoffeeLifestyleBanner from '../components/home/CoffeeLifestyleBanner';
import CuratedApparel from '../components/home/CuratedApparel';
import CollectorSystemSection from '../components/home/CollectorSystemSection';
import SeriesExpansionSection from '../components/home/SeriesExpansionSection';
import BuildCollectionSection from '../components/home/BuildCollectionSection';
import NewsletterSection from '../components/home/NewsletterSection';
import CoffeeTrustBar from '../components/home/CoffeeTrustBar';
import CustomerReviews from '../components/home/CustomerReviews';

export default function Home() {
  const queryClient = useQueryClient();
  
  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen">
        <CoffeeHeroSection />
        <CoffeeTrustBar />
        <FoundersSeriesSection />
        <CollectorSystemSection />
        <CoffeeBrandStory />
        <CoffeeLifestyleBanner />
        <BuildCollectionSection />
        <CuratedApparel />
        <SeriesExpansionSection />
        <NewsletterSection />
        <CustomerReviews />

        {/* Sticky mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.98) 70%, transparent)' }}>
          <a
            href="https://torch-republic.com/collections/coffee"
            className="flex items-center justify-center w-full py-4 font-heading font-black text-sm tracking-widest uppercase"
            style={{ backgroundColor: '#C9A24A', color: '#000' }}
          >
            Shop Coffee
          </a>
        </div>
      </div>
    </PullToRefresh>
  );
}