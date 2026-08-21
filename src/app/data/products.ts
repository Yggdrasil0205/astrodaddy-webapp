export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  priceFormatted: string;
  originalPrice?: number;
  originalPriceFormatted?: string;
  image: string;
  previewImages?: string[];
  badge?: string;
  bestseller?: boolean;
  category: string;
  details: string;
  benefits?: string[];
  deliveryTime?: string;
  process?: string[];
  affiliateUrl: string;
  /** Marks the Skool-Mitgliedschaft: no birth data required, triggers Skool invite on payment. */
  skoolMembership?: boolean;
  /** Internal/hidden: reachable by direct URL but not listed in the shop grid. */
  hidden?: boolean;
}

/** Product-ID der Astroversity-Academy-Mitgliedschaft (Skool). */
export const SKOOL_MEMBERSHIP_ID = 8;

/** Öffentliche Skool-Gruppe – Beitritt & Abrechnung laufen direkt über Skool. */
export const SKOOL_GROUP_URL = 'https://www.skool.com/astroversity-academy';

export const products: Product[] = [
  {
    id: 4,
    name: 'Astrologische Tiefenanalyse (schriftlich)',
    shortDescription: 'Entdecke deine astrologische DNA – inspiriert von deinem individuellen Geburtshoroskop.',
    description: 'Eine schriftliche Tiefenanalyse auf Basis deines Geburtshoroskops – ca. 25–30 Seiten, individuell auf deine Geburtsdaten zugeschnitten. Bewusste und unbewusste Charakterzüge, Planetenstellungen, Aspekte und Häuser aus psychologischer und spiritueller Perspektive.',
    price: 69.99,
    priceFormatted: '69,99 €',
    image: '/tiefenanalyse.png',
    badge: 'Angebot',
    category: 'Analyse',
    details: 'Robert analysiert dein Geburtshoroskop und erstellt ein umfassendes schriftliches Persönlichkeitsprofil mit ca. 25–30 Seiten. Du erhältst Einblicke in bewusste und verborgene Charakterzüge, Stärken, Muster und deinen Lebensweg.',
    benefits: [
      'Detaillierte Entschlüsselung bewusster & verborgener Charakterzüge',
      'Deutung von Planetenstellungen, Aspekten & Häusern',
      'Konkrete Empfehlungen für Herausforderungen & Potenzialentfaltung',
      'Ca. 25–30 Seiten individuell auf deine Geburtsdaten',
      'Zugänglich ohne astrologisches Vorwissen',
      'Als dauerhaftes Nachschlagewerk nutzbar',
      'Auch als durchdachtes Geschenk geeignet',
    ],
    deliveryTime: 'Innerhalb von 48 Stunden',
    process: [
      'Geburtsdaten eingeben (Datum, Uhrzeit, Ort)',
      'Robert erstellt dein individuelles Persönlichkeitsprofil',
      'Lieferung als PDF per E-Mail',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: 1,
    name: 'Astrologische Jahresvorschau 2026',
    shortDescription: 'Deine persönliche astrologische Jahresvorschau 2026 – präzise, individuell und auf dein Geburtshoroskop zugeschnitten.',
    description: 'Erfahre, was die Sterne 2026 für dich bereithaben. Robert analysiert auf 10–20 Seiten deine wichtigsten Transiten, Lebensthemen und Entwicklungsimpulse – präzise auf dein Geburtshoroskop zugeschnitten.',
    price: 69.99,
    priceFormatted: '69,99 €',
    originalPrice: 99.99,
    originalPriceFormatted: '99,99 €',
    image: '/jahresvorschau.png',
    badge: 'Angebot',
    bestseller: true,
    category: 'Analyse',
    details: 'Die astrologische Jahresvorschau 2026 gibt dir eine präzise Analyse der aktuellen Energien – abgestimmt auf dein Geburtshoroskop. Du erhältst 10–20 Seiten mit deinen persönlichen Transiten, Lebensthemen und Entwicklungsimpulsen für das Jahr 2026.',
    benefits: [
      'Persönliche Transitanalyse deiner Planetenstellungen',
      'Klarheit über Lebensthemen in Liebe, Beruf & Wachstum',
      'Entwicklungsimpulse für Selbstreflexion & bewusstes Leben',
      'Kompakt, psychologisch fundiert & verständlich aufbereitet',
      'Früherkennung von Herausforderungen & Chancen',
      'Tieferes emotionales Verständnis',
      'Im Einklang mit den kosmischen Rhythmen',
    ],
    deliveryTime: 'Anfang Januar',
    process: [
      'Geburtsdaten eingeben (Datum, Uhrzeit, Ort)',
      'Robert erstellt deine individuelle Jahresvorschau',
      'Lieferung als PDF per E-Mail',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: 2,
    name: 'Astrologische Partnerschaftsanalyse',
    shortDescription: 'Erfahre mehr über Dich und Deinen Partner!',
    description: 'Was verbindet euch wirklich – und was fordert euch heraus? Die Partnerschaftsanalyse legt unbewusste Muster, emotionale Dynamiken und karmische Themen eurer Verbindung offen. Keine Standard-PDFs, sondern individuelle, psychologisch fundierte Deutungen beider Geburtshoroskope.',
    price: 79.99,
    priceFormatted: '79,99 €',
    originalPrice: 109.99,
    originalPriceFormatted: '109,99 €',
    image: '/partnerschaftsanalyse.png',
    previewImages: ['/partnerschaftsanalyse-2.png'],
    badge: 'Angebot',
    bestseller: true,
    category: 'Analyse',
    details: 'Die Partnerschaftsanalyse (Synastrie) zeigt dir, wie die Planeten zweier Menschen miteinander interagieren. Robert analysiert emotionale Auslöser, Projektionen und Schattenmuster – und zeigt euren astrologischen Entwicklungsweg als Paar.',
    benefits: [
      'Analyse beider Geburtshoroskope (Synastrie)',
      'Emotionale Auslöser, Projektionen & Schattenmuster',
      'Anziehung & Reibungspunkte (Venus, Mars, Saturn, Mond)',
      'Astrologischer Entwicklungsweg als Paar (inkl. Mondknoten)',
      'Karmische Themen & gemeinsame Seelenaufgabe',
    ],
    deliveryTime: 'Bis zu 72 Stunden an Werktagen',
    process: [
      'Eigene & Partner-Geburtsdaten eingeben',
      'Robert erstellt die individuelle Synastrie-Analyse',
      'Lieferung als PDF per E-Mail',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: 3,
    name: 'Astrokartographie',
    shortDescription: 'Dein Schlüssel zur Welt – entdecke deine kosmischen Kraftorte auf einer personalisierten Weltkarte.',
    description: 'Entdecke die kosmischen Einflüsse, die deinen Weg auf der Erde prägen. Die Astrokartographie gibt dir Orientierung auf höchstem Niveau – erkenne deine Kraftorte, meide Hindernisse und plane Lebensentscheidungen mit Präzision.',
    price: 39.99,
    priceFormatted: '39,99 €',
    image: '/astrokartographie.png',
    previewImages: ['/astrokartographie-beispiel.jpg'],
    badge: 'Angebot',
    category: 'Analyse',
    details: 'Die Astrokartographie (auch Astrogeographie) zeigt dir auf einer personalisierten Weltkarte, welche Orte deine Planetenenergien aktivieren. Ob Auswanderung, Urlaub oder Fernbeziehungen – finde deine kosmischen Kraftorte.',
    benefits: [
      'Persönliche Weltkarte als PDF mit allen astrologischen Linien',
      'Ausführliche Deutung aller Linien (MC, IC, ASC, DSC, Planetenbahnen)',
      'Praktische Hinweise zur Nutzung regionaler Energien',
      'Ideale Orte für Karriere, Liebe & persönliche Entwicklung',
      'Globale Orientierung für deine Ziele & Wünsche',
      'Inspiration für deinen Lebensweg & Wachstumsregionen',
    ],
    deliveryTime: '2–3 Werktage',
    process: [
      'Geburtsdaten eingeben (Datum, Uhrzeit, Ort)',
      'Robert erstellt deine personalisierte Astrokartographie-Karte',
      'Lieferung als PDF per E-Mail',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: 5,
    name: 'Astrologische Beratung 45 Min',
    shortDescription: 'Transformative Beratung (45min) – entdecke Stärken, Potenziale & deine Berufung.',
    description: 'In 45 Minuten gehen wir gemeinsam durch dein Geburtshoroskop und entdecken deine Stärken, Schwächen, Herausforderungen, Potenziale, Berufung und Liebesthemen. Deine individuellen Fragen werden beantwortet. Über 500 Geburtshoroskope gelesen.',
    price: 149.00,
    priceFormatted: '149,00 €',
    image: '/beratung-45.png',
    badge: 'Empfohlen',
    bestseller: true,
    category: 'Beratung',
    details: 'Eine tiefgehende 45-minütige Einzelberatung per Zoom. Robert Wagner analysiert dein Geburtshoroskop und gibt dir konkrete Einblicke in deine Persönlichkeit, Stärken, Herausforderungen und Lebensthemen. Die Session wird aufgezeichnet.',
    benefits: [
      'Persönliche Stärken & Schwächen kennenlernen',
      'Herausforderungen & Potenziale entdecken',
      'Berufung & Lebensthemen klären',
      'Liebe & Beziehungsthemen vertiefen',
      'Individuelle Fragen beantworten',
      'Session wird aufgezeichnet (Zoom)',
      'Über 500 gelesene Geburtshoroskope',
    ],
    deliveryTime: 'Robert meldet sich innerhalb von 24 Stunden (Werktage) zur Terminabsprache',
    process: [
      'Beratung buchen & bezahlen',
      'Robert meldet sich innerhalb von 24 Stunden zur Terminabsprache',
      'Persönlichen Zoom-Link erhalten & Session starten',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: 6,
    name: 'Astrologische Beratung 90 Min',
    shortDescription: 'Transformative Beratung (90min) – tiefgreifende Transformation mit Shadow Work.',
    description: 'Robert Wagner, spezialisiert auf transformative Astrologie, erkundet in 90 Minuten dein Geburtshoroskop – Berufung, Lebensaufgabe, Herausforderungen, Stärken und Potenziale. Für Menschen, die bereit sind, tiefgreifende Transformation zu erleben und innere Blockaden aufzulösen.',
    price: 249.00,
    priceFormatted: '249,00 €',
    image: '/beratung-90.png',
    badge: 'Premium',
    category: 'Beratung',
    details: '90 Minuten intensive Horoskop-Deutung per Zoom. Robert geht tief in dein Geburtshoroskop, aktuelle Transiten, Shadow Work und wenn gewünscht auch Solar-Return und Progressionen ein. Die Session wird aufgezeichnet.',
    benefits: [
      'Tiefgreifende Transformation erleben',
      'Innere Blockaden & Ängste auflösen',
      'Schatten & Familienmuster konfrontieren',
      'Innere Saboteure & limitierende Glaubenssätze erkennen',
      'Leben harmonisch mit der Seelenaufgabe ausrichten',
      'Session wird aufgezeichnet (Zoom)',
      'Über 500 gelesene Geburtshoroskope',
    ],
    deliveryTime: 'Robert meldet sich innerhalb von 24 Stunden (Werktage) zur Terminabsprache',
    process: [
      'Beratung buchen & bezahlen',
      'Robert meldet sich innerhalb von 24 Stunden zur Terminabsprache',
      'Persönlichen Zoom-Link erhalten & Session starten',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: 7,
    name: 'Astrologische Beratung per Video (10 Min+)',
    shortDescription: 'Astrologische Analyse per Video – Lebensaufgabe, Liebe, karmische Themen & mehr.',
    description: 'Robert erstellt eine Offline-Videoanalyse deines Geburtshoroskops. Du sendest deine Geburtsdaten, erhältst dein Radix vorab per WhatsApp und bekommst dann die Videoanalyse als Link zugeschickt. Themen: Lebensaufgabe, Herausforderungen, Liebe, karmische Verstrickungen, Schattenthemen & Berufung.',
    price: 89.00,
    priceFormatted: '89,00 €',
    image: '/beratung-video.png',
    badge: 'Angebot',
    category: 'Beratung',
    details: 'Eine kurze, fokussierte Videoanalyse für eine konkrete Frage oder einen ersten tiefen Einblick. Robert schickt dir vorab dein Radix per WhatsApp und liefert die persönliche Videoanalyse individuell auf deine aktuelle Situation abgestimmt.',
    benefits: [
      'Persönliche Videoanalyse deines Geburtshoroskops',
      'Lebensaufgabe & Herausforderungen',
      'Liebe & karmische Verstrickungen',
      'Schattenthemen & Berufung',
      'Radix (Geburtshoroskop) vorab per WhatsApp',
      'Individuell auf deine aktuelle Situation abgestimmt',
    ],
    deliveryTime: 'Lieferung per WhatsApp',
    process: [
      'Geburtsdaten eingeben & Beratung buchen',
      'Radix (Geburtshoroskop) per WhatsApp erhalten',
      'Persönliche Videoanalyse per WhatsApp-Link erhalten',
    ],
    affiliateUrl: 'https://astroversity.academy',
  },
  {
    id: SKOOL_MEMBERSHIP_ID,
    name: 'Astroversity Academy – Mitgliedschaft',
    shortDescription: 'Dein Zugang zur Astroversity Academy auf Skool – wöchentliche Impulse, Live-Mond-Treffen, E-Book-Bibliothek & Community.',
    description: 'Werde Mitglied der Astroversity Academy auf Skool. Nach dem Kauf erhältst du sofort eine persönliche Einladung per E-Mail und kannst direkt beitreten. Dich erwarten wöchentliche Inspirations-Impulse, Live-Treffen zu Voll- und Neumond, eine wachsende E-Book-Bibliothek und eine deutschsprachige Community.',
    price: 50.00,
    priceFormatted: '50,00 €',
    originalPrice: 69.00,
    originalPriceFormatted: '69,00 €',
    image: '/astroversity-leistungen.png',
    badge: 'Founding Member',
    bestseller: true,
    category: 'Mitgliedschaft',
    details: 'Die Astroversity Academy ist eine deutschsprachige Online-Community zur persönlichen Selbsterkundung im Bereich der psychologischen Astrologie nach C.G. Jung – als Founding Member zum dauerhaften Preis von 50 € / Monat. Die Mitgliedschaft läuft über die Plattform Skool. Nach dem Kauf wirst du automatisch eingeladen und kannst sofort beitreten.',
    benefits: [
      'Wöchentliche Inspirations-Impulse (90–120 Min.)',
      'Live-Treffen zu Voll- und Neumond',
      'Wachsende E-Book-Bibliothek',
      'Monatliche offene Community-Runden',
      'Geschützter Community-Bereich nur für Mitglieder',
      '35 % Rabatt auf alle weiteren Angebote',
      'Founding-Member-Preis: dauerhaft 50 € statt 69 €',
    ],
    deliveryTime: 'Sofort – Einladung per E-Mail direkt nach dem Kauf',
    process: [
      'Mitgliedschaft kaufen & sicher über Mollie bezahlen',
      'Einladungs-E-Mail „Robert Wagner invited you to join Astroversity Academy" erhalten',
      'Auf „JOIN NOW" klicken und sofort beitreten',
    ],
    affiliateUrl: 'https://astroversity.academy',
    skoolMembership: true,
  },
];
