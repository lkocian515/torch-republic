import React from 'react';
import { Link } from 'react-router-dom';

const FOUNDERS = [
  { code: 'TR-001', name: 'Washington', to: '/WashingtonBlend', handle: 'washington-blend' },
  { code: 'TR-002', name: 'Franklin', to: '/FranklinBlend', handle: 'franklin-blend' },
  { code: 'TR-003', name: 'Jefferson', to: '/JeffersonBlend', handle: 'jefferson-blend' },
  { code: 'TR-004', name: 'Lincoln', to: '/LincolnBlend', handle: 'lincoln-blend' },
  { code: 'TR-005', name: 'Roosevelt', to: '/RooseveltBlend', handle: 'roosevelt-blend' },
  { code: 'TR-006', name: 'Adams', to: '/AdamsBlend', handle: 'adams-blend' },
];

export default function FoundersCollectionProgress({ currentHandle, accent = '#E6AC45' }) {
  return (
    <div className="mt-4 p-5" style={{ background: '#0A0A0A', border: `1px solid ${accent}15` }}>
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: `${accent}55` }}>
          Founders Series · Collect All 6
        </p>
        <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Each blend retires forever
        </p>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {FOUNDERS.map((f) => {
          const isCurrent = f.handle === currentHandle;
          return isCurrent ? (
            <div key={f.code} className="flex flex-col items-center gap-1.5">
              <div
                className="w-full h-1.5 rounded-sm"
                style={{ background: accent }}
              />
              <span className="font-mono text-[8px] tracking-wider text-center leading-tight" style={{ color: accent }}>{f.name}</span>
            </div>
          ) : (
            <Link key={f.code} to={f.to} className="flex flex-col items-center gap-1.5 group">
              <div
                className="w-full h-1.5 rounded-sm transition-all group-hover:opacity-70"
                style={{ background: `${accent}20`, border: `1px solid ${accent}18` }}
              />
              <span className="font-mono text-[8px] tracking-wider text-center leading-tight transition-colors group-hover:opacity-70" style={{ color: 'rgba(255,255,255,0.22)' }}>{f.name}</span>
            </Link>
          );
        })}
      </div>
      <p className="font-mono text-[8px] mt-3 text-center" style={{ color: 'rgba(255,255,255,0.18)' }}>
        Complete the set. Build your legacy.
      </p>
    </div>
  );
}