import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Gift, Zap } from 'lucide-react';

const PRIZES = [
  { label: '10% OFF',   code: 'TORCH10',   color: '#0a1628', textColor: '#F0D080' },
  { label: 'FREE SHIP', code: 'FREESHIP',  color: '#1a0d00', textColor: '#F0D080' },
  { label: '15% OFF',   code: 'TORCH15',   color: '#0f0a1e', textColor: '#F0D080' },
  { label: 'TRY AGAIN', code: null,        color: '#111111', textColor: '#555555' },
  { label: '20% OFF',   code: 'TORCH20',   color: '#0d1a0d', textColor: '#F0D080' },
  { label: '5% OFF',    code: 'TORCH5',    color: '#1a0a0a', textColor: '#F0D080' },
  { label: 'FREE GIFT', code: 'GIFTME',    color: '#0e1520', textColor: '#F0D080' },
  { label: '12% OFF',   code: 'TORCH12',   color: '#14100a', textColor: '#F0D080' },
];

const NUM = PRIZES.length;
const SLICE = 360 / NUM;
const GOLD = '#D4AF5A';
const GOLD_LIGHT = '#F0D080';

const PERKS = [
  { icon: Gift, text: 'Exclusive discount codes' },
  { icon: Zap, text: 'Up to 20% OFF your order' },
  { icon: Flame, text: 'Free gifts up for grabs' },
];

function Wheel({ rotation }) {
  const size = 280;
  const cx = size / 2;
  const r = size / 2 - 8;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: `rotate(${rotation}deg)`, transition: 'none' }}
    >
      {/* Glow ring */}
      <circle cx={cx} cy={cx} r={r + 6} fill="none" stroke={GOLD} strokeWidth="1" opacity="0.2" />
      <circle cx={cx} cy={cx} r={r + 3} fill="none" stroke={GOLD_LIGHT} strokeWidth="1.5" opacity="0.5" />

      {PRIZES.map((prize, i) => {
        const startAngle = (i * SLICE - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * SLICE - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cx + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cx + r * Math.sin(endAngle);
        const midAngle = ((i + 0.5) * SLICE - 90) * (Math.PI / 180);
        const textR = r * 0.66;
        const tx = cx + textR * Math.cos(midAngle);
        const ty = cx + textR * Math.sin(midAngle);
        const textAngle = (i + 0.5) * SLICE;

        return (
          <g key={i}>
            <path
              d={`M${cx},${cx} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={prize.color}
              stroke={GOLD}
              strokeWidth="1"
            />
            {/* Subtle radial highlight on each slice */}
            <path
              d={`M${cx},${cx} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={`url(#sliceGlow${i})`}
              opacity="0.15"
            />
            <defs>
              <radialGradient id={`sliceGlow${i}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor={GOLD_LIGHT} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <text
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={prize.textColor}
              fontSize="10"
              fontWeight="800"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.5"
              transform={`rotate(${textAngle}, ${tx}, ${ty})`}
            >
              {prize.label}
            </text>
          </g>
        );
      })}

      {/* Center hub with logo */}
      <circle cx={cx} cy={cx} r={28} fill="#050505" stroke={GOLD} strokeWidth="2" />
      <circle cx={cx} cy={cx} r={22} fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
      <image
        href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/c53d23798_IMG_20260213_173838.png"
        x={cx - 18} y={cx - 18}
        width="36" height="36"
        clipPath="url(#hubClip)"
        preserveAspectRatio="xMidYMid meet"
      />
      <defs>
        <clipPath id="hubClip">
          <circle cx={cx} cy={cx} r={22} />
        </clipPath>
      </defs>
    </svg>
  );
}

// Glowing dot decorations
function GlowDots() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            background: GOLD_LIGHT,
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            boxShadow: `0 0 8px ${GOLD}`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
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
  const [focused, setFocused] = useState(false);
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
    const duration = 5000;
    const startRot = rotation % 360;
    const endRot = startRot + targetAngle;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
            onClick={dismiss}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 160 }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[380px] pointer-events-auto overflow-hidden"
              style={{
                backgroundColor: '#070707',
                border: '1px solid rgba(212,175,90,0.4)',
                boxShadow: `0 0 0 1px rgba(212,175,90,0.08), 0 0 80px rgba(212,175,90,0.15), 0 40px 100px rgba(0,0,0,0.9)`,
              }}
            >
              <GlowDots />

              {/* Top accent line */}
              <div style={{ height: '3px', background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, transparent 100%)` }} />

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full transition-all hover:opacity-100 opacity-40"
                style={{ border: '1px solid rgba(212,175,90,0.3)', color: GOLD }}
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Header */}
              <div className="text-center pt-6 px-6 pb-0 relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full"
                  style={{ backgroundColor: 'rgba(212,175,90,0.1)', border: '1px solid rgba(212,175,90,0.25)' }}
                >
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                    🎯 Limited Time Offer
                  </span>
                </motion.div>

                <h2 className="text-3xl font-heading font-black uppercase leading-tight tracking-tight text-white">
                  Spin &<br />
                  <span style={{ color: GOLD_LIGHT }}>Win Big</span>
                </h2>
                <p className="font-mono text-xs tracking-wider mt-1.5 mb-3" style={{ color: 'rgba(212,175,90,0.6)' }}>
                  Enter your email. One spin. Real rewards.
                </p>

                {/* Perks row */}
                <div className="flex justify-center gap-4 mb-3">
                  {PERKS.map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,175,90,0.1)', border: '1px solid rgba(212,175,90,0.2)' }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      </div>
                      <span className="text-[9px] font-mono tracking-wider text-center" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 60 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wheel */}
              <div className="flex justify-center pt-2 pb-1 relative z-10">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 z-20" style={{ transform: 'translateX(-50%)' }}>
                  <motion.div
                    animate={step === 'spinning' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent"
                      style={{ borderTopColor: GOLD_LIGHT, filter: `drop-shadow(0 2px 6px ${GOLD})` }} />
                  </motion.div>
                </div>

                {/* Wheel glow backdrop */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle, rgba(212,175,90,0.08) 0%, transparent 70%)` }} />
                </div>

                <motion.div
                  animate={step === 'email' ? { rotate: [0, 1, -1, 0] } : {}}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Wheel rotation={rotation} />
                </motion.div>
              </div>

              {/* Divider */}
              <div className="mx-5 mb-4" style={{ height: '1px', background: 'rgba(212,175,90,0.12)' }} />

              {/* Form / Result */}
              <div className="px-5 pb-6 relative z-10">
                {step === 'email' && (
                  <form onSubmit={handleSpin} className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email to spin"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="w-full px-4 py-3.5 text-sm font-mono focus:outline-none placeholder:text-gray-600 transition-all"
                        style={{
                          backgroundColor: '#111',
                          border: `1px solid ${focused ? GOLD : 'rgba(212,175,90,0.2)'}`,
                          color: '#fff',
                          boxShadow: focused ? `0 0 20px rgba(212,175,90,0.15)` : 'none',
                        }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 font-mono font-black text-sm tracking-[0.3em] uppercase relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, #C8A44D 0%, ${GOLD_LIGHT} 50%, #C8A44D 100%)`,
                        color: '#000',
                        boxShadow: `0 4px 30px rgba(212,175,90,0.4)`,
                      }}
                    >
                      🔥 SPIN TO WIN
                    </motion.button>

                    <p className="text-center font-mono text-[9px] tracking-wider" style={{ color: '#333' }}>
                      NO PURCHASE REQUIRED · UNSUBSCRIBE ANYTIME
                    </p>
                  </form>
                )}

                {step === 'spinning' && (
                  <div className="text-center py-3">
                    <motion.p
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="font-mono text-sm tracking-[0.4em] uppercase"
                      style={{ color: GOLD }}
                    >
                      ✦ SPINNING ✦
                    </motion.p>
                  </div>
                )}

                {step === 'result' && prize && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3"
                  >
                    {prize.code ? (
                      <>
                        <div>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                            className="text-4xl mb-2"
                          >
                            🎉
                          </motion.div>
                          <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: GOLD }}>
                            You Won
                          </p>
                          <p className="text-white font-heading font-black text-3xl uppercase tracking-tight">
                            {prize.label}
                          </p>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="py-4 px-4 cursor-pointer"
                          style={{ border: '1px dashed rgba(212,175,90,0.5)', backgroundColor: '#0f0f0f', boxShadow: 'inset 0 0 20px rgba(212,175,90,0.05)' }}
                          onClick={copyCode}
                        >
                          <p className="font-mono font-black text-2xl tracking-[0.4em]" style={{ color: GOLD_LIGHT }}>
                            {prize.code}
                          </p>
                          <p className="font-mono text-[10px] tracking-wider mt-1.5" style={{ color: copied ? '#4ade80' : '#555' }}>
                            {copied ? '✓ COPIED!' : 'TAP TO COPY'}
                          </p>
                        </motion.div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={dismiss}
                          className="w-full py-4 font-mono font-black text-sm tracking-[0.3em] uppercase"
                          style={{
                            background: `linear-gradient(135deg, #C8A44D 0%, ${GOLD_LIGHT} 50%, #C8A44D 100%)`,
                            color: '#000',
                            boxShadow: `0 4px 30px rgba(212,175,90,0.4)`,
                          }}
                        >
                          SHOP NOW →
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl">😤</p>
                        <p className="text-white font-heading font-black text-xl uppercase">Better Luck Next Time!</p>
                        <button
                          onClick={dismiss}
                          className="w-full py-3 font-mono font-bold text-sm tracking-[0.25em] uppercase"
                          style={{ background: `linear-gradient(135deg, #C8A44D, ${GOLD_LIGHT}, #C8A44D)`, color: '#000' }}
                        >
                          SHOP ANYWAY →
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Bottom accent */}
              <div style={{ height: '3px', background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, transparent 100%)` }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}