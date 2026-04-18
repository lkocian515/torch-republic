import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Harriet Tubman Blend',
  subline: 'Bold, dark, and unyielding — a roast forged in the same conviction that freed hundreds from bondage.',
  code: 'WR-002',
  roast: 'Dark Roast',
  price: 19.99,
  shopifyHandle: 'harriet-tubman-blend',
  accent: '#D4A0C0',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
  images: ['https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440', 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/vhjvhjm.png?v=1776038440'],
  seriesLabel: 'Women of the Republic',
  taglineLabel: 'Women of the Republic',
  tastingNotes: ['Dark Chocolate', 'Smoke', 'Deep Roast', 'Full Body'],
  founderStory: [
    'Harriet Tubman escaped slavery in 1849. Then she went back. Nineteen times. She led over 300 people to freedom through the Underground Railroad, never losing a single passenger.',
    'She served as a Union spy during the Civil War, led an armed raid at Combahee Ferry, and spent her later years fighting for women\'s suffrage. She called herself a conductor. She called God her guide.',
    'This dark, bold blend is built in her image — uncompromising, strong, and with a depth that lingers long after the cup is empty.',
  ],
  histFacts: [
    'Harriet Tubman was known as "Moses" on the Underground Railroad. She once said she never ran her train off the track and never lost a passenger.',
  ],
  quote: {
    text: 'I was the conductor of the Underground Railroad for eight years, and I can say what most conductors can\'t say — I never ran my train off the track, and I never lost a passenger.',
    author: 'Harriet Tubman',
  },
  completePair: [
    { name: 'Abigail Adams Blend', to: '/AbigailAdamsBlend', roast: 'Light Roast' },
  ],
};

export default function HarrietTubmanBlend() {
  return <FounderProductPage DATA={DATA} />;
}