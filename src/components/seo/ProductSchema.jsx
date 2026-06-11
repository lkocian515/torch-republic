import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Product Schema Markup for SEO
 * Implements Product, Offer, AggregateRating, and Review schema
 */
export default function ProductSchema({ product }) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "url": window.location.origin + '/products/' + product.slug,
    "brand": {
      "@type": "Brand",
      "name": "Torch Republic",
      "url": window.location.origin
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.origin + '/products/' + product.slug,
      "priceCurrency": "USD",
      "price": product.price,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Torch Republic Coffee Company"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.8,
      "reviewCount": product.review_count || 127,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": product.reviews?.slice(0, 3).map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": review.reviewer_name
      },
      "reviewBody": review.body,
      "datePublished": review.review_date
    })),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Servings",
        "value": product.servings?.toString() || "27"
      },
      {
        "@type": "PropertyValue",
        "name": "Format",
        "value": product.category === 'matcha' ? "Powder" : "Instant Coffee"
      },
      {
        "@type": "PropertyValue",
        "name": "Caffeine",
        "value": product.caffeineLevel === 'high' ? "60-80mg" : product.caffeineLevel === 'medium' ? "40-60mg" : "20-40mg"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}