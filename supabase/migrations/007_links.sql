-- ── Editable Linktree (/links) ───────────────────────────────────────────────
-- The /links page content (buttons + social icons) lives in the DB so Robert can
-- edit it in the admin dashboard without a deploy. Server-only (service-role key);
-- the public page reads it through GET /api/admin?r=links. Idempotent.

create table if not exists public.site_links (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null default 'button',   -- 'button' (big tiles) | 'social' (icons)
  label       text not null,
  sublabel    text,                             -- button subtitle (ignored for socials)
  url         text not null,                    -- '/angebote' = internal, else external/mailto
  icon        text,                             -- icon key, see src/app/components/linkIcons
  badge       text,                             -- button badge, e.g. »NEU«
  highlight   boolean not null default false,   -- button highlight style
  sort_order  integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
create index if not exists site_links_kind_sort_idx on public.site_links (kind, sort_order, created_at);
alter table public.site_links enable row level security;
revoke all on public.site_links from anon, authenticated;

-- Seed with the current hard-coded links – only when the table is still empty.
insert into public.site_links (kind, label, sublabel, url, icon, badge, highlight, sort_order)
select v.kind, v.label, v.sublabel, v.url, v.icon, v.badge, v.highlight, v.sort_order
from (values
  ('button', 'Shop',                               'Alle Angebote & Analysen',              '/angebote',   'shop',      null,     false, 1),
  ('button', 'Schriftliche Partnerschaftsanalyse', 'Synastrie-Analyse für euch als Paar',   '/angebote/2', 'sparkles',  '»NEU«',  true,  2),
  ('button', 'Astrologische Tiefenanalyse',        'Entdecke deine astrologische DNA',      '/angebote/4', 'sparkles',  null,     false, 3),
  ('button', 'Astrologische Beratung 90 Min',      'Tiefgreifende Transformation mit Robert','/angebote/6', 'sparkles',  'Premium',false, 4),
  ('social', 'Instagram', null, 'https://www.instagram.com/robert.wagner_astrologie/', 'instagram', null, false, 1),
  ('social', 'TikTok',    null, 'https://www.tiktok.com/@astrodaddy.official',         'tiktok',    null, false, 2),
  ('social', 'YouTube',   null, 'https://www.youtube.com/@robertwagnerastrologie',     'youtube',   null, false, 3),
  ('social', 'Twitch',    null, 'https://www.twitch.tv/astrodaddyofficial',            'twitch',    null, false, 4),
  ('social', 'E-Mail',    null, 'mailto:info@astroversity.academy',                    'mail',      null, false, 5)
) as v(kind, label, sublabel, url, icon, badge, highlight, sort_order)
where not exists (select 1 from public.site_links);

-- Check: lists the seeded rows
-- select kind, label, url, active, sort_order from public.site_links order by kind, sort_order;
