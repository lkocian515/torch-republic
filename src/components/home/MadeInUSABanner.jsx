import React from 'react';
import { motion } from 'framer-motion';

const RED = '#B22234';
const BLUE = '#3C3B6E';

function USFlag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 100" width="52" height="34" style={{ flexShrink: 0, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px' }}>
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
        <rect key={i} x="0" y={i * (100/13)} width="190" height={100/13} fill={i % 2 === 0 ? '#B22234' : '#fff'} />
      ))}
      <rect x="0" y="0" width="76" height={100 * 7/13} fill="#3C3B6E" />
      {[0,1,2,3,4,5,6,7,8].map(row =>
        [0,1,2,3,4].map(col => (
          <text key={`${row}-${col}`} x={7 + col * 15 + (row % 2 === 0 ? 0 : 7.5)} y={8 + row * 8.5} fontSize="7" fill="white" textAnchor="middle">★</text>
        ))
      )}
    </svg>
  );
}

export default function MadeInUSABanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-7 px-6 overflow-hidden"
      style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.15)', borderBottom: '1px solid rgba(201,162,74,0.15)' }}
    >
      {/* Flag stripe accents - left */}
      <div className="absolute left-0 top-0 bottom-0 flex">
        {[RED, '#fff', RED, '#fff', RED, '#fff', RED].map((color, i) => (
          <div key={i} style={{ width: '4px', backgroundColor: color, opacity: color === '#fff' ? 0.12 : 0.45 }} />
        ))}
      </div>

      {/* Flag stripe accents - right */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-row-reverse">
        {[RED, '#fff', RED, '#fff', RED, '#fff', RED].map((color, i) => (
          <div key={i} style={{ width: '4px', backgroundColor: color, opacity: color === '#fff' ? 0.12 : 0.45 }} />
        ))}
      </div>

      {/* Blue canton accent */}
      <div className="absolute top-0 left-7 h-full w-10 opacity-20" style={{ backgroundColor: BLUE }} />

      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center sm:text-left px-8">
        <div className="flex items-center gap-4">
          <USFlag />
          <div>
            <p className="font-heading font-black text-sm md:text-base uppercase tracking-widest text-white">
              Proudly Made in the USA
            </p>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(201,162,74,0.8)' }}>
              Every product supports American workers &amp; domestic production.
            </p>
          </div>
        </div>

        <div className="hidden sm:block h-8 w-px" style={{ backgroundColor: 'rgba(201,162,74,0.2)' }} />

        <p className="font-mono text-xs tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Buy American. Stay Free.
        </p>
      </div>
    </motion.section>
  );
}