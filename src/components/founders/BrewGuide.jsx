import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Thermometer, Timer, Coffee } from 'lucide-react';

// Roast-aware brew profiles
const BREW_PROFILES = {
  drip: {
    name: 'Drip / Auto',
    icon: '☕',
    light:       { grind: 'Medium',        temp: '195–200°F',  time: '4–5 min',  ratio: '1:16',  note: 'Lighter roasts love slightly lower heat to preserve floral notes.' },
    mediumLight: { grind: 'Medium',        temp: '195–200°F',  time: '4–5 min',  ratio: '1:16',  note: 'A clean, balanced extraction that lets the sweetness shine.' },
    medium:      { grind: 'Medium',        temp: '200°F',      time: '4–5 min',  ratio: '1:15',  note: 'The most forgiving roast range — great for everyday brewing.' },
    mediumDark:  { grind: 'Medium',        temp: '200°F',      time: '5 min',    ratio: '1:15',  note: 'Slightly stronger ratio deepens the caramel and chocolate notes.' },
    dark:        { grind: 'Medium-Coarse', temp: '195°F',      time: '4 min',    ratio: '1:14',  note: 'Lower temp prevents bitterness in dark roasts — trust the process.' },
    extraDark:   { grind: 'Medium-Coarse', temp: '190–195°F',  time: '4 min',    ratio: '1:13',  note: 'Bold, rich, and intense. Shorter brew time keeps it smooth.' },
  },
  frenchPress: {
    name: 'French Press',
    icon: '⬛',
    light:       { grind: 'Coarse',        temp: '200°F',      time: '4 min',    ratio: '1:15',  note: 'Light roasts need a full steep to develop body — be patient.' },
    mediumLight: { grind: 'Coarse',        temp: '200°F',      time: '4 min',    ratio: '1:15',  note: 'Full immersion unlocks the delicate sweetness.' },
    medium:      { grind: 'Coarse',        temp: '200°F',      time: '4 min',    ratio: '1:14',  note: 'Classic French press sweet spot — velvety body, clean finish.' },
    mediumDark:  { grind: 'Coarse',        temp: '200°F',      time: '4 min',    ratio: '1:14',  note: 'The oils in this roast shine in full immersion.' },
    dark:        { grind: 'Coarse',        temp: '195°F',      time: '3.5 min',  ratio: '1:13',  note: 'Slightly shorter steep prevents over-extraction.' },
    extraDark:   { grind: 'Coarse',        temp: '190°F',      time: '3 min',    ratio: '1:12',  note: 'Very bold. A splash of cream brings out the depth.' },
  },
  pourOver: {
    name: 'Pour Over',
    icon: '◈',
    light:       { grind: 'Medium-Fine',   temp: '205°F',      time: '3–4 min',  ratio: '1:16',  note: 'Bloom 30s with 2× water weight. Slow pours reveal complex florals.' },
    mediumLight: { grind: 'Medium-Fine',   temp: '205°F',      time: '3–4 min',  ratio: '1:16',  note: 'Controlled pours highlight bright, nuanced flavors.' },
    medium:      { grind: 'Medium',        temp: '200–205°F',  time: '3–4 min',  ratio: '1:15',  note: 'Bloom 30s. Circular pours for even saturation.' },
    mediumDark:  { grind: 'Medium',        temp: '200°F',      time: '3.5 min',  ratio: '1:15',  note: 'A longer bloom develops sweetness before the main pour.' },
    dark:        { grind: 'Medium',        temp: '195–200°F',  time: '3 min',    ratio: '1:14',  note: 'Faster pour rate reduces contact time and bitterness.' },
    extraDark:   { grind: 'Medium',        temp: '195°F',      time: '3 min',    ratio: '1:13',  note: 'Quick bloom, rapid pour — lets the roast speak without harshness.' },
  },
  espresso: {
    name: 'Espresso',
    icon: '💧',
    light:       { grind: 'Fine',          temp: '205°F',      time: '28–35s',   ratio: '1:2.5', note: 'Light roasts pull long — aim for a longer ratio and higher temp.' },
    mediumLight: { grind: 'Fine',          temp: '203°F',      time: '27–32s',   ratio: '1:2.5', note: 'A naturally sweet, juicy shot with low bitterness.' },
    medium:      { grind: 'Fine',          temp: '200°F',      time: '25–30s',   ratio: '1:2',   note: 'Balanced and classic. Great for milk drinks too.' },
    mediumDark:  { grind: 'Fine',          temp: '198°F',      time: '25–30s',   ratio: '1:2',   note: 'Dark crema and rich body — made for a straight double shot.' },
    dark:        { grind: 'Fine',          temp: '195°F',      time: '22–28s',   ratio: '1:1.5', note: 'Traditional Italian-style pull. Short and bold.' },
    extraDark:   { grind: 'Fine',          temp: '192°F',      time: '20–25s',   ratio: '1:1.5', note: 'Ristretto territory — intense, syrupy, and memorable.' },
  },
  coldBrew: {
    name: 'Cold Brew',
    icon: '🧊',
    light:       { grind: 'Extra Coarse',  temp: 'Cold / Room Temp', time: '20–24 hrs', ratio: '1:7',  note: 'Light roasts can handle a longer steep for a crisp, fruity result.' },
    mediumLight: { grind: 'Extra Coarse',  temp: 'Cold',       time: '18–20 hrs', ratio: '1:7',  note: 'Naturally bright and sweet with zero bitterness.' },
    medium:      { grind: 'Extra Coarse',  temp: 'Cold',       time: '16–18 hrs', ratio: '1:8',  note: 'The ideal cold brew roast — smooth, clean, refreshing.' },
    mediumDark:  { grind: 'Extra Coarse',  temp: 'Cold',       time: '16 hrs',    ratio: '1:8',  note: 'Rich chocolate notes translate beautifully in cold brew.' },
    dark:        { grind: 'Coarse',        temp: 'Cold',       time: '14–16 hrs', ratio: '1:8',  note: 'Bold concentrate — dilute to taste over ice.' },
    extraDark:   { grind: 'Coarse',        temp: 'Cold',       time: '12–14 hrs', ratio: '1:8',  note: 'Powerful and smoky. Excellent as a milk concentrate.' },
  },
};

const ROAST_KEY_MAP = {
  'light': 'light',
  'medium-light': 'mediumLight',
  'medium': 'medium',
  'medium-dark': 'mediumDark',
  'dark': 'dark',
  'extra dark': 'extraDark',
};

function getRoastKey(roast = '') {
  const r = roast.toLowerCase();
  for (const [key, val] of Object.entries(ROAST_KEY_MAP)) {
    if (r.includes(key)) return val;
  }
  return 'medium';
}

const METHODS = ['drip', 'frenchPress', 'pourOver', 'espresso', 'coldBrew'];

export default function BrewGuide({ roast, accent = '#E6AC45' }) {
  const [open, setOpen] = useState(false);
  const [activeMethod, setActiveMethod] = useState('drip');

  const roastKey = getRoastKey(roast);
  const profile = BREW_PROFILES[activeMethod][roastKey];
  const method = BREW_PROFILES[activeMethod];

  return (
    <div style={{ borderTop: '1px solid rgba(196,163,90,0.12)', borderBottom: '1px solid rgba(196,163,90,0.12)' }}>
      {/* Toggle Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 px-0 group"
      >
        <div className="flex items-center gap-3">
          <Coffee className="w-4 h-4" style={{ color: accent }} />
          <span className="font-mono text-[11px] tracking-[0.35em] uppercase font-bold" style={{ color: '#F7F2E9' }}>
            Brew Guide
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-2 py-0.5"
            style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: `${accent}90` }}>
            {roast || 'Medium Roast'}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" style={{ color: `${accent}60` }} />
        </motion.div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-7">
              {/* Method tabs */}
              <div className="flex gap-2 flex-wrap mb-7">
                {METHODS.map(m => (
                  <button
                    key={m}
                    onClick={() => setActiveMethod(m)}
                    className="flex items-center gap-1.5 px-3 py-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-all"
                    style={{
                      background: activeMethod === m ? `${accent}18` : 'transparent',
                      border: activeMethod === m ? `1px solid ${accent}50` : '1px solid rgba(196,163,90,0.1)',
                      color: activeMethod === m ? accent : 'rgba(240,235,225,0.4)',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem' }}>{BREW_PROFILES[m].icon}</span>
                    {BREW_PROFILES[m].name}
                  </button>
                ))}
              </div>

              {/* Stats grid */}
              <motion.div
                key={activeMethod}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5"
              >
                {[
                  { Icon: Coffee,      label: 'Grind Size',   value: profile.grind },
                  { Icon: Thermometer, label: 'Water Temp',   value: profile.temp },
                  { Icon: Timer,       label: 'Brew Time',    value: profile.time },
                  { Icon: null,        label: 'Coffee Ratio', value: profile.ratio },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5 p-4"
                    style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.08)' }}>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${accent}55` }}>{label}</p>
                    <p className="font-mono font-bold text-sm leading-tight" style={{ color: '#F7F2E9' }}>{value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Pro tip */}
              <p className="font-heading text-sm leading-relaxed"
                style={{ color: 'rgba(240,235,225,0.5)', borderLeft: `2px solid ${accent}30`, paddingLeft: '1rem', fontStyle: 'italic', fontWeight: 300 }}>
                {profile.note}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}