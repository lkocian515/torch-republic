import React from 'react';
import { Link } from 'react-router-dom';
import { duoCalendar, duoName, duoPath, duoStatus, STATUS_LABEL } from '@/lib/duos';
import { windowLabel, MONTH_NAMES } from '@/lib/seasonalCalendar';

/** Month-by-month overview: every duo with its coffees, window and status. */
export default function DuoMonthTable({ catalog }) {
  const rows = duoCalendar().sort((a, b) => a.month - b.month);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" style={{ borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
        <caption className="sr-only">2027 duos by month</caption>
        <thead>
          <tr style={{ borderBottom: '1px solid hsl(var(--border))' }}>
            <th scope="col" className="py-2 pr-4">Month</th>
            <th scope="col" className="py-2 pr-4">Duo</th>
            <th scope="col" className="py-2 pr-4">Two coffees</th>
            <th scope="col" className="py-2 pr-4">Checkout window</th>
            <th scope="col" className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid hsl(var(--border))' }}>
            <td className="py-3 pr-4">{MONTH_NAMES[0]}</td>
            <td className="py-3 pr-4"><Link to="/special-editions/cinnamon-hearth" style={{ color: 'hsl(var(--primary))' }}>Cinnamon Hearth single-bag feature</Link></td>
            <td className="py-3 pr-4">Cinnamon Hearth</td>
            <td className="py-3 pr-4">January 1–February 28</td>
            <td className="py-3">Single coffee, no duo</td>
          </tr>
          {rows.map((row) => (
            <tr key={row.slug} style={{ borderBottom: '1px solid hsl(var(--border))' }}>
              <td className="py-3 pr-4">{row.monthLabel}</td>
              <td className="py-3 pr-4">
                <Link to={duoPath(row)} style={{ color: 'hsl(var(--primary))' }}>{row.monthlyName || duoName(row)}</Link>
              </td>
              <td className="py-3 pr-4">{row.contents.map((c) => (c.qty > 1 ? `${c.qty} \u00d7 ${c.name}` : c.name)).join(' + ')}</td>
              <td className="py-3 pr-4">{row.window ? `${windowLabel(row.window)}, 2027` : ''}</td>
              <td className="py-3">{STATUS_LABEL[duoStatus(row, catalog)]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}