import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomeStoryStrip() {
  return (
    <section style={{ backgroundColor: '#050508', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
          style={{ minHeight: '480px' }}
        >
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"
            alt="Our Story"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.65 }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, #050508 100%)' }} />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col justify-center px-10 md:px-16 py-20"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.45)' }}>
            Our Story
          </p>
          <h2 className="font-serif mb-7" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 700, color: '#F7F2E9', lineHeight: 1.2 }}>
            Every great movement begins over a cup of coffee.
          </h2>
          <p className="font-heading leading-relaxed mb-8" style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9 }}>
            We believe every great movement begins over a cup of coffee — where ideas sharpen, resolve deepens, and ordinary people decide to do extraordinary things. Torch Republic exists for those moments. We craft every blend with the same precision and purpose that built this country.
          </p>
          <Link
            to="/CoffeeCollection"
            className="inline-flex w-fit font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-60"
            style={{ color: 'rgba(196,163,90,0.7)', borderBottom: '1px solid rgba(196,163,90,0.25)', paddingBottom: '3px' }}
          >
            Explore the Blends →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}