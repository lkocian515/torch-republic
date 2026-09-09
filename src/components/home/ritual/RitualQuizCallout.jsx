import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

// Placed after the three-product section so visitors who are unsure
// which product fits have a clear next step. NOT a popup.
export default function RitualQuizCallout() {
  return (
    <section style={{ background: '#FBF8F1' }}>
      <div className="mx-auto max-w-[800px] px-6 py-12 md:px-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-torch flex flex-col items-center gap-5 p-8 text-center md:flex-row md:text-left md:p-10"
          style={{ background: '#FFFDF8' }}
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full" style={{ background: '#EFE5D6' }}>
            <Clock size={22} style={{ color: '#B7653E' }} />
          </div>
          <div className="flex-1">
            <h3 className="font-serif font-bold" style={{ fontSize: 'clamp(1.25rem,2.5vw,1.5rem)', color: '#292622' }}>
              Not sure which ritual fits your morning?
            </h3>
            <p className="mt-2 font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.6 }}>
              Answer four quick questions and we will match you to the right ritual.
            </p>
          </div>
          <Link to="/quiz" className="btn btn-primary flex-shrink-0">
            Take the 60-Second Quiz <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}