import React from 'react';
import SEOLandingPage from '@/components/seo/SEOLandingPage';

const DATA = {
  seo: {
    title: 'Papua New Guinea Coffee: Origin, Flavor & Why It Matters (2025)',
    description: 'Discover Papua New Guinea coffee — highland-grown Arabica from volcanic soil with notes of dark chocolate, toasted almond, and sweet toffee. Learn what makes PNG coffee special.',
    url: '/papua-new-guinea-coffee',
    type: 'article',
    faq: [
      { question: 'What makes Papua New Guinea coffee special?', answer: 'Papua New Guinea coffee is grown in highland regions at high elevations in rich volcanic soil. These conditions produce a cup with natural complexity, balanced acidity, and a smooth, aromatic finish. Many PNG coffees trace their heritage to Jamaica Blue Mountain stock.' },
      { question: 'What does Papua New Guinea coffee taste like?', answer: 'PNG coffee typically features notes of dark chocolate, toasted almond, and sweet toffee, with a balanced body and a smooth, aromatic finish. The volcanic soil and high-altitude growing contribute to its distinctive character.' },
      { question: 'Is Papua New Guinea coffee good?', answer: 'Yes. PNG coffee is considered a high-quality single-origin coffee. Its Blue Mountain heritage, highland growing conditions, and volcanic soil produce a refined, balanced cup that is sought after by coffee enthusiasts.' },
    ],
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Papua New Guinea Coffee', url: '/papua-new-guinea-coffee' }],
  },
  breadcrumb: 'Papua New Guinea Coffee',
  hero: {
    eyebrow: 'Coffee Origin',
    title: 'Papua New Guinea Coffee',
    subtitle: 'Highland-grown Arabica from rich volcanic soil. Notes of dark chocolate, toasted almond, and sweet toffee. Here\'s what makes single-origin PNG coffee distinctive — and why origin matters.',
  },
  sections: [
    {
      heading: 'The Highlands of Papua New Guinea',
      paragraphs: [
        'Papua New Guinea (PNG) is one of the world\'s most distinctive coffee origins. Coffee is grown in the mountainous highlands at high elevations, where cooler temperatures and abundant rainfall create ideal growing conditions. The coffee plants mature slowly, developing denser beans with more complex flavor compounds.',
        'Many PNG coffees trace their heritage to Jamaica Blue Mountain stock, introduced to the region in the early 20th century. This lineage is known for producing balanced, refined cups with a smooth character.',
      ],
    },
    {
      heading: 'Volcanic Soil and Flavor',
      paragraphs: [
        'The highlands of PNG are volcanic in origin, and the rich volcanic soil contributes directly to the coffee\'s flavor profile. Volcanic soil is high in minerals and organic matter, which feeds the coffee plants and contributes to the cup\'s complexity, sweetness, and aromatic quality.',
        'The result is a coffee with notes of dark chocolate, toasted almond, and sweet toffee — a flavor profile that is naturally sweet, balanced, and smooth, without the harsh acidity found in some lower-grown coffees.',
      ],
    },
    {
      heading: 'From Bean to Freeze-Dried Instant',
      paragraphs: [
        'Torch Republic sources single-origin PNG Arabica and uses a freeze-drying process to preserve the flavor compounds that make this coffee distinctive. The process works as follows:',
      ],
      bullets: [
        'Highland-grown Arabica cherries are harvested at peak ripeness',
        'The coffee is brewed as a liquid concentrate',
        'The concentrate is frozen and placed in a vacuum',
        'Ice sublimates directly to gas, leaving behind soluble coffee granules',
        'The freeze-dried granules retain the original flavor compounds',
        'Add hot water to reconstitute — the flavor is preserved',
      ],
    },
    {
      heading: 'Why Single-Origin Matters',
      paragraphs: [
        'Single-origin coffee means all the beans in a product come from one region — in this case, Papua New Guinea. This matters because it creates a consistent, identifiable flavor profile that reflects the terroir (soil, climate, altitude) of that specific region.',
        'Blends, by contrast, mix beans from multiple regions, which can create a more generic flavor. Single-origin coffee celebrates the unique character of one place — and for PNG coffee, that character is dark chocolate, toasted almond, and sweet toffee.',
      ],
    },
  ],
  features: [
    { title: 'Highland Growing', detail: 'High-altitude, slow-maturing beans with complex flavor.' },
    { title: 'Volcanic Soil', detail: 'Mineral-rich soil that contributes to sweetness and aroma.' },
    { title: 'Blue Mountain Heritage', detail: 'Lineage to Jamaica Blue Mountain stock — known for balanced cups.' },
  ],
  faqs: [
    { question: 'What makes Papua New Guinea coffee special?', answer: 'Papua New Guinea coffee is grown in highland regions at high elevations in rich volcanic soil. These conditions produce a cup with natural complexity, balanced acidity, and a smooth, aromatic finish. Many PNG coffees trace their heritage to Jamaica Blue Mountain stock.' },
    { question: 'What does Papua New Guinea coffee taste like?', answer: 'PNG coffee typically features notes of dark chocolate, toasted almond, and sweet toffee, with a balanced body and a smooth, aromatic finish. The volcanic soil and high-altitude growing contribute to its distinctive character.' },
    { question: 'Is Papua New Guinea coffee good?', answer: 'Yes. PNG coffee is considered a high-quality single-origin coffee. Its Blue Mountain heritage, highland growing conditions, and volcanic soil produce a refined, balanced cup that is sought after by coffee enthusiasts.' },
    { question: 'How is Papua New Guinea coffee processed into instant coffee?', answer: 'Torch Republic brews the PNG Arabica as a liquid concentrate, then freeze-dries it. Freeze-drying preserves the volatile flavor compounds better than spray-drying, so the instant coffee retains the dark chocolate, toasted almond, and toffee notes of the original beans.' },
  ],
  products: [
    { name: 'Shop Instant Coffee', path: '/shop/instant-coffee' },
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    { name: 'Learn About Freeze-Drying', path: '/ingredients/freeze-dried-instant-coffee' },
  ],
  cta: {
    title: 'Taste the Origin',
    subtitle: 'Single-origin Papua New Guinea coffee — freeze-dried to preserve dark chocolate, toasted almond, and sweet toffee notes.',
    buttonText: 'Shop Instant Coffee',
    buttonLink: '/shop/instant-coffee',
  },
};

export default function PapuaNewGuineaCoffee() {
  return <SEOLandingPage {...DATA} />;
}