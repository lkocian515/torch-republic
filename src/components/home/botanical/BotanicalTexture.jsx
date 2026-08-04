import React from 'react';
import { Leaf, Sprout } from 'lucide-react';
import { colors } from '@/components/home/editorial/theme';

export default function BotanicalTexture() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden"><Leaf className="absolute -left-6 top-12 h-32 w-32 rotate-[-18deg] opacity-10" style={{ color: colors.forest }} /><Sprout className="absolute -right-4 bottom-10 h-28 w-28 rotate-12 opacity-10" style={{ color: colors.clay }} /><div className="absolute left-1/2 top-0 h-px w-64 -translate-x-1/2" style={{ background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)` }} /></div>;
}