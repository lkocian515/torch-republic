import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Flame } from 'lucide-react';

const PRIZES = [
  { label: '10% OFF',       code: 'SPIN10',    color: '#1a0a00', textColor: '#C8A44D' },
  { label: 'FREE SHIP',     code: 'FREESHIP',  color: '#C8A44D', textColor: '#000000' },
  { label: '15% OFF',       code: 'SPIN15',    color: '#1a0a00', textColor: '#C8A44D' },
  { label: 'TRY AGAIN',     code: null,        color: '#2a1500', textColor: '#888888' },
  { label: '20% OFF',       code: 'SPIN20',    color: '#C8A44D', textColor: '#000000' },
  { label: '5% OFF',        code: 'SPIN5',     color: '#1a0a00', textColor: '#C8A44D' },
  { label: 'FREE GIFT',     code: 'GIFTME',    color: '#C8A44D', textColor: '#000000' },
  { label: '12% OFF',       code: 'SPIN12',    color: '#1a0a00', textColor: '#C8A44D' },
];

const NUM = PRIZES.length;
const SLICE = 360 / NUM;

function Wheel({ rotation }) {
  const size = 280;
  const cx = size / 2;
  const r = size / 2 - 4;

  const slices = PRIZES.map((prize, i) => {
    const startAngle = (i * SLICE - 90) * (Math.PI / 180);
    const endAngle = ((i + 1) * SLICE - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cx + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cx + r * Math.sin(endAngle);
    const midAngle = ((i + 0.5) * SLICE - 90) * (Math.PI / 180);
    const textR = r * 0.62;
    const tx = cx + textR * Math.cos(midAngle);
    const ty = cx + textR * Math.sin(midAngle);
    const textAngle = (i + 0.5) * SLICE;

    return { prize, x1, y1, x2, y2, tx, ty, textAngle };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: `rotate(${rotation}deg)`, transition: 'none' }}>
      {/* Outer ring */}
      <circle cx={cx} cy={cx} r={r + 3} fill="none" stroke="#C8A44D" strokeWidth="3" />

      {slices.map(({ prize, x1, y1, x2, y2, tx, ty, textAngle }, i) => (
        <g key={i}>
          <path
            d={`M${cx},${cx} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
            fill={prize.color}
            stroke="#C8A44D"
            strokeWidth="1"
          />
          <text
            x={tx}
            y={ty}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={prize.textColor}
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
            letterSpacing="0.5"
            transform={`rotate(${textAngle}, ${tx}, ${ty})`}
          >
            {prize.label}
          </text>
        </g>
      ))}

      {/* Center hub */}
      <circle cx={cx} cy={cx} r={18} fill="#0a0a0a" stroke="#C8A44D" strokeWidth="2" />
      <text x={cx} y={cx} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#C8A44D">🔥</text>
    </svg>
  );
}

export default function SpinWheelPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email'); // email | spinning | result
  const [rotation, setRotation] = useState(0);
  const [prize, setPrize] = useState(null);
  const [copied, setCopied] = useState(false);
  const spinRef = useRef(null);
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

    // Pick a prize (weighted — avoid "try again" too often)
    const prizeIdx = Math.floor(Math.random() * NUM);
    const targetAngle = 360 * 8 + (360 - prizeIdx * SLICE - SLICE / 2);

    setStep('spinning');

    // Animate wheel
    let start = null;
    const duration = 4000;
    const startRot = rotation % 360;
    const endRot = startRot + targetAngle;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startRot + (endRot - startRot) * eased;
      setRotation(current);

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
            className="fixed inset-0 bg-black/70 z-[100]"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-sm pointer-events-auto overflow-hidden"
              style={{ backgroundColor: '#0a0a0a', border: '1px solid #C8A44D33' }}
            >
              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="text-center pt-8 px-6 pb-4" style={{ background: 'linear-gradient(180deg, #1a0d00 0%, #0a0a0a 100%)' }}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Flame className="w-5 h-5" style={{ color: '#C8A44D' }} />
                  <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#C8A44D' }}>
                    Torch Republic
                  </p>
                  <Flame className="w-5 h-5" style={{ color: '#C8A44D' }} />
                </div>
                <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-white">
                  Spin to Win
                </h2>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  Enter your email for a chance to win a discount
                </p>
              </div>

              {/* Wheel */}
              <div className="flex justify-center py-4 relative">
                {/* Pointer */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent" style={{ borderTopColor: '#C8A44D' }} />
                </div>
                <Wheel rotation={rotation} />
              </div>

              {/* Content */}
              <div className="px-6 pb-8">
                {step === 'email' && (
                  <form onSubmit={handleSpin} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm font-mono focus:outline-none"
                      style={{ backgroundColor: '#111', border: '1px solid #C8A44D44', color: '#fff' }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 font-mono font-bold text-sm tracking-widest uppercase transition-all hover:opacity-90"
                      style={{ backgroundColor: '#C8A44D', color: '#000' }}
                    >
                      🔥 SPIN NOW
                    </button>
                    <p className="text-center text-xs text-muted-foreground font-mono">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}

                {step === 'spinning' && (
                  <p className="text-center font-mono text-sm tracking-widest uppercase animate-pulse" style={{ color: '#C8A44D' }}>
                    Spinning...
                  </p>
                )}

                {step === 'result' && prize && (
                  <div className="text-center space-y-4">
                    {prize.code ? (
                      <>
                        <p className="text-white font-heading font-black text-xl uppercase">
                          🎉 You Won {prize.label}!
                        </p>
                        <div
                          className="py-3 px-4 cursor-pointer hover:opacity-90 transition-opacity"
                          style={{ border: '2px dashed #C8A44D', backgroundColor: '#111' }}
                          onClick={copyCode}
                        >
                          <p className="font-mono font-bold text-lg tracking-widest" style={{ color: '#C8A44D' }}>
                            {prize.code}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 font-mono">
                            {copied ? '✓ Copied!' : 'Click to copy'}
                          </p>
                        </div>
                        <button
                          onClick={dismiss}
                          className="w-full py-3 font-mono font-bold text-sm tracking-widest uppercase"
                          style={{ backgroundColor: '#C8A44D', color: '#000' }}
                        >
                          SHOP NOW →
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-white font-heading font-black text-xl uppercase">Better Luck Next Time!</p>
                        <button
                          onClick={dismiss}
                          className="w-full py-3 font-mono font-bold text-sm tracking-widest uppercase"
                          style={{ backgroundColor: '#C8A44D', color: '#000' }}
                        >
                          SHOP ANYWAY →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}