import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, QrCode, Shield } from 'lucide-react';

export default function TorchbearerCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto"
      style={{ maxWidth: 420, aspectRatio: '85.6/54', perspective: '1000px' }}
    >
      {/* Card body */}
      <div
        className="w-full h-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A0A0A 0%, #161410 40%, #0F0D09 100%)',
          border: '1px solid rgba(201,162,74,0.35)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(201,162,74,0.08), inset 0 1px 0 rgba(201,162,74,0.15)',
          borderRadius: '12px',
          padding: 'clamp(20px, 4%, 28px)',
        }}
      >
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(201,162,74,0.04) 0%, transparent 60%)', borderRadius: 'inherit' }} />

        {/* Top row — brand + series label */}
        <div className="flex items-start justify-between mb-auto relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame style={{ color: '#C9A24A', width: 14, height: 14 }} />
              <span className="font-mono font-black tracking-[0.35em] uppercase"
                style={{ fontSize: '10px', color: '#C9A24A' }}>
                Torch Republic
              </span>
            </div>
            <p className="font-mono tracking-[0.25em] uppercase"
              style={{ fontSize: '8px', color: 'rgba(201,162,74,0.45)' }}>
              Torchbearer Membership
            </p>
          </div>
          {/* Three stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(3)].map((_, i) => (
              <Star key={i} style={{ color: '#C9A24A', width: 10, height: 10, fill: '#C9A24A' }} />
            ))}
          </div>
        </div>

        {/* Gold horizontal rule */}
        <div className="my-4" style={{ height: 1, background: 'linear-gradient(90deg, rgba(201,162,74,0.6) 0%, rgba(201,162,74,0.1) 100%)' }} />

        {/* Middle — member name placeholder */}
        <div className="relative z-10 mb-4">
          <p className="font-mono tracking-[0.3em] uppercase mb-1"
            style={{ fontSize: '8px', color: 'rgba(201,162,74,0.4)' }}>Member</p>
          <p className="font-serif font-bold tracking-wide"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#F0EBE1', letterSpacing: '0.04em' }}>
            TORCHBEARER
          </p>
        </div>

        {/* Bottom row — QR + card number */}
        <div className="flex items-end justify-between relative z-10">
          <div>
            <p className="font-mono tracking-[0.2em] uppercase mb-0.5"
              style={{ fontSize: '7px', color: 'rgba(201,162,74,0.35)' }}>Card</p>
            <p className="font-mono tracking-[0.3em]"
              style={{ fontSize: '9px', color: 'rgba(201,162,74,0.6)', letterSpacing: '0.2em' }}>
              ████ ████ ████ 0001
            </p>
          </div>
          {/* QR mockup */}
          <div className="flex flex-col items-center gap-1">
            <div className="p-1.5" style={{ background: 'rgba(201,162,74,0.06)', border: '1px solid rgba(201,162,74,0.2)', borderRadius: 4 }}>
              <QrCode style={{ color: '#C9A24A', width: 22, height: 22 }} />
            </div>
            <p className="font-mono" style={{ fontSize: '6px', color: 'rgba(201,162,74,0.35)', letterSpacing: '0.15em' }}>SCAN TO ACCESS</p>
          </div>
        </div>

        {/* Watermark torch icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0.03 }}>
          <Flame style={{ width: '60%', height: '60%', color: '#C9A24A' }} />
        </div>

        {/* Embossed shield bottom-right */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none" style={{ opacity: 0.06 }}>
          <Shield style={{ width: 80, height: 80, color: '#C9A24A' }} />
        </div>
      </div>

      {/* Glow under card */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: '70%', height: 20, background: 'radial-gradient(ellipse, rgba(201,162,74,0.2) 0%, transparent 70%)', filter: 'blur(8px)' }} />
    </motion.div>
  );
}