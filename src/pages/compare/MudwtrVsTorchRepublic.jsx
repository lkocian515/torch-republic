/**
 * MUD/WTR vs. Torch Republic
 * Route: /compare/mudwtr-vs-torch-republic
 */
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import ComparisonDetailPage from '@/components/compare/ComparisonDetailPage';

const OTHER_COMPARISONS = [
  { slug: 'ryze-vs-torch-republic', label: 'vs. Ryze' },
  { slug: 'four-sigmatic-vs-torch-republic', label: 'vs. Four Sigmatic' },
  { slug: 'everyday-dose-vs-torch-republic', label: 'vs. Everyday Dose' },
  { slug: 'mushroom-coffee-vs-regular-coffee-comparison', label: 'vs. Regular Coffee' },
];

const DATA = {
  competitor: 'MUD/WTR',
  title: 'MUD/WTR vs. Torch Republic: Coffee Replacement vs. Coffee Ritual (2025)',
  intro: "MUD/WTR (pronounced 'mud water') is a coffee alternative — it does not contain coffee. It's a blend of Masala Chai, adaptogenic mushrooms, and spices designed to replace your morning coffee with something that has roughly 1/7th the caffeine. Torch Republic is a premium instant coffee brand with functional mushrooms added. This comparison is fundamentally about a different philosophy: replace coffee entirely (MUD/WTR) vs. upgrade your existing coffee ritual (Torch Republic).",

  tableRows: [
    { label: 'Contains coffee', tr: 'Yes — 100% Arabica', them: 'No — coffee replacement', trWins: false },
    { label: 'Caffeine per serving', tr: '~60–80mg', them: '~35mg (from black tea/Chai)', trWins: true },
    { label: 'Flavor profile', tr: 'Coffee with earthy mushroom notes', them: 'Spiced chai / earthy / no coffee taste', trWins: false },
    { label: 'Mushroom varieties', tr: "Lion's Mane, Chaga, Cordyceps, Reishi", them: "Lion's Mane, Chaga, Cordyceps, Reishi, Turkey Tail", trWins: false },
    { label: 'Added spices', tr: 'None', them: 'Turmeric, ginger, cinnamon, cardamom, black pepper', trWins: false },
    { label: 'Price per serving', tr: '~$0.85', them: '~$1.50–2.00', trWins: true },
    { label: 'Servings per package', tr: '27 per pouch', them: '30 per bag', trWins: false },
    { label: 'Blend variety', tr: '12 blends', them: '2–3 SKUs', trWins: true },
    { label: 'Matcha option', tr: 'Yes', them: 'No', trWins: true },
    { label: 'Classic coffee option', tr: 'Yes', them: 'No', trWins: true },
    { label: 'For coffee drinkers', tr: 'Yes — coffee-forward', them: 'No — designed to replace coffee', trWins: true },
    { label: 'Subscription discount', tr: '20% off', them: '~15% off', trWins: true },
  ],

  ourEdge: [
    "Contains real coffee — for people who want coffee, not a substitute",
    "Higher, more familiar caffeine level (~70mg vs ~35mg)",
    "Lower price per serving (~$0.85 vs $1.50–2.00)",
    "12 blends including classic coffee and matcha options",
    "Coffee-forward taste — transitions easily from regular coffee",
    "20% subscription discount",
    "Bundle builder for multi-blend rituals",
  ],
  theirEdge: [
    "Coffee-free — for people who want to reduce or eliminate coffee",
    "5 mushroom varieties (adds Turkey Tail)",
    "Added adaptogenic spices (turmeric, ginger) with their own benefits",
    "Strong brand community and cult following",
    "Designed specifically for caffeine reduction without cold-turkey withdrawal",
    "USDA Organic certified",
  ],

  bodySection: [
    {
      heading: "The Fundamental Difference: Replace vs. Upgrade",
      body: "MUD/WTR was explicitly designed to help people quit or reduce coffee. Founder Shane Heath built it after his own journey reducing coffee dependency, and the product is marketed as a morning coffee alternative rather than a mushroom coffee. It contains black tea and Masala Chai as its caffeine source — approximately 35mg per serving, roughly half of a typical cup of coffee.\n\nThis is a genuinely different use case. If you want to reduce caffeine, eliminate coffee's acidity, or shift away from a coffee habit entirely, MUD/WTR is purpose-built for that goal. It tastes like spiced chai, not coffee.\n\nTorch Republic is for people who love coffee and want to make their existing coffee ritual more functional. If giving up coffee flavor is not what you want, MUD/WTR is not the right product for you — regardless of how good the mushroom extracts are."
    },
    {
      heading: "Taste: Completely Different Experiences",
      body: "This is not a competition — they taste entirely different. MUD/WTR has an earthy, spiced chai flavor from its Masala Chai base, black pepper, cinnamon, and turmeric. It requires frothy oat milk or a milk frother to create a creamy morning drink. The taste is distinctive and some people love it; others expected something more coffee-like and were disappointed.\n\nTorch Republic tastes like premium instant coffee. The mushroom extracts add subtle earthiness that most people describe as 'a slightly richer, earthier coffee' — not a fundamentally different drink. For coffee drinkers, this is a seamless transition that doesn't require rewiring your morning expectations.\n\nIf you've been drinking coffee for 10 years and are considering mushroom coffee, the question to ask is: do I want to continue drinking coffee with functional benefits added (Torch Republic), or do I want to switch my entire morning ritual to something that doesn't taste like coffee (MUD/WTR)?"
    },
    {
      heading: "Ingredients Deep Dive",
      body: "MUD/WTR's formula is more complex: Masala Chai, Lion's Mane, Chaga, Cordyceps, Reishi, Turkey Tail mushrooms, turmeric, ginger, cinnamon, cardamom, black pepper, and cacao. This is essentially a full adaptogen spice blend with mushrooms — a holistic morning wellness product.\n\nTorch Republic's formula is more focused: 100% Arabica freeze-dried coffee plus dual-extracted mushroom concentrates (Lion's Mane, Chaga, and varying functional mushrooms per blend). No added spices, no additives, no sweeteners. The simplicity is intentional — fewer variables, more predictable daily experience, and lower cost.\n\nNeither formula is better — they reflect different philosophies. If you want maximum ingredient complexity and a full adaptogen stack, MUD/WTR delivers that. If you want clean, identifiable ingredients in a coffee-forward format, Torch Republic is the more transparent choice."
    },
    {
      heading: "Price and Value Comparison",
      body: "MUD/WTR's standard pricing is approximately $1.50–$2.00 per serving depending on the product and how you account for the frothy milk it requires for optimal preparation. Torch Republic is approximately $0.85 per serving dry, with no required additives.\n\nTorch Republic's subscription brings cost to approximately $0.68/serving. MUD/WTR's subscription is approximately $1.25/serving. For a daily ritual, this is a significant difference — approximately $210 per year at those rates.\n\nImportant context: MUD/WTR is a USDA Organic certified product with a curated brand experience. The premium reflects those certifications and brand positioning. Whether the premium is worth it depends on how important organic certification and the coffee-replacement ritual are to you."
    },
  ],

  verdict: "MUD/WTR and Torch Republic are not direct competitors — they serve different ritual needs. If you want to reduce or eliminate coffee from your morning, MUD/WTR is purpose-designed for that goal. If you want to continue drinking coffee with functional mushroom benefits at lower cost and more blend variety, Torch Republic is clearly the better choice. For people who love coffee, Torch Republic wins. For people who want out of the coffee habit, MUD/WTR is worth trying.",

  products: [
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-instant-mushroom-coffee' },
    { name: 'Take the Blend Quiz', path: '/quiz' },
    { name: 'Shop All Blends', path: '/shop' },
  ],

  faqs: [
    { question: "Is MUD/WTR the same as mushroom coffee?", answer: "No. MUD/WTR is a coffee replacement that contains no coffee — its caffeine comes from black tea in a Masala Chai blend. Mushroom coffee (like Torch Republic) is actual coffee with functional mushroom extracts added. MUD/WTR is designed for people who want to stop drinking coffee; mushroom coffee is designed for people who want to upgrade their existing coffee ritual." },
    { question: "Does MUD/WTR taste like coffee?", answer: "No. MUD/WTR tastes like spiced chai — earthy, slightly sweet, with notes of cinnamon, cardamom, and black pepper. It requires frothed milk for the best experience. If you expect a coffee-like taste, you will be surprised. Torch Republic's mushroom coffee tastes like coffee with subtle earthy depth." },
    { question: "How much caffeine does MUD/WTR have vs. Torch Republic?", answer: "MUD/WTR contains approximately 35mg of caffeine per serving from its black tea/Chai base. Torch Republic mushroom coffee contains approximately 60–80mg per serving from its 100% Arabica coffee base. If caffeine reduction is your goal, MUD/WTR is lower. If you want a coffee-level caffeine experience with functional mushrooms, Torch Republic is the right choice." },
    { question: "Is Torch Republic cheaper than MUD/WTR?", answer: "Yes. Torch Republic is approximately $0.85/serving ($0.68 on subscription). MUD/WTR is approximately $1.50–2.00/serving. On subscription, Torch Republic saves approximately $210/year for a daily ritual habit." },
  ],

  relatedComparisons: OTHER_COMPARISONS,
};

export default function MudwtrVsTorchRepublic() {
  useSEO({
    title: 'MUD/WTR vs. Torch Republic: Coffee Alternative vs. Mushroom Coffee (2025)',
    description: "MUD/WTR vs. Torch Republic — the fundamental difference is whether you want to replace coffee or upgrade it. Full comparison of ingredients, caffeine, taste, price, and who each brand is for.",
    url: '/compare/mudwtr-vs-torch-republic',
    type: 'article',
    faq: DATA.faqs.map(f => ({ question: f.question, answer: f.answer })),
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }, { name: 'MUD/WTR vs. Torch Republic', url: '/compare/mudwtr-vs-torch-republic' }],
  });
  return <ComparisonDetailPage data={DATA} />;
}