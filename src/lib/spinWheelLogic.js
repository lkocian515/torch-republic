/**
 * spinWheelLogic.js — Outcome selection and wheel rotation math.
 *
 * GUARANTEE: every eligible visitor receives 15% off.
 *
 * Outcomes are limited to exactly two:
 *   '15pct'     — wins the verified WELCOME10 code
 *   'spin_again'— prompts a second, guaranteed-win spin
 *
 * First-spin allocation (no dark pattern):
 *   50% true chance → '15pct'
 *   50% true chance → 'spin_again'
 *
 * Second-spin allocation:
 *   100% → '15pct' (guaranteed)
 *
 * The visual wheel has 8 slices (4× '15% OFF', 4× 'SPIN AGAIN'), alternated.
 * After an outcome is selected we compute the EXACT rotation that lands the
 * pointer (fixed at top, 12 o'clock) on a matching slice, so the visual never
 * shows one result while landing on another.
 */

export const OUTCOME = {
  WIN: '15pct',
  SPIN_AGAIN: 'spin_again',
};

// 8 slices, alternated. Index 0 is at the top (under the pointer at rest).
// Slice labels are decorative text; the logic resolves which slice to land on.
export const SLICES = [
  { label: '15% OFF', outcome: OUTCOME.WIN, idx: 0 },
  { label: 'SPIN AGAIN', outcome: OUTCOME.SPIN_AGAIN, idx: 1 },
  { label: '15% OFF', outcome: OUTCOME.WIN, idx: 2 },
  { label: 'SPIN AGAIN', outcome: OUTCOME.SPIN_AGAIN, idx: 3 },
  { label: '15% OFF', outcome: OUTCOME.WIN, idx: 4 },
  { label: 'SPIN AGAIN', outcome: OUTCOME.SPIN_AGAIN, idx: 5 },
  { label: '15% OFF', outcome: OUTCOME.WIN, idx: 6 },
  { label: 'SPIN AGAIN', outcome: OUTCOME.SPIN_AGAIN, idx: 7 },
];

export const SLICE_COUNT = SLICES.length; // 8
export const SLICE_DEG = 360 / SLICE_COUNT; // 45

/**
 * Decide the outcome for a given spin number.
 * @param {number} spinNumber - 1 for the first spin, 2 for the second (guaranteed win)
 * @returns {'15pct' | 'spin_again'}
 */
export const selectOutcome = (spinNumber) => {
  if (spinNumber >= 2) return OUTCOME.WIN; // guaranteed
  // First spin: fair 50/50. Math.random is unbiased.
  return Math.random() < 0.5 ? OUTCOME.WIN : OUTCOME.SPIN_AGAIN;
};

/**
 * Compute the rotation (degrees) that lands a specific slice index under a
 * fixed top pointer, plus the bonus full spin(s) for visual effect.
 *
 * Wheel convention: slice `i` occupies [i*45, (i+1)*45) measured clockwise from
 * the top (12 o'clock). To bring slice `i` under the pointer, rotate the wheel
 * so that slice `i`'s center (i*45 + 22.5) moves to 0° (top). A clockwise visual
 * rotation of `R` deg moves slice center to `(i*45+22.5) - R` (mod 360); we want
 * that to equal 0 mod 360 → R ≡ i*45 + 22.5 (mod 360).
 *
 * We add full extra turns (at least 5) so the motion looks like a real spin.
 *
 * @param {number} sliceIdx  - target slice index (0..7)
 * @param {number} currentRotation - current accumulated rotation in degrees
 * @returns {{ rotation: number, delta: number }} total rotation to set on the wheel
 */
export const computeRotation = (sliceIdx, currentRotation = 0) => {
  const sliceCenter = sliceIdx * SLICE_DEG + SLICE_DEG / 2;
  // We want (rotation mod 360) === sliceCenter.
  const baseRotation = ((sliceCenter - (currentRotation % 360)) + 360) % 360;
  const fullTurns = 5 * 360; // visual flair — five full revolutions
  // Add a small random jitter inside the slice (±15°) so repeats don't look identical,
  // but keep it well inside the slice so the pointer still clearly lands on it.
  const jitter = (Math.random() - 0.5) * (SLICE_DEG * 0.5);
  const delta = fullTurns + baseRotation + jitter;
  return { rotation: currentRotation + delta, delta };
};

/**
 * Pick the slice index for a given outcome. Always returns a valid slice that
 * matches the outcome (so the label under the pointer is truthful).
 * @param {'15pct'|'spin_again'} outcome
 * @returns {{ sliceIdx: number, slice: object }}
 */
export const sliceForOutcome = (outcome) => {
  const matching = SLICES.filter((s) => s.outcome === outcome);
  const choice = matching[Math.floor(Math.random() * matching.length)];
  return { sliceIdx: choice.idx, slice: choice };
};

/**
 * Map an outcome to a human label for analytics / UI.
 */
export const outcomeLabel = (outcome) =>
  outcome === OUTCOME.WIN ? '15pct' : 'spin_again';