-- ── Per-code product exclusions ──────────────────────────────────────────────
-- A discount code can exclude individual products; the discount then applies
-- only to the non-excluded items in the cart. Stored as a JSON array of product
-- ids (from src/app/data/products.ts). Idempotent.
alter table public.discount_codes
  add column if not exists excluded_products jsonb not null default '[]'::jsonb;

-- Check: the column exists
-- select column_name, data_type from information_schema.columns
-- where table_schema='public' and table_name='discount_codes' and column_name='excluded_products';
