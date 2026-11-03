import React, { useState } from 'react';
import { Coffee, Snowflake, Thermometer, Droplets, Sparkles } from 'lucide-react';

/**
 * BrewingGuide — step-by-step preparation guide for Torch Republic instant coffee.
 *
 * Shows two methods (Hot and Iced) with numbered steps, icons, and pro tips.
 * Uses the ritual accent color passed from the product page so Classic and
 * Mushroom variants each carry their own brand tone.
 */
const METHODS = {
  hot: {
    label: 'Hot',
    icon: Thermometer,
    steps: [
      {
        title: 'Boil your water',
        body: 'Heat 8–12 oz of filtered water to just off a boil (about 200°F). Let it rest 20 seconds after boiling for the ideal temperature.',
      },
      {
        title: 'Add one serving',
        body: 'Scoop one serving of instant coffee into your favorite mug. Each pouch holds 27 servings — one level scoop per cup.',
      },
      {
        title: 'Pour and stir',
        body: 'Pour the hot water over the coffee and stir briskly for 10–15 seconds until fully dissolved. No grounds, no sediment.',
      },
      {
        title: 'Make it yours',
        body: 'Drink it black for full origin character, or add milk, creamer, or a touch of honey. For a richer cup, substitute some water with warm milk.',
      },
    ],
    tip: 'For the smoothest flavor, stir immediately after pouring. The faster the coffee dissolves, the more even the extraction.',
  },
  iced: {
    label: 'Iced',
    icon: Snowflake,
    steps: [
      {
        title: 'Start with less water',
        body: 'Heat 2–3 oz of hot water — just enough to dissolve the coffee concentrate. Less water here means less dilution once you pour over ice.',
      },
      {
        title: 'Dissolve fully',
        body: 'Add one serving of instant coffee to the hot water and stir until completely dissolved. This is your concentrate — it should look smooth, not gritty.',
      },
      {
        title: 'Build the glass',
        body: 'Fill a tall glass with ice. Pour the coffee concentrate over the ice slowly so it chills evenly without splashing.',
      },
      {
        title: 'Top and stir',
        body: 'Add 6–8 oz of cold water, milk, or creamer. Stir gently from the bottom up. For a cold-cream latte, use cold milk instead of water.',
      },
    ],
    tip: 'Dissolving in hot water first prevents the grainy texture that happens when instant coffee hits cold liquid directly.',
  },
};

const STEP_ICONS = [Thermometer, Coffee, Droplets, Sparkles];

export default function BrewingGuide({ accent, deep, productName }) {
  const [method, setMethod] = useState('hot');
  const active = METHODS[method];

  return (
    <section className="mx-auto max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: deep }}>
          Brewing Guide
        </p>
        <h2 className="mt-3 font-serif font-bold" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', lineHeight: 1.15 }}>
          How to brew {productName}
        </h2>
        <p className="mx-auto mt-3 max-w-[520px] font-heading text-sm" style={{ lineHeight: 1.7, opacity: 0.75 }}>
          No machine, no grinder, no pods. Just instant coffee, water, and a few seconds of your morning. Here is how to get the best cup.
        </p>
      </div>

      {/* Method toggle */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full p-1" style={{ background: 'rgba(228,216,201,0.45)' }}>
          {Object.entries(METHODS).map(([key, m]) => {
            const isActive = method === key;
            const Icon = m.icon;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMethod(key)}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all"
                style={{
                  background: isActive ? accent : 'transparent',
                  color: isActive ? '#FFFCF7' : deep,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
                aria-pressed={isActive}
              >
                <Icon size={14} style={{ strokeWidth: 1.75 }} />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
        {active.steps.map((step, i) => {
          const Icon = STEP_ICONS[i] || Coffee;
          return (
            <div
              key={`${method}-${i}`}
              className="flex gap-4 rounded-xl p-5"
              style={{
                background: '#FFFCF7',
                border: '1px solid #B89A6D',
                boxShadow: '0 1px 2px rgba(45,40,36,0.03)',
              }}
            >
              {/* Step number + icon */}
              <div className="flex flex-shrink-0 flex-col items-center gap-2">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: `${accent}18`, color: deep }}
                >
                  <Icon size={18} style={{ strokeWidth: 1.75 }} />
                </div>
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.18em]"
                  style={{ color: deep, fontWeight: 600 }}
                >
                  Step {i + 1}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="mb-1 font-heading text-sm font-bold" style={{ color: '#32190F' }}>
                  {step.title}
                </h3>
                <p className="font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.65 }}>
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro tip */}
      <div
        className="mt-6 flex items-start gap-3 rounded-xl p-4"
        style={{ background: `${accent}0D`, border: `1px solid ${accent}30` }}
      >
        <Sparkles size={18} style={{ color: deep, flexShrink: 0, marginTop: 1, strokeWidth: 1.75 }} />
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: deep, fontWeight: 600 }}>
            Pro Tip
          </span>
          <p className="mt-0.5 font-heading text-sm" style={{ color: '#32190F', lineHeight: 1.65 }}>
            {active.tip}
          </p>
        </div>
      </div>
    </section>
  );
}