import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function JoinMovementBanner() {
  return (
    <section className="bg-black py-8 px-6 flex justify-center">
      <Link
        to={createPageUrl('Mission')}
        className="inline-flex items-center justify-center font-mono font-bold text-xs tracking-[0.3em] uppercase px-10 py-4 rounded-sm transition-all duration-200"
        style={{ border: '1px solid #D6B565', color: '#E8DFAF', backgroundColor: 'transparent' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C8A44D18'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        Join the Movement
      </Link>
    </section>
  );
}