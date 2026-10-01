-- ── Order details in the DB instead of Mollie metadata ───────────────────────
-- Mollie's metadata is limited to ~1 KB, so birth data for larger carts could
-- make the payment fail. Billing address + birth data now live on the order.
-- Idempotent, safe to run multiple times.
alter table public.orders add column if not exists billing_address  jsonb;
alter table public.orders add column if not exists birth_data       jsonb;
alter table public.orders add column if not exists skool_membership boolean not null default false;

-- Check: the three columns must be listed
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'orders'
  and column_name in ('billing_address', 'birth_data', 'skool_membership');
