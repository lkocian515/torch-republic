import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

/**
 * TorchBoxBanner
 * Shown at the top of collection pages (Founders, Liberty Icons, Commanders).
 */
export default function TorchBoxBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 mb-8"
      style={{
        background: 'rgba(201,162,74,0.06)',
        border: '1px solid rgba(201,162,74,0.2)',
        boxShadow: '0 0 30px rgba(201,162,74,0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
          style={{ background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.25)' }}>
          <Flame className="w-4 h-4" style={{ color: '#E6AC45' }} />
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#E6AC45' }}>
            Your coffee, delivered regularly
          </p>
          <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
            Choose a coffee subscription and review current savings and delivery terms.
          </p>
        </div>
      </div>
      <Link
        to="/subscription"
        className="flex-shrink-0 inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-80 whitespace-nowrap px-5 py-2.5"
        style={{ background: '#E6AC45', color: '#0B0B0B', fontWeight: 800 }}
      >
        Start Subscription →
      </Link>
    </motion.div>
  );
}