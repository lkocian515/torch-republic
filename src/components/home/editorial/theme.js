export const colors = {
  page: '#F8F5EF',
  card: '#FFFDFC',
  text: '#26231F',
  secondary: '#655E56',
  coffee: '#6F4A32',
  sage: '#8A9D78',
  matcha: '#A8BD78',
  border: '#DED8CF',
  gold: '#B48A4A',
};

export const routes = {
  shop: '/shop',
  ritual: '/build-your-ritual',
  why: '/mission',
  journal: '/journal',
  faq: '/faq',
  account: '/profile',
  cart: '/cart',
  classic: '/shop/instant-coffee',
  mushroom: '/shop/instant-mushroom-coffee',
  matcha: '/shop/matcha',
};

export const requestedProducts = [
  { id: 'suncap-rise', title: 'Suncap Rise', categoryLabel: 'Light-Roast Mushroom Coffee', heading: 'Begin on the bright side.', body: 'Suncap Rise pairs light-roast instant coffee with Lion’s Mane and Chaga in an easy cup made for fresh starts. Its bright character makes it a natural first ritual for mornings that need a little momentum.', details: 'Lion’s Mane + Chaga · Light Roast · Instant Coffee', button: 'Meet Suncap Rise', group: 'mushroom' },
  { id: 'mooncap-restore', title: 'Mooncap Restore', categoryLabel: 'Light-Roast Mushroom Coffee', heading: 'A quieter way to begin again.', body: 'Mooncap Restore brings Lion’s Mane and Chaga into a smooth, light-roast instant coffee made for deliberate mornings and unhurried resets. Add water, take a breath, and give the next part of your day a clear beginning.', details: 'Lion’s Mane + Chaga · Light Roast · Instant Coffee', button: 'Meet Mooncap Restore', group: 'mushroom' },
  { id: 'glowmind-clarity', title: 'GlowMind Clarity', categoryLabel: 'Light-Roast Mushroom Coffee', heading: 'Keep the ritual clear.', body: 'GlowMind Clarity combines light-roast instant coffee with Lion’s Mane and Chaga in a simple, reliable cup. It is an easy companion for worktables, notebooks, and the routines that deserve your full attention.', details: 'Lion’s Mane + Chaga · Light Roast · Instant Coffee', button: 'Meet GlowMind Clarity', group: 'mushroom' },
  { id: 'torchbearer', title: 'Torchbearer', categoryLabel: 'Single-Origin Instant Coffee', heading: 'Carry the original flame.', body: 'Torchbearer is a classic instant coffee made with single-origin coffee from Papua New Guinea. It delivers a straightforward cup with the character of its origin and the convenience to go wherever the day takes you.', details: 'Papua New Guinea · Single Origin · Instant Coffee', button: 'Meet Torchbearer', group: 'classic' },
  { id: 'ember-rise', title: 'Ember Reserve', categoryLabel: 'Smooth Arabica Instant Coffee', heading: 'Smooth, warm, and ready when you are.', body: 'Ember Reserve is a light-roast Arabica instant coffee with an approachable, easy-drinking profile. Keep it nearby for early departures, afternoon pauses, and every occasion that calls for coffee without the equipment.', details: 'Smooth Arabica · Light Roast · Instant Coffee', button: 'Meet Ember Reserve', group: 'classic', recordNote: 'No exact Ember Reserve local record found; mapped to existing Ember Rise product handle.' },
  { id: 'the-monk', title: 'The Monk', categoryLabel: 'Ceremonial Matcha', heading: 'Make room for stillness.', body: 'The Monk is 100% Japanese matcha powder created for a simple, intentional ritual. Whisk it traditionally or prepare it over ice when you want a cup that invites you to slow down and be present.', details: 'Japanese Matcha · Premium Grade · 100% Matcha Powder', button: 'Meet The Monk', group: 'matcha' },
  { id: 'the-alchemist', title: 'The Alchemist', categoryLabel: 'Ceremonial Matcha', heading: 'Transform the everyday cup.', body: 'The Alchemist is Japanese ceremonial matcha with a versatile character made for exploration. Whisk it with water, pour it over ice, or turn it into your favorite latte and make the ritual your own.', details: 'Japanese Matcha · Premium Grade · Ceremonial Matcha', button: 'Meet The Alchemist', group: 'matcha' },
];

export const comparisons = [
  ['Single-origin coffee with no brewing equipment', 'Torchbearer'],
  ['Smooth, approachable Arabica instant coffee', 'Ember Reserve'],
  ['A bright mushroom coffee for the start of the day', 'Suncap Rise'],
  ['Mushroom coffee for a deliberate, quieter ritual', 'Mooncap Restore'],
  ['Mushroom coffee for work and focused routines', 'GlowMind Clarity'],
  ['A simple, traditional matcha ritual', 'The Monk'],
  ['Matcha for lattes, iced drinks, and experimentation', 'The Alchemist'],
];