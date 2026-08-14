import PDFDocument from 'pdfkit';

// ── Constants ─────────────────────────────────────────────────────────────────

const SELLER = {
  name: 'Robert Wagner Astrologie',
  contact: 'Robert Wagner',
  street: 'Westliche Ringstraße 25',
  city: '91781 Weißenburg i. Bay.',
  email: 'adastra.lights@gmail.com',
  taxNumber: '220 297 29615',
};

const PURPLE  = '#6B3FA0';
const DARK    = '#1a1a2e';
const GRAY    = '#555555';
const LIGHT   = '#f5f5f5';
const BLACK   = '#000000';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BirthDataEntry {
  itemId: number;
  itemName: string;
  person1: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
  person2?: { birthday: string; birthtime: string; birthplace: string; birthcountry: string };
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate?: string;
  orderNumber?: string;
  orderDate?: string;
  paymentMethod?: string;
  // Customer
  customerName: string;
  customerEmail: string;
  customerStreet?: string;
  customerCity?: string;
  customerCountry?: string;
  customerPhone?: string;
  // Items
  productName: string;
  productPrice: number;   // net product price (what customer paid before any fees)
  gatewayFee?: number;    // optional Mollie surcharge
  // Birth data
  birthDataItems?: BirthDataEntry[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  if (!iso) return '–';
  try {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  } catch { return iso; }
}

function germanDate(d = new Date()): string {
  const months = ['Januar','Februar','März','April','Mai','Juni',
                  'Juli','August','September','Oktober','November','Dezember'];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function eur(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

// ── PDF generator ─────────────────────────────────────────────────────────────

export function generateInvoicePdf(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    const chunks: Buffer[] = [];
    doc.on('data', (c: Buffer) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W = doc.page.width;   // 595
    const L = 50;               // left margin
    const R = W - 50;           // right margin
    const contentW = R - L;     // 495

    const today = germanDate();
    const invDate  = data.invoiceDate  ?? today;
    const ordDate  = data.orderDate    ?? today;
    const invNum   = data.invoiceNumber;
    const ordNum   = data.orderNumber ?? invNum;

    // ── Header ────────────────────────────────────────────────────────────────

    // Logo area (left) — text-based wordmark (matches site header)
    doc.fontSize(22).fillColor(PURPLE).font('Helvetica-Bold')
      .text('ROBERT ', L, 50, { continued: true })
      .fillColor(DARK).text('WAGNER');

    doc.fontSize(8).fillColor(GRAY).font('Helvetica')
      .text('Astrologie & spirituelle Lebensberatung', L, 78);

    // Seller address (right column)
    const rightX = W / 2 + 10;
    doc.fontSize(9).fillColor(DARK).font('Helvetica-Bold')
      .text(SELLER.name, rightX, 50);
    doc.fontSize(9).font('Helvetica').fillColor(DARK)
      .text(SELLER.contact, rightX, 63)
      .text(SELLER.street, rightX, 75)
      .text(SELLER.city, rightX, 87);

    // ── Divider ───────────────────────────────────────────────────────────────
    doc.moveTo(L, 115).lineTo(R, 115).strokeColor('#dddddd').lineWidth(0.5).stroke();

    // ── "RECHNUNG" heading ────────────────────────────────────────────────────
    doc.fontSize(20).fillColor(DARK).font('Helvetica-Bold')
      .text('RECHNUNG', L, 130);

    // ── Customer address (left) + Invoice meta (right) ────────────────────────
    const addrY = 175;
    const metaX = W / 2 + 10;

    // Customer block
    doc.fontSize(9).font('Helvetica').fillColor(DARK);
    let addrCursor = addrY;
    const addLine = (text: string) => {
      if (text) { doc.text(text, L, addrCursor); addrCursor += 14; }
    };
    addLine(data.customerName);
    if (data.customerStreet) addLine(data.customerStreet);
    if (data.customerCity)   addLine(data.customerCity);
    if (data.customerCountry && data.customerCountry.toLowerCase() !== 'deutschland') addLine(data.customerCountry);
    if (data.customerPhone)  addLine(data.customerPhone);
    addLine(data.customerEmail);

    // Invoice meta table (right)
    const metaRows = [
      ['Rechnungsnummer:', invNum],
      ['Rechnungsdatum:', invDate],
      ['Bestellnummer:', ordNum],
      ['Bestelldatum:', ordDate],
      ...(data.paymentMethod ? [['Zahlungsart:', data.paymentMethod]] : []),
    ];
    metaRows.forEach(([label, value], i) => {
      const y = addrY + i * 15;
      doc.fontSize(9).font('Helvetica').fillColor(GRAY).text(label, metaX, y);
      doc.fontSize(9).font('Helvetica').fillColor(DARK).text(value, metaX + 105, y);
    });

    // ── Product table ─────────────────────────────────────────────────────────
    const tableY = Math.max(addrCursor, addrY + metaRows.length * 15) + 30;

    // Table header
    doc.rect(L, tableY, contentW, 22).fillColor(DARK).fill();
    doc.fontSize(9).font('Helvetica-Bold').fillColor('#ffffff');
    doc.text('Produkt', L + 8, tableY + 6);
    doc.text('Anzahl', R - 130, tableY + 6, { width: 60, align: 'center' });
    doc.text('Preis',  R - 60,  tableY + 6, { width: 60, align: 'right' });

    let rowY = tableY + 22;

    // Product name row
    doc.rect(L, rowY, contentW, 18).fillColor(LIGHT).fill();
    doc.fontSize(9).font('Helvetica').fillColor(DARK)
      .text(data.productName, L + 8, rowY + 4, { width: contentW - 140 });
    rowY += 18;

    // Birth data rows
    if (data.birthDataItems) {
      for (const item of data.birthDataItems) {
        const renderPerson = (p: BirthDataEntry['person1'], label?: string) => {
          if (label) {
            doc.rect(L, rowY, contentW, 14).fillColor('#ede8f5').fill();
            doc.fontSize(7.5).font('Helvetica-Bold').fillColor(PURPLE)
              .text(label, L + 16, rowY + 3);
            rowY += 14;
          }
          const fields: [string, string][] = [
            ['Geburtstag:', formatDate(p.birthday)],
            ['Geburtszeit:', p.birthtime || '–'],
            ['Geburtsort:', p.birthplace],
            ['Geburtsland:', p.birthcountry],
          ];
          for (const [k, v] of fields) {
            doc.rect(L, rowY, contentW, 13).fillColor(rowY % 26 === 0 ? '#fafafa' : '#ffffff').fill();
            doc.fontSize(8).font('Helvetica-Bold').fillColor(DARK).text(k, L + 16, rowY + 2.5);
            doc.fontSize(8).font('Helvetica').fillColor(DARK).text(v, L + 90, rowY + 2.5);
            rowY += 13;
          }
        };
        renderPerson(item.person1, item.person2 ? 'Deine Daten' : undefined);
        if (item.person2) renderPerson(item.person2, 'Partner / Partnerin');
      }
    }

    // Qty + price overlay (right side, vertically centered in the product block)
    const productBlockH = rowY - (tableY + 22);
    const priceY = tableY + 22 + productBlockH / 2 - 5;
    doc.fontSize(9).font('Helvetica').fillColor(DARK)
      .text('1',           R - 130, priceY, { width: 60, align: 'center' })
      .text(eur(data.productPrice), R - 60, priceY, { width: 60, align: 'right' });

    // Bottom border of product rows
    doc.moveTo(L, rowY).lineTo(R, rowY).strokeColor('#cccccc').lineWidth(0.5).stroke();

    // ── Totals ────────────────────────────────────────────────────────────────
    rowY += 12;
    const totX  = R - 180;
    const totW  = 130;
    const valX  = R - 60;
    const valW  = 60;

    const sub = data.productPrice;
    const fee = data.gatewayFee ?? 0;
    const total = sub + fee;
    const vat = total / 1.19 * 0.19;

    const totRows: [string, string, boolean][] = [
      ['Zwischensumme', eur(sub), false],
      ...(fee > 0 ? [['Gateway-Gebühr', eur(fee), false] as [string, string, boolean]] : []),
      ['Gesamt', `${eur(total)} (inkl. ${eur(vat)} MwSt.)`, true],
    ];

    for (const [label, value, bold] of totRows) {
      if (bold) {
        doc.moveTo(totX, rowY - 4).lineTo(R, rowY - 4).strokeColor('#aaaaaa').lineWidth(0.5).stroke();
      }
      doc.fontSize(9)
        .font(bold ? 'Helvetica-Bold' : 'Helvetica')
        .fillColor(DARK)
        .text(label, totX, rowY, { width: totW });
      doc.fontSize(9)
        .font(bold ? 'Helvetica-Bold' : 'Helvetica')
        .fillColor(bold ? PURPLE : DARK)
        .text(value, valX - 40, rowY, { width: valW + 40, align: 'right' });
      rowY += bold ? 18 : 14;
    }

    // ── Footer ────────────────────────────────────────────────────────────────
    const footerY = doc.page.height - 60;
    doc.moveTo(L, footerY).lineTo(R, footerY).strokeColor('#dddddd').lineWidth(0.5).stroke();
    doc.fontSize(8).font('Helvetica').fillColor(GRAY)
      .text(`Steuernummer: ${SELLER.taxNumber}`, L, footerY + 10, {
        width: contentW, align: 'center',
      });

    doc.end();
  });
}
