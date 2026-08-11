import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import GEOOptimization from '../components/seo/GEOOptimization';
import EditorialHomepage from '../components/home/editorial/EditorialHomepage';

export default function Home() {
  useSEO({
    title: 'Torch Republic | Botanical Coffee, Mushroom Coffee & Matcha',
    description: 'Explore thoughtfully crafted instant coffee, functional mushroom blends, and ceremonial matcha made for brighter, more intentional daily rituals.',
    url: '/',
    type: 'website',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/423d68cdd_hhbiiui.png',
    imageAlt: 'Torch Republic coffee, mushroom coffee, and matcha collection.',
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