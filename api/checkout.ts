import type { VercelRequest, VercelResponse } from '@vercel/node';
import { cartBaseTotal, cartProductName, applyVoucher, type CartLine } from '../src/lib/vouchers.js';
import { parseBillingAddress, fullName } from '../src/lib/billing.js';
import { products } from '../src/app/data/products.js';

const APP_URL = process.env.APP_URL ?? 'https://astroversity.academy';
const MOLLIE_KEY = process.env.Mollie_API_Test ?? process.env.MOLLIE_API_KEY ?? '';

export interface BirthDataEntry {
  itemId: number;
  itemName: string;
  person1: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
  person2?: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
}

// ── GET /api/checkout?id=tr_… ─────────────────────────────────────────────────
// Lets the success page show the real outcome: Mollie redirects back to the
// shop after paid, canceled, failed and expired payments alike. Returns only
// the status – no customer data.
async function paymentStatus(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id ?? '');
  if (!/^tr_[A-Za-z0-9]{4,40}$/.test(id)) return res.status(400).json({ error: 'Ungültige Zahlungs-ID.' });
  if (!MOLLIE_KEY) return res.status(500).json({ error: 'Mollie API Key nicht konfiguriert.' });
  const r = await fetch(`https://api.mollie.com/v2/payments/${id}`, { headers: { Authorization: `Bearer ${MOLLIE_KEY}` } });
  if (!r.ok) return res.status(r.status === 404 ? 404 : 502).json({ error: 'Zahlung nicht gefunden.' });
  const p = await r.json() as any;
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ status: p.status });
}

// Birth data comes from the browser: keep only entries for products in the
// cart, take the product name from our catalogue (never from the client) and
// trim every field – these values end up in e-mails and invoices.
function cleanBirthData(raw: unknown, items: CartLine[]): BirthDataEntry[] {
  const inCart = new Set(items.map(i => Number(i.id)));
  const str = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
  const person = (p: any) => (p && typeof p === 'object')
    ? { birthday: str(p.birthday, 10), birthtime: str(p.birthtime, 5), birthplace: str(p.birthplace, 100), birthcountry: str(p.birthcountry, 60) }
    : undefined;
  return (Array.isArray(raw) ? raw : []).slice(0, 20).flatMap((e: any) => {
    const product = products.find(p => p.id === Number(e?.itemId));
    const p1 = person(e?.person1);
    if (!product || !inCart.has(product.id) || !p1) return [];
    const p2 = person(e?.person2);
    return [{ itemId: product.id, itemName: product.name, person1: p1, ...(p2 ? { person2: p2 } : {}) }];
  });
}

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// ── POST /api/checkout ────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return paymentStatus(req, res);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      items,
      customerEmail,
      customerPhone,
      billingAddress: rawAddress,
      discountCode,
      birthDataItems: rawBirthData,
      skoolMembership,
    } = req.body as {
      items: CartLine[];
      customerEmail: string;
      customerPhone?: string;
      billingAddress?: unknown;
      discountCode?: string;
      birthDataItems?: BirthDataEntry[];
      skoolMembership?: boolean;
    };

    if (!MOLLIE_KEY) {
      return res.status(500).json({ error: 'Mollie API Key nicht konfiguriert.' });
    }
    if (!isEmail(customerEmail)) {
      return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Dein Warenkorb ist leer.' });
    }
    const billingAddress = parseBillingAddress(rawAddress);
    if (!billingAddress) {
      return res.status(400).json({ error: 'Bitte gib deinen vollständigen Namen und deine Rechnungsadresse an.' });
    }
    const customerName = fullName(billingAddress);
    const birthDataItems = cleanBirthData(rawBirthData, items);
    const phone = String(customerPhone ?? '').replace(/[^\d+()\/ -]/g, '').trim().slice(0, 30);

    // ── Prices are computed server-side from the trusted catalog + DB ──────────
    const baseAmount = cartBaseTotal(items);
    const productName = cartProductName(items) || 'Bestellung';
    const itemCount = items.reduce((s, it) => s + Math.max(1, Math.floor(Number(it.quantity) || 1)), 0);

    const voucher = await applyVoucher(discountCode, baseAmount, itemCount);
    if (discountCode && !voucher.valid) {
      return res.status(400).json({ error: voucher.error ?? 'Rabattcode ungültig.' });
    }
    const finalAmount = voucher.finalAmount;

    // Skool members land on a success page that explains the "JOIN NOW" step
    const redirectUrl = skoolMembership
      ? `${APP_URL}/checkout/success?type=skool`
      : `${APP_URL}/checkout/success`;

    // ── Save the order first ─────────────────────────────────────────────────
    // Birth data and billing address live in the orders table, not in Mollie's
    // metadata (limited to ~1 KB – large carts with partner analyses would
    // make the payment fail). Mollie only gets the order id.
    let supabase: any = null;
    let orderId: string | null = null;
    let detailsStored = false; // billing address + birth data saved in the DB?
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createClient } = await import('@supabase/supabase-js');
      supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const base = {
        product_id: String(items?.[0]?.id ?? ''),
        product_name: productName,
        amount: finalAmount,
        original_amount: baseAmount,
        discount_code: voucher.code ?? null,
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: phone,
        status: 'offen',
      };
      const details = { billing_address: billingAddress, birth_data: birthDataItems.length ? birthDataItems : null, skool_membership: !!skoolMembership };
      let { data: row, error: insertErr } = await supabase.from('orders').insert({ ...base, ...details }).select('id').single();
      if (insertErr) {
        // Columns from migration 006 missing? Store the order without them.
        console.error('Supabase insert error:', insertErr);
        ({ data: row, error: insertErr } = await supabase.from('orders').insert(base).select('id').single());
        if (insertErr) console.error('Supabase insert error (fallback):', insertErr);
      } else {
        detailsStored = true;
      }
      if (!insertErr) orderId = row.id;
    }

    // ── Create Mollie payment ────────────────────────────────────────────────
    const mollieRes = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MOLLIE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: { currency: 'EUR', value: finalAmount.toFixed(2) },
        description: productName.slice(0, 255),
        redirectUrl,
        webhookUrl: `${APP_URL}/api/webhooks/mollie`,
        metadata: {
          orderId,
          productName: productName.slice(0, 200),
          discountCode: voucher.code ?? null,
          customerEmail,
          customerName,
          customerPhone: phone,
          skoolMembership: skoolMembership ? 'true' : 'false',
          // Fallback only if the details could not be stored in the DB.
          ...(detailsStored ? {} : {
            billingAddress: JSON.stringify(billingAddress),
            birthData: birthDataItems.length ? JSON.stringify(birthDataItems) : null,
          }),
        },
      }),
    });

    const payment = await mollieRes.json() as any;

    if (!mollieRes.ok) {
      console.error('Mollie error:', payment);
      if (supabase && orderId) await supabase.from('orders').update({ status: 'fehlgeschlagen' }).eq('id', orderId);
      return res.status(500).json({ error: 'Die Zahlung konnte nicht gestartet werden. Bitte versuche es erneut.' });
    }

    if (supabase && orderId) {
      const { error: updErr } = await supabase.from('orders').update({ mollie_payment_id: payment.id }).eq('id', orderId);
      if (updErr) console.error('Supabase update error:', updErr);
    }

    // Voucher usage is counted in the Mollie webhook once the payment is PAID.

    return res.status(200).json({
      checkoutUrl: payment._links.checkout.href,
      paymentId: payment.id,
    });

  } catch (err: any) {
    console.error('Checkout handler error:', err);
    return res.status(400).json({ error: err?.message ?? 'Interner Fehler.' });
  }
}
