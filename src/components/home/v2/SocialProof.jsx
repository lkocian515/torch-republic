import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GoldStars } from '../../../components/reviews/ReviewCard';

const REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', rating: 5, headline: "Best coffee I've had in years.", text: "The most heritage-forward coffee I've ever had. Rich, complex, and worthy of the name it carries. You can tell this isn't generic store coffee — it's intentional in every way." },
  { name: 'Sarah K.', location: 'Charleston, SC', rating: 5, headline: "Every morning feels like a ritual.", text: "Every morning feels like a deliberate act of legacy. I don't start my day without it. The Founders Series has ruined me for grocery store coffee permanently." },
  { name: 'James R.', location: 'Austin, TX', rating: 5, headline: "This feels like a collector's item.", text: "I bought the Founders Series for myself and three friends. Everyone ordered again within a week. The quality is undeniable — smooth, balanced, and genuinely impressive." },
  { name: 'David M.', location: 'Bozeman, MT', rating: 5, headline: "It's not just coffee. It's a mindset.", text: "Torch Republic gets it. The story behind each blend makes every cup mean something. I've tried them all and each one is distinct. Bold flavors, zero bitterness." },
  { name: 'Rachel B.', location: 'Knoxville, TN', rating: 5, headline: "The Torch Box is unreal.", text: "The Torch Box is the best subscription I've ever signed up for. Every month feels like a reveal. Premium coffee, premium packaging, premium experience — all the way through." },
];

export default function SocialProof() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % REVIEWS.length);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (dir) => {
    clearInterval(timerRef.current);
    setActive(p => (p + dir + REVIEWS.length) % REVIEWS.length);
    startTimer();
  };

  const r = REVIEWS[active];

  return (
    <section className="py-20 md:py-28 px-5 md:px-12 overflow-hidden"
      style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Verified Reviews
          </p>
          <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-0.02em' }}>
            Trusted by Patriots Across the Country
          </h2>
          <div className="flex items-center justify-center gap-2">
            <GoldStars rating={5} size="lg" />
            <span className="font-mono font-bold" style={{ color: '#E6AC45' }}>4.8</span>
            <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>· Verified Torchbearers</span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-12" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.3), transparent)' }} />

        {/* Desktop: 5-card grid */}
        <div className="hidden lg:grid grid-cols-5 gap-4">
          {REVIEWS.map((rev, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-all"
              style={{
                background: i === active ? '#141414' : '#0E0E0E',
                border: i === active ? '1px solid rgba(201,162,74,0.35)' : '1px solid rgba(201,162,74,0.08)',
                boxShadow: i === active ? '0 0 24px rgba(201,162,74,0.08)' : 'none',
              }}
              onClick={() => { clearInterval(timerRef.current); setActive(i); startTimer(); }}>
              <GoldStars rating={rev.rating} />
              {rev.headline && (
                <p className="font-serif font-semibold leading-snug" style={{ fontSize: '0.85rem', color: '#EAEAEA', lineHeight: 1.35 }}>
                  "{rev.headline}"
                </p>
              )}
              <p className="font-heading text-xs flex-1 leading-relaxed" style={{ color: '#F7F2E9', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.8 }}>
                {rev.text.length > 120 ? rev.text.slice(0, 117) + '…' : rev.text}
              </p>
              <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.65)' }}>{rev.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.28)' }}>{rev.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single rotating card with arrows */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl p-6 flex flex-col gap-4"
              style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.2)', boxShadow: '0 0 24px rgba(201,162,74,0.07)' }}>
              <GoldStars rating={r.rating} size="lg" />
              {r.headline && (
                <p className="font-serif font-semibold" style={{ fontSize: '1rem', color: '#EAEAEA', lineHeight: 1.4 }}>
                  "{r.headline}"
                </p>
              )}
              <p className="font-heading text-sm leading-relaxed" style={{ color: '#F7F2E9', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.9 }}>
                {r.text}
              </p>
              <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,162,74,0.08)' }}>
                <div>
                  <p className="font-mono text-xs font-bold" style={{ color: '#EAEAEA' }}>{r.name}</p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{r.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => go(-1)} className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors"
                    style={{ border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.5)' }}>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => go(1)} className="w-8 h-8 flex items-center justify-center rounded-sm transition-colors"
                    style={{ border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.5)' }}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-5">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => { clearInterval(timerRef.current); setActive(i); startTimer(); }}
                className="rounded-full transition-all"
                style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? '#E6AC45' : 'rgba(201,162,74,0.2)' }} />
            ))}
          </div>
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <a href="/reviews" className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 pb-0.5"
            style={{ color: 'rgba(201,162,74,0.5)', borderBottom: '1px solid rgba(201,162,74,0.18)' }}>
            View All Reviews →
          </a>
        </div>
      </div>
    </section>
  );
}