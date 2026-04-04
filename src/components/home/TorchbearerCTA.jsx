import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Flame, Star, Gift } from 'lucide-react';

const BULLETS = [
  { icon: Flame, text: 'Exclusive items never sold in the store' },
  { icon: Star, text: "Members-only drops & early access" },
  { icon: Gift, text: 'Surprise gifts every month' },
];

export default function TorchbearerCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #060D1A 0%, #071E1A 30%, #0B3D35 60%, #070F1E 100%)' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(14,42,47,0.6) 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,90,0.4), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,90,0.4), transparent)' }} />

      <div className="max-w-[700px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <Flame className="w-5 h-5" style={{ color: '#C8A44D' }} />
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>

          <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white mb-3">
            Join the<br /><span style={{ color: '#F0D080', textShadow: '0 0 30px rgba(212,175,90,0.3)' }}>Torchbearers</span>
          </h2>
          <p className="font-mono text-sm tracking-wider mb-10" style={{ color: 'rgba(212,175,90,0.6)' }}>
            Monthly curated gear. Built for those who carry the flame.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            {BULLETS.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(14,42,47,0.8)', border: '1px solid rgba(212,175,90,0.3)' }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: '#C8A44D' }} />
                </div>
                <span className="font-mono text-[11px] tracking-wider text-left" style={{ color: 'rgba(255,255,255,0.65)' }}>{text}</span>
              </div>
            ))}
          </div>

          <Link
            to={createPageUrl('TheTorchBox')}
            className="inline-flex items-center justify-center px-10 py-4 font-mono font-black text-sm tracking-[0.3em] uppercase transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #070F1E 0%, #0B3D35 60%, #0D5244 100%)', color: '#fff', boxShadow: '0 4px 40px rgba(7,15,30,0.9), 0 0 0 1px rgba(212,175,90,0.25)' }}
          >
            Explore The Torch Box
          </Link>
        </motion.div>
      </div>
    </section>
  );
}