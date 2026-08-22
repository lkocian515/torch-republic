import React, { useMemo } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { addBusinessDays, format, isSameMonth } from 'date-fns';

const ACCENT = '#B86543';
const INK = '#2D2824';
const MUTED = '#6A5A4A';
const BORDER = '#E4D8C9';

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
    <div className="mb-4 p-3" style={{ background: '#FBF8F2', border: `1px solid ${BORDER}` }}>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} />
        <p className="font-mono text-[9px] tracking-[0.1em]" style={{ color: MUTED }}>
          Orders typically ship within <span className="font-bold" style={{ color: INK }}>1–2 business days</span>
        </p>
      </div>
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: MUTED }}>
            <span style={{ color: INK }}>Texas:</span> 2–4 business days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: MUTED }}>
            <span style={{ color: INK }}>Southern US:</span> 3–5 business days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: MUTED }}>
            <span style={{ color: INK }}>Nationwide:</span> 3–7 business days
          </p>
        </div>
      </div>
      <p className="font-mono text-[8px] tracking-[0.1em] pt-2" style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}>
        Tracking information is emailed once your order ships.
      </p>
    </div>
  );
}