import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import HeroSection from '../components/home/HeroSection';
import PullToRefresh from '../components/mobile/PullToRefresh';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellersSection from '../components/home/BestSellersSection';
import TorchBoxBanner from '../components/home/TorchBoxBanner';
import ManifestoSection from '../components/home/ManifestoSection';
import NewsletterSection from '../components/home/NewsletterSection';
import MadeInUSABanner from '../components/home/MadeInUSABanner';
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
        <MadeInUSABanner />
        <CategoryGrid />
        <FeaturedCollections />
        <BestSellersSection />
        <TorchBoxBanner />
        <ManifestoSection />
        <TorchbearerBlog />

        {/* Sticky mobile CTA */}
         <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.98) 70%, transparent)' }}>
           <Link
             to={createPageUrl('Collections')}
             className="flex items-center justify-center w-full py-4 font-heading font-black text-sm tracking-widest uppercase"
             style={{ backgroundColor: '#C9A24A', color: '#000' }}
           >
             Shop by Collection
           </Link>
         </div>
      </div>
    </PullToRefresh>
  );
}