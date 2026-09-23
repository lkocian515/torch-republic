/**
 * Free Gift with Purchase configuration.
 * Customers choose one gift at checkout; the selection is passed to Shopify
 * as a cart attribute + note so fulfillment knows which gift to include.
 */
export const FREE_GIFT_ENABLED = true;

// Minimum cart subtotal required to qualify (0 = any purchase qualifies)
export const FREE_GIFT_THRESHOLD = 0;

// Promotional banner image (all three gifts together)
export const FREE_GIFT_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/11d8e640b_file_000000006230822fbdd3c26741e68a15.png';

export const FREE_GIFTS = [
  { id: 'canvas-tote', name: 'Canvas Tote', description: 'Cream canvas tote with Torch Republic logo' },
  { id: 'insulated-tumbler', name: 'Insulated Tumbler', description: 'White stainless steel tumbler with Torch Republic logo' },
  { id: 'dad-cap', name: 'Dad Cap', description: 'Cream baseball cap with Torch Republic logo' },
  { id: 'heart-keychain', name: 'Heart Keychain', description: 'Silver heart keychain with Torch Republic logo', image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9005e309c_Screenshot_2026-09-23-10-04-10-38_a47d50fe433fa5d9552583a4ef8e5ab5.jpg' },
];

export const getGiftById = (id) => FREE_GIFTS.find((g) => g.id === id) || null;