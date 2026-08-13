import type { VercelRequest, VercelResponse } from '@vercel/node';

const APP_URL = process.env.APP_URL ?? 'https://webapp-ten-ecru-42.vercel.app';
const MOLLIE_KEY = process.env.Mollie_API_Test ?? process.env.MOLLIE_API_KEY ?? '';

export interface BirthDataEntry {
  itemId: number;
  itemName: string;
  person1: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
  person2?: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
}

// ── POST /api/checkout ────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      productId,
      productName,
      amount,
      customerEmail,
      customerName,
      customerPhone,
      discountCode,
      finalAmount,
      birthDataItems,
      skoolMembership,
    } = req.body as {
      productId: string;
      productName: string;
      amount: number;
      customerEmail: string;
      customerName: string;
      customerPhone?: string;
      discountCode?: string;
      finalAmount: number;
      birthDataItems?: BirthDataEntry[];
      skoolMembership?: boolean;
    };

    if (!MOLLIE_KEY) {
      return res.status(500).json({ error: 'Mollie API Key nicht konfiguriert.' });
    }

    // Skool members land on a success page that explains the "JOIN NOW" step
    const redirectUrl = skoolMembership
      ? `${APP_URL}/checkout/success?type=skool`
      : `${APP_URL}/checkout/success`;

    // ── Create Mollie payment ────────────────────────────────────────────────
    const mollieRes = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MOLLIE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: {
          currency: 'EUR',
          value: Number(finalAmount).toFixed(2),
        },
        description: productName,
        redirectUrl,
        webhookUrl: `${APP_URL}/api/webhooks/mollie`,
        metadata: {
          productId,
          productName,
          originalAmount: amount,
          finalAmount,
          discountCode: discountCode ?? null,
          customerEmail,
          customerName,
          customerPhone: customerPhone ?? '',
          skoolMembership: skoolMembership ? 'true' : 'false',
          // Birth data as compact JSON string (Mollie metadata max ~1 KB)
          birthData: birthDataItems ? JSON.stringify(birthDataItems) : null,
        },
      }),
    });

    const payment = await mollieRes.json() as any;

    if (!mollieRes.ok) {
      console.error('Mollie error:', payment);
      return res.status(500).json({ error: payment?.detail ?? 'Zahlung konnte nicht erstellt werden.' });
    }

    // ── Save to Supabase (optional) ──────────────────────────────────────────
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
        await supabase.from('orders').insert({
          mollie_payment_id: payment.id,
          product_id: productId,
          product_name: productName,
          amount: finalAmount,
          original_amount: amount,
          discount_code: discountCode ?? null,
          customer_email: customerEmail,
          customer_name: customerName,
          customer_phone: customerPhone ?? '',
          birth_data: birthDataItems ?? null,
          status: 'open',
        });
      } catch (dbErr) {
        console.error('Supabase insert error:', dbErr);
      }
    }

    return res.status(200).json({
      checkoutUrl: payment._links.checkout.href,
      paymentId: payment.id,
    });

  } catch (err: any) {
    console.error('Checkout handler error:', err);
    return res.status(500).json({ error: err?.message ?? 'Interner Fehler.' });
  }
}
