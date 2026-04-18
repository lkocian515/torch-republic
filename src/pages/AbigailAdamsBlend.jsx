import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Abigail Adams Blend',
  subline: 'A bright, floral roast worthy of a founding mother — elegant, strong, and ahead of its time.',
  code: 'WR-001',
  roast: 'Light Roast',
  price: 19.99,
  shopifyHandle: 'abigail-adams-blend',
  accent: '#D4A0C0',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
  images: ['https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980', 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/IMG_20260405_041048.jpg?v=1776038585'],
  seriesLabel: 'Women of the Republic',
  taglineLabel: 'Women of the Republic',
  tastingNotes: ['Floral', 'Citrus', 'Honey', 'Clean Finish'],
  founderStory: [
    'Abigail Adams was many things: a prolific writer, a devoted mother, a shrewd political mind, and the backbone of a president who leaned on her counsel more than history has acknowledged.',
    'While John Adams navigated the Continental Congress, Abigail managed their farm, raised their children, and wrote letters that would become some of the most important primary documents of the American founding — including her famous plea to "remember the ladies."',
    'This blend honors her grace under pressure. Light, bright, and full of nuance — like the woman herself.',
  ],
  histFacts: [
    'Abigail Adams wrote over 1,100 letters to her husband during his time in Philadelphia — creating one of the most detailed records of the Revolutionary era from a civilian perspective.',
  ],
  quote: {
    text: 'I desire you would remember the ladies and be more generous and favorable to them than your ancestors.',
    author: 'Abigail Adams, 1776',
  },
  completePair: [
    { name: 'Harriet Tubman Blend', to: '/HarrietTubmanBlend', roast: 'Dark Roast' },
  ],
};

export default function AbigailAdamsBlend() {
  return <FounderProductPage DATA={DATA} />;
}