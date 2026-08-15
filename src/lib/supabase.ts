import { createClient } from '@supabase/supabase-js';

// Guard against a missing/malformed VITE_SUPABASE_URL: a bad value would make
// createClient throw at import time and white-screen the ENTIRE app. We trim
// and validate, falling back to a harmless placeholder so the app always renders
// (auth calls then fail gracefully instead of crashing on load).
function validUrl(v: string | undefined): string {
  const trimmed = (v ?? '').trim();
  try {
    const u = new URL(trimmed);
    if (u.protocol === 'http:' || u.protocol === 'https:') return trimmed;
  } catch { /* invalid */ }
  return 'https://placeholder.supabase.co';
}

const supabaseUrl = validUrl(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const supabaseAnonKey =
  ((import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? '').trim() || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
