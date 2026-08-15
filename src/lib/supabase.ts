import { createClient } from '@supabase/supabase-js';

// A malformed VITE_SUPABASE_URL would make createClient throw at import time and
// white-screen the whole app. We pick the first VALID url+key pair from either
// the VITE_ vars or the NEXT_PUBLIC_ vars (the Supabase Marketplace integration
// sets the NEXT_PUBLIC_ ones), and fall back to a harmless placeholder so the app
// always renders.
const env = import.meta.env as Record<string, string | undefined>;

function pickCreds(): { url: string; key: string } {
  const candidates = [
    { url: env.VITE_SUPABASE_URL, key: env.VITE_SUPABASE_ANON_KEY },
    { url: env.NEXT_PUBLIC_SUPABASE_URL, key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
  ];
  for (const c of candidates) {
    const url = (c.url ?? '').trim();
    const key = (c.key ?? '').trim();
    if (!url || !key) continue;
    try {
      const u = new URL(url);
      if (u.protocol === 'http:' || u.protocol === 'https:') return { url, key };
    } catch { /* try next candidate */ }
  }
  return { url: 'https://placeholder.supabase.co', key: 'placeholder-key' };
}

const { url, key } = pickCreds();
export const supabase = createClient(url, key);
