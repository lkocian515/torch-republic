import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Franklin Blend',
  subline: 'Well done is better than well said.',
  code: 'TR-002',
  seriesNum: 'Founders #02',
  rarity: "FOUNDER'S EDITION",
  roast: 'Medium-Dark Roast',
  price: '$18.99',
  shopifyHandle: 'franklin-blend',
  format: 'WHOLE BEAN BOX',
  accent: '#D4C97A',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/b1d86420-df99-4a9b-85cc-69ff17a156b3.png?v=1775823429',
  founderStory: [
    "Franklin didn't just talk — he built, tested, improved.",
    'Printer. Inventor. Strategist. Relentless optimizer.',
    'This blend is smooth but layered — approachable on the surface, deeper the more you pay attention.',
  ],
  tastingNotes: ['Caramel', 'Vanilla', 'Roasted Nut'],
  histFacts: [
    'Franklin held political meetings in coffeehouses and sold coffee beans himself — one of America\'s earliest coffee entrepreneurs.',
  ],
  quote: { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Medium Roast · TR-001' },
    { to: '/JeffersonBlend', name: 'Jefferson Blend', roast: 'Medium Roast · TR-003' },
  ],
};

export default function FranklinBlend() {
  return <FounderProductPage data={DATA} />;
}