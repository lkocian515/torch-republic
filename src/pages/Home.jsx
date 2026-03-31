import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedCollections from '../components/home/FeaturedCollections';
import TorchBoxBanner from '../components/home/TorchBoxBanner';
import BestSellersSection from '../components/home/BestSellersSection';
import ManifestoSection from '../components/home/ManifestoSection';
import TrustBar from '../components/home/TrustBar';
import PullToRefresh from '../components/mobile/PullToRefresh';
import SpinWheelPopup from '../components/SpinWheelPopup';

export default function Home() {
  const queryClient = useQueryClient();

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
        <SpinWheelPopup />

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Quick Shop Grid */}
        <CategoryGrid />

        {/* 3. Featured Collections */}
        <FeaturedCollections />

        {/* 4. Best Sellers */}
        <BestSellersSection />

        {/* 5. Torch Box Feature */}
        <TorchBoxBanner />

        {/* 6. Brand Statement */}
        <ManifestoSection />

        {/* 7. Trust Strip */}
        <TrustBar />
      </div>
    </PullToRefresh>
  );
}