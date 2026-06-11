import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FlaskConical, ChevronDown, Award, BookOpen } from 'lucide-react';

const RG = '#E6B7AD';
const GREEN = '#10B981';

// ─── Research Data ────────────────────────────────────────────────────────────

const RESEARCH = {
  'mushroom-coffee': {
    headline: "Peer-Reviewed Research on Lion's Mane & Chaga",
    summary: "We built our mushroom blends around two of the most clinically studied functional mushrooms on the planet — not trend ingredients, not proprietary blends. Here's the science.",
    credibilityStats: [
      { value: '16 wks', label: "Cognitive improvement timeline (Lion's Mane RCT)" },
      { value: '1,000+', label: 'Published studies on medicinal mushroom beta-glucans' },
      { value: '3x', label: 'Higher antioxidant activity vs. acai (Chaga ORAC)' },
    ],
    ingredients: [
      {
        name: "Lion's Mane",
        latin: 'Hericium erinaceus',
        color: '#C8A96E',
        benefits: [
          'Stimulates Nerve Growth Factor (NGF) synthesis',
          'Supports memory & cognitive function',
          'Associated with reduced anxiety & depression symptoms',
          'May support myelin sheath repair',
        ],
        studies: [
          {
            title: "Lion's Mane Improves Mild Cognitive Impairment — Mori et al. (2009)",
            journal: 'Phytotherapy Research',
            type: 'Randomized Double-Blind Trial',
            url: 'https://pubmed.ncbi.nlm.nih.gov/18844328/',
            summary: "In a 16-week RCT, participants taking Lion's Mane showed significantly higher cognitive function scores than placebo. Scores declined after supplementation stopped.",
          },
          {
            title: 'Hericenones & Erinacines Stimulate NGF — Lai et al. (2013)',
            journal: 'Evidence-Based Complementary & Alternative Medicine',
            type: 'Mechanistic Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/24251780/',
            summary: "Identified two unique compound classes in Lion's Mane that cross the blood-brain barrier and directly stimulate production of Nerve Growth Factor — a protein critical for neuron maintenance.",
          },
          {
            title: "Lion's Mane Reduces Anxiety & Depression — Nagano et al. (2010)",
            journal: 'Biomedical Research',
            type: 'Randomized Controlled Trial',
            url: 'https://pubmed.ncbi.nlm.nih.gov/21199787/',
            summary: "Women who consumed Lion's Mane cookies for 4 weeks reported significantly lower anxiety and irritation scores compared to placebo group.",
          },
        ],
      },
      {
        name: 'Chaga',
        latin: 'Inonotus obliquus',
        color: '#9B7B5C',
        benefits: [
          'Exceptionally high ORAC (antioxidant) score',
          'Beta-glucans modulate immune response',
          'Anti-inflammatory polyphenol profile',
          'Traditionally used in Siberian folk medicine for centuries',
        ],
        studies: [
          {
            title: 'Antioxidant & Anti-Inflammatory Activity — Nakajima et al. (2009)',
            journal: 'Journal of Ethnopharmacology',
            type: 'In Vitro Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/19501271/',
            summary: 'Chaga extract demonstrated significant antioxidant and anti-inflammatory properties, with high concentrations of melanin and polyphenol compounds.',
          },
          {
            title: 'Chaga Beta-Glucans & Immune Modulation — Kim et al. (2006)',
            journal: 'Biomolecules & Therapeutics',
            type: 'Preclinical Study',
            url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3774877/',
            summary: 'Chaga polysaccharides demonstrated significant immunostimulating activity. Beta-glucan fractions showed notable biological response modification.',
          },
          {
            title: 'Chaga Inhibits Oxidative DNA Damage — Arata et al. (2016)',
            journal: 'International Journal of Medicinal Mushrooms',
            type: 'Human Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/26853956/',
            summary: 'Human participants who consumed Chaga extract for 3 months showed significantly reduced oxidative DNA damage markers vs. control group.',
          },
        ],
      },
    ],
  },

  matcha: {
    headline: 'Clinical Research on Ceremonial Matcha',
    summary: "Matcha has over 1,000 years of traditional use and a growing body of modern research. The L-Theanine + Caffeine synergy is one of the most replicated findings in cognitive nutrition science.",
    credibilityStats: [
      { value: '137x', label: 'More EGCG than regular brewed green tea' },
      { value: '~25mg', label: 'L-Theanine per serving — the calm-focus amino acid' },
      { value: '50+', label: 'Human trials on L-Theanine + Caffeine combination' },
    ],
    ingredients: [
      {
        name: 'L-Theanine + Caffeine',
        latin: 'The Focus Synergy',
        color: '#6CBD5A',
        benefits: [
          'Improves sustained attention and reaction time',
          'Reduces caffeine-induced jitters and anxiety',
          'Enhances working memory accuracy',
          'Promotes alpha brainwave activity (relaxed alertness)',
        ],
        studies: [
          {
            title: 'L-Theanine + Caffeine Improve Attention — Owen et al. (2008)',
            journal: 'Nutritional Neuroscience',
            type: 'Randomized Crossover Trial',
            url: 'https://pubmed.ncbi.nlm.nih.gov/18681988/',
            summary: 'Combined L-Theanine and caffeine significantly improved speed and accuracy of performance on attention-switching tasks more than either compound alone.',
          },
          {
            title: 'Alpha Wave Activity & L-Theanine — Nobre et al. (2008)',
            journal: 'Asia Pacific Journal of Clinical Nutrition',
            type: 'EEG Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/18296328/',
            summary: 'L-Theanine promoted alpha brainwave activity within 40 minutes of ingestion — associated with a state of relaxed alertness without drowsiness.',
          },
          {
            title: 'Matcha vs. Green Tea — Cognitive Effects (Dietz & Dekker, 2017)',
            journal: 'Nutrients',
            type: 'Review Article',
            url: 'https://pubmed.ncbi.nlm.nih.gov/28899506/',
            summary: "Matcha's unique phytochemical profile (whole-leaf powder vs. infusion) delivers meaningfully higher concentrations of L-Theanine, EGCG, and caffeine than steeped green tea.",
          },
        ],
      },
      {
        name: 'EGCG & Green Tea Catechins',
        latin: 'Epigallocatechin gallate',
        color: '#4AAF7C',
        benefits: [
          'Potent antioxidant — neutralizes free radicals',
          'Associated with improved working memory',
          'Supports metabolic and cardiovascular health',
          'Highest concentration in ceremonial-grade matcha',
        ],
        studies: [
          {
            title: 'EGCG & Working Memory — Scholey et al. (2012)',
            journal: 'Nutrients',
            type: 'Randomized Controlled Trial',
            url: 'https://pubmed.ncbi.nlm.nih.gov/22882820/',
            summary: 'Green tea catechins, particularly EGCG, showed improvements in working memory and sustained attention in healthy adults over a 12-week supplementation period.',
          },
          {
            title: 'Green Tea Antioxidant Activity — Benzie & Szeto (1999)',
            journal: 'Journal of Agricultural and Food Chemistry',
            type: 'Analytical Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/10563930/',
            summary: 'Confirmed the high antioxidant capacity of green tea polyphenols, particularly EGCG, which is significantly more bioavailable in matcha than in steeped tea.',
          },
        ],
      },
    ],
  },

  'classic-coffee': {
    headline: 'Clinical Research on Premium Arabica Coffee',
    summary: "Coffee is the most studied dietary stimulant on earth. These aren't cherry-picked findings — they're the consistent conclusions of decades of large-scale research.",
    credibilityStats: [
      { value: '#1', label: 'Dietary antioxidant source in Western diet (Journal of Nutrition)' },
      { value: '~80mg', label: 'Natural caffeine per serving — the clinical sweet spot' },
      { value: '20%', label: 'Lower cognitive decline risk in regular coffee drinkers (meta-analysis)' },
    ],
    ingredients: [
      {
        name: 'Caffeine',
        latin: 'From Coffea arabica',
        color: '#D67A5A',
        benefits: [
          'Improves alertness, reaction time, and mood',
          'Enhances physical endurance and performance',
          'Blocks adenosine receptors — reduces fatigue perception',
          'Associated with long-term neuroprotective effects',
        ],
        studies: [
          {
            title: 'Caffeine & Cognitive Performance — Nehlig (2010)',
            journal: 'Neuroscience & Biobehavioral Reviews',
            type: 'Comprehensive Review',
            url: 'https://pubmed.ncbi.nlm.nih.gov/20167236/',
            summary: 'Regular caffeine consumption consistently associated with improved attention, memory, psychomotor speed, and reaction time across dozens of controlled studies.',
          },
          {
            title: 'Coffee & Reduced Cognitive Decline — Eskelinen et al. (2009)',
            journal: "Journal of Alzheimer's Disease",
            type: 'Longitudinal Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/19158424/',
            summary: 'Midlife coffee consumption of 3–5 cups/day was associated with a 65% decreased risk of dementia/Alzheimer\'s disease later in life. Effect was dose-dependent.',
          },
        ],
      },
      {
        name: 'Coffee Polyphenols',
        latin: 'Chlorogenic acids & antioxidants',
        color: '#C4A35A',
        benefits: [
          'Largest dietary antioxidant source in Western populations',
          'Chlorogenic acids slow glucose absorption',
          'Anti-inflammatory effects in observational studies',
          'Robusta has higher caffeine — Arabica has higher polyphenol quality',
        ],
        studies: [
          {
            title: 'Coffee — #1 Antioxidant Source in Western Diet — Svilaas et al. (2004)',
            journal: 'Journal of Nutrition',
            type: 'Dietary Analysis Study',
            url: 'https://pubmed.ncbi.nlm.nih.gov/15013484/',
            summary: 'In a study of 2,672 adults, coffee was the single largest contributor of antioxidants — more than fruits, vegetables, tea, or wine combined.',
          },
          {
            title: 'Chlorogenic Acids & Metabolic Health — Tajik et al. (2017)',
            journal: 'Nutrition Reviews',
            type: 'Meta-Analysis',
            url: 'https://pubmed.ncbi.nlm.nih.gov/28929258/',
            summary: 'Meta-analysis of 13 randomized trials found chlorogenic acids significantly reduced fasting blood glucose and improved insulin sensitivity.',
          },
        ],
      },
    ],
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const STUDY_TYPE_COLORS = {
  'Randomized Double-Blind Trial': '#10B981',
  'Randomized Controlled Trial': '#10B981',
  'Randomized Crossover Trial': '#10B981',
  'Human Study': '#6CBD5A',
  'EEG Study': '#6CBD5A',
  'Longitudinal Study': '#6CBD5A',
  'Meta-Analysis': '#4AAF7C',
  'Comprehensive Review': '#A8D5BA',
  'Review Article': '#A8D5BA',
  'Mechanistic Study': '#C8A96E',
  'Preclinical Study': '#D6B27A',
  'Analytical Study': '#C4A35A',
  'In Vitro Study': '#9B9B7A',
  'Dietary Analysis Study': '#C4A35A',
};

function StudyTypeBadge({ type }) {
  const color = STUDY_TYPE_COLORS[type] || '#A8D5BA';
  return (
    <span
      className="font-mono text-[6.5px] tracking-[0.2em] uppercase px-2 py-1 flex-shrink-0"
      style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
    >
      {type}
    </span>
  );
}

function StudyCard({ study, accent }) {
  return (
    <a
      href={study.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group transition-all hover:opacity-90"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${accent}18`,
        padding: '16px 18px',
        borderRadius: '2px',
        borderLeft: `3px solid ${accent}50`,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="font-heading text-xs font-semibold leading-snug" style={{ color: '#F7F1E8', flex: 1 }}>
          {study.title}
        </p>
        <ExternalLink
          className="w-3 h-3 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: accent }}
        />
      </div>
      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
        <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase" style={{ color: `${accent}80` }}>
          {study.journal}
        </p>
        <span className="font-mono text-[7px]" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
        <StudyTypeBadge type={study.type} />
      </div>
      <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
        {study.summary}
      </p>
    </a>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function IngredientResearch({ product }) {
  const [expanded, setExpanded] = useState(false);
  const data = RESEARCH[product.category];
  if (!data) return null;

  const totalStudies = data.ingredients.reduce((sum, i) => sum + i.studies.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-14"
      style={{
        background: 'rgba(16,185,129,0.02)',
        border: '1px solid rgba(16,185,129,0.12)',
        borderRadius: '2px',
        padding: '32px',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <FlaskConical className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
            <p className="font-mono text-[8px] tracking-[0.45em] uppercase" style={{ color: `${GREEN}80` }}>
              Ingredient Research
            </p>
          </div>
          <h2
            className="font-serif font-bold mb-2"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F7F1E8', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            {data.headline}
          </h2>
          <p
            className="font-heading text-sm leading-relaxed"
            style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, maxWidth: '600px' }}
          >
            {data.summary}
          </p>
        </div>

        {/* Study count badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          <BookOpen className="w-3.5 h-3.5" style={{ color: GREEN }} />
          <div className="text-right">
            <p className="font-mono font-black text-base leading-none" style={{ color: GREEN }}>{totalStudies}</p>
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-0.5" style={{ color: `${GREEN}70` }}>
              cited studies
            </p>
          </div>
        </div>
      </div>

      {/* Credibility stats strip */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-8"
        style={{ border: '1px solid rgba(16,185,129,0.12)' }}
      >
        {data.credibilityStats.map((stat, i) => (
          <div
            key={i}
            className="p-4 text-center"
            style={{
              borderRight: i < data.credibilityStats.length - 1 ? '1px solid rgba(16,185,129,0.12)' : 'none',
              borderBottom: 'none',
            }}
          >
            <p className="font-mono font-black mb-1" style={{ fontSize: '1.4rem', color: GREEN, lineHeight: 1 }}>
              {stat.value}
            </p>
            <p className="font-heading text-[11px] leading-relaxed" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Ingredient sections */}
      <div className="space-y-10">
        {data.ingredients.map((ingredient) => (
          <div key={ingredient.name}>
            {/* Ingredient header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ingredient.color }} />
              <div>
                <p className="font-serif font-bold text-sm" style={{ color: ingredient.color }}>
                  {ingredient.name}
                </p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(247,241,232,0.3)' }}>
                  {ingredient.latin}
                </p>
              </div>
            </div>

            {/* Benefits tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {ingredient.benefits.map((b) => (
                <span
                  key={b}
                  className="font-heading text-xs px-3 py-1.5 leading-snug"
                  style={{
                    background: `${ingredient.color}0A`,
                    border: `1px solid ${ingredient.color}22`,
                    color: 'rgba(247,241,232,0.65)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Studies */}
            <div className="space-y-3">
              {/* Always show first study */}
              <StudyCard study={ingredient.studies[0]} accent={ingredient.color} />

              {/* Rest behind toggle */}
              <AnimatePresence>
                {expanded &&
                  ingredient.studies.slice(1).map((study) => (
                    <motion.div
                      key={study.url}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <StudyCard study={study} accent={ingredient.color} />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Show more toggle */}
      {data.ingredients.some((i) => i.studies.length > 1) && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-2 mt-6 transition-opacity hover:opacity-70"
        >
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>
            {expanded ? 'Show fewer studies' : `Show all ${totalStudies} studies`}
          </span>
          <ChevronDown
            className="w-3 h-3 transition-transform duration-200"
            style={{ color: RG, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
      )}

      {/* Credibility footer */}
      <div
        className="flex items-center gap-2.5 mt-6 pt-5"
        style={{ borderTop: '1px solid rgba(16,185,129,0.1)' }}
      >
        <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: `${GREEN}60` }} />
        <p className="font-mono text-[7px] tracking-[0.15em] leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
          All studies link to PubMed / NCBI — the U.S. National Library of Medicine. These are provided for informational purposes and are not affiliated with Torch Republic. Statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </motion.div>
  );
}