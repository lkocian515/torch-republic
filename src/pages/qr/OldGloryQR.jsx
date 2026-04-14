import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Old Glory House Blend',
  collection: 'Liberty Icons · LI-003',
  TR_number: 'LI-003',
  shopify_handle: 'old-glory-house-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/j9ihuio.png?v=1776038315',
  accent_color: '#B8955A',
  hero_quote: 'The flag doesn\'t wave. It endures.',
  hook_text: 'The blend that built America. A timeless medium roast that works in every brewing method — and in every household that still believes in something.',
  symbolism_text: [
    "Old Glory is more than fabric and dye. It's a symbol of 250 years of people willing to do hard things for something beyond themselves. It's been raised on battlefields, carried to the moon, folded at funerals, and displayed on front porches from coast to coast.",
    "Old Glory House Blend is the everyday expression of that legacy. Not the loudest cup in the lineup — the most dependable one. The one that shows up every morning without ceremony and does exactly what it's supposed to do.",
    "This is the coffee that sparked conversations, fueled revolutions, and built the American spirit. One cup at a time.",
  ],
  historical_anchor: {
    quote: 'I only regret that I have but one life to lose for my country.',
    attribution: 'Nathan Hale',
    body: [
      "The American flag has been carried into every conflict this nation has ever faced. It flies over every embassy, every military installation, every federal building. It means something different to everyone — but it means something to everyone.",
      "Old Glory has 13 stripes for the original colonies and 50 stars for every state. Each one earned. Each one a story.",
      "This blend honors the quiet, everyday act of flying that flag. Of remembering what it cost. Of choosing to carry it forward.",
    ],
  },
  flavor_notes: ['Caramel', 'Sweet Cream', 'Subtle Spice', 'Smooth Body'],
  roast_level: 'Medium',
  brew_methods: [
    { name: 'Drip', tip: 'The classic house cup · Reliable every time' },
    { name: 'French Press', tip: 'Fuller body · Highlights caramel depth' },
    { name: 'Pour Over', tip: 'Brings out sweet cream notes · Clean finish' },
  ],
  blend_meaning: 'Caramel, sweet cream, and subtle spice — a blend that feels like home. This isn\'t a cup that demands anything of you. It just reminds you what you\'re part of.',
  takeaway_quote: 'Some things are worth showing up for. Every single day.',
  takeaway_text: 'Old Glory doesn\'t fly because someone told it to. It flies because people made that choice — generation after generation. This blend honors that quiet, daily commitment.',
  series_blends: [
    { name: "Eagle's Flight Blend", roast: 'Dark Roast · LI-001', route: '/EaglesFlightBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383' },
    { name: 'Liberty Torch Blend', roast: 'Medium Roast · LI-002', route: '/LibertyTorchBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701' },
    { name: "Uncle Sam's Bold Brew", roast: 'Dark Roast · LI-005', route: '/UncleSamsBoldBrew', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585' },
  ],
};

export default function OldGloryQR() {
  return <QRStoryTemplate data={DATA} />;
}