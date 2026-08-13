// ── Skool API integration ─────────────────────────────────────────────────────
// Sends a member invite to the Astroversity-Academy Skool group after a paid order.
// The invited email receives a "JOIN NOW" link and can join instantly.
//
// Docs: https://docs.skoolapi.com/
//
// Required env vars:
//   SKOOL_WEBHOOK_URL  = https://api2.skool.com/groups/astroversity-academy/webhooks/<token>
//   SKOOL_API_SECRET   = <X-Api-Secret value from Skool → Plugins → Webhook>

export interface SkoolInviteResult {
  ok: boolean;
  status: number;
  body?: string;
}

export async function inviteToSkool(email: string): Promise<SkoolInviteResult> {
  const webhookUrl = process.env.SKOOL_WEBHOOK_URL;
  const apiSecret = process.env.SKOOL_API_SECRET;

  if (!webhookUrl || !apiSecret) {
    throw new Error('Skool nicht konfiguriert (SKOOL_WEBHOOK_URL / SKOOL_API_SECRET fehlen).');
  }

  // The email is appended as a query param: <webhookUrl>?email=<email>
  const url = new URL(webhookUrl);
  url.searchParams.set('email', email);

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'X-Api-Secret': apiSecret,
      'Content-Type': 'application/json',
    },
  });

  const body = await res.text().catch(() => '');

  if (!res.ok) {
    console.error('Skool invite failed:', res.status, body);
  }

  return { ok: res.ok, status: res.status, body };
}
