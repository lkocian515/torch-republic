import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight } from 'lucide-react';

const RG = '#E6B7AD';

const CATEGORY_COLORS = {
  science: '#A8D5BA',
  habits: '#D4A574',
  recipes: '#E6B7AD',
  wellness: '#B5A5D4',
  news: '#A5C5D4',
};

export default function ArticleCard({ article }) {
  const categoryColor = CATEGORY_COLORS[article.category] || RG;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <Link to={`/journal/${article.slug}`} className="block h-full">
        <div
          className="h-full rounded-sm overflow-hidden transition-all"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${RG}15`,
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: '220px' }}>
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
              style={{
                background: `${categoryColor}15`,
                border: `1px solid ${categoryColor}40`,
                color: categoryColor,
                backdropFilter: 'blur(8px)',
              }}
            >
              {article.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-3 text-[10px]">
              <div className="flex items-center gap-1.5" style={{ color: `${RG}60` }}>
                <Calendar size={12} />
                <span className="font-mono tracking-wide">
                  {article.published_date ? new Date(article.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                </span>
              </div>
              {article.read_time && (
                <div className="flex items-center gap-1.5" style={{ color: `${RG}60` }}>
                  <Clock size={12} />
                  <span className="font-mono tracking-wide">{article.read_time} min read</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3
              className="font-serif font-bold text-lg mb-2 line-clamp-2 transition-colors group-hover:opacity-80"
              style={{ color: '#F5EFE6' }}
            >
              {article.title}
            </h3>

            {/* Excerpt */}
            {article.excerpt && (
              <p
                className="font-heading text-sm mb-4 line-clamp-3"
                style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Author & Read More */}
            <div className="flex items-center justify-between">
              {article.author && (
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: `${RG}50` }}>
                  By {article.author}
                </p>
              )}
              <div
                className="flex items-center gap-1 font-mono text-[9px] tracking-[0.25em] uppercase transition-all group-hover:gap-2"
                style={{ color: RG }}
              >
                Read <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}