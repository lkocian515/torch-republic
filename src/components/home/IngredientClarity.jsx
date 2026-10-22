import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const RG = '#E6B7AD';

const INGREDIENT_DETAILS = [
  {
    category: "Mushroom Coffee Blends",
    accent: '#10B981',
    items: [
      { label: "Mushroom Species", value: "Lion's Mane (Hericium erinaceus), Cordyceps (Cordyceps militaris), Reishi (Ganoderma lucidum)" },
      { label: "Caffeine Level", value: "Approx. 50–80mg per serving (half to full cup)" },
      { label: "Servings Per Tube", value: "27 servings (1.9 oz / 54g)" },
      { label: "How to Prepare", value: "Add 1 scoop to 8–12 oz hot water or milk. Stir 10–15 seconds. Ready." },
      { label: "Best For", value: "Morning focus, afternoon clarity, calm sustained energy" },
      { label: "Ingredients", value: "Instant coffee, Lion's Mane extract, Cordyceps extract, Reishi extract. No fillers, no sweeteners, no artificial flavors." },
    ],
  },
  {
    category: "Classic Instant Coffee Blends",
    accent: '#C4A35A',
    items: [
      { label: "Contains Mushrooms?", value: "No. Classic blends are premium instant coffee only." },
      { label: "Caffeine Level", value: "Approx. 80–100mg per serving" },
      { label: "Servings Per Tube", value: "27 servings" },
      { label: "Roast Options", value: "Light, Medium, and Dark roasts available" },
      { label: "How to Prepare", value: "Add 1 scoop to 8–12 oz hot water. Stir and enjoy." },
      { label: "Best For", value: "Rich flavor, smooth energy, everyday convenience" },
    ],
  },
  {
    category: "Ceremonial Matcha Blends",
    accent: '#6EE7B7',
    items: [
      { label: "Matcha Type", value: "Ceremonial-grade matcha powder, instant blend" },
      { label: "Caffeine Level", value: "Approx. 25–40mg per serving (lower than coffee, longer lasting)" },
      { label: "Servings Per Tube", value: "25 servings" },
      { label: "Contains Coffee?", value: "No. Matcha blends are coffee-free." },
      { label: "How to Prepare", value: "Add 1 scoop to 6–8 oz hot water or oat milk. Stir or froth." },
      { label: "Best For", value: "Calm focus, mindful afternoon reset, gentle energy without jitters" },
    ],
  },
];

function IngredientBlock({ data, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ border: '1px solid rgba(230,183,173,0.1)', background: '#111' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left transition-opacity hover:opacity-80"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: data.accent }} />
          <span className="font-serif font-bold text-white" style={{ fontSize: '1.05rem' }}>
            {data.category}
          </span>
        </div>
        <span style={{ color: RG }}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      {open && (
        <div className="overflow-hidden">
          <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.items.map((item) => (
              <div key={item.label} className="p-4" style={{ background: '#0C0C0C', border: `1px solid ${data.accent}15` }}>
                <p className="font-mono text-[7.5px] tracking-[0.22em] uppercase mb-1.5" style={{ color: data.accent }}>
                  {item.label}
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.65 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function IngredientClarity() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#0A0807' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[860px] mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[8px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Ingredient Transparency
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Clear Ingredients. Clear Purpose.
          </h2>
          <p className="font-heading mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.85, maxWidth: '540px' }}>
            Every blend should make sense before it becomes part of your daily routine.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {INGREDIENT_DETAILS.map((data, i) => (
            <IngredientBlock key={data.category} data={data} defaultOpen={i === 0} />
          ))}
        </div>

        {/* Wellness disclaimer */}
        <p className="font-mono text-[7.5px] tracking-[0.15em] text-center mt-8" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. These products are not intended to diagnose, treat, cure, or prevent any disease. Crafted to support your daily wellness ritual — not to replace medical advice.
        </p>
      </div>
    </section>
  );
}