import React from 'react';

/**
 * LocalBusiness Schema for Torch Republic Coffee Company
 * Improves local SEO visibility in Corpus Christi, Texas
 */
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Torch Republic Coffee Company",
    "alternateName": "Torch Republic",
    "description": "Explore thoughtfully crafted instant coffee, functional mushroom blends, and ceremonial matcha made for brighter, more intentional daily rituals.",
    "url": "https://torchrepublic.com",
    "logo": "https://torchrepublic.com/torch-republic-logo-transparent.png",
    "image": "https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/fa3d3fe8d_ChatGPTImageAug2202607_23_10AM.png",
    "telephone": "+1-361-360-1931",
    "email": "admin@torchrepublic.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Corpus Christi",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.8006",
      "longitude": "-97.3964"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "sameAs": [
      "https://www.instagram.com/torchrepublic",
      "https://www.facebook.com/torchrepublic",
      "https://www.tiktok.com/@torchrepublic",
      "https://www.pinterest.com/torchrepublic",
      "https://www.linkedin.com/company/torchrepublic"
    ],
    "founder": {
      "@type": "Person",
      "name": "Torch Republic Founder"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coffee Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Instant Coffee"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Mushroom Coffee"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Ceremonial Matcha"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}