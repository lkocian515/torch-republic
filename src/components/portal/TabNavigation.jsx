import React from 'react';
import { Package, Gift } from 'lucide-react';

const RG = '#E6AC45';

export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'subscription', label: 'Subscription', icon: Package },
    { id: 'loyalty', label: 'Loyalty Points', icon: Gift },
  ];

  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm whitespace-nowrap transition-all"
            style={{
              background: isActive ? `${RG}15` : 'transparent',
              border: `1px solid ${isActive ? RG + '40' : 'rgba(230,183,173,0.1)'}`,
              color: isActive ? RG : 'rgba(240,235,225,0.4)',
            }}
          >
            <Icon className="w-4 h-4" />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}