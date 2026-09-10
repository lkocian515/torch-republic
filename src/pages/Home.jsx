import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import GEOOptimization from '../components/seo/GEOOptimization';
import DriftHomepage from '../components/home/drift/DriftHomepage';

export default function Home() {
  useSEO({
    title: 'Torch Republic | Instant Coffee & Mushroom Coffee',
    description: 'Explore thoughtfully crafted instant coffee and functional mushroom coffee made for smooth, convenient, and intentional daily rituals.',
    url: '/',
    type: 'website',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9db0758e5_file_00000000a44881fba5d3d3bed2575d44.png',
    imageAlt: 'Torch Republic instant coffee and mushroom coffee collection.',
    noindex: false,
  });

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:bg-white focus:px-4 focus:py-3 focus:text-black">Skip to content</a>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <GEOOptimization page="home" />
      <DriftHomepage />
    </>
  );
}