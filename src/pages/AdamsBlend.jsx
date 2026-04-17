import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Adams Blend',
  subline: "Facts don't bend. Neither should you.",
  code: 'TR-006',
  seriesNum: 'Founders #06',
  rarity: "FOUNDER'S EDITION",
  roast: 'Medium-Dark Roast',
  price: '$18.99',
  shopifyHandle: 'adams-blend',
  accent: '#B87AC8',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/adams_mockup_kitchen.png?v=1775823910',
  founderStory: [
    "Adams stood firm when it wasn't popular.",
    'Sharp mind. Strong spine. No compromise on principle.',
    'This blend is structured and grounded — steady, not flashy.',
  ],
  tastingNotes: ['Cocoa', 'Spice', 'Roasted Nut'],
  histFacts: [
    'Adams swore off tea after the Boston Tea Party — calling it the traitor\'s drink — and switched to coffee as a patriotic act.',
  ],
  quote: { text: 'Liberty cannot be preserved without a general knowledge among the people.', author: 'John Adams' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Medium Roast · TR-001' },
    { to: '/RooseveltBlend', name: 'Roosevelt Blend', roast: 'Dark Roast · TR-005' },
  ],
};

export default function AdamsBlend() {
  return <FounderProductPage data={DATA} />;
}