import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function JoinMovementBanner() {
  return (
    <section className="px-6 py-12" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(200,164,77,0.1)' }}>
      <div className="max-w-4xl mx-auto" style={{ border: '1px solid rgba(27,80,96,0.5)', background: 'linear-gradient(135deg, rgba(14,42,47,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(200,164,77,0.08) 100%)' }}>
        <div className="px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#C8A44D' }}>Limited Time</p>
            <h3 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-white">Free Shipping on Orders $45+</h3>
            <p className="text-gray-400 text-sm mt-1">Use code <span className="font-mono font-bold" style={{ color: '#C8A44D' }}>PATRIOT</span> at checkout for 10% off your first order.</p>
          </div>
          <Link
            to={createPageUrl('BestSellers')}
            className="flex-shrink-0 inline-flex items-center justify-center font-heading font-black text-sm tracking-widest uppercase px-8 py-4 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C8A44D 100%)', color: '#fff', boxShadow: '0 4px 24px rgba(14,42,47,0.5), 0 0 0 1px rgba(200,164,77,0.3)' }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}