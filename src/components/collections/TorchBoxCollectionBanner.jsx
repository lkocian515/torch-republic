import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';

export default function TorchBoxCollectionBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 md:px-8 py-4 mb-8"
      style={{ background: 'rgba(201,162,74,0.06)', border: '1px solid rgba(201,162,74,0.2)' }}
    >
      <div className="flex items-center gap-3">
        <Flame className="w-4 h-4 flex-shrink-0" style={{ color: '#C9A24A' }} />
        <div>
          <p className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: '#C9A24A' }}>
            Build your collection faster with Torch Box
          </p>
          <p className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(240,235,225,0.4)' }}>
            Subscribe monthly and save on every blend
          </p>
        </div>
      </div>
      <Link to="/TheTorchBox"
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase font-black transition-all hover:opacity-85 flex-shrink-0"
        style={{ background: '#C9A24A', color: '#000', padding: '9px 20px' }}>
        Start Subscription <ArrowRight className="w-3 h-3" />
      </Link>
    </motion.div>
  );
}