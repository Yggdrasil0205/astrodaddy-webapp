// ── Billing address (shared by checkout page, /api/checkout and the webhook) ──
// Collected for every order so each invoice carries the customer's full name
// and address – required for invoices above 250 € gross (§ 14 UStG, § 33 UStDV)
// and simply correct for all others.

export interface BillingAddress {
  firstName: string;
  lastName: string;
  street: string;   // street + house number
  zip: string;
  city: string;
  countryCode: string; // ISO 3166-1 alpha-2
}

export const COUNTRIES: { code: string; name: string }[] = [
  { code: 'DE', name: 'Deutschland' },
  { code: 'AT', name: 'Österreich' },
  { code: 'CH', name: 'Schweiz' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LU', name: 'Luxemburg' },
  { code: 'BE', name: 'Belgien' },
  { code: 'NL', name: 'Niederlande' },
  { code: 'FR', name: 'Frankreich' },
  { code: 'IT', name: 'Italien' },
  { code: 'ES', name: 'Spanien' },
  { code: 'PT', name: 'Portugal' },
  { code: 'DK', name: 'Dänemark' },
  { code: 'SE', name: 'Schweden' },
  { code: 'PL', name: 'Polen' },
  { code: 'CZ', name: 'Tschechien' },
  { code: 'GB', name: 'Vereinigtes Königreich' },
  { code: 'US', name: 'USA' },
];

export const emptyBillingAddress = (): BillingAddress => ({
  firstName: '', lastName: '', street: '', zip: '', city: '', countryCode: 'DE',
});

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Normalises the input; returns null if a required field is missing or invalid. */
export function parseBillingAddress(input: unknown): BillingAddress | null {
  const a = (input ?? {}) as Record<string, unknown>;
  const addr: BillingAddress = {
    firstName: clean(a.firstName, 80),
    lastName: clean(a.lastName, 80),
    street: clean(a.street, 120),
    zip: clean(a.zip, 12),
    city: clean(a.city, 80),
    countryCode: clean(a.countryCode, 2).toUpperCase(),
  };
  if (!addr.firstName || !addr.lastName || !addr.street || !addr.city) return null;
  if (!/^[A-Za-z0-9 -]{3,12}$/.test(addr.zip)) return null;
  if (!COUNTRIES.some(c => c.code === addr.countryCode)) return null;
  if (addr.countryCode === 'DE' && !/^\d{5}$/.test(addr.zip)) return null;
  return addr;
}

export const fullName = (a: BillingAddress) => `${a.firstName} ${a.lastName}`.trim();
