import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Liberty Torch Blend',
  collection: 'Liberty Icons · LI-002',
  TR_number: 'LI-002',
  shopify_handle: 'liberty-torch-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701',
  accent_color: '#C4A35A',
  hero_quote: 'The torch was never meant to be held. It was meant to be carried.',
  hook_text: 'Bright, golden, and clean. A medium roast that honors the eternal flame of freedom — one cup at a time.',
  symbolism_text: [
    "The torch is one of the most powerful symbols in human history. From the ancient Olympic flame to the Statue of Liberty, the torch represents a truth that cannot be extinguished: freedom is a living force. It must be tended, passed, and carried forward.",
    "Liberty Torch Blend was built around that idea. Not just a name — a philosophy. Every sip is a reminder that the light doesn't sustain itself. Someone has to hold it. Someone has to carry it forward.",
    "This is the coffee for torchbearers. For those who understand that liberty is not inherited — it is kept.",
  ],
  historical_anchor: {
    quote: 'The torch of liberty will burn forever, as long as there are hands willing to carry it.',
    attribution: 'Torch Republic',
    body: [
      "The Statue of Liberty's torch was designed to be lit from within — a beacon visible from miles away. Emma Lazarus's poem, cast in bronze at its base, called to 'the huddled masses yearning to breathe free.'",
      "Liberty is not passive. It is not background noise. It is an active, daily commitment by people who understand what is at stake.",
      "This blend honors those hands. The ones that do the quiet, unglamorous work of keeping the flame alive.",
    ],
  },
  flavor_notes: ['Sundried Citrus', 'Golden Honey', 'Clean Finish', 'Bright Acidity'],
  roast_level: 'Medium',
  brew_methods: [
    { name: 'Pour Over', tip: 'Highlights honey and citrus notes · Slow bloom' },
    { name: 'Drip', tip: 'Clean and bright · Daily freedom cup' },
    { name: 'French Press', tip: 'Fuller body · Deeper sweetness emerges' },
  ],
  blend_meaning: 'The golden honey notes carry warmth without weight. The citrus brightness cuts through like a flame in the dark. This is a cup that reminds you why the work matters.',
  takeaway_quote: 'Keep the flame. Pass it forward.',
  takeaway_text: 'The torch isn\'t yours to keep — it\'s yours to carry for a season and then pass to the next set of hands. Drink this blend knowing you\'re part of something larger than a morning routine.',
  series_blends: [
    { name: "Eagle's Flight Blend", roast: 'Dark Roast · LI-001', route: '/EaglesFlightBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383' },
    { name: 'Old Glory House Blend', roast: 'Medium Roast · LI-003', route: '/OldGloryHouseBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/j9ihuio.png?v=1776038315' },
    { name: "Uncle Sam's Bold Brew", roast: 'Dark Roast · LI-005', route: '/UncleSamsBoldBrew', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585' },
  ],
};

export default function LibertyTorchQR() {
  return <QRStoryTemplate data={DATA} />;
}