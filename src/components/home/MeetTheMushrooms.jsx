import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Sparkles, Leaf, Zap, Moon } from 'lucide-react';

const RG = '#E6AC45';

const MUSHROOMS = [
  {
    id: 'lions-mane',
    name: "Lion's Mane",
    scientific: 'Hericium erinaceus',
    icon: Brain,
    color: '#E6AC45',
    shortBenefit: 'Focus and Mental Clarity',
    history: "Lion's Mane has been used in Traditional Chinese Medicine for centuries, particularly by Buddhist monks to enhance concentration during meditation.",
    benefits: [
      'Supports cognitive function and mental clarity',
      'Traditionally used to enhance focus and memory',
      'Contains compounds that may support nerve growth factor',
      'Provides antioxidant support for brain health',
    ],
    ritual: 'Best taken in the morning or before focused work sessions',
  },
  {
    id: 'reishi',
    name: 'Reishi',
    scientific: 'Ganoderma lucidum',
    icon: Shield,
    color: '#E6AC45',
    shortBenefit: 'Resilience and Balance',
    history: 'Reishi has been used in traditional East Asian practice for centuries, where it earned the name "Mushroom of Immortality." It is a foundational mushroom in daily wellness routines.',
    benefits: [
      'Rich in naturally occurring triterpenes',
      'Traditionally used to support immune system balance',
      'Contains beta-glucans, the most studied mushroom polysaccharides',
      'Supports overall daily resilience and vitality',
    ],
    ritual: 'Perfect for daily use as a foundational wellness practice',
  },
  {
    id: 'cordyceps',
    name: 'Cordyceps',
    scientific: 'Cordyceps militaris',
    icon: Zap,
    color: '#9B4E2F',
    shortBenefit: 'Energy and Performance',
    history: 'Cordyceps was discovered by Tibetan herders who noticed their yaks became more energetic after grazing on pastures where the mushroom grew.',
    benefits: [
      'Supports cellular energy production',
      'Traditionally used to enhance physical performance',
      'May support oxygen utilization during exercise',
      'Provides clean, sustained energy without jitters',
    ],
    ritual: 'Ideal before morning workouts or demanding physical activities',
  },
  {
    id: 'reishi',
    name: 'Reishi',
    scientific: 'Ganoderma lucidum',
    icon: Moon,
    color: '#C4A8A0',
    shortBenefit: 'Calm and Restoration',
    history: 'Known as the Mushroom of Immortality in ancient Chinese texts, Reishi was reserved for emperors and royalty for promoting tranquility.',
    benefits: [
      'Traditionally used to support relaxation and calm',
      'Contains triterpenes that may support stress response',
      'Promotes restful sleep quality',
      'Supports the natural adaptation to stress',
    ],
    ritual: 'Best taken in the evening as part of a wind-down routine',
  },
];

export default function MeetTheMushrooms() {
  const [selectedMushroom, setSelectedMushroom] = useState(MUSHROOMS[0]);

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Ancient Wisdom, Modern Ritual
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F7F2E9' }}>
            Meet the Mushrooms
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Each functional mushroom brings centuries of traditional wisdom and unique benefits to your daily ritual
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3">
            {MUSHROOMS.map((mushroom, idx) => (
              <motion.button
                key={mushroom.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedMushroom(mushroom)}
                className="w-full text-left p-5 transition-all"
                style={{
                  background: selectedMushroom.id === mushroom.id ? `${mushroom.color}10` : 'rgba(255,255,255,0.02)',
                  border: selectedMushroom.id === mushroom.id ? `1px solid ${mushroom.color}40` : '1px solid rgba(230,183,173,0.1)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `${mushroom.color}15`,
                      border: `1px solid ${mushroom.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <mushroom.icon size={22} style={{ color: mushroom.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-bold" style={{ fontSize: '1.15rem', color: selectedMushroom.id === mushroom.id ? '#F7F2E9' : 'rgba(245,239,230,0.6)' }}>
                      {mushroom.name}
                    </h3>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: mushroom.color }}>
                      {mushroom.shortBenefit}
                    </p>
                  </div>
                  {selectedMushroom.id === mushroom.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Sparkles size={18} style={{ color: mushroom.color }} />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMushroom.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8"
              style={{
                background: 'rgba(230,183,173,0.04)',
                border: `1px solid ${selectedMushroom.color}25`,
                borderRadius: '6px',
              }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: `${selectedMushroom.color}15`,
                      border: `1px solid ${selectedMushroom.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <selectedMushroom.icon size={28} style={{ color: selectedMushroom.color }} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-2xl" style={{ color: '#F7F2E9' }}>
                      {selectedMushroom.name}
                    </h3>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase italic" style={{ color: `${selectedMushroom.color}70` }}>
                      {selectedMushroom.scientific}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: `${selectedMushroom.color}80` }}>
                  History and Origins
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.8 }}>
                  {selectedMushroom.history}
                </p>
              </div>

              <div className="mb-6">
                <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: `${selectedMushroom.color}80` }}>
                  Key Benefits
                </p>
                <ul className="space-y-2">
                  {selectedMushroom.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Leaf size={14} style={{ color: selectedMushroom.color, marginTop: '3px', flexShrink: 0 }} />
                      <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.6 }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: `${selectedMushroom.color}08`,
                  border: `1px solid ${selectedMushroom.color}20`,
                  borderRadius: '4px',
                  padding: '16px',
                }}
              >
                <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: `${selectedMushroom.color}90` }}>
                  When to Use
                </p>
                <p className="font-heading text-sm" style={{ color: '#F7F2E9', fontWeight: 400, lineHeight: 1.6 }}>
                  {selectedMushroom.ritual}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}