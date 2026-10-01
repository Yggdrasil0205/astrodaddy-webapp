import type { VercelRequest } from '@vercel/node';

// Best-effort in-memory rate limiter. With Fluid Compute reusing instances this
// throttles bursts from a single IP, but it is per-instance (not global) and
// fail-open — for hard, global guarantees enable Vercel WAF rate limiting on top.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t >= windowMs)) hits.delete(k);
    }
  }
  return recent.length <= limit; // true = allowed
}

export function clientIp(req: VercelRequest): string {
  const xff = req.headers['x-forwarded-for'];
  const raw = Array.isArray(xff) ? xff[0] : xff;
  const ip = typeof raw === 'string' ? raw.split(',')[0].trim() : '';
  return ip || 'unknown';
}
