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
    // Conservative: 1-3 business days processing + 2-7 business days transit
    const minDate = addBusinessDays(today, 3); // 1 + 2
    const maxDate = addBusinessDays(today, 10); // 3 + 7
    return { nationwideRange: formatRange(minDate, maxDate) };
  }, []);

  return (
    <div className="mb-4 p-3" style={{ background: '#FBF8F2', border: `1px solid ${BORDER}` }}>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} />
        <p className="font-heading text-sm leading-relaxed" style={{ color: MUTED }}>
          <span className="font-bold" style={{ color: INK }}>Processing:</span> 1&ndash;3 business days
        </p>
      </div>
      <div className="space-y-1.5 mb-3">
        <p className="font-heading text-sm leading-relaxed mb-1" style={{ color: MUTED }}>
          <span style={{ color: INK }}>Transit</span> (varies by location):
        </p>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="font-heading text-sm leading-relaxed" style={{ color: MUTED }}>
            <span style={{ color: INK }}>Texas:</span> 2&ndash;4 business days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="font-heading text-sm leading-relaxed" style={{ color: MUTED }}>
            <span style={{ color: INK }}>Southern US:</span> 3&ndash;5 business days
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: ACCENT }} />
          <p className="font-heading text-sm leading-relaxed" style={{ color: MUTED }}>
            <span style={{ color: INK }}>Nationwide:</span> 3&ndash;7 business days
          </p>
        </div>
      </div>
      <p className="font-heading text-sm leading-relaxed pt-2" style={{ color: MUTED, borderTop: `1px solid ${BORDER}` }}>
        Estimated total delivery: {nationwideRange}. Tracking emailed once shipped.
      </p>
    </div>
  );
}