import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Jefferson Blend',
  collection: 'Founders Series · TR-002',
  TR_number: 'TR-002',
  shopify_handle: 'jefferson-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841',
  accent_color: '#9BB8CC',
  hero_quote: 'The mind that builds nations drinks deeply.',
  hook_text: 'Balanced, smooth, and quietly powerful. A medium roast for thinkers, builders, and those who see beyond the moment.',
  symbolism_text: [
    "Thomas Jefferson was a builder of ideas. A writer, architect, philosopher, polymath, and relentless student of the world. He believed that the health of a republic depended on an informed, thinking citizenry.",
    "Jefferson Blend reflects that balance — refined, complex, and layered with meaning. Not loud. Not aggressive. But undeniably present.",
    "He called coffee 'the favorite drink of the civilized world.' He kept barrels of it at Monticello. Every morning, he would rise early and begin reading before the household stirred. This is that cup.",
  ],
  historical_anchor: {
    quote: 'I like the dreams of the future better than the history of the past.',
    attribution: 'Thomas Jefferson',
    body: [
      "Jefferson was a contradiction — and that's what made him human. He held ideas of liberty while living in a deeply imperfect world. He wrestled with that tension every day.",
      "But his ideas — the ones he put on paper in July of 1776 — changed the trajectory of civilization. That matters. The vision matters.",
      "Drink this blend slowly. Think something through. That's what Jefferson would have wanted.",
    ],
  },
  flavor_notes: ['Dark Chocolate', 'Toasted Almond', 'Toffee', 'Smooth Finish'],
  roast_level: 'Medium',
  brew_methods: [
    { name: 'Pour Over', tip: 'Medium grind · Brings out complexity and brightness' },
    { name: 'Drip', tip: 'Clean, balanced, accessible every morning' },
    { name: 'French Press', tip: 'Coarse grind · Fuller body · Deep flavor' },
  ],
  blend_meaning: 'The dark chocolate and toffee notes echo depth without heaviness — the mark of a refined thinker. This blend does not demand your attention. It earns it.',
  takeaway_quote: 'Build something. Say something. Think something through.',
  takeaway_text: 'Jefferson believed in the power of ideas put into action. Every cup of this blend is an invitation to think more clearly, create more boldly, and carry ideas that matter.',
  series_blends: [
    { name: 'Washington Blend', roast: 'Dark Roast · TR-001', route: '/WashingtonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
    { name: 'Franklin Blend', roast: 'Light Roast · TR-003', route: '/FranklinBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986' },
    { name: 'Adams Blend', roast: 'Medium Roast · TR-004', route: '/AdamsBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090' },
  ],
};

export default function JeffersonQR() {
  return <QRStoryTemplate data={DATA} />;
}