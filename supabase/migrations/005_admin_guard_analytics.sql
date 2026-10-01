-- ── Admin brute-force guard + long-term Vercel Web Analytics archive ──────────
-- Idempotent, safe to run multiple times. Server-only (service-role key).

-- 1) Failed /robertlogin attempts per IP (see src/lib/admin-auth.ts).
--    Rows older than a day are pruned by the daily cron.
create table if not exists public.admin_login_failures (
  id          bigserial primary key,
  ip          text not null,
  created_at  timestamptz not null default now()
);
create index if not exists admin_login_failures_ip_time_idx
  on public.admin_login_failures (ip, created_at desc);
alter table public.admin_login_failures enable row level security;

-- 2) Daily Vercel Web Analytics snapshot (see src/lib/analytics-sync.ts).
--    Vercel keeps 30 days on the free plan; this table keeps them forever.
--    dimension: 'total' | 'path' | 'referrer' | 'country' | 'device' | 'browser' | 'os'
--    key:       the dimension value ('' for total); 'Others' collects the long tail
create table if not exists public.analytics_daily (
  day         date not null,
  dimension   text not null,
  key         text not null default '',
  pageviews   integer not null default 0,
  visitors    integer not null default 0,
  synced_at   timestamptz not null default now(),
  primary key (day, dimension, key)
);
create index if not exists analytics_daily_dim_day_idx on public.analytics_daily (dimension, day desc);
alter table public.analytics_daily enable row level security;

-- 3) Summary for the admin dashboard, aggregated in the DB (PostgREST caps
--    plain selects at 1000 rows). p_since = null → whole history.
create or replace function public.analytics_summary(p_since date)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'daily', coalesce((
      select jsonb_agg(jsonb_build_object('day', day, 'pageviews', pageviews, 'visitors', visitors) order by day)
      from analytics_daily
      where dimension = 'total' and (p_since is null or day >= p_since)
    ), '[]'::jsonb),
    'top', coalesce((
      select jsonb_object_agg(dimension, items)
      from (
        select dimension,
               jsonb_agg(jsonb_build_object('key', key, 'pageviews', pv, 'visitors', vi) order by pv desc) as items
        from (
          select dimension, key, sum(pageviews) as pv, sum(visitors) as vi,
                 row_number() over (partition by dimension order by sum(pageviews) desc) as rn
          from analytics_daily
          where dimension <> 'total' and (p_since is null or day >= p_since)
          group by dimension, key
        ) ranked
        where rn <= 15
        group by dimension
      ) per_dim
    ), '{}'::jsonb),
    'first_day', (select min(day) from analytics_daily where dimension = 'total'),
    'last_day',  (select max(day) from analytics_daily where dimension = 'total'),
    'last_sync', (select max(synced_at) from analytics_daily)
  );
$$;
revoke all on function public.analytics_summary(date) from public, anon, authenticated;
grant execute on function public.analytics_summary(date) to service_role;

revoke all on public.admin_login_failures from anon, authenticated;
revoke all on public.analytics_daily      from anon, authenticated;

-- ── Check: all six tables must show true
select relname, relrowsecurity as rls_enabled
from pg_class
where relnamespace = 'public'::regnamespace and relkind = 'r'
order by relname;
