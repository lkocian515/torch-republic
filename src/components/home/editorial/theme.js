export const colors = {
  page: '#F7F1E7',
  cream: '#FBF8F1',
  parchment: '#EFE5D6',
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  forest: '#293626',
  moss: '#566047',
  sage: '#899078',
  coffee: '#35261D',
  espresso: '#35261D',
  clay: '#B7653E',
  rust: '#A95637',
  border: '#D9CDBA',
  gold: '#A97B32',
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
  { id: 'suncap-rise', title: 'SunCap Rise', categoryLabel: 'Mushroom Coffee', heading: 'Begin on the bright side.', body: 'SunCap Rise pairs instant coffee with Lion’s Mane and Chaga in an easy cup made for fresh starts and morning momentum.', details: 'Lion’s Mane + Chaga · Instant Mushroom Coffee', button: 'Meet SunCap Rise', group: 'mushroom' },
  { id: 'glowmind-clarity', title: 'GlowMind Clarity', categoryLabel: 'Mushroom Coffee', heading: 'Keep the ritual clear.', body: 'GlowMind Clarity combines instant coffee with Lion’s Mane and Chaga for worktables, notebooks, and routines that deserve your attention.', details: 'Lion’s Mane + Chaga · Instant Mushroom Coffee', button: 'Meet GlowMind Clarity', group: 'mushroom' },
  { id: 'mooncap-restore', title: 'MoonCap Restore', categoryLabel: 'Mushroom Coffee', heading: 'A quieter way to begin again.', body: 'MoonCap Restore brings Lion’s Mane and Chaga into a smooth instant coffee made for deliberate mornings and unhurried resets.', details: 'Lion’s Mane + Chaga · Instant Mushroom Coffee', button: 'Meet MoonCap Restore', group: 'mushroom' },
  { id: 'torchbearer', title: 'Torchbearer', categoryLabel: 'Classic Instant Coffee', heading: 'Carry the original flame.', body: 'Torchbearer is a classic instant coffee made with single-origin coffee from Papua New Guinea for a straightforward daily cup.', details: 'Papua New Guinea · Classic Instant Coffee', button: 'Meet Torchbearer', group: 'classic' },
  { id: 'ember-reserve', title: 'Ember Reserve', categoryLabel: 'Classic Instant Coffee', heading: 'Smooth, warm, and ready when you are.', body: 'Ember Reserve is a smooth Arabica instant coffee with an approachable profile for early departures and afternoon pauses.', details: 'Smooth Arabica · Classic Instant Coffee', button: 'Meet Ember Reserve', group: 'classic' },
  { id: 'the-alchemist', title: 'The Alchemist', categoryLabel: 'Ceremonial Matcha', heading: 'Transform the everyday cup.', body: 'The Alchemist is ceremonial matcha with a versatile character made for lattes, iced drinks, and everyday exploration.', details: 'Ceremonial Matcha · Hot or Iced', button: 'Meet The Alchemist', group: 'matcha' },
  { id: 'the-monk', title: 'The Monk', categoryLabel: 'Ceremonial Matcha', heading: 'Make room for stillness.', body: 'The Monk is ceremonial matcha created for a simple, intentional ritual when you want to slow down and be present.', details: 'Ceremonial Matcha · Simple Ritual', button: 'Meet The Monk', group: 'matcha' },
];

export const comparisons = [
  ['A bright mushroom coffee for the start of the day', 'SunCap Rise'],
  ['Mushroom coffee for work and focused routines', 'GlowMind Clarity'],
  ['Mushroom coffee for a deliberate, quieter ritual', 'MoonCap Restore'],
  ['Single-origin coffee with no brewing equipment', 'Torchbearer'],
  ['Smooth, approachable Arabica instant coffee', 'Ember Reserve'],
  ['Matcha for lattes, iced drinks, and experimentation', 'The Alchemist'],
  ['A simple, traditional matcha ritual', 'The Monk'],
];