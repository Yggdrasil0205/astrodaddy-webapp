-- ── Missing tables + RLS (idempotent, safe to run multiple times) ─────────────
-- In production only discount_codes existed: 001_orders.sql had never been run
-- and newsletter_subscribers had never been created. Inserts from the API
-- failed silently (supabase-js returns errors instead of throwing).
-- Includes everything from 003_rls_hardening.sql, which aborted without the view.

-- 1) orders (same as 001_orders.sql)
create table if not exists public.orders (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  paid_at               timestamptz,
  mollie_payment_id     text unique,
  mollie_status         text,
  status                text not null default 'offen',
  product_id            text,
  product_name          text not null,
  amount                numeric(10,2) not null,
  original_amount       numeric(10,2),
  discount_code         text,
  customer_name         text not null,
  customer_email        text not null,
  customer_phone        text,
  lexoffice_invoice_id  text,
  invoice_number        text
);
create index if not exists orders_status_idx         on public.orders (status);
create index if not exists orders_created_at_idx     on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (customer_email);
alter table public.orders enable row level security;

create or replace view public.monthly_revenue
with (security_invoker = true) as
select
  date_trunc('month', paid_at) as month,
  count(*)                      as order_count,
  sum(amount)                   as total_revenue
from public.orders
where status = 'bezahlt'
group by 1
order by 1 desc;

-- 2) newsletter_subscribers (used by api/newsletter.ts)
create table if not exists public.newsletter_subscribers (
  id             uuid primary key default gen_random_uuid(),
  email          text not null unique,
  subscribed_at  timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;

-- 3) discount_codes: the spin "call" jackpot inserts value = 0, which the
--    original "value > 0" check rejected (→ 500 on 1 % of spins).
alter table public.discount_codes drop constraint if exists discount_codes_value_check;
alter table public.discount_codes add constraint discount_codes_value_check check (value >= 0);

-- 4) Voucher redemption: counted in the Mollie webhook once a payment is PAID.
--    One row per payment makes it idempotent (webhook re-deliveries), the
--    conditional update makes single-use KOSMOS- codes race-free.
create table if not exists public.voucher_redemptions (
  mollie_payment_id  text primary key,
  code               text not null,
  redeemed_at        timestamptz not null default now()
);
alter table public.voucher_redemptions enable row level security;

create or replace function public.redeem_voucher(p_payment_id text, p_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(p_code));
  v_rows int;
begin
  insert into voucher_redemptions (mollie_payment_id, code)
  values (p_payment_id, v_code)
  on conflict (mollie_payment_id) do nothing;
  get diagnostics v_rows = row_count;
  if v_rows = 0 then
    return 'already_processed';
  end if;

  update discount_codes
     set times_used = times_used + 1
   where code = v_code
     and (code not like 'KOSMOS-%' or times_used = 0);
  get diagnostics v_rows = row_count;
  return case when v_rows > 0 then 'redeemed' else 'exhausted' end;
end;
$$;
revoke all on function public.redeem_voucher(text, text) from public, anon, authenticated;
grant execute on function public.redeem_voucher(text, text) to service_role;

-- 5) No privileges for the public roles – all access via service-role key.
revoke all on public.orders                 from anon, authenticated;
revoke all on public.discount_codes         from anon, authenticated;
revoke all on public.newsletter_subscribers from anon, authenticated;
revoke all on public.monthly_revenue        from anon, authenticated;
revoke all on public.voucher_redemptions    from anon, authenticated;

-- ── Check: must list discount_codes, newsletter_subscribers, orders,
--    voucher_redemptions – all true
select relname, relrowsecurity as rls_enabled
from pg_class
where relnamespace = 'public'::regnamespace and relkind = 'r'
order by relname;
