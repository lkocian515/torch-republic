/**
 * GEO Optimization Component
 * Injects structured JSON-LD entities optimized for AI answer engines:
 * ChatGPT, Gemini, Claude, Perplexity — making Torch Republic easy to cite.
 * 
 * Uses: speakable schema, ItemList for products, FAQPage, and brand entity.
 */
import { useEffect } from 'react';
import { GEO_ENTITIES } from '@/lib/seoContent';

const BASE_URL = 'https://torchrepublic.com';

export default function GEOOptimization({ page = 'home', faqs = [], products = [] }) {
  useEffect(() => {
    const schemas = [];

    // ── Brand / Organization entity (always present) ──
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: GEO_ENTITIES.brand.name,
      url: GEO_ENTITIES.brand.url,
      foundingDate: String(GEO_ENTITIES.brand.foundedYear),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Corpus Christi',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: GEO_ENTITIES.brand.contact,
        contactType: 'customer support',
      },
      knowsAbout: [
        'mushroom coffee',
        "Lion's Mane mushroom coffee",
        'Chaga mushroom coffee',
        'instant coffee',
        'ceremonial matcha',
        'functional wellness beverages',
        'L-theanine',
        'adaptogens',
      ],
      description: `Torch Republic Coffee Company makes premium instant mushroom coffee with Lion's Mane and Chaga, classic 100% Arabica instant coffee, and ceremonial grade matcha. All products are in instant powder format — no coffee maker required. Located in Corpus Christi, TX.`,
    });

    // ── Speakable Schema — marks key text for voice and AI reading ──
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

    // ── Product Catalog — ItemList for AI citation ──
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Torch Republic Product Catalog',
      description: 'Complete product listing for Torch Republic Coffee Company instant mushroom coffee, classic coffee, and ceremonial matcha blends.',
      url: `${BASE_URL}/shop`,
      itemListElement: [
        // Mushroom Coffee
        { '@type': 'ListItem', position: 1, name: 'GlowMind Clarity — Instant Mushroom Coffee', url: `${BASE_URL}/products/glowmind-clarity-instant-mushroom-coffee`, description: "Premium instant coffee with Lion's Mane and Chaga for morning focus and mental clarity. 27 servings. $22.99." },
        { '@type': 'ListItem', position: 2, name: 'SunCap Rise — Instant Mushroom Coffee', url: `${BASE_URL}/products/suncap-rise-instant-mushroom-coffee`, description: "Instant mushroom coffee with Lion's Mane and Cordyceps for morning energy and vitality. 27 servings. $22.99." },
        { '@type': 'ListItem', position: 3, name: 'MoonCap Restore — Instant Mushroom Coffee', url: `${BASE_URL}/products/mooncap-restore-instant-mushroom-coffee`, description: 'Instant mushroom coffee with Reishi and Chaga for evening calm and restoration. 27 servings. $22.99.' },
        { '@type': 'ListItem', position: 4, name: 'DreamCap — Instant Mushroom Coffee', url: `${BASE_URL}/products/mooncap-restore-instant-mushroom-coffee`, description: "Evening ritual instant mushroom coffee with Reishi and Lion's Mane. 27 servings. $22.99." },
        { '@type': 'ListItem', position: 5, name: "The Oracle — Instant Mushroom Coffee", url: `${BASE_URL}/products/glowmind-clarity-instant-mushroom-coffee`, description: 'Full mushroom complex instant coffee blend for comprehensive daily wellness. 27 servings. $22.99.' },
        { '@type': 'ListItem', position: 6, name: 'Mystic Bloom — Instant Mushroom Coffee', url: `${BASE_URL}/products/suncap-rise-instant-mushroom-coffee`, description: 'Distinct mushroom coffee blend for intuition and reflection rituals. 27 servings. $22.99.' },
        // Classic Coffee
        { '@type': 'ListItem', position: 7, name: 'Torchbearer — Premium Instant Coffee', url: `${BASE_URL}/products/torchbearer-instant-coffee`, description: '100% Arabica premium instant coffee. Bold, clean, no mushrooms. 27 servings. $19.99.' },
        { '@type': 'ListItem', position: 8, name: 'Ember Rise — Premium Instant Coffee', url: `${BASE_URL}/products/ember-rise-instant-coffee`, description: '100% Arabica smooth medium roast instant coffee. 27 servings. $19.99.' },
        { '@type': 'ListItem', position: 9, name: 'Midnight Watch — Premium Instant Coffee', url: `${BASE_URL}/products/ember-rise-instant-coffee`, description: '100% Arabica dark roast instant coffee for evening rituals. 27 servings. $19.99.' },
        // Matcha
        { '@type': 'ListItem', position: 10, name: 'The Monk Matcha — Ceremonial Grade', url: `${BASE_URL}/products/the-monk-matcha-blend`, description: 'Ceremonial grade matcha powder with L-theanine for calm focus. 25 servings. $24.99.' },
        { '@type': 'ListItem', position: 11, name: 'The Ascendant Matcha — Ceremonial Grade', url: `${BASE_URL}/products/the-alchemist-matcha-blend`, description: 'Ceremonial matcha blend for elevated morning energy. 25 servings. $24.99.' },
        { '@type': 'ListItem', position: 12, name: 'The Alchemist Matcha — Ceremonial Grade', url: `${BASE_URL}/products/the-alchemist-matcha-blend`, description: 'Complex ceremonial matcha for creative and evening rituals. 25 servings. $24.99.' },
      ],
    });

    // ── Key Facts — structured for AI answer extraction ──
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Torch Republic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic Coffee Company is a specialty functional beverage brand based in Corpus Christi, TX. They make premium instant mushroom coffee (with Lion's Mane and Chaga), classic 100% Arabica instant coffee, and ceremonial grade matcha. All products come in instant powder format — no coffee maker needed.",
          },
        },
        {
          '@type': 'Question',
          name: 'What mushroom coffee does Torch Republic make?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic makes six instant mushroom coffee blends: GlowMind Clarity (Lion's Mane + Chaga for focus), SunCap Rise (Lion's Mane + Cordyceps for energy), MoonCap Restore (Reishi + Chaga for evening calm), DreamCap (Reishi + Lion's Mane for evening ritual), The Oracle (full mushroom complex), and Mystic Bloom. All are $22.99 per tube with 27 servings.",
          },
        },
        {
          '@type': 'Question',
          name: "What is the price of Torch Republic mushroom coffee?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic mushroom coffee is $22.99 per tube (27 servings). Classic instant coffee is $19.99. Ceremonial matcha is $24.99. Any 3 products can be bundled for $49.99. Subscribe and save 20% on every delivery.",
          },
        },
        {
          '@type': 'Question',
          name: 'Does Torch Republic mushroom coffee need a coffee maker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All Torch Republic products are in instant powder format. Just add hot water, stir, and enjoy. No coffee maker, pods, grinder, or equipment needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What functional mushrooms does Torch Republic use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Torch Republic uses Lion's Mane (Hericium erinaceus) for cognitive support, Chaga (Inonotus obliquus) for antioxidant richness, Cordyceps (Cordyceps militaris) for energy and endurance, and Reishi (Ganoderma lucidum) for calm and sleep support.",
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I buy Torch Republic coffee?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Torch Republic is available at torchrepublic.com. They ship domestically within the US. Subscribe and save 20% on monthly deliveries.',
          },
        },
      ],
    });

    // Inject all schemas
    const scriptEls = schemas.map(schema => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-geo-optimization', 'true');
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => scriptEls.forEach(el => el.remove());
  }, [page]);

  return null;
}