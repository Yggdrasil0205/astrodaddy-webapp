import type { VercelRequest, VercelResponse } from '@vercel/node';

// TEMPORARY diagnostic — reports which Supabase env var NAMES exist (not values),
// tests the connection, and checks whether the expected tables exist. Remove after.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const envNames = [
    'SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_JWT_SECRET',
    'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING',
  ];
  const envs: Record<string, boolean> = {};
  for (const n of envNames) envs[n] = !!process.env[n];

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  let connection: string = 'skipped (SUPABASE_URL / SERVICE_ROLE_KEY fehlen)';
  const tables: Record<string, string> = {};

  if (url && key) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(url, key);
      for (const t of ['orders', 'discount_codes']) {
        const { error } = await supabase.from(t).select('id', { count: 'exact', head: true });
        tables[t] = error ? `FEHLT/Fehler: ${error.message}` : 'ok';
      }
      connection = 'ok';
    } catch (e: any) {
      connection = e?.message ?? String(e);
    }
  }

  return res.status(200).json({ envs, connection, tables });
}
