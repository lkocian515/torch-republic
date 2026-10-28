/**
 * Centralized prize DISPLAY configuration for the Spin to Win wheel.
 *
 * IMPORTANT: Actual Shopify discount codes live ONLY in the processSpinWheel
 * backend function (server-side) and are NEVER shipped to the browser bundle.
 * The frontend receives display metadata (id, label, weight, minPurchase,
 * expiresText) via the 'status' action, but these values are also declared
 * here so the wheel can render before the status check completes.
 *
 * Weights are included for documentation; prize selection is performed
 * securely on the backend using its own copy of the weights.
 *
 * ORDER IS VISUAL ONLY. Slices are drawn clockwise from 12 o'clock, so this
 * array reads as: upper right, lower right, lower left, upper left. The order
 * below places 10% OFF upper left, 15% OFF upper right, $5 OFF lower left and
 * 20% OFF lower right to match the approved artwork. Prizes, weights, minimum
 * purchases and code assignment are unchanged — both the drawn slice and the
 * rotation needed to land it under the pointer are derived from this same
 * index, so the pointer always settles on the prize the server returned.
 */

export const SPIN_WHEEL_VERSION = 2;

export const PRIZES = [
  {
    id: 'fifteen_percent',
    label: '15% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#15455F',
    sliceTextColor: '#FFF7E8',
  },
  {
    id: 'twenty_percent',
    label: '20% OFF',
    sublabel: 'Your next coffee order',
    weight: 5,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#061420',
    sliceTextColor: '#FFF7E8',
  },
  {
    id: 'five_off_40',
    label: '$5 OFF',
    sublabel: 'Orders $40+',
    weight: 10,
    minPurchase: 40,
    minPurchaseDisplay: '$40+',
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#15455F',
    sliceTextColor: '#FFF7E8',
  },
  {
    id: 'ten_percent',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 60,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#061420',
    sliceTextColor: '#FFF7E8',
  },
];

export const SLICE_COUNT = PRIZES.length;
export const SLICE_DEG = 360 / SLICE_COUNT;

export const getPrizeById = (id) => PRIZES.find((p) => p.id === id);
export const getSliceIndexById = (id) => PRIZES.findIndex((p) => p.id === id);