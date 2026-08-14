-- ── discount_codes table ─────────────────────────────────────────────────────
-- Voucher/discount codes, managed from the admin dashboard (/robertlogin).
-- Validated server-side at checkout (never trust a client-supplied price).

create table if not exists public.discount_codes (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  code         text not null unique,              -- stored UPPERCASE
  type         text not null default 'percent',   -- 'percent' | 'fixed'
  value        numeric(10,2) not null,            -- percent (e.g. 20) or euro amount (e.g. 10.00)

  active       boolean not null default true,
  valid_until  date,                              -- optional expiry (inclusive); null = no expiry

  times_used   integer not null default 0,        -- incremented on each successful redemption

  constraint discount_codes_type_check  check (type in ('percent', 'fixed')),
  constraint discount_codes_value_check check (value > 0),
  constraint discount_codes_percent_max check (type <> 'percent' or value <= 100)
);

create index if not exists discount_codes_code_idx on public.discount_codes (code);

-- Row Level Security: no anonymous access. All reads/writes go through the
-- server (API routes) using the service-role key, which bypasses RLS.
alter table public.discount_codes enable row level security;
