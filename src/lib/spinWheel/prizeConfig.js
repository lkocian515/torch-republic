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
 * The active wheel configuration currently awards 10% off on every slice.
 * Keeping all four visible slices identical matches the only enabled server
 * prize, so the visual result always agrees with the award. The server remains
 * the source of truth for whether an email has already spun and which code is
 * issued.
 */

export const SPIN_WHEEL_VERSION = 2;

export const PRIZES = [
  {
    id: 'ten_percent_1',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#15455F',
    sliceTextColor: '#F7F2E9',
  },
  {
    id: 'ten_percent_2',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#061420',
    sliceTextColor: '#F7F2E9',
  },
  {
    id: 'ten_percent_3',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#15455F',
    sliceTextColor: '#F7F2E9',
  },
  {
    id: 'ten_percent',
    label: '10% OFF',
    sublabel: 'Your next coffee order',
    weight: 25,
    minPurchase: null,
    minPurchaseDisplay: null,
    expiresText: 'Valid for 30 days from today',
    sliceColor: '#061420',
    sliceTextColor: '#F7F2E9',
  },
];

export const SLICE_COUNT = PRIZES.length;
export const SLICE_DEG = 360 / SLICE_COUNT;

export const getPrizeById = (id) => PRIZES.find((p) => p.id === id);
export const getSliceIndexById = (id) => PRIZES.findIndex((p) => p.id === id);