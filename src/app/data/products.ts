export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
  badge?: string;
  bestseller?: boolean;
  category: string;
  details: string;
  benefits?: string[];
  affiliateUrl: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Astrologie-Ausbildung (6 Monate)',
    shortDescription: 'Die komplette Ausbildung zum Astrologen – Placidus-System, Horoskop-Deutung & mehr.',
    description: 'In 6 Monaten zur fundierten Astrologie-Kenntnissen. Robert Wagner führt dich Schritt für Schritt durch alle Grundlagen und Techniken des Placidus-Systems.',
    price: 3600,
    priceFormatted: '3.600,00 €',
    image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=800&q=80',
    badge: 'Beliebt',
    bestseller: true,
    category: 'Ausbildung',
    details: 'Die 6-monatige Astrologie-Ausbildung von AstroDaddy vermittelt dir alles, was du brauchst, um Horoskope professionell zu deuten. Du lernst das Placidus-System, Planeten, Häuser, Aspekte und deren Deutung im Kontext des Lebens.',
    benefits: [
      'Komplette Horoskop-Deutung von Grund auf',
      'Placidus-Häusersystem im Detail',
      'Planeten, Zeichen & Aspekte verstehen',
      'Live-Sessions mit Robert Wagner',
      'Zertifikat nach Abschluss',
      '6 Monate Begleitung & Support',
    ],
    affiliateUrl: 'https://www.astrodaddy.de/astrologie-ausbildung',
  },
  {
    id: 2,
    name: 'Geburtshoroskop-Deutung (45 Min)',
    shortDescription: 'Persönliche Horoskop-Beratung mit Robert Wagner – tauche tief in dein Potenzial ein.',
    description: 'In einer 45-minütigen Session deutet Robert dein Geburtshoroskop und zeigt dir, welche Potenziale, Muster und Lebensthemen in den Sternen für dich stehen.',
    price: 199,
    priceFormatted: '199,00 €',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
    badge: 'Empfohlen',
    bestseller: true,
    category: 'Beratung',
    details: 'Eine tiefgehende 45-minütige Einzelberatung. Robert Wagner analysiert dein Geburtshoroskop nach dem Placidus-System und gibt dir konkrete Einblicke in deine Persönlichkeit, Stärken, Herausforderungen und Lebensthemen.',
    benefits: [
      '45 Minuten persönliche Beratung',
      'Komplette Horoskop-Analyse',
      'Stärken & Herausforderungen',
      'Aktuelle Transiten & Entwicklungen',
      'Aufzeichnung inklusive',
    ],
    affiliateUrl: 'https://www.astrodaddy.de',
  },
  {
    id: 3,
    name: 'Tarot-Legung (45 Min)',
    shortDescription: 'Klarheit für deine wichtigsten Lebensfragen durch geführte Tarot-Deutung.',
    description: 'Robert legt für dich die Karten und deutet, was Tarot für deine aktuelle Lebenssituation, Beziehungen oder Entscheidungen zeigt.',
    price: 199,
    priceFormatted: '199,00 €',
    image: 'https://images.unsplash.com/photo-1601049541708-182b022a8a25?w=800&q=80',
    category: 'Tarot',
    details: 'Tarot als Spiegel der Seele: In 45 Minuten legt Robert die Karten für deine Fragen zu Liebe, Beruf, Lebensweg oder aktuellen Entscheidungen. Tiefgehend, ehrlich und einfühlsam.',
    benefits: [
      '45 Minuten Tarot-Legung',
      'Für alle Lebensbereiche geeignet',
      'Ehrliche & einfühlsame Deutung',
      'Handlungsempfehlungen',
      'Aufzeichnung auf Wunsch',
    ],
    affiliateUrl: 'https://www.astrodaddy.de',
  },
  {
    id: 4,
    name: 'Kurzberatung (10 Min)',
    shortDescription: 'Schnelle Antwort auf eine konkrete Frage – ideal für einen ersten Einblick.',
    description: 'Du hast eine brennende Frage? In 10 Minuten gibt Robert dir eine klare, fokussierte Antwort aus astrologischer Perspektive.',
    price: 55,
    priceFormatted: '55,00 €',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'Beratung',
    details: '10 Minuten, eine Frage, klare Antwort. Perfekt für alle, die einen ersten Einblick in die Astrologie oder Antwort auf eine spezifische Lebensfrage suchen.',
    benefits: [
      '10 Minuten fokussierte Beratung',
      'Eine konkrete Frage',
      'Schnelle Terminvergabe',
      'Ideal als Einstieg',
    ],
    affiliateUrl: 'https://www.astrodaddy.de',
  },
  {
    id: 5,
    name: 'Monetarisierungskurs',
    shortDescription: 'Mach deine Astrologie-Leidenschaft zur Berufung und zum Business.',
    description: 'Du liebst Astrologie und möchtest damit Geld verdienen? Robert zeigt dir, wie du dein Wissen professionell vermarktest und dein eigenes Astrologie-Business aufbaust.',
    price: 1300,
    priceFormatted: '1.300,00 €',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'Ausbildung',
    details: 'Der Monetarisierungskurs zeigt dir, wie du aus deiner Leidenschaft für Astrologie ein nachhaltiges Business aufbaust. Marketing, Angebote, Preisfindung, Social Media – alles was du brauchst.',
    benefits: [
      'Business-Aufbau für Astrologen',
      'Social Media & Marketing',
      'Angebots- & Preisstrategien',
      'Kundenkommunikation',
      'Persönliches Mentoring',
    ],
    affiliateUrl: 'https://www.astrodaddy.de',
  },
  {
    id: 6,
    name: 'Premium-Beratung (90 Min)',
    shortDescription: 'Die tiefste Reise ins Horoskop – ideal für Lebenswendepunkte.',
    description: '90 Minuten intensive Horoskop-Deutung für Menschen in Lebenswendepunkten oder mit tiefgehendem Interesse an Selbsterkenntnis.',
    price: 349,
    priceFormatted: '349,00 €',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    badge: 'Premium',
    category: 'Beratung',
    details: '90 Minuten, in denen Robert tief in dein Geburtshoroskop, aktuelle Transiten und wenn gewünscht auch Solar-Return und Progressionen eingeht. Für Menschen, die wirklich verstehen wollen, warum ihr Leben so ist wie es ist.',
    benefits: [
      '90 Minuten intensive Analyse',
      'Geburtshoroskop + Transiten',
      'Solar-Return optional',
      'Progressionen auf Wunsch',
      'Vollständige Aufzeichnung',
      'Nachbetreuung per E-Mail',
    ],
    affiliateUrl: 'https://www.astrodaddy.de',
  },
];
