import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Gift, Zap } from 'lucide-react';

const PRIZES = [
  { label: '10% OFF',   code: 'TORCH10',   dark: '#0d2a35', light: '#0a1e28' },
  { label: 'FREE SHIP', code: 'FREESHIP',  dark: '#071828', light: '#061220' },
  { label: '15% OFF',   code: 'TORCH15',   dark: '#0d2a35', light: '#0a1e28' },
  { label: 'TRY AGAIN', code: null,        dark: '#0d0d0d', light: '#080808' },
  { label: '20% OFF',   code: 'TORCH20',   dark: '#0d2a35', light: '#0a1e28' },
  { label: '5% OFF',    code: 'TORCH5',    dark: '#071828', light: '#061220' },
  { label: 'FREE GIFT', code: 'GIFTME',    dark: '#0d2a35', light: '#0a1e28' },
  { label: '12% OFF',   code: 'TORCH12',   dark: '#071828', light: '#061220' },
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

function Wheel({ rotation, size = 300 }) {
  const cx = size / 2;
  const r = size / 2 - 10;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ transform: `rotate(${rotation}deg)`, transition: 'none', filter: `drop-shadow(0 0 18px rgba(212,175,90,0.25))`, display: 'block' }}
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B5060" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <clipPath id="hubClip">
          <circle cx={cx} cy={cx} r={24} />
        </clipPath>
      </defs>

      {/* Outer glow ring */}
      <circle cx={cx} cy={cx} r={r + 10} fill="url(#bgGlow)" />
      <circle cx={cx} cy={cx} r={r + 9} fill="none" stroke="#0E2A2F" strokeWidth="6" />
      <circle cx={cx} cy={cx} r={r + 6} fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" />
      <circle cx={cx} cy={cx} r={r + 3} fill="none" stroke={GOLD_LIGHT} strokeWidth="2" opacity="0.7" />
      <circle cx={cx} cy={cx} r={r + 1} fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />

      {PRIZES.map((prize, i) => {
        const startAngle = (i * SLICE - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * SLICE - 90) * (Math.PI / 180);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cx + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cx + r * Math.sin(endAngle);
        const midAngle = ((i + 0.5) * SLICE - 90) * (Math.PI / 180);
        const textR = r * 0.64;
        const tx = cx + textR * Math.cos(midAngle);
        const ty = cx + textR * Math.sin(midAngle);
        const textAngle = (i + 0.5) * SLICE;
        const gradId = `sg${i}`;
        const glowId = `gg${i}`;

        return (
          <g key={i}>
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={prize.dark || '#0d0d0d'} />
                <stop offset="100%" stopColor={prize.light || '#080808'} />
              </linearGradient>
              <radialGradient id={glowId} cx="25%" cy="25%" r="75%">
                <stop offset="0%" stopColor={prize.code ? GOLD_LIGHT : '#fff'} stopOpacity={prize.code ? '0.12' : '0.02'} />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d={`M${cx},${cx} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={`url(#${gradId})`}
              stroke={GOLD}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <path
              d={`M${cx},${cx} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
              fill={`url(#${glowId})`}
            />
            <text
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={prize.code ? GOLD_LIGHT : '#444'}
              fontSize="9.5"
              fontWeight="900"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.8"
              transform={`rotate(${textAngle}, ${tx}, ${ty})`}
              style={{ textShadow: prize.code ? `0 0 6px ${GOLD}` : 'none' }}
            >
              {prize.label}
            </text>
          </g>
        );
      })}

      {/* Center hub */}
      <circle cx={cx} cy={cx} r={30} fill="#071520" stroke={GOLD} strokeWidth="2" />
      <circle cx={cx} cy={cx} r={26} fill="none" stroke={GOLD_LIGHT} strokeWidth="0.8" opacity="0.5" />
      <image
        href="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/45bacf9c2_2.png"
        x={cx - 22} y={cx - 22}
        width="44" height="44"
        clipPath="url(#hubClip)"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}

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
  const [wheelSize, setWheelSize] = useState(280);
  const animRef = useRef(null);

  // Responsive wheel size based on viewport
  useEffect(() => {
    const updateSize = () => {
      const w = Math.min(window.innerWidth, window.innerHeight, 360);
      setWheelSize(Math.max(220, Math.min(300, w - 80)));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('orientationchange', updateSize);
    };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [visible]);

  useEffect(() => {
    if (localStorage.getItem('spinWheelEmail')) return;
    const dismissedAt = localStorage.getItem('spinWheelDismissedAt');
    if (dismissedAt && (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24) < 3) return;
    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    // Only set dismissed timestamp if they haven't submitted their email
    if (!localStorage.getItem('spinWheelEmail')) {
      localStorage.setItem('spinWheelDismissedAt', Date.now().toString());
    }
  };

  const handleSpin = (e) => {
    e.preventDefault();
    if (!email) return;
    // Save email so popup never shows again
    localStorage.setItem('spinWheelEmail', email);

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
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 py-4 pointer-events-none overflow-y-auto"
          >
            <div
              className="relative w-full max-w-[400px] my-auto pointer-events-auto overflow-y-auto"
              style={{
                background: 'linear-gradient(175deg, #04111a 0%, #071e2a 25%, #0a2535 50%, #071520 75%, #020c12 100%)',
                border: '1px solid rgba(212,175,90,0.6)',
                boxShadow: `0 0 0 1px rgba(14,42,47,0.9), 0 0 0 3px rgba(212,175,90,0.06), 0 0 120px rgba(14,42,47,0.8), 0 0 80px rgba(212,175,90,0.2), 0 50px 140px rgba(0,0,0,0.98)`,
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 pointer-events-none" style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}`, opacity: 0.6 }} />
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`, opacity: 0.6 }} />
              <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none" style={{ borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}`, opacity: 0.6 }} />
              <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none" style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`, opacity: 0.6 }} />
              <GlowDots />

              <div style={{ height: '3px', background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, transparent 100%)` }} />

              <button
                onClick={dismiss}
                aria-label="Close"
                type="button"
                className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center rounded-full transition-all hover:opacity-100 opacity-90"
                style={{ border: '1px solid rgba(212,175,90,0.5)', color: GOLD, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 50, cursor: 'pointer' }}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center pt-5 px-4 sm:px-6 pb-0 relative z-10">
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

                <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase leading-tight tracking-tight" style={{ color: '#fff', textShadow: `0 0 30px rgba(212,175,90,0.3)` }}>
                  Spin &<br />
                  <span style={{ color: GOLD_LIGHT, textShadow: `0 0 20px ${GOLD}, 0 0 40px rgba(212,175,90,0.4)` }}>Win Big</span>
                </h2>
                <p className="font-mono text-[11px] sm:text-xs tracking-wider mt-1.5 mb-3" style={{ color: 'rgba(212,175,90,0.6)' }}>
                  Enter your email. One spin. Real rewards.
                </p>

                <div className="hidden sm:flex justify-center gap-4 mb-3">
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

              <div className="flex justify-center pt-2 pb-1 relative z-10">
                <div className="absolute top-0 left-1/2 z-20" style={{ transform: 'translateX(-50%)' }}>
                  <motion.div
                    animate={step === 'spinning' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent"
                      style={{ borderTopColor: GOLD_LIGHT, filter: `drop-shadow(0 2px 6px ${GOLD})` }} />
                  </motion.div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full" style={{ width: wheelSize, height: wheelSize, background: `radial-gradient(circle, rgba(14,42,47,0.6) 0%, rgba(212,175,90,0.06) 50%, transparent 70%)` }} />
                </div>

                <motion.div
                  animate={step === 'email' ? { rotate: [0, 1, -1, 0] } : {}}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                  style={{ width: wheelSize, height: wheelSize, position: 'relative', zIndex: 5 }}
                >
                  <Wheel rotation={rotation} size={wheelSize} />
                </motion.div>
              </div>

              <div className="mx-5 mb-4" style={{ height: '1px', background: 'rgba(212,175,90,0.12)' }} />

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
                      <img src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/45bacf9c2_2.png" className="inline-block w-5 h-5 mr-2 -mt-0.5" /> SPIN TO WIN
                    </motion.button>

                    <p className="text-center font-mono text-[9px] tracking-wider" style={{ color: '#333' }}>
                      NO PURCHASE REQUIRED · UNSUBSCRIBE ANYTIME
                    </p>
                    <button onClick={dismiss} className="w-full text-center font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>No thanks, I don't want a discount</button>
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

              <div style={{ height: '3px', background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, transparent 100%)` }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}