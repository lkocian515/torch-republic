import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSEO } from '@/hooks/useSEO';
import { STATUSES } from '@/lib/clubStatuses';
import ClubSubscriberStats from '@/components/admin/club/ClubSubscriberStats';
import ClubSubscriberTable from '@/components/admin/club/ClubSubscriberTable';
import AddClubSubscriberForm from '@/components/admin/club/AddClubSubscriberForm';

/**
 * The Monthly Special Edition Club roster: everyone who has joined the club,
 * where they stand, and what they are subscribed to.
 */
export default function AdminClubSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [counts, setCounts] = useState({});
  const [status, setStatus] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useSEO({ title: 'Club Subscribers', url: '/admin/club-subscribers', noindex: true });

  const load = useCallback(async () => {
    setLoading(true);
    const query = {};
    if (status !== 'all') query.status = status;
    const term = search.trim();
    if (term) {
      query.$or = [
        { email: { $regex: term, $options: 'i' } },
        { full_name: { $regex: term, $options: 'i' } },
      ];
    }

    const [page, total, ...statusTotals] = await Promise.all([
      base44.entities.ClubSubscriber.filter(query, { sort: '-created_date', limit: 100 }),
      base44.entities.ClubSubscriber.count({}),
      ...STATUSES.map((value) => base44.entities.ClubSubscriber.count({ status: value })),
    ]);

    const nextCounts = { total };
    STATUSES.forEach((value, index) => {
      nextCounts[value] = statusTotals[index];
    });

    setSubscribers(page.items || []);
    setCounts(nextCounts);
    setLoading(false);
  }, [status, search]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (row, next) => {
    setSubscribers((current) => current.map((item) => (item.id === row.id ? { ...item, status: next } : item)));
    await base44.entities.ClubSubscriber.update(row.id, { status: next });
    load();
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.35em] text-primary">
        Torch Republic · Club
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">Club subscribers</h1>
      <p className="mt-2 max-w-xl font-heading text-sm text-muted-foreground">
        Every waitlist join is recorded here automatically. Mark someone active once their club subscription
        starts in Shopify, since the store does not report subscription customers back to this app.
      </p>

      <div className="mt-8">
        <ClubSubscriberStats counts={counts} />
      </div>

      <AddClubSubscriberForm onAdded={load} />

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', ...STATUSES].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              aria-pressed={status === value}
              className={`rounded-full border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.15em] transition-colors ${
                status === value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSearch(searchInput);
          }}
          className="flex gap-2"
        >
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search email or name"
            aria-label="Search subscribers"
            className="min-h-[38px] rounded border border-border bg-background px-3 font-heading text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <button
            type="submit"
            className="rounded border border-border px-3 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-foreground"
          >
            Search
          </button>
        </form>
      </div>

      <ClubSubscriberTable subscribers={subscribers} loading={loading} onStatusChange={handleStatusChange} />
    </div>
  );
}