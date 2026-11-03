import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Zap } from 'lucide-react';

export default function TorchBoxCollectionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 md:px-8 py-5"
      style={{
        background: 'linear-gradient(135deg, rgba(201,162,74,0.12) 0%, rgba(201,162,74,0.06) 100%)',
        border: '1px solid rgba(201,162,74,0.3)',
        position: 'relative',
      }}
    >
      {/* Pulse animation background */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at right, rgba(201,162,74,0.1) 0%, transparent 70%)',
        }} />

      <div className="flex items-center gap-3 relative z-10">
        <div className="relative">
          <Flame className="w-4 h-4 flex-shrink-0" style={{ color: '#E6AC45' }} />
          <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(201,162,74,0.4)', borderRadius: '50%', filter: 'blur(4px)' }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: '#E6AC45' }}>
              Step 2: Build Your Collection
            </p>
            <span className="font-mono text-[8px] font-black px-1.5 py-0.5 rounded" style={{ background: 'rgba(201,162,74,0.2)', color: '#E6AC45', border: '1px solid rgba(201,162,74,0.4)' }}>
              Limited Spots
            </span>
          </div>
          <p className="font-mono text-[9px] mt-0" style={{ color: 'rgba(240,235,225,0.5)' }}>
            After purchasing single blends, join Torch Box for exclusive member-only releases and complete the full Founders Series
          </p>
        </div>
      </div>
      <Link to="/TheTorchBox"
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase font-black transition-all hover:opacity-85 flex-shrink-0 relative z-10"
        style={{ background: '#E6AC45', color: '#000', padding: '10px 22px', boxShadow: '0 4px 12px rgba(201,162,74,0.2)' }}>
        <Zap className="w-3 h-3" />
        Upgrade to Membership <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}