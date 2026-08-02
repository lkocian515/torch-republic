import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import GEOOptimization from '../components/seo/GEOOptimization';
import EditorialHomepage from '../components/home/editorial/EditorialHomepage';

export default function Home() {
  useSEO({
    title: 'Torch Republic | Coffee, Mushroom Coffee & Matcha',
    description: 'Discover seven distinctive instant coffee, mushroom coffee, and ceremonial matcha rituals made for brighter starts and intentional days.',
    url: '/',
    type: 'website',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png',
    imageAlt: 'Torch Republic coffee, mushroom coffee, and ceremonial matcha collection.',
    noindex: false,
  });

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-white focus:px-4 focus:py-3 focus:text-black">Skip to content</a>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <GEOOptimization page="home" />
      <EditorialHomepage />
    </>
  );
}