import React from 'react';

/**
 * Organization Schema for Torch Republic Coffee Company
 * Establishes brand authority and corporate identity
 */
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Torch Republic Coffee Company",
    "alternateName": "Torch Republic",
    "legalName": "LiberTees For All Apparel LLC DBA Torch Republic Coffee Company",
    "url": "https://torchrepublic.com",
    "logo": "https://torchrepublic.com/torch-republic-logo-transparent.png",
    "description": "Premium instant coffee, mushroom coffee, and ceremonial matcha designed for focus, clarity, and intentional daily rituals.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Torch Republic Founder"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Corpus Christi",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "admin@torchrepublic.com",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.instagram.com/torchrepublic",
      "https://www.facebook.com/torchrepublic",
      "https://www.tiktok.com/@torchrepublic",
      "https://www.pinterest.com/torchrepublic",
      "https://www.linkedin.com/company/torchrepublic"
    ],
    "brand": {
      "@type": "Brand",
      "name": "Torch Republic",
      "logo": "https://torchrepublic.com/torch-republic-logo-transparent.png",
      "tagline": "Premium Instant Coffee & Mushroom Coffee for Your Daily Ritual"
    },
    "knowsAbout": [
      "Instant Coffee",
      "Mushroom Coffee",
      "Lion's Mane Coffee",
      "Chaga Mushroom",
      "Ceremonial Matcha",
      "Functional Beverages",
      "Adaptogenic Mushrooms",
      "Morning Rituals",
      "Focus & Clarity",
      "Wellness Products"
    ],
    "award": "U.S. Small Business Administration Certified",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Business License",
      "recognizedBy": {
        "@type": "GovernmentOrganization",
        "name": "State of Texas"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}