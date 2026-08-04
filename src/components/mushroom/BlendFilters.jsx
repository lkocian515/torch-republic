import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Zap, Coffee } from 'lucide-react';
import MobileSelect from '@/components/forms/MobileSelect';

const RG = '#E6B7AD';

const ROAST_OPTIONS = [
  { value: 'all', label: 'All Roasts', icon: Coffee },
  { value: 'light', label: 'Light', range: '1-4' },
  { value: 'medium', label: 'Medium', range: '5-6' },
  { value: 'dark', label: 'Dark', range: '7-10' },
];

const CAFFEINE_OPTIONS = [
  { value: 'all', label: 'All Levels', icon: Zap },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function BlendFilters({ roastFilter, caffeineFilter, onFilterChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-4 h-4" style={{ color: RG }} />
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
          Filter Blends
        </span>
      </div>

      <div className="grid gap-3 md:hidden">
        <MobileSelect
          ariaLabel="Filter by roast intensity"
          title="Roast Intensity"
          value={roastFilter}
          onChange={(value) => onFilterChange('roast', value)}
          options={ROAST_OPTIONS}
          className="rounded-sm border px-4 font-mono text-[9px] uppercase tracking-[0.25em]"
          style={{ background: '#FFFFFF', borderColor: '#E4D8C9', color: '#6D625A' }}
        />
        <MobileSelect
          ariaLabel="Filter by caffeine level"
          title="Caffeine"
          value={caffeineFilter}
          onChange={(value) => onFilterChange('caffeine', value)}
          options={CAFFEINE_OPTIONS}
          className="rounded-sm border px-4 font-mono text-[9px] uppercase tracking-[0.25em]"
          style={{ background: '#FFFFFF', borderColor: '#E4D8C9', color: '#6D625A' }}
        />
      </div>

      <div className="hidden flex-wrap gap-4 md:flex">
        {/* Roast Intensity */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: '#6D625A' }}>
            Roast Intensity
          </span>
          <div className="flex gap-1.5">
            {ROAST_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = roastFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onFilterChange('roast', opt.value)}
                  className="min-h-[44px] px-3 py-2 transition-all"
                  style={{
                    background: isActive ? `${RG}15` : '#FFFFFF',
                    border: `1px solid ${isActive ? RG : '#E4D8C9'}`,
                    color: isActive ? RG : '#6D625A',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-3 h-3" />}
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase">
                      {opt.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caffeine Level */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: '#6D625A' }}>
            Caffeine
          </span>
          <div className="flex gap-1.5">
            {CAFFEINE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = caffeineFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onFilterChange('caffeine', opt.value)}
                  className="min-h-[44px] px-3 py-2 transition-all"
                  style={{
                    background: isActive ? `${RG}15` : '#FFFFFF',
                    border: `1px solid ${isActive ? RG : '#E4D8C9'}`,
                    color: isActive ? RG : '#6D625A',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-3 h-3" />}
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase">
                      {opt.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}