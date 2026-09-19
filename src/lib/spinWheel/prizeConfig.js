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
 */

export const SPIN_WHEEL_VERSION = 2;

export const PRIZES = [
  {
    id: 'ten_percent',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 60,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#E8DCC8',
    sliceTextColor: '#2D2824',
  },
  {
    id: 'fifteen_percent',
    label: '15% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#C98F86',
    sliceTextColor: '#FBF8F2',
  },
  {
    id: 'five_off_40',
    label: '$5 OFF',
    sublabel: 'Orders $40+',
    weight: 10,
    minPurchase: 40,
    minPurchaseDisplay: '$40+',
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#9EAD95',
    sliceTextColor: '#2D2824',
  },
  {
    id: 'twenty_percent',
    label: '20% OFF',
    sublabel: 'Your next coffee order',
    weight: 5,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#6A5A4A',
    sliceTextColor: '#FBF8F2',
  },
];

export const SLICE_COUNT = PRIZES.length;
export const SLICE_DEG = 360 / SLICE_COUNT;

export const getPrizeById = (id) => PRIZES.find((p) => p.id === id);
export const getSliceIndexById = (id) => PRIZES.findIndex((p) => p.id === id);