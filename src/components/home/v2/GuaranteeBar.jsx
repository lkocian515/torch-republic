import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuaranteeBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 px-5 md:px-12"
      style={{ background: 'rgba(201,162,74,0.04)', borderTop: '1px solid rgba(201,162,74,0.12)', borderBottom: '1px solid rgba(201,162,74,0.08)' }}
    >
      <div className="max-w-[680px] mx-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
          style={{ border: '1px solid rgba(201,162,74,0.25)', background: 'rgba(201,162,74,0.06)' }}>
          <ShieldCheck className="w-5 h-5" style={{ color: '#C9A24A' }} />
        </div>
        <div>
          <p className="font-serif font-semibold text-white mb-1" style={{ fontSize: '1.05rem' }}>
            Our Guarantee
          </p>
          <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
            If it's not the best coffee you've had, we'll make it right.{' '}
            <Link to="/Contact" className="transition-opacity hover:opacity-70 pb-0.5"
              style={{ color: 'rgba(201,162,74,0.65)', borderBottom: '1px solid rgba(201,162,74,0.2)' }}>
              Contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </motion.section>
  );
}