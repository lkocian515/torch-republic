import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import HeroSection from '../components/home/HeroSection';
import SpinWheelPopup from '../components/SpinWheelPopup';
import PullToRefresh from '../components/mobile/PullToRefresh';
import FeaturedCollections from '../components/home/FeaturedCollections';
import TrustBar from '../components/home/TrustBar';
import TrustSection from '../components/home/TrustSection';
import BestSellersSection from '../components/home/BestSellersSection';
import CategoryGrid from '../components/home/CategoryGrid';
import WhatsInsideSection from '../components/home/WhatsInsideSection';
import FounderSection from '../components/home/FounderSection';
import FAQSection from '../components/home/FAQSection';
import ManifestoSection from '../components/home/ManifestoSection';
import NewsletterSection from '../components/home/NewsletterSection';
import MadeInUSABanner from '../components/home/MadeInUSABanner';
import TorchBoxBanner from '../components/home/TorchBoxBanner';

export default function Home() {
  const queryClient = useQueryClient();
  
  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen">
      <SpinWheelPopup />
      <HeroSection />
      <MadeInUSABanner />
      <TrustBar />
      <CategoryGrid />
      <BestSellersSection />
      <TorchBoxBanner />
      <WhatsInsideSection />
      <ManifestoSection />
      <FounderSection />
      <TrustSection />
      <FAQSection />
      <NewsletterSection />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.98) 70%, transparent)' }}>
        <Link
          to={createPageUrl('BestSellers')}
          className="flex items-center justify-center w-full py-4 font-heading font-black text-sm tracking-widest uppercase"
          style={{ backgroundColor: '#C8A44D', color: '#000' }}
        >
          Shop the Collection
        </Link>
      </div>
      </div>
      </PullToRefresh>
      );
}