import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const RG = '#E6AC45';

export default function TorchbearersBanner({ variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <Link
        to="/torchbearers-rewards"
        className="flex items-center justify-center gap-2 py-2.5 px-4 transition-all hover:opacity-90"
        style={{ background: `linear-gradient(90deg, rgba(230,183,173,0.08) 0%, rgba(230,183,173,0.12) 50%, rgba(230,183,173,0.08) 100%)`, border: '1px solid rgba(230,183,173,0.15)' }}
      >
        <Flame className="w-3.5 h-3.5" style={{ color: RG }} />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>
          Republic Rewards
        </span>
        <ChevronRight className="w-3.5 h-3.5" style={{ color: RG }} />
      </Link>
    );
  }

  if (variant === 'sidebar') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-5"
        style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.08)' }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <Flame className="w-4 h-4" style={{ color: RG }} />
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>
            Republic Rewards
          </p>
        </div>
        <p className="font-heading text-xs mb-3" style={{ color: 'rgba(245,239,230,0.6)', lineHeight: 1.7 }}>
          Earn points on every ritual. Redeem for exclusive rewards.
        </p>
        <Link
          to="/torchbearers-rewards"
          className="block text-center font-mono text-[8.5px] tracking-[0.2em] uppercase font-bold py-2.5 transition-all hover:opacity-90"
          style={{ background: RG, color: '#080808' }}
        >
          Learn More
        </Link>
      </motion.div>
    );
  }

  // Default banner
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 md:p-8 text-center"
      style={{
        background: `linear-gradient(135deg, rgba(230,183,173,0.06) 0%, rgba(196,163,90,0.04) 100%)`,
        border: '1px solid rgba(230,183,173,0.12)',
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <Flame className="w-5 h-5" style={{ color: RG }} />
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: RG }}>
          Republic Rewards
        </p>
      </div>
      <h3 className="font-serif font-bold mb-3" style={{ fontSize: '1.4rem', color: '#F7F2E9' }}>
        Carry the Flame. Earn Republic Rewards.
      </h3>
      <p className="font-heading text-sm md:text-base mb-5 max-w-xl mx-auto"
        style={{ color: 'rgba(245,239,230,0.65)', fontWeight: 300, lineHeight: 1.8 }}>
        Join our loyalty program and earn points on every purchase, review, and referral.
        Advance through tiers and unlock exclusive rewards.
      </p>
      <Link
        to="/torchbearers-rewards"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase font-bold px-6 py-3 transition-all hover:opacity-90"
        style={{ background: RG, color: '#080808' }}
      >
        Learn More
        <ChevronRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}