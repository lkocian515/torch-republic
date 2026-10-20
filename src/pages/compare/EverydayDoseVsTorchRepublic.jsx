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
    { label: 'Caffeine per serving', tr: 'Medium to high — mg not published', them: '~50–60mg', trWins: true },
    { label: 'Added collagen', tr: 'No', them: 'Yes — collagen peptides', trWins: false },
    { label: 'Added L-theanine', tr: 'No', them: 'Added L-theanine supplement', trWins: false },
    { label: 'Key mushrooms', tr: "Lion's Mane, Chaga", them: "Lion's Mane, Chaga", trWins: false },
    { label: 'Price per serving', tr: '~$0.85–0.96', them: '~$2.00–2.50', trWins: true },
    { label: 'Servings per package', tr: '27 per pouch', them: '30 per bag', trWins: false },
    { label: 'Lineup', tr: '2 instant coffees + seasonal releases', them: '1–2 SKUs', trWins: false },
    { label: 'Matcha option', tr: 'No', them: 'No', trWins: false },
    { label: 'Classic coffee', tr: 'Yes — Instant Classic', them: 'No', trWins: true },
    { label: 'Subscription discount', tr: '10% off', them: '~10–15% off', trWins: false },
    { label: 'Dietary profile', tr: 'Clean, no additives', them: 'Collagen (not vegan)', trWins: false },
  ],

  ourEdge: [
    "Lower price per serving ($0.85–0.96 vs $2.00–2.50)",
    "Pure formula — no added collagen, gums, or fillers",
    "Instant — no machine, no pods, hot or iced",
    "Vegan-friendly (no collagen from animal sources)",
    "10% Subscribe & Save option on every order",
  ],
  theirEdge: [
    "Added collagen peptides for hair, skin, nails support",
    "Pre-added L-theanine for calm focus in the same scoop",
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
      body: "Everyday Dose adds supplemental L-theanine to its formula for a calmer, steadier lift. Torch Republic's coffees do not contain added L-theanine — the formula is premium instant coffee plus Lion's Mane and Chaga extract, and nothing else.\n\nIf L-theanine matters to you, the straightforward route is a separate L-theanine supplement taken alongside your coffee. That keeps the coffee formula simple and lets you control the dose independently of your cup."
    },
    {
      heading: "Taste and Texture",
      body: "Everyday Dose's formula is designed to blend smoothly into milk or water, with collagen creating a slightly silkier texture. Reviewers consistently describe it as 'smooth' and 'creamy' compared to plain mushroom coffee.\n\nTorch Republic is purely coffee and mushroom extract — no texture modifiers. It's meant to taste like coffee: clean, straightforward, with earthy depth from the mushrooms. In water alone, it's a clear, coffee-forward drink. In milk, it behaves like any premium instant coffee.\n\nFor people who want a creamy wellness latte format, Everyday Dose's formula is designed for that experience. For people who want to know exactly what they're drinking in a simple, identifiable formula, Torch Republic is more transparent."
    },
    {
      heading: "Price: The Clearest Differentiator",
      body: "Everyday Dose typically prices at approximately $2.00–$2.50 per serving. Torch Republic is approximately $0.85 per serving for Instant Classic and $0.96 for Instant Mushroom, or $0.77 and $0.87 respectively on a 10% subscription.\n\nSome of Everyday Dose's premium reflects real ingredient costs (collagen peptides, an added L-theanine supplement). But for users who don't specifically need collagen in their coffee, that premium is hard to justify at more than double the cost per cup."
    },
  ],

  verdict: "If your priority is a multi-benefit wellness latte that includes collagen peptides and L-theanine in a single convenient serving — and you're comfortable with the $2.00+ price point — Everyday Dose is a well-formulated product. If you want premium instant coffee with functional mushrooms, a lower cost per cup ($0.85–0.96 vs $2.00+), and a clean vegan-friendly formula with nothing added, Torch Republic is the stronger choice.",

  products: [
    { name: 'Instant Mushroom Coffee', path: '/products/instant-mushroom-coffee' },
    { name: 'Instant Classic Coffee', path: '/products/instant-classic-coffee' },
    { name: 'Torch Republic Coffee Duo', path: '/products/torch-republic-coffee-duo' },
    { name: 'Shop All Coffee', path: '/shop' },
  ],

  faqs: [
    { question: "Does Everyday Dose have more ingredients than Torch Republic?", answer: "Yes. Everyday Dose includes collagen peptides, L-theanine, Lion's Mane, Chaga, and a coffee base. Torch Republic uses 100% Arabica coffee plus up to 4 mushroom extracts per blend, with no added protein or amino acid supplements. Which formula is 'better' depends on whether you specifically want collagen in your coffee." },
    { question: "Is Everyday Dose vegan?", answer: "No. Everyday Dose contains collagen peptides derived from bovine (animal) sources, making it not vegan-friendly. Torch Republic's formulas are vegan — pure Arabica coffee and plant-based mushroom extracts with no animal-derived ingredients." },
    { question: "How does Everyday Dose compare in price to Torch Republic?", answer: "Everyday Dose costs approximately $2.00–$2.50 per serving. Torch Republic costs approximately $0.85 per serving for Instant Classic and $0.96 for Instant Mushroom, or $0.77 and $0.87 on a 10% subscription." },
    { question: "Does Torch Republic have L-theanine like Everyday Dose?", answer: "No. Torch Republic's coffees are premium instant coffee plus Lion's Mane and Chaga extract, with no added L-theanine. If you want L-theanine with your coffee, a separate L-theanine supplement is the straightforward option." },
  ],

  relatedComparisons: OTHER_COMPARISONS,
};

export default function EverydayDoseVsTorchRepublic() {
  useSEO({
    title: 'Everyday Dose vs. Torch Republic Mushroom Coffee: Full Comparison (2025)',
    description: "Everyday Dose vs. Torch Republic — collagen peptides, added L-theanine, price per serving ($2.00+ vs $0.85–0.96), and who each brand is built for.",
    url: '/compare/everyday-dose-vs-torch-republic',
    type: 'article',
    faq: DATA.faqs.map(f => ({ question: f.question, answer: f.answer })),
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }, { name: 'Everyday Dose vs. Torch Republic', url: '/compare/everyday-dose-vs-torch-republic' }],
  });
  return <ComparisonDetailPage data={DATA} />;
}