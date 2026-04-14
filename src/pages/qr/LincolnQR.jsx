import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Lincoln Blend',
  collection: 'Founders Series · TR-005',
  TR_number: 'TR-005',
  shopify_handle: 'lincoln-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869',
  accent_color: '#C87070',
  hero_quote: 'Slow steps. Strong mind. No retreat.',
  hook_text: 'Built for those who carry weight without complaint. A medium-dark roast for quiet strength, long endurance, and unshakeable resolve.',
  symbolism_text: [
    "Abraham Lincoln carried weight most men would collapse under. Born in a log cabin. Self-taught by firelight. Lost elections. Lost businesses. Lost loved ones. And then — step by step, without drama — became the most consequential president in American history.",
    "Lincoln Blend reflects that same grit. Not the explosive energy of a dark roast, not the lightness of early optimism — but the deep, steady warmth of someone who has been through the fire and is still standing.",
    "This is the cup for the long days. The nights that don't end. The work that doesn't announce itself.",
  ],
  historical_anchor: {
    quote: 'Give me six hours to chop down a tree and I will spend the first four sharpening the axe.',
    attribution: 'Abraham Lincoln',
    body: [
      "Lincoln was known to work through the night, sustained by simple meals and strong coffee. He didn't sleep much. He read voraciously. He wrote slowly and carefully — every word chosen with weight.",
      "He presided over the nation's bloodiest conflict while holding the union together through sheer will. He didn't know if he would win. He moved forward anyway.",
      "The resolve to continue — even without certainty — is what Lincoln embodied. This blend is built for that same spirit.",
    ],
  },
  flavor_notes: ['Dark Chocolate', 'Almond', 'Toffee', 'Smooth Lingering Finish'],
  roast_level: 'Medium-Dark',
  brew_methods: [
    { name: 'Drip', tip: '1–2 tbsp per 6oz · Steady and reliable' },
    { name: 'French Press', tip: 'Coarse grind · 4 min steep · Full body' },
    { name: 'Pour Over', tip: 'Medium grind · Slow pour · Brings depth forward' },
  ],
  blend_meaning: 'The almond and toffee notes bring a warmth that endures long after the cup is empty. Like Lincoln himself — a presence that lingers, a resolve that outlasts the moment.',
  takeaway_quote: 'You don\'t need the thunder. You need the roots.',
  takeaway_text: 'Lincoln wasn\'t built for applause. He was built for endurance. Every morning you drink this blend is a quiet act of commitment — to the work, to the cause, to seeing it through.',
  series_blends: [
    { name: 'Washington Blend', roast: 'Dark Roast · TR-001', route: '/WashingtonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
    { name: 'Roosevelt Blend', roast: 'Dark Roast · TR-006', route: '/RooseveltBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-6_9c4a00ed-4e07-40bf-b93c-42f039931d2e.jpg?v=1775891504' },
    { name: 'Adams Blend', roast: 'Medium Roast · TR-004', route: '/AdamsBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090' },
  ],
};

export default function LincolnQR() {
  return <QRStoryTemplate data={DATA} />;
}