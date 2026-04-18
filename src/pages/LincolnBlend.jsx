import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Lincoln Blend',
  subline: 'Endurance is the real strength.',
  code: 'TR-004',
  seriesNum: 'Founders #04',
  rarity: "FOUNDER'S EDITION",
  roast: 'Dark Roast',
  price: '$18.99',
  shopifyHandle: 'lincoln-blend-founders-series-coffee',
  accent: '#C87070',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869',
  founderStory: [
    "Lincoln didn't shout. He endured.",
    'Through pressure, loss, and impossible odds — he stayed steady.',
    'Union soldiers wrote about coffee more than war — because it kept them going.',
    'This blend is deep, bold, and built to last.',
  ],
  tastingNotes: ['Cocoa', 'Molasses', 'Toasted Oak'],
  histFacts: [
    'Union soldiers carried coffee as a staple ration — Lincoln understood it was what kept the army moving.',
  ],
  quote: { text: 'Give me six hours to chop down a tree and I will spend the first four sharpening the axe.', author: 'Abraham Lincoln' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Medium Roast · TR-001' },
    { to: '/RooseveltBlend', name: 'Roosevelt Blend', roast: 'Dark Roast · TR-005' },
  ],
};

export default function LincolnBlend() {
  return <FounderProductPage data={DATA} />;
}