export interface ProductVariant {
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
  images?: string[];
  imageFit?: 'cover' | 'contain';
  badge?: string;
  bestseller?: boolean;
  category: string;
  details: string;
  benefits?: string[];
  usage?: string;
  affiliateUrl: string;
  discountCode?: string;
  discountInfo?: string;
  variants?: ProductVariant[];
  variantNote?: string;
}

const DISCOUNT_CODE = '528217';
const DISCOUNT_INFO = '10 € Neukundenrabatt ab 100 € Bestellwert';

export const products: Product[] = [
  // ─── 1. 100 Tage Basiskur ────────────────────────────────────────────────
  {
    id: 1,
    name: '100 Tage Basiskur Cellagon aurum',
    shortDescription: 'In nur 100 Tagen Nährstoffdefizite kinderleicht ausgleichen.',
    description: 'Das komplette Set für deine Basisversorgung über 100 Tage.',
    price: 201,
    priceFormatted: '201,00 €',
    image: '/cellagon/cellagon-aurum-100-tage-basiskur_1920x1920.png',
    images: [
      '/cellagon/cellagon-aurum_dsb-packshot-1_1920x1920.jpg',
      '/cellagon/cellagon-aurum-origin-1_1920x1920.jpg',
      '/cellagon/cellagon-aurum-stepbystep_anleitung-1_600x600.jpg',
    ],
    badge: 'Empfohlen',
    bestseller: true,
    category: 'Mikronährstoffkonzentrat',
    details: 'Mit der 100-Tage-Basiskur mit Cellagon aurum kannst du von Tag eins an dazu beitragen, dass sich deine Zellen problemlos erneuern und ihre Aufgaben und Funktionen bestmöglich erledigen können. Statt einzelner Flaschen erhältst du das komplette Paket für 100 Tage – günstiger als Einzelkauf (201 € statt 211,60 €).',
    benefits: [
      'Unterstützt die zelluläre Erneuerung',
      'Tägliche Basisversorgung mit Vitaminen & Mineralstoffen',
      'Aus über 80 natürlichen Zutaten',
      'Günstiger als Einzelkauf: 201 € statt 211,60 €',
      '100 Tage konsequente Versorgung',
    ],
    usage: 'Täglich 20 ml Cellagon aurum pur oder in Wasser/Saft gemischt einnehmen. Am besten morgens auf nüchternen Magen.',
    affiliateUrl: 'https://528217.cellagon.de/100-tage-basis-kur-cellagon-aurum',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
  },

  // ─── 2. Cellagon aurum ───────────────────────────────────────────────────
  {
    id: 2,
    name: 'Cellagon aurum',
    shortDescription: 'Flüssiges Mikronährstoffkonzentrat zur täglichen Basisversorgung.',
    description: 'Mit Vitaminen aus natürlichen Quellen und Mineralstoffen aus über 80 Zutaten wie Obst, Gemüse und Kräutern.',
    price: 52.90,
    priceFormatted: '52,90 €',
    image: '/cellagon/cellagon-aurum-flasche_1920x1920.png',
    images: [
      '/cellagon/cellagon-aurum.png',
      '/cellagon/cellagon-aurum-glas.png',
      '/cellagon/cellagon-alle-flaschen.png',
      '/cellagon/cellagon-aurum-origin-1_1920x1920.jpg',
      '/cellagon/cellagon-aurum-dosierhilfe_1920x1920.jpg',
      '/cellagon/cellagon-aurum-qualitaetssiegel-1_1920x1920.jpg',
      '/cellagon/cellagon-aurum-stepbystep_anleitung-1_600x600.jpg',
      '/cellagon/cellagon-aurum-zutaten-1_600x600.jpg',
    ],
    variants: [
      { name: 'Original', image: '/cellagon/cellagon-aurum-flasche_1920x1920.png' },
      { name: 'Sommerbeere', image: '/cellagon/cellagon-aurum_dsb-packshot-1_1920x1920.jpg' },
    ],
    badge: 'Bestseller',
    bestseller: true,
    category: 'Mikronährstoffkonzentrat',
    details: 'Cellagon aurum ist ein flüssiges Mikronährstoffkonzentrat zur täglichen Basisversorgung: mit Vitaminen aus natürlichen Quellen und Mineralstoffen aus über 80 Zutaten wie Obst, Gemüse und Kräutern. Die flüssige Form ermöglicht eine optimale Aufnahme der Nährstoffe.',
    benefits: [
      'Über 80 natürliche Zutaten aus Obst, Gemüse und Kräutern',
      'Vitamine aus natürlichen Quellen',
      'Flüssige Form für optimale Nährstoffaufnahme',
      'Tägliche Basisversorgung',
      'Einfache Einnahme pur oder in Wasser gemischt',
    ],
    usage: 'Täglich 20 ml pur oder in Wasser/Saft gemischt einnehmen. Am besten morgens auf nüchternen Magen.',
    affiliateUrl: 'https://www.cellagon.de/vitalstoffsystem/mikronaehrstoffe/aurum/?affiliate=def502006ceae626606024b7b8fdc88b63734cdcb79988b419db9c908caa27b13c19d9389e1b6be5ef3f03d251dec4599b991de5001e1a9162e1ebeb907aea684e5fe666b972444f151e5dee5d6c74cc79b738689cc6bc8774d8a0add41841cd9eac5dbba4df02284840da504d194c8ebb7801297fdaf3b94592c51030280745bfa530e5adf9baac37eed40032e5f10956240fcc3be6',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
  },

  // ─── 3. Cellagon felice ──────────────────────────────────────────────────
  {
    id: 3,
    name: 'Cellagon felice',
    shortDescription: 'Für Haut, Haare, Nägel, Bindegewebe und Schleimhäute.',
    description: 'Flüssiges Mikronährstoffkonzentrat zur Versorgung von Haut, Haaren, Nägeln, Bindegewebe und Schleimhäuten.',
    price: 39.40,
    priceFormatted: '39,40 €',
    image: '/cellagon/cellagon-felice-flasche_1920x1920.png',
    images: [
      '/cellagon/cellagon-felice-packshot-1_600x600.jpg',
      '/cellagon/cellagon-felice-freivon-1_600x600.jpg',
      '/cellagon/cellagon-alle-flaschen.png',
    ],
    category: 'Mikronährstoffkonzentrat',
    details: 'Cellagon felice ist ein flüssiges Mikronährstoffkonzentrat zur gezielten Versorgung von Haut, Haaren, Nägeln, Bindegewebe und Schleimhäuten. Mit ausgewählten Mikronährstoffen für deine äußere und innere Schönheit.',
    benefits: [
      'Unterstützt Haut, Haare und Nägel',
      'Stärkt das Bindegewebe',
      'Versorgt die Schleimhäute',
      'Flüssige Form für optimale Aufnahme',
      'Natürliche Inhaltsstoffe',
    ],
    usage: 'Täglich 20 ml pur oder in Wasser/Saft gemischt einnehmen.',
    affiliateUrl: '#',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
  },

  // ─── 4. Cellagon vitale plus ─────────────────────────────────────────────
  {
    id: 4,
    name: 'Cellagon vitale plus',
    shortDescription: 'Für Gehirn- und Nervenzellen sowie die Augen.',
    description: 'Flüssiges Mikronährstoffkonzentrat zur Versorgung der Gehirn- und Nervenzellen sowie der Augen.',
    price: 41.40,
    priceFormatted: '41,40 €',
    image: '/cellagon/cellagon-vitale-plus-flasche_1920x1920.png',
    category: 'Mikronährstoffkonzentrat',
    details: 'Cellagon vitale plus ist ein flüssiges Mikronährstoffkonzentrat zur gezielten Versorgung der Gehirn- und Nervenzellen sowie der Augen. Ideal für alle, die ihre kognitive Gesundheit und Sehkraft langfristig unterstützen möchten.',
    benefits: [
      'Unterstützt Gehirn- und Nervenzellen',
      'Fördert die Augengesundheit',
      'Flüssige Form für optimale Aufnahme',
      'Gezielte Mikronährstoffversorgung',
      'Für langfristige kognitive Gesundheit',
    ],
    usage: 'Täglich 20 ml pur oder in Wasser/Saft gemischt einnehmen.',
    affiliateUrl: 'https://www.cellagon.de/vitalstoffsystem/mikronaehrstoffe/vitale-plus',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
  },

  // ─── 5. Cellagon T.GO ────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Cellagon T.GO',
    shortDescription: 'Speziell für regelmäßige Bewegung und sportliche Aktivität.',
    description: 'Flüssiges Mikronährstoffkonzentrat mit Vitaminen aus natürlichen Quellen und Mineralstoffen aus Obst, Gemüse und Kräutern.',
    price: 46.50,
    priceFormatted: '46,50 €',
    image: '/cellagon/cellagon-tgo-flasche_1920x1920.png',
    images: [
      '/cellagon/cellagon-alle-flaschen.png',
    ],
    category: 'Mikronährstoffkonzentrat',
    details: 'Cellagon T.GO ist ein flüssiges Mikronährstoffkonzentrat zur speziellen Ernährung bei regelmäßiger Bewegung und sportlicher Aktivität: mit Vitaminen aus natürlichen Quellen und Mineralstoffen aus Obst, Gemüse und Kräutern.',
    benefits: [
      'Speziell für sportlich aktive Menschen',
      'Vitamine aus natürlichen Quellen',
      'Mineralstoffe aus Obst, Gemüse und Kräutern',
      'Unterstützt Regeneration nach dem Sport',
      'Flüssige Form für schnelle Aufnahme',
    ],
    usage: 'Täglich 20 ml pur oder in Wasser/Saft gemischt einnehmen, idealerweise vor oder nach dem Sport.',
    affiliateUrl: 'https://www.cellagon.de/vitalstoffsystem/mikronaehrstoffe/t-go',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
  },

  // ─── 6. CellaVie Bio-Leinöl ─────────────────────────────────────────────
  {
    id: 6,
    name: 'CellaVie Bio-Leinöl',
    shortDescription: 'Reines Bio-Leinöl, reich an pflanzlichem Omega-3.',
    description: 'Reines Bio-Leinöl, kaltgepresst und besonders reich an der pflanzlichen Omega-3-Fettsäure Alpha-Linolensäure.',
    price: 12.90,
    priceFormatted: '12,90 €',
    image: '/cellagon/cellavie-pur.jpg',
    imageFit: 'contain',
    category: 'Omega-3-Öle',
    details: 'CellaVie Bio-Leinöl ist reines Bio-Leinöl, kaltgepresst und besonders reich an der pflanzlichen Omega-3-Fettsäure Alpha-Linolensäure. Schonend hergestellt unter Ausschluss von Licht und Sauerstoff. Neutral im Geschmack und vielseitig in der kalten Küche einsetzbar.',
    benefits: [
      'Reich an pflanzlichem Omega-3 (Alpha-Linolensäure)',
      'Kaltgepresst und bio-zertifiziert',
      'Schonende Herstellung ohne Licht und Sauerstoff',
      'Neutral im Geschmack',
      'Vielseitig in der kalten Küche einsetzbar',
    ],
    usage: 'Täglich 1–2 EL pur oder in kalten Speisen (Salate, Joghurt, Müsli). Nicht zum Erhitzen geeignet.',
    affiliateUrl: 'https://www.cellagon.de/vitalstoffsystem/omega-3-oele/cellavie-bio-leinoel-pur',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
  },

  // ─── 7. Omega3 Algenöl ───────────────────────────────────────────────────
  {
    id: 7,
    name: 'Omega3 Algenöl',
    shortDescription: 'Veganes Omega-3 mit DHA und EPA sowie Vitamin D3.',
    description: 'Geschmacksneutrales veganes Omega-3 Algenöl. Pflanzliche Quelle für DHA und EPA im Verhältnis 2:1 mit Vitamin D3.',
    price: 29.90,
    priceFormatted: '29,90 €',
    image: '/cellagon/algenoel-kurz.jpg',
    images: [
      '/cellagon/algenoel-pur.png',
    ],
    category: 'Omega-3-Öle',
    details: 'Geschmacksneutrales veganes Omega-3 Algenöl. Pflanzliche Quelle für DHA und EPA im Verhältnis 2:1 mit Vitamin D3. Ideal zum Mischen in kalte Speisen wie Salate oder Joghurt. Erhältlich in drei Geschmacksrichtungen.',
    benefits: [
      'Vegane Quelle für DHA und EPA',
      'DHA zu EPA im optimalen Verhältnis 2:1',
      'Mit Vitamin D3',
      'Geschmacksneutral – ideal zum Mischen',
      '100 % pflanzlich',
    ],
    usage: 'Täglich 5 ml (1 TL) pur oder in kalten Speisen (Salate, Joghurt). Nicht zum Erhitzen geeignet.',
    affiliateUrl: 'https://www.cellagon.de/vitalstoffsystem/omega-3-oele/omega-3-algenoel',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
    variants: [
      { name: 'Pur', image: '/cellagon/algenoel-pur.png' },
      { name: 'Orange', image: '/cellagon/algenoel-kurz.jpg' },
      { name: 'Zitrone', image: '/cellagon/algenoel-kurz.jpg' },
    ],
    variantNote: 'Geschmack nach Wahl: Pur, Orange oder Zitrone. Bitte beim Kauf auf der Herstellerseite auswählen.',
  },

  // ─── 8. Cellamino Proteinpulver ──────────────────────────────────────────
  {
    id: 8,
    name: 'Cellamino veganes Proteinpulver',
    shortDescription: 'Vollständiges Aminosäureprofil aus pflanzlichen Quellen.',
    description: 'Veganes Proteinpulver mit vollständigem Aminosäureprofil. Frei von Gluten, Soja, Laktose und Gentechnik.',
    price: 26.90,
    priceFormatted: '26,90 €',
    image: '/cellagon/cellamino-schoko.png',
    images: [
      '/cellagon/cellamino-vanille.png',
    ],
    category: 'Veganes Proteinpulver',
    details: 'Cellamino ist ein veganes Proteinpulver mit vollständigem Aminosäureprofil aus Erbsen-, Reis-, Sonnenblumen- und Kürbiskernprotein. Es liefert alle essentiellen Aminosäuren, die der Körper täglich benötigt. Frei von Gluten, Soja, Laktose und Gentechnik.',
    benefits: [
      'Vollständiges Aminosäureprofil',
      'Aus Erbsen-, Reis-, Sonnenblumen- und Kürbiskernprotein',
      'Frei von Gluten, Soja, Laktose und Gentechnik',
      'Vielseitig in Shakes, Müsli oder Smoothies einsetzbar',
      'Unterstützt eine bewusste pflanzliche Ernährung',
    ],
    usage: 'Ca. 30 g (2 gehäufte EL) in 250–300 ml Wasser, Pflanzendrink oder Saft einrühren oder mixen.',
    affiliateUrl: 'https://www.cellagon.de/produkte/vegane-proteinpulver/',
    discountCode: DISCOUNT_CODE,
    discountInfo: DISCOUNT_INFO,
    variants: [
      { name: 'Schoko', image: '/cellagon/cellamino-schoko.png' },
      { name: 'Vanille', image: '/cellagon/cellamino-vanille.png' },
    ],
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}
