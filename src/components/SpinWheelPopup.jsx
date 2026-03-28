import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PRIZES = [
  { label: '10% OFF',   code: 'TORCH10',   color: '#0a1628', textColor: '#D4AF5A' }, // deep navy
  { label: 'FREE SHIP', code: 'FREESHIP',  color: '#1a0d00', textColor: '#D4AF5A' }, // dark amber
  { label: '15% OFF',   code: 'TORCH15',   color: '#0f0a1e', textColor: '#D4AF5A' }, // deep indigo
  { label: 'TRY AGAIN', code: null,        color: '#111111', textColor: '#555555' }, // near black
  { label: '20% OFF',   code: 'TORCH20',   color: '#0d1a0d', textColor: '#D4AF5A' }, // dark forest
  { label: '5% OFF',    code: 'TORCH5',    color: '#1a0a0a', textColor: '#D4AF5A' }, // deep crimson
  { label: 'FREE GIFT', code: 'GIFTME',    color: '#0e1520', textColor: '#D4AF5A' }, // midnight blue
  { label: '12% OFF',   code: 'TORCH12',   color: '#14100a', textColor: '#D4AF5A' }, // dark walnut
];

const NUM = PRIZES.length;
const SLICE = 360 / NUM;
const GOLD = '#D4AF5A';
const GOLD_LIGHT = '#F0D080';

function Wheel({ rotation }) {
  const size = 260;
  const cx = size / 2;
  const r = size / 2 - 6;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: `rotate(${rotation}deg)`, transition: 'none', filter: 'drop-shadow(0 0 18px rgba(212,175,90,0.25))' }}
    >
      {/* Outer decorative ring */}
      <circle cx={cx} cy={cx} r={r + 5} fill="none" stroke={GOLD} strokeWidth="1" opacity="0.4" />
      <circle cx={cx} cy={cx} r={r + 2} fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.6" />

      {PRIZES.map((prize, i) => {
        const startAngle = (i * SLICE - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * SLICE - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cx + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cx + r * Math.sin(endAngle);
        const midAngle = ((i + 0.5) * SLICE - 90) * (Math.PI / 180);
        const textR = r * 0.60;
        const tx = cx + textR * Math.cos(midAngle);
        const ty = cx + textR * Math.sin(midAngle);
        const textAngle = (i + 0.5) * SLICE;

        return (
          <g key={i}>
            <path
              d={`M${cx},${cx} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={prize.color}
              stroke={GOLD}
              strokeWidth="0.8"
              opacity="0.95"
            />
            <text
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={prize.textColor}
              fontSize="8.5"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.8"
              transform={`rotate(${textAngle}, ${tx}, ${ty})`}
            >
              {prize.label}
            </text>
          </g>
        );
      })}

      {/* Center hub */}
      <circle cx={cx} cy={cx} r={20} fill="#050505" stroke={GOLD} strokeWidth="1.5" />
      <circle cx={cx} cy={cx} r={14} fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.5" />
      <text x={cx} y={cx + 1} textAnchor="middle" dominantBaseline="middle" fontSize="13">🔥</text>
    </svg>
  );
}

export default function SpinWheelPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email');
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState(null);
  const [copied, setCopied] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('spinWheelSeen');
    if (seen) return;
    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('spinWheelSeen', '1');
  };

  const handleSpin = (e) => {
    e.preventDefault();
    if (!email) return;
    const prizeIdx = Math.floor(Math.random() * NUM);
    const targetAngle = 360 * 8 + (360 - prizeIdx * SLICE - SLICE / 2);
    setStep('spinning');

    let start = null;
    const duration = 4500;
    const startRot = rotation % 360;
    const endRot = startRot + targetAngle;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRotation(startRot + (endRot - startRot) * eased);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setRotation(endRot);
        setPrize(PRIZES[prizeIdx]);
        setStep('result');
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const copyCode = () => {
    if (prize?.code) {
      navigator.clipboard.writeText(prize.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
            onClick={dismiss}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 180 }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[360px] pointer-events-auto overflow-hidden"
              style={{
                backgroundColor: '#080808',
                border: '1px solid rgba(212,175,90,0.35)',
                boxShadow: '0 0 60px rgba(212,175,90,0.12), 0 30px 80px rgba(0,0,0,0.8)',
              }}
            >
              {/* Top gold line */}
              <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 z-10 opacity-40 hover:opacity-100 transition-opacity"
                style={{ color: GOLD }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="text-center pt-7 px-6 pb-2">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/c53d23798_IMG_20260213_173838.png"
                  alt="Torch Republic"
                  className="h-10 w-auto mx-auto mb-4 opacity-90"
                />
                <h2
                  className="text-2xl font-heading font-black uppercase tracking-[0.15em]"
                  style={{ color: '#FFFFFF' }}
                >
                  Spin to Win
                </h2>
                <p className="font-mono text-xs tracking-[0.25em] uppercase mt-1" style={{ color: GOLD }}>
                  Exclusive Discounts Await
                </p>
              </div>

              {/* Wheel */}
              <div className="flex justify-center pt-4 pb-2 relative">
                {/* Pointer arrow */}
                <div className="absolute top-2 left-1/2 z-10" style={{ transform: 'translateX(-50%)' }}>
                  <div
                    className="w-0 h-0 border-l-[9px] border-r-[9px] border-t-[16px] border-l-transparent border-r-transparent"
                    style={{ borderTopColor: GOLD_LIGHT }}
                  />
                </div>
                <Wheel rotation={rotation} />
              </div>

              {/* Thin gold divider */}
              <div className="mx-6 mb-5" style={{ height: '1px', background: 'rgba(212,175,90,0.15)' }} />

              {/* Content */}
              <div className="px-6 pb-7">
                {step === 'email' && (
                  <form onSubmit={handleSpin} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm font-mono focus:outline-none placeholder:text-gray-600"
                      style={{
                        backgroundColor: '#111',
                        border: '1px solid rgba(212,175,90,0.2)',
                        color: '#fff',
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 font-mono font-bold text-sm tracking-[0.25em] uppercase transition-opacity hover:opacity-85"
                      style={{ background: `linear-gradient(135deg, #C8A44D, ${GOLD_LIGHT}, #C8A44D)`, color: '#000' }}
                    >
                      SPIN THE WHEEL
                    </button>
                    <p className="text-center font-mono text-[10px] tracking-wider" style={{ color: '#444' }}>
                      BY ENTERING YOU AGREE TO RECEIVE OFFERS. NO SPAM.
                    </p>
                  </form>
                )}

                {step === 'spinning' && (
                  <p
                    className="text-center font-mono text-xs tracking-[0.4em] uppercase py-2 animate-pulse"
                    style={{ color: GOLD }}
                  >
                    Spinning...
                  </p>
                )}

                {step === 'result' && prize && (
                  <div className="text-center space-y-4">
                    {prize.code ? (
                      <>
                        <div>
                          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-1" style={{ color: GOLD }}>
                            Congratulations
                          </p>
                          <p className="text-white font-heading font-black text-2xl uppercase tracking-tight">
                            You Won {prize.label}
                          </p>
                        </div>
                        <div
                          className="py-4 px-4 cursor-pointer transition-opacity hover:opacity-80"
                          style={{ border: '1px dashed rgba(212,175,90,0.5)', backgroundColor: '#0f0f0f' }}
                          onClick={copyCode}
                        >
                          <p className="font-mono font-bold text-xl tracking-[0.3em]" style={{ color: GOLD_LIGHT }}>
                            {prize.code}
                          </p>
                          <p className="font-mono text-[10px] tracking-wider mt-1" style={{ color: '#555' }}>
                            {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY CODE'}
                          </p>
                        </div>
                        <button
                          onClick={dismiss}
                          className="w-full py-3 font-mono font-bold text-sm tracking-[0.25em] uppercase hover:opacity-85 transition-opacity"
                          style={{ background: `linear-gradient(135deg, #C8A44D, ${GOLD_LIGHT}, #C8A44D)`, color: '#000' }}
                        >
                          SHOP NOW →
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-white font-heading font-black text-xl uppercase">Better Luck Next Time</p>
                        <button
                          onClick={dismiss}
                          className="w-full py-3 font-mono font-bold text-sm tracking-[0.25em] uppercase hover:opacity-85 transition-opacity"
                          style={{ background: `linear-gradient(135deg, #C8A44D, ${GOLD_LIGHT}, #C8A44D)`, color: '#000' }}
                        >
                          SHOP ANYWAY →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom gold line */}
              <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}