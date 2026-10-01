import { createClient } from '@supabase/supabase-js';
import { products } from '../app/data/products.js';

// ── Server-side cart pricing ──────────────────────────────────────────────────
// Prices are looked up from the trusted product catalog — NEVER trust a
// client-supplied price/total.

export interface CartLine { id: number; quantity?: number }

export function cartBaseTotal(items: CartLine[]): number {
  if (!Array.isArray(items) || items.length === 0) throw new Error('Warenkorb ist leer.');
  let total = 0;
  for (const it of items) {
    const p = products.find((pr) => pr.id === Number(it.id));
    if (!p) throw new Error(`Unbekanntes Produkt: ${it.id}`);
    const qty = Math.max(1, Math.floor(Number(it.quantity) || 1));
    total += p.price * qty;
  }
  return Math.round(total * 100) / 100;
}

export function cartProductName(items: CartLine[]): string {
  return items
    .map((it) => products.find((pr) => pr.id === Number(it.id))?.name)
    .filter(Boolean)
    .join(', ');
}

// ── Voucher validation ────────────────────────────────────────────────────────

export interface VoucherResult {
  valid: boolean;
  error?: string;
  code?: string;
  type?: 'percent' | 'fixed';
  value?: number;
  discountAmount: number;
  finalAmount: number;
}

export async function applyVoucher(rawCode: string | null | undefined, base: number, itemCount = 0): Promise<VoucherResult> {
  const noDiscount: VoucherResult = { valid: true, discountAmount: 0, finalAmount: base };
  const code = String(rawCode ?? '').trim().toUpperCase();
  if (!code) return noDiscount;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { valid: false, error: 'Rabattprüfung derzeit nicht verfügbar.', discountAmount: 0, finalAmount: base };

  const supabase = createClient(url, key);
  const { data, error } = await supabase.from('discount_codes').select('*').eq('code', code).maybeSingle();

  if (error) return { valid: false, error: 'Fehler bei der Code-Prüfung.', discountAmount: 0, finalAmount: base };
  if (!data) return { valid: false, error: 'Ungültiger Rabattcode.', discountAmount: 0, finalAmount: base };
  if (!data.active) return { valid: false, error: 'Dieser Code ist nicht mehr aktiv.', discountAmount: 0, finalAmount: base };
  if (data.valid_until && new Date(`${data.valid_until}T23:59:59`) < new Date()) {
    return { valid: false, error: 'Dieser Code ist abgelaufen.', discountAmount: 0, finalAmount: base };
  }

  // "Kosmisches Rad" bonus codes: single-use, and only redeemable while the
  // unlock condition still holds (at least 2 items in the cart).
  if (code.startsWith('KOSMOS-')) {
    if ((Number(data.times_used) || 0) >= 1) {
      return { valid: false, error: 'Dieser Bonus-Code wurde bereits eingelöst.', discountAmount: 0, finalAmount: base };
    }
    if (itemCount < 2) {
      return { valid: false, error: 'Dein kosmischer Bonus gilt nur mit mindestens einem weiteren Angebot im Warenkorb.', discountAmount: 0, finalAmount: base };
    }
  }

  let discount = data.type === 'percent' ? base * (Number(data.value) / 100) : Number(data.value);
  discount = Math.round(Math.min(discount, base) * 100) / 100;
  const finalAmount = Math.round((base - discount) * 100) / 100;

  return { valid: true, code, type: data.type, value: Number(data.value), discountAmount: discount, finalAmount };
}

// Count a redemption once the payment is PAID (called from the Mollie webhook).
// Atomic + idempotent in the DB (see redeem_voucher in 004_missing_tables.sql):
//   'redeemed'          → counted now
//   'already_processed' → this payment was counted before (webhook re-delivery)
//   'exhausted'         → single-use KOSMOS- code already used by another payment
// Returns null if the DB is unavailable or the call failed.
export type RedeemResult = 'redeemed' | 'already_processed' | 'exhausted';

export async function redeemVoucher(paymentId: string, code: string): Promise<RedeemResult | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key);
  const { data, error } = await supabase.rpc('redeem_voucher', { p_payment_id: paymentId, p_code: code });
  if (error) {
    console.error('redeem_voucher error:', error);
    return null;
  }
  return data as RedeemResult;
}
