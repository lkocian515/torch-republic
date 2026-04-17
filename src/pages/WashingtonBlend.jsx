import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Washington Blend',
  subline: 'Lead from the front. Finish what you start.',
  code: 'TR-001',
  seriesNum: 'Founders #01',
  rarity: "FOUNDER'S EDITION",
  roast: 'Medium Roast',
  price: '$18.99',
  shopifyHandle: 'washington-blend',
  accent: '#C8A44D',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/mockup_hero_dark.png_preview_81d6ce65-2c5f-4b97-9aaf-ad69c22e7212.jpg?v=1775822721',
  founderStory: [
    "Discipline built this country — not comfort.",
    "Washington didn't wait for perfect conditions. He moved anyway.",
    "Steady under pressure. Consistent when it mattered.",
    "This blend reflects that mindset — balanced, grounded, and built for daily execution.",
  ],
  tastingNotes: ['Cocoa', 'Toasted Almond', 'Light Smoke'],
  histFacts: [
    'Coffee became the drink of independence after the Boston Tea Party.',
  ],
  quote: { text: 'The price of freedom is eternal vigilance.', author: 'George Washington' },
  completePair: [
    { to: '/JeffersonBlend', name: 'Jefferson Blend', roast: 'Medium Roast · TR-003' },
    { to: '/FranklinBlend', name: 'Franklin Blend', roast: 'Medium-Dark Roast · TR-002' },
  ],
};

export default function WashingtonBlend() {
  return <FounderProductPage data={DATA} />;
}