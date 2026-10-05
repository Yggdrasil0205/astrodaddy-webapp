import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fulfillPayment } from '../../src/lib/fulfillment.js';

// ── POST /api/webhooks/mollie ─────────────────────────────────────────────────
// Mollie calls this URL after every payment status change. NOTE: Vercel's edge
// bot-challenge often blocks this server-to-server call, so fulfillment must not
// depend on it alone — the success page (browser) and the watchdog cron call the
// same fulfillPayment() and are idempotent against this one.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { id: paymentId } = req.body as { id: string };
  if (!paymentId) return res.status(400).json({ error: 'Missing payment id' });

  try {
    await fulfillPayment(paymentId);
  } catch (err) {
    console.error('Webhook fulfillment error:', err);
    return res.status(500).end();
  }

  // Mollie expects 200 OK to confirm receipt
  return res.status(200).end();
}
