-- ── RLS hardening ────────────────────────────────────────────────────────────
-- All data access goes through Vercel API routes using the service-role key
-- (which bypasses RLS). The public anon key is only used for Auth in the
-- browser, so anon/authenticated must never read any shop table directly.

-- 1) monthly_revenue view: views run with the owner's rights by default and
--    therefore BYPASS the RLS on public.orders → revenue was readable with the
--    public anon key. Make the view respect the caller's RLS and drop grants.
alter view public.monthly_revenue set (security_invoker = true);
revoke all on public.monthly_revenue from anon, authenticated;

-- 2) Defense in depth: no table privileges for the public roles at all.
revoke all on public.orders         from anon, authenticated;
revoke all on public.discount_codes from anon, authenticated;

-- 3) newsletter_subscribers was created outside the migrations – make sure RLS
--    is on and the public roles have no access (no-op if the table is missing).
alter table if exists public.newsletter_subscribers enable row level security;
do $$
begin
  if to_regclass('public.newsletter_subscribers') is not null then
    execute 'revoke all on public.newsletter_subscribers from anon, authenticated';
  end if;
end $$;

-- ── Check (run afterwards; every row must show rls_enabled = true) ───────────
-- select relname, relrowsecurity as rls_enabled
-- from pg_class
-- where relnamespace = 'public'::regnamespace and relkind = 'r'
-- order by relname;
