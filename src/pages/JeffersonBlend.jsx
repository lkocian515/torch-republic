import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Jefferson Blend',
  subline: 'Ideas built the nation before anything else.',
  code: 'TR-003',
  seriesNum: 'Founders #03',
  rarity: "FOUNDER'S EDITION",
  roast: 'Medium Roast',
  price: '$18.99',
  shopifyHandle: 'jefferson-blend',
  accent: '#9BB8CC',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/55117f78-5325-4d77-b880-5a92e73fcbb1.png?v=1775823238',
  founderStory: [
    "Jefferson believed knowledge was power — and discipline made it real.",
    "Measured. Thoughtful. Precise.",
    "This blend is refined and balanced — layered without being loud.",
  ],
  tastingNotes: ['Dark Chocolate', 'Toasted Almond', 'Toffee'],
  histFacts: [
    'Jefferson called coffee "the favorite drink of the civilized world" and stocked large quantities at Monticello.',
  ],
  quote: { text: 'I like the dreams of the future better than the history of the past.', author: 'Thomas Jefferson' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Medium Roast · TR-001' },
    { to: '/FranklinBlend', name: 'Franklin Blend', roast: 'Medium-Dark Roast · TR-002' },
  ],
};

export default function JeffersonBlend() {
  return <FounderProductPage data={DATA} />;
}