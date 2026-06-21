import React, { useMemo } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { addBusinessDays, format, isSameMonth } from 'date-fns';

const RG = '#E6B7AD';

function formatRange(start, end) {
  if (isSameMonth(start, end)) {
    return `${format(start, 'MMM d')}–${format(end, 'd')}`;
  }
  return `${format(start, 'MMM d')}–${format(end, 'MMM d')}`;
}

export default function CartDeliveryEstimate() {
  const { nationwideRange } = useMemo(() => {
    const today = new Date();
    // Ships in 1-2 business days + 3-7 business days transit (nationwide)
    const minDate = addBusinessDays(today, 4); // 1 + 3
    const maxDate = addBusinessDays(today, 9); // 2 + 7
    return { nationwideRange: formatRange(minDate, maxDate) };
  }, []);

  return (
    <div className="mb-4 p-3" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RG }} />
        <p className="font-mono text-[9px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.7)' }}>
          Orders typically ship within <span className="font-bold" style={{ color: '#F5EFE6' }}>1–2 business days</span>
        </p>
      </div>
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.4)' }} />
          <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.6)' }}>
            <span style={{ color: 'rgba(245,239,230,0.85)' }}>Texas:</span> 2–4 business days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.4)' }} />
          <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.6)' }}>
            <span style={{ color: 'rgba(245,239,230,0.85)' }}>Southern US:</span> 3–5 business days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.4)' }} />
          <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.6)' }}>
            <span style={{ color: 'rgba(245,239,230,0.85)' }}>Nationwide:</span> 3–7 business days
          </p>
        </div>
      </div>
      <p className="font-mono text-[8px] tracking-[0.1em] pt-2" style={{ color: 'rgba(230,183,173,0.5)', borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        Tracking information is emailed once your order ships.
      </p>
    </div>
  );
}