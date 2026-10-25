const TZ = 'America/Chicago';

export const todayISO = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const toUTC = (iso) => {
  const [y, m, d] = String(iso || '').slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return null;
  return Date.UTC(y, m - 1, d);
};

export const daysUntil = (iso) => {
  const target = toUTC(iso);
  const today = toUTC(todayISO());
  if (target === null || today === null) return null;
  return Math.round((target - today) / 86400000);
};

export const formatDate = (iso) => {
  const utc = toUTC(iso);
  if (utc === null) return 'not set';
  return new Date(utc).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const dueLabel = (iso) => {
  const n = daysUntil(iso);
  if (n === null) return { text: 'no date set', overdue: false };
  if (n < 0) return { text: `${Math.abs(n)} day${Math.abs(n) === 1 ? '' : 's'} overdue`, overdue: true };
  if (n === 0) return { text: 'due today', overdue: false };
  return { text: `in ${n} day${n === 1 ? '' : 's'}`, overdue: false };
};

export const statusClass = (status) => {
  if (['Approved', 'Scheduled', 'Live', 'Complete'].includes(status)) return 'text-primary';
  if (status === 'Paused') return 'text-destructive';
  if (['In Preparation', 'Awaiting Supplier Approval', 'Ready for Review'].includes(status)) return 'text-foreground';
  return 'text-muted-foreground';
};

export const asArray = (res) => (Array.isArray(res) ? res : res?.items || []);