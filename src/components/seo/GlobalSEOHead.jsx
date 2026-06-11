import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Global SEO Head Component
 * Adds canonical tags, Open Graph, Twitter Cards, and preconnect hints
 */
export default function GlobalSEOHead({ page }) {
  const siteUrl = 'https://torchrepublic.com';
  const canonicalUrl = `${siteUrl}${page?.url || '/'}`;
  
  return (
    <Helmet>
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.shopify.com" />
      <link rel="preconnect" href="https://media.base44.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={page?.type || 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Torch Republic Coffee Company" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:site" content="@torchrepublic" />
      <meta name="twitter:creator" content="@torchrepublic" />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Theme Color for mobile browsers */}
      <meta name="theme-color" content="#080808" />
      <meta name="msapplication-TileColor" content="#080808" />
    </Helmet>
  );
}