import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Roosevelt Blend',
  collection: 'Founders Series · TR-006',
  TR_number: 'TR-006',
  shopify_handle: 'roosevelt-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-6_9c4a00ed-4e07-40bf-b93c-42f039931d2e.jpg?v=1775891504',
  accent_color: '#7AC87A',
  hero_quote: 'He was shot. He finished the speech. Then he sat down.',
  hook_text: 'No shortcuts. No apologies. A bold, full-body dark roast for those who operate at full output — no matter what.',
  symbolism_text: [
    "Theodore Roosevelt reportedly consumed nearly a gallon of coffee per day. He read a book before breakfast, hunted big game, led a cavalry charge up San Juan Hill, wrote 35 books, and negotiated a Nobel Peace Prize — all before most men finished their morning routine.",
    "He was shot in the chest during a campaign speech in 1912. The bullet lodged near his lung. He spoke for 50 minutes before agreeing to be taken to a hospital. He told the crowd: 'It takes more than that to kill a Bull Moose.'",
    "Roosevelt Blend is built in that spirit. No filler. No gentleness. Pure forward motion.",
  ],
  historical_anchor: {
    quote: 'Do what you can, with what you have, where you are.',
    attribution: 'Theodore Roosevelt',
    body: [
      "TR's son once noted that his coffee cup was 'more like a bathtub.' He didn't sip — he consumed. Every cup was fuel for the next thing, and there was always a next thing.",
      "He was the first American to win the Nobel Peace Prize. He built the Panama Canal. He established the national parks system. He boxed in the White House.",
      "The standard Roosevelt set was simple: Do the hard thing. Do it fully. Then do the next hard thing.",
    ],
  },
  flavor_notes: ['Cocoa', 'Toasted Nut', 'Full Body Finish', 'Bold Presence'],
  roast_level: 'Dark',
  brew_methods: [
    { name: 'French Press', tip: '4 min steep · Medium-coarse grind · Full immersion' },
    { name: 'Drip', tip: '1:14 ratio · 205°F · Maximum extraction' },
    { name: 'Espresso', tip: 'Fine grind · High pressure · Intense and concentrated' },
  ],
  blend_meaning: 'The full body and cocoa finish mirror the man himself — no hesitation, no subtlety, no apology. This is coffee that matches your pace if your pace is relentless.',
  takeaway_quote: 'Far better to dare mighty things than to live in the gray twilight.',
  takeaway_text: 'Roosevelt didn\'t do anything halfway. This blend doesn\'t either. Drink it on the days when you need the reminder that you were built for hard things — and you\'re not done yet.',
  series_blends: [
    { name: 'Washington Blend', roast: 'Dark Roast · TR-001', route: '/WashingtonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
    { name: 'Lincoln Blend', roast: 'Medium-Dark · TR-005', route: '/LincolnBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869' },
    { name: 'Adams Blend', roast: 'Medium Roast · TR-004', route: '/AdamsBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090' },
  ],
};

export default function RooseveltQR() {
  return <QRStoryTemplate data={DATA} />;
}