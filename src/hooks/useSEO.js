import { useEffect } from 'react';
import { BRAND_LOGO } from '@/lib/brandAssets';

const BASE_URL = 'https://torchrepublic.com';
const SITE_NAME = 'Torch Republic';
const DEFAULT_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9db0758e5_file_00000000a44881fba5d3d3bed2575d44.png';

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
export function useSEO({ title, description, image, imageAlt, imageType = 'image/png', url, type = 'website', product, breadcrumbs, article, faq, noindex = false }) {
  useEffect(() => {
    // Avoid double-branding — only append if not already present
    const fullTitle = title
      ? (title.includes('Torch Republic') ? title : `${title} | ${SITE_NAME}`)
      : `${SITE_NAME} | Premium Instant Coffee & Mushroom Coffee`;

    // Strip tracking params from canonical — canonical must never contain utm_*, gclid, fbclid, srsltid
    const STRIP_PARAMS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid','srsltid','msclkid','ref'];
    let cleanPath = url || `${window.location.pathname}${window.location.search}`;
    if (cleanPath.includes('?')) {
      const [path, qs] = cleanPath.split('?');
      const params = new URLSearchParams(qs);
      STRIP_PARAMS.forEach(p => params.delete(p));
      cleanPath = params.toString() ? `${path}?${params}` : path;
    }
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
    const canonicalUrl = `${BASE_URL}${cleanPath}`;
    const ogImage = image || DEFAULT_IMAGE;
    const ogImageAlt = imageAlt
      || (title ? `${title.replace(/\s*\|\s*Torch Republic.*$/i, '')} — ${SITE_NAME}` : 'Torch Republic Coffee Company');

    const prevTitle = document.title;
    document.title = fullTitle;
    // Sentinel — lets RouteSeoManager know this page set its own SEO,
    // so it should not overwrite with route-level fallback values.
    document.documentElement.setAttribute('data-seo-set', 'true');

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
    const robotsEl = setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');
    const canonEl = setLink('canonical', canonicalUrl);

    // Open Graph
    const ogEls = [];
    ogEls.push(setMeta('meta[property="og:title"]', 'content', fullTitle));
    ogEls.push(setMeta('meta[property="og:description"]', 'content', description || ''));
    ogEls.push(setMeta('meta[property="og:url"]', 'content', canonicalUrl));
    ogEls.push(setMeta('meta[property="og:type"]', 'content', type === 'article' ? 'article' : type === 'product' ? 'product' : 'website'));
    ogEls.push(setMeta('meta[property="og:image"]', 'content', ogImage));
    ogEls.push(setMeta('meta[property="og:image:secure_url"]', 'content', ogImage));
    ogEls.push(setMeta('meta[property="og:image:type"]', 'content', imageType));
    ogEls.push(setMeta('meta[property="og:image:width"]', 'content', '1200'));
    ogEls.push(setMeta('meta[property="og:image:height"]', 'content', '630'));
    ogEls.push(setMeta('meta[property="og:image:alt"]', 'content', ogImageAlt));
    ogEls.push(setMeta('meta[property="og:site_name"]', 'content', SITE_NAME));
    ogEls.push(setMeta('meta[property="og:locale"]', 'content', 'en_US'));

    // OG Article-specific tags
    const articleMetaEls = [];
    if (type === 'article' && article) {
      if (article.datePublished) articleMetaEls.push(setMeta('meta[property="article:published_time"]', 'content', article.datePublished));
      if (article.dateModified || article.datePublished) articleMetaEls.push(setMeta('meta[property="article:modified_time"]', 'content', article.dateModified || article.datePublished));
      if (article.section) articleMetaEls.push(setMeta('meta[property="article:section"]', 'content', article.section));
      if (article.author) articleMetaEls.push(setMeta('meta[property="article:author"]', 'content', article.author));
    }

    // Twitter Card
    const twitterEls = [];
    twitterEls.push(setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image'));
    twitterEls.push(setMeta('meta[name="twitter:title"]', 'content', fullTitle));
    twitterEls.push(setMeta('meta[name="twitter:description"]', 'content', description || ''));
    twitterEls.push(setMeta('meta[name="twitter:image"]', 'content', ogImage));
    twitterEls.push(setMeta('meta[name="twitter:image:alt"]', 'content', ogImageAlt));
    twitterEls.push(setMeta('meta[name="twitter:site"]', 'content', '@torchrepublic'));
    twitterEls.push(setMeta('meta[name="twitter:creator"]', 'content', '@torchrepublic'));

    // JSON-LD Structured Data
    const schemas = [];

    // BlogPosting schema for articles
    if (type === 'article') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description || '',
        image: { '@type': 'ImageObject', url: ogImage, width: 1200, height: 630, caption: ogImageAlt },
        author: { '@type': 'Organization', name: article?.author || SITE_NAME, url: BASE_URL },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: BRAND_LOGO },
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
        // Only inject aggregateRating when real data is provided
        ...(product.rating && product.reviewCount ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        } : {}),
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
      document.documentElement.removeAttribute('data-seo-set');
      if (descEl) descEl.setAttribute('content', '');
      if (keywordsEl) keywordsEl.setAttribute('content', '');
      if (robotsEl) robotsEl.setAttribute('content', '');
      canonEl.setAttribute('href', BASE_URL);
      // Reset OG and Twitter tags to prevent stale data between page navigations
      ogEls.forEach(el => el.setAttribute('content', ''));
      twitterEls.forEach(el => el.setAttribute('content', ''));
      articleMetaEls.forEach(el => el.setAttribute('content', ''));
      scriptEls.forEach(el => el.remove());
    };
  }, [title, description, image, imageAlt, imageType, url, type, product, breadcrumbs, article, faq, noindex]);
}