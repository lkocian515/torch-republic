import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: "Eagle's Flight Blend",
  collection: 'Liberty Icons · LI-001',
  TR_number: 'LI-001',
  shopify_handle: 'eagles-flight-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
  accent_color: '#8B6D47',
  hero_quote: 'The eagle doesn\'t ask permission to soar.',
  hook_text: 'Strong, bold, and fearless. A dark roast that embodies the untamed power and vision of the American bald eagle.',
  symbolism_text: [
    "The bald eagle was chosen as America's national symbol in 1782 — not because it was gentle, but because it was sovereign. It answers to nothing. It sees further than most creatures dare to look. It moves through its world with complete authority.",
    "Eagle's Flight Blend was built around that energy. Bold, intense, and utterly without apology. A dark roast designed for early risers, adventurers, and anyone who refuses to live life at low altitude.",
    "The eagle doesn't circle anxiously. It finds the thermal, spreads its wings, and climbs. This is the cup for that kind of morning.",
  ],
  historical_anchor: {
    quote: 'The eagle suffers little birds to sing, and is not careful what they mean thereby.',
    attribution: 'William Shakespeare, Titus Andronicus',
    body: [
      "The bald eagle nearly went extinct in the 20th century — hunted, displaced, and poisoned by DDT. By 1963, fewer than 500 nesting pairs remained in the contiguous United States.",
      "Then came the recovery. Protections were put in place. The species rebounded. By 2007, it was removed from the endangered species list. Today, over 300,000 bald eagles soar across North America.",
      "The eagle came back. That's the story this blend carries — resilience, recovery, and the refusal to disappear.",
    ],
  },
  flavor_notes: ['Praline', 'Roasted Peanuts', 'Dark Chocolate', 'Robust Body'],
  roast_level: 'Dark',
  brew_methods: [
    { name: 'Drip', tip: 'Strong brew ratio · Clean and powerful' },
    { name: 'French Press', tip: 'Full body extraction · Coarse grind · 4 min steep' },
    { name: 'Espresso', tip: 'Bold and concentrated · Built for intensity' },
  ],
  blend_meaning: 'The praline and dark chocolate notes are rich without softness — powerful flavor that earns its boldness. Like the eagle itself, this cup doesn\'t announce itself gently. It arrives.',
  takeaway_quote: 'You were not built to cruise at low altitude.',
  takeaway_text: 'The eagle sees from heights most never reach — not because it\'s extraordinary, but because it commits fully to the climb. Every cup of this blend is an invitation to raise your standard and hold it there.',
  series_blends: [
    { name: 'Liberty Torch Blend', roast: 'Medium Roast · LI-002', route: '/LibertyTorchBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701' },
    { name: "Uncle Sam's Bold Brew", roast: 'Dark Roast · LI-005', route: '/UncleSamsBoldBrew', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585' },
    { name: "Rosie's Grind", roast: 'Medium-Dark · LI-004', route: '/RosiesGrind', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440' },
  ],
};

export default function EaglesFlightQR() {
  return <QRStoryTemplate data={DATA} />;
}