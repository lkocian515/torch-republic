import React from 'react';

/**
 * ReviewSchema - Adds structured data for product reviews
 * Use this component on product pages when you have real reviews
 * 
 * @param {string} productName - Name of the product
 * @param {number} avgRating - Average rating (1-5)
 * @param {number} reviewCount - Total number of reviews
 * @param {Array} reviews - Array of review objects with: reviewer_name, rating, body, review_date
 */
export default function ReviewSchema({ productName, avgRating, reviewCount, reviews = [] }) {
  if (!avgRating || !reviewCount) return null;

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toString(),
      "reviewCount": reviewCount.toString()
    },
    "review": reviews.slice(0, 3).map(r => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": r.reviewer_name || "Verified Customer"
      },
      "datePublished": r.review_date || new Date().toISOString().split('T')[0],
      "reviewBody": r.body?.slice(0, 500) || ""
    }))
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(reviewSchema)}
    </script>
  );
}