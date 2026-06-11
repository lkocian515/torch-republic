import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FlaskConical, ChevronDown } from 'lucide-react';

const RG = '#E6B7AD';
const GREEN = '#10B981';

const RESEARCH = {
  'mushroom-coffee': {
    headline: "The Science Behind Lion's Mane & Chaga",
    summary: "Our mushroom blends are built around two of the most studied functional mushrooms in the world. Here's what the research says.",
    ingredients: [
      {
        name: "Lion's Mane (Hericium erinaceus)",
        color: '#D6B27A',
        benefits: [
          "Supports cognitive function and memory",
          "May promote nerve growth factor (NGF) production",
          "Associated with improved focus and mental clarity",
        ],
        studies: [
          {
            title: "Lion's Mane & Cognitive Function — Mori et al. (2009)",
            journal: "Phytotherapy Research",
            url: "https://pubmed.ncbi.nlm.nih.gov/18844328/",
            summary: "Randomized, double-blind study found Lion's Mane supplementation significantly improved mild cognitive impairment scores over 16 weeks."
          },
          {
            title: "Nerve Growth Factor Synthesis — Lai et al. (2013)",
            journal: "Evidence-Based Complementary & Alternative Medicine",
            url: "https://pubmed.ncbi.nlm.nih.gov/24251780/",
            summary: "Identified specific compounds in Lion's Mane (hericenones and erinacines) that stimulate NGF synthesis in the brain."
          },
        ]
      },
      {
        name: "Chaga (Inonotus obliquus)",
        color: '#8B6F5E',
        benefits: [
          "Rich in antioxidants, particularly superoxide dismutase (SOD)",
          "Traditionally used to support immune function",
          "May help reduce oxidative stress",
        ],
        studies: [
          {
            title: "Antioxidant Activity of Chaga — Nakajima et al. (2009)",
            journal: "Journal of Ethnopharmacology",
            url: "https://pubmed.ncbi.nlm.nih.gov/19501271/",
            summary: "Chaga demonstrated significant antioxidant and anti-inflammatory properties, with high levels of polyphenols and melanin compounds."
          },
          {
            title: "Chaga Immune Modulation — Kim et al. (2006)",
            journal: "Biomolecules & Therapeutics",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3774877/",
            summary: "Chaga extracts showed immune-stimulating and anti-tumor activity in preclinical models."
          },
        ]
      }
    ]
  },
  matcha: {
    headline: "The Science Behind Ceremonial Matcha",
    summary: "Matcha has over 1,000 years of traditional use and decades of modern research backing its unique combination of calm energy and focus.",
    ingredients: [
      {
        name: "Ceremonial Grade Matcha",
        color: '#6CBD5A',
        benefits: [
          "L-Theanine + Caffeine combination for calm, focused energy",
          "High in EGCG (a potent antioxidant catechin)",
          "Associated with sustained alertness without jitters",
        ],
        studies: [
          {
            title: "L-Theanine & Caffeine Synergy — Owen et al. (2008)",
            journal: "Nutritional Neuroscience",
            url: "https://pubmed.ncbi.nlm.nih.gov/18681988/",
            summary: "Combined L-Theanine and caffeine significantly improved speed and accuracy of performance on attention tasks more than either compound alone."
          },
          {
            title: "EGCG & Cognitive Performance — Scholey et al. (2012)",
            journal: "Nutrients",
            url: "https://pubmed.ncbi.nlm.nih.gov/22882820/",
            summary: "Green tea catechins, particularly EGCG, showed improvements in working memory and sustained attention in healthy adults."
          },
          {
            title: "Matcha & Attention — Dietz & Dekker (2017)",
            journal: "Nutrients",
            url: "https://pubmed.ncbi.nlm.nih.gov/28899506/",
            summary: "Reviewed evidence that matcha's unique phytochemical profile offers cognitive benefits superior to regular green tea."
          },
        ]
      }
    ]
  },
  'classic-coffee': {
    headline: "The Science Behind Premium Coffee",
    summary: "Premium Arabica coffee is one of the most researched dietary compounds on earth. Here's what decades of studies consistently show.",
    ingredients: [
      {
        name: "Premium Arabica Instant Coffee",
        color: '#C4A35A',
        benefits: [
          "Caffeine enhances focus, alertness, and physical performance",
          "Rich in polyphenols and chlorogenic acids (antioxidants)",
          "Associated with reduced risk of cognitive decline in long-term studies",
        ],
        studies: [
          {
            title: "Coffee & Cognitive Performance — Nehlig (2010)",
            journal: "Neuroscience & Biobehavioral Reviews",
            url: "https://pubmed.ncbi.nlm.nih.gov/20167236/",
            summary: "Comprehensive review found regular coffee consumption is associated with improved attention, memory, and psychomotor function."
          },
          {
            title: "Coffee Antioxidants — Svilaas et al. (2004)",
            journal: "Journal of Nutrition",
            url: "https://pubmed.ncbi.nlm.nih.gov/15013484/",
            summary: "Coffee was the single largest contributor of antioxidants in the Western diet, surpassing fruits and vegetables."
          },
        ]
      }
    ]
  }
};

function StudyCard({ study, accent }) {
  return (
    <a
      href={study.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group transition-all hover:opacity-90"
      style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${accent}20`, padding: '14px 16px', borderRadius: '2px' }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="font-heading text-xs font-semibold leading-snug" style={{ color: '#F7F1E8' }}>
          {study.title}
        </p>
        <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: accent }} />
      </div>
      <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-2" style={{ color: `${accent}70` }}>
        {study.journal}
      </p>
      <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300 }}>
        {study.summary}
      </p>
    </a>
  );
}

export default function IngredientResearch({ product }) {
  const [expanded, setExpanded] = useState(false);
  const data = RESEARCH[product.category];
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FlaskConical className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: `${GREEN}80` }}>
          Ingredient Research
        </p>
      </div>

      <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F7F1E8', letterSpacing: '-0.02em' }}>
        {data.headline}
      </h2>
      <p className="font-heading text-sm leading-relaxed mb-6" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, maxWidth: '620px' }}>
        {data.summary}
      </p>

      {/* Ingredient sections */}
      <div className="space-y-8">
        {data.ingredients.map((ingredient) => (
          <div key={ingredient.name}>
            {/* Ingredient header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ingredient.color }} />
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase font-semibold" style={{ color: ingredient.color }}>
                {ingredient.name}
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ingredient.benefits.map(b => (
                <span key={b} className="font-heading text-xs px-3 py-1.5 leading-snug" style={{ background: `${ingredient.color}10`, border: `1px solid ${ingredient.color}25`, color: 'rgba(247,241,232,0.7)' }}>
                  {b}
                </span>
              ))}
            </div>

            {/* Studies — show first one always, rest behind toggle */}
            <div className="space-y-2">
              <StudyCard study={ingredient.studies[0]} accent={ingredient.color} />

              {ingredient.studies.length > 1 && (
                <>
                  <AnimatePresence>
                    {expanded && ingredient.studies.slice(1).map(study => (
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show more toggle */}
      {data.ingredients.some(i => i.studies.length > 1) && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-2 mt-5 transition-opacity hover:opacity-70"
        >
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>
            {expanded ? 'Show fewer studies' : 'Show more studies'}
          </span>
          <ChevronDown
            className="w-3 h-3 transition-transform"
            style={{ color: RG, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
      )}

      {/* Disclaimer */}
      <p className="font-mono text-[7px] tracking-[0.15em] leading-relaxed mt-6" style={{ color: 'rgba(255,255,255,0.18)' }}>
        These studies are provided for informational purposes only and are not affiliated with Torch Republic. Links open on PubMed / NCBI, the U.S. National Library of Medicine. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </motion.div>
  );
}