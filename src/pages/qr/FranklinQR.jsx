import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Franklin Blend',
  collection: 'Founders Series · TR-003',
  TR_number: 'TR-003',
  shopify_handle: 'franklin-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986',
  accent_color: '#D4C97A',
  hero_quote: 'Curiosity is the spark. Coffee is the fuel.',
  hook_text: 'Bright, energetic, and sharp. A light roast built for curiosity, momentum, and constant forward motion.',
  symbolism_text: [
    "Benjamin Franklin didn't follow paths — he created them. Printer, scientist, inventor, diplomat, writer, and arguably the most curious man in American history. He believed deeply that knowledge was power and that the world rewarded those who stayed relentlessly engaged.",
    "Franklin held political meetings in coffeehouses. He had his mail delivered to his favorite London coffeehouse. He sold coffee beans himself — one of America's earliest coffee entrepreneurs. Coffee wasn't just a habit for Franklin. It was a vehicle for ideas.",
    "Franklin Blend captures that energy: lively, bright, and layered. Designed for the mind that never stops moving.",
  ],
  historical_anchor: {
    quote: 'Well done is better than well said.',
    attribution: 'Benjamin Franklin',
    body: [
      "Franklin never boarded a ship without his personal coffee supply. He understood that the work of civilization required fuel — and he was happy to provide both.",
      "He invented the lightning rod, bifocals, the flexible urinary catheter, the Franklin stove, and the concept of daylight saving time. Before breakfast.",
      "Coffeehouses were his battlefield. Ideas were his weapon. He believed that the quality of a conversation was the quality of a civilization.",
    ],
  },
  flavor_notes: ['Caramel', 'Citrus', 'Sweet Finish', 'Bright Profile'],
  roast_level: 'Light',
  brew_methods: [
    { name: 'Pour Over', tip: 'Best clarity · Highlights brightness and complexity' },
    { name: 'Drip', tip: 'Smooth and bright · Reliable and consistent' },
    { name: 'French Press', tip: 'Fuller body · Deeper sweetness' },
  ],
  blend_meaning: 'The bright citrus and caramel notes mirror the clarity of a great idea — unexpected, energizing, memorable. This is the cup you drink before you build something.',
  takeaway_quote: 'An investment in knowledge pays the best interest.',
  takeaway_text: 'Franklin wasn\'t the loudest Founder — he was the most prepared. Every cup of this blend is a reminder to stay curious, stay sharp, and keep building.',
  series_blends: [
    { name: 'Washington Blend', roast: 'Dark Roast · TR-001', route: '/WashingtonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
    { name: 'Jefferson Blend', roast: 'Medium Roast · TR-002', route: '/JeffersonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841' },
    { name: 'Roosevelt Blend', roast: 'Dark Roast · TR-006', route: '/RooseveltBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-6_9c4a00ed-4e07-40bf-b93c-42f039931d2e.jpg?v=1775891504' },
  ],
};

export default function FranklinQR() {
  return <QRStoryTemplate data={DATA} />;
}