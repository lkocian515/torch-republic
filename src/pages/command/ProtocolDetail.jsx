import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { ArrowLeft } from 'lucide-react';

const GOLD = '#D4AF37';

const BLEND_URLS = {
  GlowMind: 'https://torchrepublic.com/products/glowmind',
  MoonCap: 'https://torchrepublic.com/products/mooncap',
  Both: 'https://torchrepublic.com/shop',
};

const BLEND_COLORS = {
  GlowMind: '#D4AF37',
  MoonCap: '#7C9CBF',
  Both: '#7CBF8E',
};

export default function ProtocolDetail() {
  useSEO({ title: 'Performance Protocol · Torch Command', description: 'Detailed optimization protocol.', url: `/command/protocols/${slug}`, noindex: true });
  const { slug } = useParams();

  const { data: protocols = [], isLoading } = useQuery({
    queryKey: ['protocol', slug],
    queryFn: () => base44.entities.PerformanceProtocol.filter({ slug }),
  });

  const protocol = protocols[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: GOLD, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!protocol) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#0A0A0A', color: '#F0EBE1' }}>
        <p className="font-serif text-2xl">Protocol not found.</p>
        <Link to="/command/protocols" className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: GOLD }}>← Back to Protocols</Link>
      </div>
    );
  }

  const blendColor = BLEND_COLORS[protocol.recommended_blend] || GOLD;
  const buyUrl = BLEND_URLS[protocol.recommended_blend] || BLEND_URLS.Both;

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#F0EBE1' }} className="flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${GOLD}20` }}>
        <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: GOLD }}>Torch Command</span>
        <Link to="/command/protocols" className="font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 transition-all hover:opacity-70" style={{ color: 'rgba(212,175,55,0.5)' }}>
          <ArrowLeft className="w-3 h-3" /> All Protocols
        </Link>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Category + Duration */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-3 py-1.5" style={{ background: `${GOLD}12`, color: GOLD, border: `1px solid ${GOLD}30` }}>
              {protocol.category}
            </span>
            {protocol.duration && (
              <span className="font-mono text-[8px]" style={{ color: 'rgba(240,235,225,0.35)' }}>{protocol.duration}</span>
            )}
          </div>

          <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {protocol.title}
          </h1>

          {protocol.tagline && (
            <p className="mb-10" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '1rem', lineHeight: 1.8 }}>{protocol.tagline}</p>
          )}

          {/* Divider */}
          <div className="h-px mb-10" style={{ background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />

          {/* Steps */}
          {protocol.steps && protocol.steps.length > 0 && (
            <div className="mb-10">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: `${GOLD}70` }}>The Protocol</p>
              <ol className="flex flex-col gap-5">
                {protocol.steps.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 p-4"
                    style={{ background: 'rgba(212,175,55,0.04)', border: `1px solid rgba(212,175,55,0.1)` }}
                  >
                    <span className="font-mono font-bold text-sm flex-shrink-0 mt-0.5" style={{ color: GOLD }}>{String(i + 1).padStart(2, '0')}</span>
                    <p style={{ color: 'rgba(240,235,225,0.75)', lineHeight: 1.75, fontSize: '0.9rem' }}>{step}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          )}

          {/* Blend Recommendation */}
          <div className="p-6" style={{ background: `${blendColor}08`, border: `1px solid ${blendColor}35` }}>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-2" style={{ color: `${blendColor}80` }}>Torch Republic Pairing</p>
            <p className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.4rem' }}>{protocol.recommended_blend}</p>
            {protocol.blend_rationale && (
              <p className="mb-5" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.85rem', lineHeight: 1.7 }}>{protocol.blend_rationale}</p>
            )}
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[10px] tracking-[0.4em] uppercase font-bold py-3 px-6 transition-all hover:opacity-90"
              style={{ background: blendColor, color: '#0A0A0A' }}
            >
              Shop {protocol.recommended_blend} →
            </a>
          </div>

          <Link
            to="/command/protocols"
            className="flex items-center gap-2 mt-8 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
            style={{ color: 'rgba(212,175,55,0.5)' }}
          >
            <ArrowLeft className="w-3 h-3" /> Back to Protocols Directory
          </Link>

        </motion.div>
      </div>
    </div>
  );
}