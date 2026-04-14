import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Adams Blend',
  collection: 'Founders Series · TR-004',
  TR_number: 'TR-004',
  shopify_handle: 'adams-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_6f98a910-06fe-466c-b034-23133f53a324.jpg?v=1775892090',
  accent_color: '#B87AC8',
  hero_quote: 'Principle over comfort. Every. Single. Morning.',
  hook_text: 'He switched from tea to coffee on principle — and never looked back. This is the cup of conviction.',
  symbolism_text: [
    "John Adams made a deliberate choice. After the Boston Tea Party, he publicly declared he would drink coffee instead of tea as a patriotic statement. It wasn't just symbolic — it was a daily act of commitment to a cause larger than himself.",
    "Adams was the Atlas of Independence — the man who carried the revolution on his back when others got the glory. He didn't seek recognition. He sought justice, law, and the hard work of building something that would last.",
    "Adams Blend honors that quiet, principled determination. Not the loudest voice in the room — but the most resolute.",
  ],
  historical_anchor: {
    quote: 'Liberty cannot be preserved without a general knowledge among the people.',
    attribution: 'John Adams',
    body: [
      "Adams stood for structure when others wanted chaos. For due process when others wanted vengeance. For the long arc of justice when the moment demanded shortcuts.",
      "He was the second president, but arguably the first principled one. He lost his reelection bid for doing the right thing — and he knew it going in.",
      "He lived to 90 years old. The longest-lived Founder. Some historians credit the coffee.",
    ],
  },
  flavor_notes: ['Toffee', 'Dark Chocolate', 'Citrus Finish', 'Balanced Body'],
  roast_level: 'Medium',
  brew_methods: [
    { name: 'French Press', tip: 'Coarse grind · Full body · 4 min steep' },
    { name: 'Pour Over', tip: 'Brings out citrus brightness · Medium grind' },
    { name: 'Drip', tip: '1:15 ratio · 200°F · Consistent and reliable' },
  ],
  blend_meaning: 'The citrus finish cuts through the richness — a reminder that principle has an edge. Toffee and chocolate bring warmth and depth. This is a cup that respects the work.',
  takeaway_quote: 'Do the right thing. Even when nobody\'s watching.',
  takeaway_text: 'Adams didn\'t need applause to act with integrity. Every morning you drink this blend is a quiet reaffirmation of that same standard — conviction before comfort.',
  series_blends: [
    { name: 'Washington Blend', roast: 'Dark Roast · TR-001', route: '/WashingtonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
    { name: 'Jefferson Blend', roast: 'Medium Roast · TR-002', route: '/JeffersonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841' },
    { name: 'Franklin Blend', roast: 'Light Roast · TR-003', route: '/FranklinBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986' },
  ],
};

export default function AdamsQR() {
  return <QRStoryTemplate data={DATA} />;
}