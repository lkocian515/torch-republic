import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import GEOOptimization from '../components/seo/GEOOptimization';
import RitualHomepage from '../components/home/ritual/RitualHomepage';

export default function Home() {
  useSEO({
    title: 'Torch Republic | Botanical Coffee, Mushroom Coffee & Matcha',
    description: 'Explore thoughtfully crafted instant coffee, functional mushroom blends, and ceremonial matcha made for brighter, more intentional daily rituals.',
    url: '/',
    type: 'website',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9db0758e5_file_00000000a44881fba5d3d3bed2575d44.png',
    imageAlt: 'Torch Republic coffee, mushroom coffee, and matcha collection.',
    noindex: false,
  });

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-white focus:px-4 focus:py-3 focus:text-black">Skip to content</a>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <GEOOptimization page="home" />
      <RitualHomepage />
    </>
  );
}