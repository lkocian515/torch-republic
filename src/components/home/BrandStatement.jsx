import React from 'react';
import { motion } from 'framer-motion';

export default function BrandStatement() {
  return (
    <section style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-2xl mx-auto px-8 py-36 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Rule */}
          <div className="w-12 h-px mx-auto mb-14" style={{ background: '#E6AC45' }} />

          <p
            className="font-serif mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#F7F2E9', lineHeight: 1.35, fontWeight: 600 }}
          >
            More than coffee.
          </p>
          <p
            className="font-serif"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', color: 'rgba(240,235,225,0.45)', lineHeight: 1.4, fontWeight: 400, fontStyle: 'italic' }}
          >
            A return to thought, discipline, and legacy.
          </p>

          {/* Rule */}
          <div className="w-12 h-px mx-auto mt-14" style={{ background: 'rgba(201,162,74,0.3)' }} />
        </motion.div>
      </div>
    </section>
  );
}