import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Category Page SEO Component
 * Optimizes category pages for search engines
 */
export default function CategorySEO({ category, products, content }) {
  const categoryData = {
    'instant-coffee': {
      title: 'Premium Instant Coffee | Single Origin & Specialty Grade',
      description: 'Torch Republic premium instant coffee — specialty Arabica, single origin, no machine needed. Bold flavors for intentional daily rituals. Free shipping $50+.',
      keywords: 'premium instant coffee, specialty instant coffee, single origin instant coffee, arabica instant coffee, gourmet instant coffee, coffee without machine, instant coffee for travel',
      h1: 'Premium Instant Coffee',
    },
    'instant-mushroom-coffee': {
      title: "Mushroom Coffee with Lion's Mane & Chaga | Focus & Clarity",
      description: "Torch Republic mushroom coffee blends premium instant coffee with Lion's Mane and Chaga mushrooms for focus, clarity, and sustained energy. No jitters. Free shipping.",
      keywords: "mushroom coffee, lion's mane coffee, chaga coffee, coffee for focus, mushroom coffee benefits, adaptogenic coffee, coffee without jitters, functional mushroom coffee",
      h1: 'Mushroom Coffee for Focus & Clarity',
    },
    'matcha': {
      title: 'Ceremonial Grade Matcha | Premium Japanese Green Tea',
      description: 'Torch Republic ceremonial grade matcha — 100% pure Japanese green tea powder. Rich in L-theanine for calm focus. Instant format, no whisk needed. Free shipping.',
      keywords: 'ceremonial matcha, premium matcha powder, japanese matcha, matcha for focus, matcha green tea, l-theanine, matcha for energy, instant matcha',
      h1: 'Ceremonial Grade Matcha',
    },
    'build-your-ritual': {
      title: 'Build Your Ritual Bundle | Mix & Match 3 Blends and Save',
      description: 'Build your custom 3-blend bundle and save. Mix mushroom coffee, matcha, or classic coffee. Free shipping. 30-day guarantee. Create your perfect daily ritual.',
      keywords: 'coffee bundle, mushroom coffee bundle, matcha bundle, build your own bundle, coffee subscription, wellness bundle, daily ritual bundle',
      h1: 'Build Your Ritual Bundle',
    }
  };

  const data = categoryData[category] || categoryData['instant-coffee'];

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:type" content="product.group" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <link rel="canonical" href={`https://torchrepublic.com/${category === 'instant-coffee' ? 'shop/instant-coffee' : category === 'instant-mushroom-coffee' ? 'shop/instant-mushroom-coffee' : category === 'matcha' ? 'shop/matcha' : 'build-your-ritual'}`} />
    </Helmet>
  );
}