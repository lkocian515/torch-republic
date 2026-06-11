import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * FAQ Schema Markup for SEO
 * Implements FAQPage schema for rich results
 */
export default function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Article Schema Markup for Blog Posts
 */
export function ArticleSchema({ article }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.featured_image,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": window.location.origin + '/about'
    },
    "publisher": {
      "@type": "Organization",
      "name": "Torch Republic Coffee Company",
      "logo": {
        "@type": "ImageObject",
        "url": window.location.origin + '/logo.png'
      }
    },
    "datePublished": article.published_date,
    "dateModified": article.updated_date || article.published_date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.origin + '/journal/' + article.slug
    },
    "articleSection": article.category,
    "keywords": article.tags?.join(', ') || article.category
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

/**
 * Breadcrumb Schema Markup
 */
export function BreadcrumbSchema({ breadcrumbs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": window.location.origin + crumb.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}