/**
 * Everyday Dose vs. Torch Republic
 * Route: /compare/everyday-dose-vs-torch-republic
 */
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import ComparisonDetailPage from '@/components/compare/ComparisonDetailPage';

const OTHER_COMPARISONS = [
  { slug: 'ryze-vs-torch-republic', label: 'vs. Ryze' },
  { slug: 'four-sigmatic-vs-torch-republic', label: 'vs. Four Sigmatic' },
  { slug: 'mudwtr-vs-torch-republic', label: 'vs. MUD/WTR' },
  { slug: 'mushroom-coffee-vs-regular-coffee-comparison', label: 'vs. Regular Coffee' },
];

const DATA = {
  competitor: 'Everyday Dose',
  title: 'Everyday Dose vs. Torch Republic: The Collagen Latte vs. The Coffee Ritual (2025)',
  intro: "Everyday Dose is a mushroom coffee brand that differentiates itself with added collagen peptides and L-theanine in a latte-style format. It's positioned for people who want a multi-benefit wellness drink — mushrooms, protein, and calm focus all in one. Torch Republic offers a purer formula focused on premium coffee and targeted mushroom blends. This comparison covers ingredients, taste, price, and who each product is built for.",

  tableRows: [
    { label: 'Coffee base', tr: '100% Arabica freeze-dried', them: 'Mushroom extract + coffee base', trWins: false },
    { label: 'Caffeine per serving', tr: '~60–80mg', them: '~50–60mg', trWins: true },
    { label: 'Added collagen', tr: 'No', them: 'Yes — collagen peptides', trWins: false },
    { label: 'Added L-theanine', tr: 'Naturally from matcha blends', them: 'Added L-theanine supplement', trWins: false },
    { label: 'Key mushrooms', tr: "Lion's Mane, Chaga, Cordyceps, Reishi", them: "Lion's Mane, Chaga", trWins: true },
    { label: 'Price per serving', tr: '~$0.85', them: '~$2.00–2.50', trWins: true },
    { label: 'Servings per package', tr: '27 per pouch', them: '30 per bag', trWins: false },
    { label: 'Blend variety', tr: '12 blends', them: '1–2 SKUs', trWins: true },
    { label: 'Matcha option', tr: 'Yes — 3 blends', them: 'No', trWins: true },
    { label: 'Classic coffee', tr: 'Yes — 3 blends', them: 'No', trWins: true },
    { label: 'Subscription discount', tr: '20% off', them: '~10–15% off', trWins: true },
    { label: 'Dietary profile', tr: 'Clean, no additives', them: 'Collagen (not vegan)', trWins: false },
  ],

  ourEdge: [
    "Significantly lower price per serving ($0.85 vs $2.00–2.50)",
    "Pure formula — no added collagen, gums, or fillers",
    "12 blends for ritual customization vs. 1–2 SKUs",
    "Higher caffeine for a coffee-level experience",
    "Vegan-friendly (no collagen from animal sources)",
    "More mushroom variety per blend (up to 4 vs. 2)",
    "Includes matcha and classic coffee options",
    "20% subscription discount",
  ],
  theirEdge: [
    "Added collagen peptides for hair, skin, nails support",
    "Pre-added L-theanine for calm focus without needing matcha",
    "Creamier, latte-like texture",
    "Smaller, more focused lineup — simpler decision",
    "Popular influencer/wellness community presence",
  ],

  bodySection: [
    {
      heading: "The Collagen Difference: Feature or Filler?",
      body: "Everyday Dose's most distinctive feature is collagen peptides added to each serving. Collagen research does show some support for skin elasticity and joint health with consistent daily use — this is a real and distinct functional benefit that Torch Republic's formula doesn't provide.\n\nThe trade-off: collagen is derived from animal sources (typically bovine), making Everyday Dose not vegan-friendly. It also adds cost — collagen peptides are expensive to include in a formulation, which partially explains the higher price per serving. And for users who want control over their protein/collagen intake from other sources, a pre-mixed formula may be redundant.\n\nTorch Republic's formula doesn't include collagen. If collagen is important to your wellness routine, you can add a separate collagen supplement to your Torch Republic coffee and still come out ahead on cost."
    },
    {
      heading: "L-Theanine: Supplement vs. Natural Source",
      body: "Everyday Dose adds supplemental L-theanine to its formula. Torch Republic's matcha blends contain L-theanine naturally from ceremonial grade tea leaves — typically at higher concentrations than supplemental additions. For the coffee blends, L-theanine is not present.\n\nIf L-theanine in your morning coffee is important, Torch Republic's matcha blends (The Monk, The Ascendant, The Alchemist) deliver it in its most bioavailable natural form — whole-leaf matcha with 5x more L-theanine than regular green tea. Alternatively, taking an L-theanine supplement separately alongside Torch Republic coffee gives you the same compound at lower total cost."
    },
    {
      heading: "Taste and Texture",
      body: "Everyday Dose's formula is designed to blend smoothly into milk or water, with collagen creating a slightly silkier texture. Reviewers consistently describe it as 'smooth' and 'creamy' compared to plain mushroom coffee.\n\nTorch Republic is purely coffee and mushroom extract — no texture modifiers. It's meant to taste like coffee: clean, straightforward, with earthy depth from the mushrooms. In water alone, it's a clear, coffee-forward drink. In milk, it behaves like any premium instant coffee.\n\nFor people who want a creamy wellness latte format, Everyday Dose's formula is designed for that experience. For people who want to know exactly what they're drinking in a simple, identifiable formula, Torch Republic is more transparent."
    },
    {
      heading: "Price: The Clearest Differentiator",
      body: "Everyday Dose typically prices at approximately $2.00–$2.50 per serving. Torch Republic is approximately $0.85/serving, or $0.68 on subscription. For a daily ritual, this represents a $473–$665 annual difference vs. Torch Republic's $248/year subscription cost.\n\nSome of Everyday Dose's premium reflects real ingredient costs (collagen peptides, L-theanine supplement). But for users who don't specifically need collagen in their coffee, that premium is hard to justify given the blend variety and ritual tools Torch Republic provides at less than half the price."
    },
  ],

  verdict: "If your priority is a multi-benefit wellness latte that includes collagen peptides and L-theanine in a single convenient serving — and you're comfortable with the $2.00+ price point — Everyday Dose is a well-formulated product. If you want premium coffee with functional mushrooms, significantly lower daily cost ($0.85 vs $2.00+), broader blend variety, and a clean vegan-friendly formula, Torch Republic delivers substantially more value. For most daily ritual users, Torch Republic is the stronger choice.",

  products: [
    { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-instant-mushroom-coffee' },
    { name: 'The Monk Matcha (L-Theanine)', path: '/products/the-monk-matcha-blend' },
    { name: 'Build Your Ritual Bundle', path: '/build-your-ritual' },
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
  ],

  faqs: [
    { question: "Does Everyday Dose have more ingredients than Torch Republic?", answer: "Yes. Everyday Dose includes collagen peptides, L-theanine, Lion's Mane, Chaga, and a coffee base. Torch Republic uses 100% Arabica coffee plus up to 4 mushroom extracts per blend, with no added protein or amino acid supplements. Which formula is 'better' depends on whether you specifically want collagen in your coffee." },
    { question: "Is Everyday Dose vegan?", answer: "No. Everyday Dose contains collagen peptides derived from bovine (animal) sources, making it not vegan-friendly. Torch Republic's formulas are vegan — pure Arabica coffee and plant-based mushroom extracts with no animal-derived ingredients." },
    { question: "How does Everyday Dose compare in price to Torch Republic?", answer: "Everyday Dose costs approximately $2.00–$2.50 per serving. Torch Republic costs approximately $0.85/serving ($0.68 with 20% subscription discount). Over a year of daily use, Torch Republic saves approximately $473–$665 compared to Everyday Dose." },
    { question: "Does Torch Republic have L-theanine like Everyday Dose?", answer: "Torch Republic's matcha blends (The Monk, The Ascendant, The Alchemist) contain high natural L-theanine from ceremonial grade tea leaves — typically more L-theanine than supplemental additions. Torch Republic's coffee-only blends do not contain L-theanine. If you want L-theanine in your morning coffee, Torch Republic's matcha blends or a separate L-theanine supplement are the options." },
  ],

  relatedComparisons: OTHER_COMPARISONS,
};

export default function EverydayDoseVsTorchRepublic() {
  useSEO({
    title: 'Everyday Dose vs. Torch Republic Mushroom Coffee: Full Comparison (2025)',
    description: "Everyday Dose vs. Torch Republic — collagen peptides, L-theanine, price per serving ($2.00 vs $0.85), blend variety, and who each brand is built for.",
    url: '/compare/everyday-dose-vs-torch-republic',
    type: 'article',
    faq: DATA.faqs.map(f => ({ question: f.question, answer: f.answer })),
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }, { name: 'Everyday Dose vs. Torch Republic', url: '/compare/everyday-dose-vs-torch-republic' }],
  });
  return <ComparisonDetailPage data={DATA} />;
}