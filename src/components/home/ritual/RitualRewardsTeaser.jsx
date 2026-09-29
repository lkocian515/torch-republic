import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function RitualRewardsTeaser() {
  return (
    <section style={{ background: '#FBF8F1' }}>
      <div className="mx-auto max-w-[1000px] px-6 py-16 md:px-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-torch p-8 text-center md:p-12"
          style={{ background: '#FFFDF8' }}
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: '#F2E2D2' }}>
            <Gift className="h-6 w-6" style={{ color: '#B7653E' }} />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#A97B32' }}>
            Sip. Earn. Repeat.
          </p>
          <h2
            className="mt-3 font-serif font-semibold"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#292622', textWrap: 'balance' }}
          >
            Drink what you love. Earn while you do.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-heading" style={{ color: '#5F574F', lineHeight: 1.7 }}>
            Earn points when you shop and redeem them for future Torch Republic purchases. Subscribers keep earning on
            every recurring order.
          </p>
          <Link to="/torchbearers-rewards" className="btn btn-primary mt-7" style={{ minWidth: '200px' }}>
            Explore Torchbearer Rewards
          </Link>
        </motion.div>
      </div>
    </section>
  );
}