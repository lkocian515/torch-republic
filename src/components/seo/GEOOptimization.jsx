/**
 * GEO Optimization Component
 * Injects structured JSON-LD entities optimized for AI answer engines.
 *
 * Product data is sourced from CORE_PRODUCTS (the single source of truth) so
 * the structured data always matches the live two-product catalog — no
 * retired blend names, no "tube" references, no stale prices.
 */
import { useEffect } from 'react';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { BUNDLE_PRICE_DUO, SUBSCRIPTION_DISCOUNT } from '@/lib/pricingConfig';

const BASE_URL = 'https://torchrepublic.com';

export default function GEOOptimization({ page = 'home' }) {
  useEffect(() => {
    const schemas = [];

    // ── Brand / Organization entity ──
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Torch Republic Coffee Company',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Corpus Christi',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@torchrepublic.com',
        contactType: 'customer support',
      },
      knowsAbout: [
        'mushroom coffee',
        "Lion's Mane mushroom coffee",
        'Chaga mushroom coffee',
        'instant coffee',
        'functional mushroom coffee',
        'adaptogens',
      ],
      description: `Torch Republic Coffee Company makes premium instant coffee and instant mushroom coffee with Lion's Mane and Chaga. All products are instant powder format — no coffee maker required. Located in Corpus Christi, TX.`,
    });

    // ── Speakable Schema ──
    if (page === 'home') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Torch Republic Coffee Company',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.speakable'],
        },
        url: BASE_URL,
      });
    }

    // ── Product Catalog — exactly two current products ──
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Torch Republic Product Catalog',
      description: 'Complete product listing for Torch Republic Coffee Company — instant classic coffee and instant mushroom coffee.',
      url: `${BASE_URL}/shop`,
      itemListElement: CORE_PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${BASE_URL}${p.path}`,
        description: `${p.description} ${p.servings} servings. $${p.price.toFixed(2)}.`,
      })),
    });

    const subSavePct = Math.round(SUBSCRIPTION_DISCOUNT * 100);

    // ── Key Facts — FAQPage for AI answer extraction ──
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Torch Republic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic Coffee Company is a specialty functional beverage brand based in Corpus Christi, TX. They make premium instant coffee and instant mushroom coffee with Lion's Mane and Chaga. All products are instant powder format — no coffee maker needed.",
          },
        },
        {
          '@type': 'Question',
          name: 'What mushroom coffee does Torch Republic make?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic makes one instant mushroom coffee, blended with premium instant coffee, Lion's Mane, and Chaga. It is $25.99 per bag with 27 servings.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the price of Torch Republic products?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Instant Classic Coffee is $22.99 and Instant Mushroom Coffee is $25.99. Both can be bundled for $${BUNDLE_PRICE_DUO.toFixed(2)}. Subscriptions with 10% savings are coming soon.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Does Torch Republic coffee need a coffee maker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All Torch Republic products are instant powder format. Just add hot water, stir, and enjoy. No coffee maker, pods, grinder, or equipment needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What functional mushrooms does Torch Republic use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic uses Lion's Mane (Hericium erinaceus) and Chaga (Inonotus obliquus) in its instant mushroom coffee.",
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I buy Torch Republic coffee?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Torch Republic is available at torchrepublic.com. They ship domestically within the US.',
          },
        },
      ],
    });

    const scriptEls = schemas.map((schema) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-geo-optimization', 'true');
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => scriptEls.forEach((el) => el.remove());
  }, [page]);

  return null;
}