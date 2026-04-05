import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import HeroSection from '../components/home/HeroSection';
import PullToRefresh from '../components/mobile/PullToRefresh';
import TrustStrip from '../components/home/TrustStrip';
import CustomerReviews from '../components/home/CustomerReviews';
import TrustBadgeStrip from '../components/home/TrustBadgeStrip';
import PremiumBestSellers from '../components/home/PremiumBestSellers';
import GuaranteeBlock from '../components/home/GuaranteeBlock';
import TorchbearerCTA from '../components/home/TorchbearerCTA';
import FeaturedCollectionsGrid from '../components/home/FeaturedCollectionsGrid';
import ManifestoSection from '../components/home/ManifestoSection';
import NewsletterSection from '../components/home/NewsletterSection';
import TorchbearerBlog from '../components/home/TorchbearerBlog';

export default function Home() {
  const queryClient = useQueryClient();
  
  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen">
        <HeroSection />
        <TrustBadgeStrip />
        <TrustStrip />
        <PremiumBestSellers />
        <GuaranteeBlock />

        {/* Founders Series Coffee Banner */}
        <div className="w-full">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/499adec76_file_00000000457c71f58ce4377bbc72d356.png"
            alt="Torch Republic Founders Series Coffee - Coming Soon"
            className="w-full object-cover"
          />
        </div>

        <FeaturedCollectionsGrid />
        <TorchbearerCTA />
        <ManifestoSection />
        <TorchbearerBlog />
        <NewsletterSection />
        <CustomerReviews />

        {/* Sticky mobile CTA */}
         <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.98) 70%, transparent)' }}>
            <Link
              to="/Shop"
              className="flex items-center justify-center w-full py-4 font-heading font-black text-sm tracking-widest uppercase"
              style={{ backgroundColor: '#C9A24A', color: '#000' }}
            >
              Shop the Collection
            </Link>
          </div>
      </div>
    </PullToRefresh>
  );
}