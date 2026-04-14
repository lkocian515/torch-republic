import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: "Uncle Sam's Bold Brew",
  collection: 'Liberty Icons · LI-005',
  TR_number: 'LI-005',
  shopify_handle: 'uncle-sams-bold-brew',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
  accent_color: '#9B7B4D',
  hero_quote: 'Uncle Sam wants YOU — awake, bold, and ready.',
  hook_text: 'Dark, intense, and unapologetic. Built for those who wake up with a mission and don\'t stop until the work is done.',
  symbolism_text: [
    "Uncle Sam is one of the most recognized symbols in American history — a figure who looks you in the eye and asks: what are you prepared to do? Not a passive invitation. A direct challenge.",
    "Uncle Sam's Bold Brew carries that same directness. No softness. No apology. Just a deep, powerful dark roast that matches the energy of someone who shows up fully committed to the day ahead.",
    "This is the cup for those who answer the call without hesitation. Who wake up before the alarm. Who understand that freedom, like coffee, requires effort to produce.",
  ],
  historical_anchor: {
    quote: 'Ask not what your country can do for you — ask what you can do for your country.',
    attribution: 'John F. Kennedy',
    body: [
      "The Uncle Sam figure originated during the War of 1812 — drawn from Samuel Wilson, a meat packer who supplied barrels of food stamped 'U.S.' to soldiers. The men said it stood for 'Uncle Sam.'",
      "From that humble origin, the symbol evolved into the most powerful recruiting image in American history. James Montgomery Flagg's 1917 poster put a face to the call — and millions answered.",
      "The question Uncle Sam asks is timeless: Are you ready? Are you willing? This blend is for those whose answer is yes.",
    ],
  },
  flavor_notes: ['Bittersweet Chocolate', 'Smoke', 'Deep Roast', 'Bold Finish'],
  roast_level: 'Dark',
  brew_methods: [
    { name: 'French Press', tip: 'Full immersion · Deep body · No apology' },
    { name: 'Drip', tip: 'Strong brew ratio · Maximum boldness' },
    { name: 'Espresso', tip: 'Concentrated power · Single or double shot' },
  ],
  blend_meaning: 'The bittersweet chocolate and smoke notes don\'t ask permission. They announce themselves — the way a challenge should. This is a cup that prepares you for the hard thing ahead.',
  takeaway_quote: 'You were built for this. Don\'t hold back.',
  takeaway_text: 'Uncle Sam doesn\'t make suggestions. He asks the question that matters: Are you ready to step up? Every cup of this blend is your answer — bold, black, and fully committed.',
  series_blends: [
    { name: "Eagle's Flight Blend", roast: 'Dark Roast · LI-001', route: '/EaglesFlightBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383' },
    { name: "Rosie's Grind", roast: 'Medium-Dark · LI-004', route: '/RosiesGrind', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440' },
    { name: 'Liberty Torch Blend', roast: 'Medium Roast · LI-002', route: '/LibertyTorchBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701' },
  ],
};

export default function UncleSamQR() {
  return <QRStoryTemplate data={DATA} />;
}