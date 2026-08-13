-- ── orders table ─────────────────────────────────────────────────────────────
-- Stores all shop orders. Created when checkout starts, updated on Mollie webhook.

create table if not exists public.orders (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  paid_at               timestamptz,

  -- Mollie
  mollie_payment_id     text unique,
  mollie_status         text,                        -- open | pending | paid | failed | canceled | expired

  -- Our status
  status                text not null default 'offen',  -- offen | bezahlt | storniert | fehlgeschlagen | abgelaufen

  -- Product
  product_id            text,
  product_name          text not null,
  amount                numeric(10,2) not null,      -- final amount paid (after discount)
  original_amount       numeric(10,2),               -- amount before discount
  discount_code         text,

  -- Customer
  customer_name         text not null,
  customer_email        text not null,
  customer_phone        text,

  -- Lexoffice
  lexoffice_invoice_id  text,
  invoice_number        text
);

-- Indexes for common queries
create index if not exists orders_status_idx        on public.orders (status);
create index if not exists orders_created_at_idx    on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (customer_email);

-- RLS: only service role can read/write (frontend uses API routes)
alter table public.orders enable row level security;

-- No public access – all access goes through Vercel API routes using service role key
create policy "No public access" on public.orders
  for all using (false);

-- ── Helper view for monthly revenue (used by admin dashboard) ─────────────────
create or replace view public.monthly_revenue as
select
  date_trunc('month', paid_at) as month,
  count(*)                      as order_count,
  sum(amount)                   as total_revenue
from public.orders
where status = 'bezahlt'
group by 1
order by 1 desc;
