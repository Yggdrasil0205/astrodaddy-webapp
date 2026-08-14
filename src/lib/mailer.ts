import nodemailer from 'nodemailer';

// ── SMTP transport (IONOS) ────────────────────────────────────────────────────
// Required env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.ionos.de',
    port: parseInt(process.env.SMTP_PORT ?? '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const FROM_DEFAULT = process.env.SMTP_FROM ?? 'Astroversity Academy <noreply@astroversity.academy>';
const ROBERT_EMAIL = 'adastra.lights@gmail.com';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BirthDataEntry {
  itemId: number;
  itemName: string;
  person1: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
  person2?: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
}

export interface OrderEmailInput {
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  invoiceNumber: string;
  birthDataItems?: BirthDataEntry[];
  orderDate?: string;
  invoicePdfBuffer?: Buffer;  // attach generated PDF
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  if (!iso) return '–';
  try {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  } catch { return iso; }
}

function birthDataRows(items: BirthDataEntry[]): string {
  return items.map(item => {
    const p1 = item.person1;
    const p2 = item.person2;
    const rows = (person: typeof p1, label?: string) => `
      ${label ? `<tr><td colspan="3" style="padding:6px 12px 2px;font-size:11px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${label}</td></tr>` : ''}
      <tr>
        <td style="padding:4px 12px 4px 20px;color:#888;font-size:13px;">Geburtstag</td>
        <td colspan="2" style="padding:4px 12px;font-size:13px;">${formatDate(person.birthday)}</td>
      </tr>
      <tr>
        <td style="padding:4px 12px 4px 20px;color:#888;font-size:13px;">Geburtszeit</td>
        <td colspan="2" style="padding:4px 12px;font-size:13px;">${person.birthtime || '–'}</td>
      </tr>
      <tr>
        <td style="padding:4px 12px 4px 20px;color:#888;font-size:13px;">Geburtsort</td>
        <td colspan="2" style="padding:4px 12px;font-size:13px;">${person.birthplace}</td>
      </tr>
      <tr>
        <td style="padding:4px 12px 4px 20px;color:#888;font-size:13px;">Geburtsland</td>
        <td colspan="2" style="padding:4px 12px;font-size:13px;">${person.birthcountry}</td>
      </tr>
    `;
    return `
      <tr style="background:#f5f0ff;">
        <td style="padding:10px 12px;font-weight:600;font-size:14px;" colspan="3">${item.itemName}</td>
      </tr>
      ${rows(p1, p2 ? 'Deine Daten' : undefined)}
      ${p2 ? rows(p2, 'Partner / Partnerin') : ''}
    `;
  }).join('');
}

function birthDataRowsDark(items: BirthDataEntry[]): string {
  return items.map(item => {
    const p1 = item.person1;
    const p2 = item.person2;
    const rows = (person: typeof p1, label?: string) => `
      ${label ? `<tr><td colspan="2" style="padding:6px 16px 2px;font-size:11px;color:#C9A84C;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${label}</td></tr>` : ''}
      <tr>
        <td style="padding:5px 16px;color:rgba(240,230,200,0.45);font-size:13px;width:40%;">Geburtstag</td>
        <td style="padding:5px 16px;color:#F0E6C8;font-size:13px;">${formatDate(person.birthday)}</td>
      </tr>
      <tr>
        <td style="padding:5px 16px;color:rgba(240,230,200,0.45);font-size:13px;">Geburtszeit</td>
        <td style="padding:5px 16px;color:#F0E6C8;font-size:13px;">${person.birthtime || '–'}</td>
      </tr>
      <tr>
        <td style="padding:5px 16px;color:rgba(240,230,200,0.45);font-size:13px;">Geburtsort</td>
        <td style="padding:5px 16px;color:#F0E6C8;font-size:13px;">${person.birthplace}</td>
      </tr>
      <tr>
        <td style="padding:5px 16px;color:rgba(240,230,200,0.45);font-size:13px;">Geburtsland</td>
        <td style="padding:5px 16px;color:#F0E6C8;font-size:13px;">${person.birthcountry}</td>
      </tr>
    `;
    return `
      <tr><td colspan="2" style="padding:10px 16px 4px;font-size:13px;color:#C9A84C;font-weight:600;">${item.itemName}</td></tr>
      ${rows(p1, p2 ? 'Deine Daten' : undefined)}
      ${p2 ? rows(p2, 'Partner / Partnerin') : ''}
    `;
  }).join('');
}

// ── Shared order table for Robert notification ─────────────────────────────────
function orderTableLight(input: OrderEmailInput): string {
  const { customerName, customerEmail, productName, amount, invoiceNumber, birthDataItems, orderDate } = input;
  const dateStr = orderDate ?? new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

  return `
    <h3 style="font-size:16px;color:#1a1a2e;margin:0 0 12px;">Bestellübersicht</h3>
    <p style="color:#666;font-size:13px;margin:0 0 16px;">Bestellnummer ${invoiceNumber} (${dateStr})</p>

    <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e0f5;border-radius:8px;overflow:hidden;">
      <thead>
        <tr style="background:#1B1040;color:#C9A84C;">
          <th style="padding:10px 12px;text-align:left;font-weight:600;">Produkt</th>
          <th style="padding:10px 12px;text-align:center;font-weight:600;">Anzahl</th>
          <th style="padding:10px 12px;text-align:right;font-weight:600;">Preis</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:10px 12px;vertical-align:top;">
            <div style="font-weight:600;margin-bottom:8px;">${productName}</div>
            ${birthDataItems && birthDataItems.length > 0 ? `
              <table style="width:100%;border-collapse:collapse;">
                ${birthDataRows(birthDataItems)}
              </table>
            ` : ''}
          </td>
          <td style="padding:10px 12px;text-align:center;vertical-align:top;">×1</td>
          <td style="padding:10px 12px;text-align:right;vertical-align:top;white-space:nowrap;">${amount.toFixed(2).replace('.', ',')} €</td>
        </tr>
        <tr style="border-top:2px solid #C9A84C;background:#faf8ff;">
          <td colspan="2" style="padding:10px 12px;font-weight:bold;">Gesamt</td>
          <td style="padding:10px 12px;text-align:right;font-weight:bold;font-size:16px;color:#C9A84C;">${amount.toFixed(2).replace('.', ',')} €</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top:16px;padding:12px 16px;background:#f5f0ff;border-radius:8px;border:1px solid #e5e0f5;">
      <p style="margin:0 0 4px;font-size:13px;color:#666;">Kunde</p>
      <p style="margin:0;font-size:14px;font-weight:600;">${customerName || customerEmail}</p>
      <p style="margin:0;font-size:13px;color:#666;">${customerEmail}</p>
    </div>
  `;
}

// ── 1. Notify Robert about a new paid order ───────────────────────────────────
export async function sendInvoiceConfirmationEmail(input: OrderEmailInput) {
  const { customerName, customerEmail, productName, amount, invoiceNumber } = input;

  const transport = createTransport();
  await transport.sendMail({
    from: FROM_DEFAULT,
    to: ROBERT_EMAIL,
    subject: `Neue Bestellung: ${productName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#1a1a2e;">
        <div style="background:#1B1040;padding:24px 32px;border-radius:8px 8px 0 0;display:flex;align-items:center;gap:12px;">
          <div>
            <p style="color:#C9A84C;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 4px;">Astroversity Academy</p>
            <h1 style="color:#F0E6C8;font-size:20px;font-weight:400;margin:0;">Neue Bestellung: Nr. ${invoiceNumber}</h1>
          </div>
        </div>
        <div style="background:#f9f7ff;padding:24px 32px;border-radius:0 0 8px 8px;border:1px solid #e5e0f5;border-top:none;">
          <p style="margin:0 0 20px;font-size:14px;">
            Du hast eine neue Bestellung von <strong>${customerName || customerEmail}</strong> erhalten:
          </p>

          ${orderTableLight(input)}

          <div style="margin-top:24px;padding:16px;background:#fff;border:1px solid #e5e0f5;border-radius:8px;">
            <p style="margin:0 0 8px;font-size:13px;color:#888;">
              Die Rechnung wurde automatisch erstellt und an den Kunden gesendet.<br>
              Alle Bestellungen findest du im
              <a href="https://astroversity.academy/robertlogin" style="color:#7B5FD4;">Admin-Dashboard</a>.
            </p>
          </div>
          <p style="margin-top:20px;font-size:15px;font-weight:600;color:#1B1040;">Herzlichen Glückwunsch zum Verkauf! ✨</p>
        </div>
      </div>
    `,
  });
}

// ── 2. Send order confirmation to customer (with PDF invoice attached) ────────
export async function sendOrderConfirmationToCustomer(input: OrderEmailInput) {
  const { customerEmail, productName, amount, invoiceNumber, birthDataItems, orderDate, invoicePdfBuffer } = input;
  const dateStr = orderDate ?? new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

  const transport = createTransport();
  await transport.sendMail({
    from: FROM_DEFAULT,
    to: customerEmail,
    subject: `Deine Bestellbestätigung – Nr. ${invoiceNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;background:#1B1040;border-radius:12px;overflow:hidden;color:#F0E6C8;">

        <!-- Header -->
        <div style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">Astroversity Academy · Bestellbestätigung</p>
          <h1 style="color:#F0E6C8;font-size:22px;font-weight:400;margin:0 0 8px;">Vielen Dank für deine Bestellung!</h1>
          <p style="color:rgba(240,230,200,0.45);font-size:13px;margin:0;">
            Deine Zahlung ist erfolgreich eingegangen. Hier ist eine Zusammenfassung.
          </p>
        </div>

        <!-- Order meta -->
        <div style="padding:20px 40px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr>
              <td style="padding:6px 0;color:rgba(240,230,200,0.45);">Bestellnummer</td>
              <td style="padding:6px 0;text-align:right;font-weight:600;">${invoiceNumber}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:rgba(240,230,200,0.45);">Datum</td>
              <td style="padding:6px 0;text-align:right;">${dateStr}</td>
            </tr>
          </table>
        </div>

        <!-- Product + birth data -->
        <div style="padding:16px 40px;">
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;overflow:hidden;">
            <div style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:14px;font-weight:600;">${productName}</span>
              <span style="color:#C9A84C;font-weight:700;font-size:15px;">${amount.toFixed(2).replace('.', ',')} €</span>
            </div>
            ${birthDataItems && birthDataItems.length > 0 ? `
              <table style="width:100%;border-collapse:collapse;">
                ${birthDataRowsDark(birthDataItems)}
              </table>
            ` : ''}
          </div>
        </div>

        <!-- Total -->
        <div style="padding:0 40px 20px;">
          <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;font-weight:600;">Gesamt</span>
            <span style="color:#C9A84C;font-weight:700;font-size:20px;">${amount.toFixed(2).replace('.', ',')} €</span>
          </div>
        </div>

        <!-- Message -->
        <div style="padding:0 40px 28px;text-align:center;">
          <p style="color:rgba(240,230,200,0.5);font-size:13px;line-height:1.6;margin:0 0 24px;">
            ${invoicePdfBuffer
              ? 'Deine Rechnung findest du als PDF-Anhang in dieser E-Mail.'
              : 'Deine Rechnung erhältst du in Kürze als separate E-Mail.'}<br>
            Bei Fragen erreichst du uns unter
            <a href="mailto:${ROBERT_EMAIL}" style="color:#C9A84C;">${ROBERT_EMAIL}</a>.
          </p>
          <a href="https://astroversity.academy" style="display:inline-block;background:#C9A84C;color:#1B1040;padding:13px 32px;border-radius:10px;font-weight:600;font-size:14px;text-decoration:none;">
            Zur Website →
          </a>
        </div>

        <!-- Footer -->
        <div style="padding:16px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="color:rgba(240,230,200,0.15);font-size:11px;margin:0;">
            Robert Wagner Astrologie · astroversity.academy · Steuernummer: 220 297 29615
          </p>
        </div>

      </div>
    `,
    ...(invoicePdfBuffer ? {
      attachments: [{
        filename: `Rechnung-${invoiceNumber}.pdf`,
        content: invoicePdfBuffer,
        contentType: 'application/pdf',
      }],
    } : {}),
  });
}

// ── 3. Newsletter welcome email ───────────────────────────────────────────────
export async function sendNewsletterWelcome(email: string) {
  const transport = createTransport();
  await transport.sendMail({
    from: `Robert Wagner · Astroversity Academy <${process.env.SMTP_USER ?? 'noreply@astroversity.academy'}>`,
    to: email,
    subject: 'Willkommen im kosmischen Newsletter ✨',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#1B1040;border-radius:12px;overflow:hidden;">
        <div style="padding:40px 40px 24px;text-align:center;">
          <p style="color:#C9A84C;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">Astroversity Academy · Newsletter</p>
          <h1 style="color:#F0E6C8;font-size:26px;font-weight:400;margin:0 0 12px;line-height:1.3;">Die Sterne haben deine Adresse.</h1>
          <p style="color:rgba(240,230,200,0.5);font-size:14px;line-height:1.6;margin:0 0 32px;">
            Du bist jetzt Teil unseres kosmischen Kreises. Ab sofort erhältst du Mondphasen-Updates, astrologische Impulse und exklusive Einblicke direkt in dein Postfach.
          </p>
          <a href="https://astroversity.academy" style="display:inline-block;background:#C9A84C;color:#1B1040;padding:14px 32px;border-radius:10px;font-weight:600;font-size:14px;text-decoration:none;">
            Zur Website →
          </a>
        </div>
        <div style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="color:rgba(240,230,200,0.15);font-size:11px;margin:0;">
            Robert Wagner Astrologie · adastra.lights@gmail.com
          </p>
        </div>
      </div>
    `,
  });
}
