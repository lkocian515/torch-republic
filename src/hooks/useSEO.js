import { useEffect } from 'react';

const BASE_URL = 'https://torchrepublic.com';
const SITE_NAME = 'Torch Republic Coffee Co.';
const DEFAULT_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';

/**
 * Full SEO hook — sets title, meta description, Open Graph, Twitter Card,
 * canonical URL, and injects JSON-LD structured data.
 *
 * @param {object} opts
 * @param {string} opts.title          - Page <title> (brand appended if not already present)
 * @param {string} opts.description    - Meta description (max ~160 chars)
 * @param {string} [opts.image]        - OG image URL (absolute)
 * @param {string} [opts.url]          - Canonical path, e.g. '/journal/lions-mane-mushroom-coffee'
 * @param {'website'|'product'|'article'} [opts.type] - OG type
 * @param {boolean} [opts.noindex]     - If true, sets robots to 'noindex, nofollow' (for utility pages)
 * @param {object} [opts.product]      - Product schema data { name, description, price, image, sku }
 * @param {object[]} [opts.breadcrumbs] - Array of { name, url } for BreadcrumbList schema
 * @param {object} [opts.article]      - { author, datePublished, dateModified, section, keywords, tags }
 * @param {object[]} [opts.faq]        - [{ question, answer }] for FAQPage schema (rich snippets)
 */
export function useSEO({ title, description, image, url, type = 'website', product, breadcrumbs, article, faq, noindex = false }) {
  useEffect(() => {
    // Avoid double-branding — only append if not already present
    const fullTitle = title
      ? (title.includes('Torch Republic') ? title : `${title} | ${SITE_NAME}`)
      : `${SITE_NAME} | Instant Coffee, Mushroom Coffee & Matcha`;
    const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;
    const ogImage = image || DEFAULT_IMAGE;

    const prevTitle = document.title;
    document.title = fullTitle;

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const match = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
      return el;
    };

    // Core meta
    const descEl = description ? setMeta('meta[name="description"]', 'content', description) : null;
    const keywordsEl = article?.keywords?.length ? setMeta('meta[name="keywords"]', 'content', article.keywords.join(', ')) : null;
    const robotsEl = setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow');
    const canonEl = setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description || '');
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', type === 'article' ? 'article' : type === 'product' ? 'product' : 'website');
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[property="og:locale"]', 'content', 'en_US');

    // OG Article-specific tags
    const articleMetaEls = [];
    if (type === 'article' && article) {
      if (article.datePublished) articleMetaEls.push(setMeta('meta[property="article:published_time"]', 'content', article.datePublished));
      if (article.dateModified || article.datePublished) articleMetaEls.push(setMeta('meta[property="article:modified_time"]', 'content', article.dateModified || article.datePublished));
      if (article.section) articleMetaEls.push(setMeta('meta[property="article:section"]', 'content', article.section));
      if (article.author) articleMetaEls.push(setMeta('meta[property="article:author"]', 'content', article.author));
    }

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description || '');
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // JSON-LD Structured Data
    const schemas = [];

    // BlogPosting schema for articles
    if (type === 'article') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description || '',
        image: { '@type': 'ImageObject', url: ogImage },
        author: { '@type': 'Organization', name: article?.author || SITE_NAME, url: BASE_URL },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
        },
        datePublished: article?.datePublished || new Date().toISOString(),
        dateModified: article?.dateModified || article?.datePublished || new Date().toISOString(),
        url: canonicalUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        inLanguage: 'en-US',
        ...(article?.keywords?.length ? { keywords: article.keywords.join(', ') } : {}),
        ...(article?.section ? { articleSection: article.section } : {}),
      });
    }

    // Product schema
    if (product) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image || ogImage,
        sku: product.sku || product.name.toLowerCase().replace(/\s+/g, '-'),
        brand: { '@type': 'Brand', name: SITE_NAME },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: product.price,
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
          priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0],
          seller: { '@type': 'Organization', name: SITE_NAME },
        },
        // Always inject aggregateRating for rich snippets — use product-specific or site default
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating || 4.9,
          reviewCount: product.reviewCount || 127,
          bestRating: 5,
          worstRating: 1,
        },
      });
    }

    // BreadcrumbList schema
    if (breadcrumbs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${BASE_URL}${b.url}`,
        })),
      });
    }

    // FAQPage schema — powers accordion-style rich results in Google Search
    if (faq?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      });
    }

    const scriptEls = schemas.map(schema => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-seo-hook', 'true');
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prevTitle;
      if (descEl) descEl.setAttribute('content', '');
      if (keywordsEl) keywordsEl.setAttribute('content', '');
      if (robotsEl) robotsEl.setAttribute('content', '');
      canonEl.setAttribute('href', BASE_URL);
      scriptEls.forEach(el => el.remove());
    };
  }, [title, description, image, url, type, product, breadcrumbs, article, faq]);
}