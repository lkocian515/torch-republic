import React, { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { addBusinessDays, format, isSameMonth } from 'date-fns';

const RG = '#E6B7AD';

function formatRange(start, end) {
  if (isSameMonth(start, end)) {
    return `${format(start, 'MMM d')}–${format(end, 'd')}`;
  }
  return `${format(start, 'MMM d')}–${format(end, 'MMM d')}`;
}

export default function CartDeliveryEstimate() {
  const { rangeStr } = useMemo(() => {
    const today = new Date();
    // Ships in 1-2 business days + 2-5 business days transit
    const minDate = addBusinessDays(today, 3); // 1 + 2
    const maxDate = addBusinessDays(today, 7); // 2 + 5
    return { rangeStr: formatRange(minDate, maxDate) };
  }, []);

  return (
    <div className="flex items-center gap-2 mb-4 p-3" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
      <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RG }} />
      <p className="font-mono text-[9px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.7)' }}>
        Estimated Delivery: <span className="font-bold" style={{ color: '#F5EFE6' }}>{rangeStr}</span>
      </p>
    </div>
  );
}