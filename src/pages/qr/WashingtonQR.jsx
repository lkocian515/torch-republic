import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: 'Washington Blend',
  collection: 'Founders Series · TR-001',
  TR_number: 'TR-001',
  shopify_handle: 'washington-blend',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
  accent_color: '#C8A44D',
  hero_quote: 'Lead from the front. Yield to nothing.',
  hook_text: 'A bold, full-bodied dark roast built for those who carry responsibility without hesitation. This is the first cup of the republic.',
  symbolism_text: [
    "George Washington wasn't just the first president — he was the standard. Before the title, before the mythology, there was a man who chose duty over comfort, discipline over ambition, and country over self.",
    "Washington Blend carries that energy forward. Every cup is a reminder that leadership isn't claimed — it's earned through steadiness under pressure and the willingness to step forward when others step back.",
    "This is the blend that started it all. Grounded, powerful, and unyielding — just like the man whose name it carries.",
  ],
  historical_anchor: {
    quote: 'The price of freedom is eternal vigilance.',
    attribution: 'George Washington',
    body: [
      "Washington could have been king. He chose to hand back power. That restraint — more than any battlefield victory — defined the republic.",
      "He crossed the Delaware in a blizzard. He survived Valley Forge. He didn't ask for glory. He accepted the burden of greatness when history required it.",
      "Every morning you drink this blend, you carry something forward. That's not a small thing.",
    ],
  },
  flavor_notes: ['Cocoa', 'Toasted Nut', 'Dark Caramel', 'Full Body', 'Low Acidity'],
  roast_level: 'Dark',
  brew_methods: [
    { name: 'French Press', tip: 'Coarse grind · 4 min steep · Full immersion' },
    { name: 'Drip', tip: '1–2 tbsp per 6 oz · 200°F · Medium grind' },
    { name: 'Pour Over', tip: 'Medium grind · 30s bloom · Slow pour' },
  ],
  blend_meaning: 'A dark roast for those who move through darkness with purpose. The full body mirrors the weight carried quietly. The cocoa and nut notes ground you — exactly the way Washington grounded a nation.',
  takeaway_quote: 'The harder the road, the truer the character.',
  takeaway_text: 'Washington Blend is not for the passive. It\'s for those who face the day with intention — who carry weight without broadcasting it, and lead by example without asking for recognition.',
  series_blends: [
    { name: 'Jefferson Blend', roast: 'Medium Roast · TR-002', route: '/JeffersonBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841' },
    { name: 'Franklin Blend', roast: 'Light Roast · TR-003', route: '/FranklinBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_4f650292-3215-4b0f-aed8-7ed4c1a02fb6.jpg?v=1775891986' },
    { name: 'Lincoln Blend', roast: 'Medium-Dark Roast · TR-005', route: '/LincolnBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869' },
  ],
};

export default function WashingtonQR() {
  return <QRStoryTemplate data={DATA} />;
}