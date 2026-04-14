import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Lady Liberty Blend',
  collection: 'Liberty Icons · LI-006',
  TR_number: 'LI-006',
  shopify_handle: 'lady-liberty-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
  accent_color: '#B38B4D',
  hero_quote: 'She has stood in the harbor for over a century. Still standing.',
  hook_text: 'Smooth, approachable, and timeless. A golden medium roast built around the most enduring symbol of American freedom.',
  symbolism_text: [
    "She arrived in 1886 — a gift from France, a symbol to the world. For millions of immigrants arriving by ship, the Statue of Liberty was the first sight of a new life. Not just a monument. A promise.",
    "Lady Liberty Blend carries that same energy: welcoming, steady, and deeply meaningful. Not aggressive. Not complicated. Just consistently excellent — the way a symbol of freedom should be.",
    "This is the everyday freedom cup. The one you come back to. The one that reminds you that liberty doesn't have to be loud to be real.",
  ],
  historical_anchor: {
    quote: 'Give me your tired, your poor, your huddled masses yearning to breathe free.',
    attribution: 'Emma Lazarus, The New Colossus (1883)',
    body: [
      "The Statue of Liberty wasn't built by Americans — it was built by the French as a testament to the idea that freedom transcends borders. Frédéric Auguste Bartholdi and Gustave Eiffel built something meant to last centuries.",
      "It has. And what it represents — opportunity, refuge, dignity, the right to begin again — remains just as powerful today.",
      "Every cup of Lady Liberty Blend is a quiet acknowledgment of that promise. Freedom is for everyone willing to carry it.",
    ],
  },
  flavor_notes: ['Roasted Nuts', 'Honey', 'Milk Chocolate', 'Smooth Finish'],
  roast_level: 'Medium',
  brew_methods: [
    { name: 'Pour Over', tip: 'Highlights honey and nut notes beautifully' },
    { name: 'Drip', tip: 'The everyday freedom cup · Clean and accessible' },
    { name: 'Cold Brew', tip: '12–16 hr steep · Silky and smooth · Perfect summer cup' },
  ],
  blend_meaning: 'The honey and milk chocolate notes are warm and welcoming — the way a great symbol should feel. This blend doesn\'t demand anything of you. It simply reminds you what you\'re part of.',
  takeaway_quote: 'Freedom is not a background — it\'s a daily choice.',
  takeaway_text: 'Lady Liberty doesn\'t move. She doesn\'t need to. Her presence alone says everything. Drink this blend as a reminder that some things are worth standing for — even when standing is the only act required.',
  series_blends: [
    { name: "Eagle's Flight Blend", roast: 'Dark Roast · LI-001', route: '/EaglesFlightBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383' },
    { name: 'Liberty Torch Blend', roast: 'Medium Roast · LI-002', route: '/LibertyTorchBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701' },
    { name: "Rosie's Grind", roast: 'Medium-Dark · LI-004', route: '/RosiesGrind', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440' },
  ],
};

export default function LadyLibertyQR() {
  return <QRStoryTemplate data={DATA} />;
}