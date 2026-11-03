import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const RG = '#E6AC45';

const CATEGORY_COLORS = {
  'Coffee Origins': '#264A35',
  'Mushroom Coffee Education': '#D4A574',
  'Instant Coffee Education': '#E6AC45',
  'Travel Coffee': '#A5C5D4',
  'Brewing Alternatives': '#B5A5D4',
  'Coffee Comparisons': '#D4B5A5',
};

export default function KnowledgeArticleCard({ article, index = 0 }) {
  const color = CATEGORY_COLORS[article.category] || RG;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <Link
        to={`/knowledge/${article.slug}`}
        className="block h-full p-5 transition-all group"
        style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}40`}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: `${color}90` }}>{article.category}</span>
          <span style={{ color: 'rgba(230,183,173,0.2)', fontSize: 8 }}>·</span>
          <span className="flex items-center gap-1 font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>
            <Clock size={9} /> {article.readTime} min
          </span>
        </div>
        <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.05rem', color: '#F7F2E9', lineHeight: 1.3 }}>{article.title}</h3>
        <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300, lineHeight: 1.6 }}>{article.excerpt}</p>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${RG}70` }}>Read Article</span>
          <ArrowRight size={11} style={{ color: `${RG}70` }} className="transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}