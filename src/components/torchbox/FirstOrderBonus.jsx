import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Gift } from 'lucide-react';

export default function FirstOrderBonus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(201,162,74,0.15) 0%, rgba(201,162,74,0.05) 100%)',
        border: '1px solid rgba(201,162,74,0.35)',
        boxShadow: '0 0 40px rgba(201,162,74,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(201,162,74,0.2) 0%, transparent 60%)',
        }} />

      <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-[9px] font-black tracking-[0.35em] uppercase"
              style={{ background: 'rgba(201,162,74,0.2)', color: '#E8D08A', border: '1px solid rgba(201,162,74,0.5)' }}>
              <Zap className="w-3 h-3" />
              Limited Time Offer
            </div>
          </div>

          <h3 className="font-serif mb-2" style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Exclusive First Box<br />Bonus
          </h3>

          <p className="font-heading mb-4" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.75)', lineHeight: 1.7, maxWidth: '420px', fontWeight: 400 }}>
            Claim your first Torch Box today and unlock an exclusive bonus item. Member-only blends, no store access, limited stock each month.
          </p>

          {/* Key benefits */}
          <div className="space-y-2 mb-6">
            {[
              { icon: '✦', text: 'Exclusive blends not sold individually' },
              { icon: '⚡', text: 'Limited monthly availability' },
              { icon: '🎁', text: 'Exclusive first box bonus' },
              { icon: '💰', text: 'Save up to $42/month' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span style={{ fontSize: '0.9rem' }}>{item.icon}</span>
                <span style={{ color: 'rgba(240,235,225,0.65)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/TheTorchBox"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.35em] uppercase font-black transition-all hover:opacity-90"
            style={{
              background: '#C9A24A',
              color: '#080808',
              padding: '15px 32px',
              boxShadow: '0 8px 24px rgba(201,162,74,0.25)',
            }}
          >
            <Gift className="w-4 h-4" />
            Claim Your Box Now
          </Link>
        </div>

        {/* Visual element */}
        <div className="flex-shrink-0 flex flex-col items-center gap-4 md:w-48">
          {/* Floating icons animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl"
          >
            🎁
          </motion.div>
          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: '#C9A24A', fontWeight: 700 }}>
              First Order Only
            </p>
            <p className="font-mono text-[8px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Limited monthly<br />availability
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}