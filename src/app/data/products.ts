export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  priceFormatted: string;
  image: string;
  badge?: string;
  category: string;
  details: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Longevity Essentials',
    description: 'Premium Nahrungsergänzung für gesundes Altern',
    price: 49.90,
    priceFormatted: '49,90€',
    image: 'https://images.unsplash.com/photo-1763668444855-401b58dceb20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjBzdXBwbGVtZW50JTIwYm90dGxlfGVufDF8fHx8MTc3MTc3NTUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Bestseller',
    category: 'Nahrungsergänzung',
    details: 'Unsere Longevity Essentials sind eine sorgfältig abgestimmte Mischung aus hochwertigen Inhaltsstoffen, die deine Zellen unterstützen und den Alterungsprozess positiv beeinflussen. Entwickelt mit neuesten wissenschaftlichen Erkenntnissen aus der Longevity-Forschung.',
    ingredients: ['Resveratrol', 'NMN (Nicotinamid-Mononukleotid)', 'Quercetin', 'Vitamin D3', 'Omega-3-Fettsäuren'],
    benefits: [
      'Unterstützt die zelluläre Gesundheit',
      'Fördert gesundes Altern',
      'Stärkt das Immunsystem',
      'Verbessert die Energieproduktion',
      'Reduziert oxidativen Stress'
    ],
    usage: 'Täglich 2 Kapseln mit einer Mahlzeit einnehmen. Für beste Ergebnisse kombiniere die Einnahme mit einer ausgewogenen Ernährung und regelmäßiger Bewegung.'
  },
  {
    id: 2,
    name: 'Vitality Boost',
    description: 'Natürliche Energie für jeden Tag',
    price: 39.90,
    priceFormatted: '39,90€',
    image: 'https://images.unsplash.com/photo-1565206590057-55bb1c51d7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwd2VsbG5lc3MlMjBwcm9kdWN0fGVufDF8fHx8MTc3MTc3NTUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Neu',
    category: 'Energie & Vitalität',
    details: 'Vitality Boost gibt dir die natürliche Energie, die du für einen aktiven und erfüllten Tag brauchst. Ohne künstliche Stimulanzien, dafür mit der Kraft adaptogener Pflanzen und essentieller Nährstoffe.',
    ingredients: ['Ashwagandha', 'Rhodiola Rosea', 'Ginseng', 'B-Vitamin-Komplex', 'Magnesium'],
    benefits: [
      'Natürlicher Energieschub ohne Crash',
      'Reduziert Stress und Erschöpfung',
      'Verbessert mentale Klarheit',
      'Unterstützt die Nebennierenfunktion',
      'Fördert körperliche Ausdauer'
    ],
    usage: 'Morgens 1-2 Kapseln auf nüchternen Magen oder zum Frühstück einnehmen. Kann bei Bedarf auch mittags wiederholt werden.'
  },
  {
    id: 3,
    name: 'Regeneration Plus',
    description: 'Für erholsamen Schlaf und Regeneration',
    price: 44.90,
    priceFormatted: '44,90€',
    image: 'https://images.unsplash.com/photo-1643836392610-3e69dca19ffe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBwcm9kdWN0fGVufDF8fHx8MTc3MTc3NTUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Beliebt',
    category: 'Schlaf & Regeneration',
    details: 'Regeneration Plus unterstützt deinen Körper dabei, sich nachts optimal zu erholen. Tiefer, erholsamer Schlaf ist der Schlüssel zu Longevity und Lebensqualität. Mit natürlichen Inhaltsstoffen für süße Träume und morgendliche Frische.',
    ingredients: ['Melatonin', 'L-Theanin', 'Baldrian', 'Passionsblume', 'Magnesium-Glycinat'],
    benefits: [
      'Fördert schnelleres Einschlafen',
      'Verbessert die Schlafqualität',
      'Unterstützt die nächtliche Regeneration',
      'Reduziert nächtliches Aufwachen',
      'Sorgt für erholten Morgen'
    ],
    usage: '1-2 Kapseln 30-60 Minuten vor dem Schlafengehen mit einem Glas Wasser einnehmen. Für beste Ergebnisse eine regelmäßige Schlafenszeit etablieren.'
  },
  {
    id: 4,
    name: 'Mind & Focus',
    description: 'Für mentale Klarheit und Konzentration',
    price: 42.90,
    priceFormatted: '42,90€',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMGhlYWx0aCUyMHN1cHBsZW1lbnR8ZW58MXx8fHwxNzQwMTgzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Empfohlen',
    category: 'Gehirngesundheit',
    details: 'Mind & Focus ist deine mentale Geheimwaffe für produktive Tage. Die synergistische Formel aus Nootropika und Nährstoffen unterstützt Konzentration, Gedächtnis und kognitive Leistung.',
    ingredients: ['Lion\'s Mane Pilz', 'Bacopa Monnieri', 'Ginkgo Biloba', 'Alpha-GPC', 'Phosphatidylserin'],
    benefits: [
      'Verbessert Fokus und Konzentration',
      'Unterstützt Gedächtnis und Lernfähigkeit',
      'Fördert neuronale Gesundheit',
      'Reduziert mentale Müdigkeit',
      'Erhöht geistige Klarheit'
    ],
    usage: 'Täglich 2 Kapseln am Morgen oder bei Bedarf vor geistig anspruchsvollen Aufgaben einnehmen.'
  },
  {
    id: 5,
    name: 'Joint Support',
    description: 'Für bewegliche und gesunde Gelenke',
    price: 38.90,
    priceFormatted: '38,90€',
    image: 'https://images.unsplash.com/photo-1556817411-92c94e6f1e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2ludCUyMGhlYWx0aCUyMHN1cHBsZW1lbnR8ZW58MXx8fHwxNzQwMTgzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Beweglichkeit',
    details: 'Joint Support hält deine Gelenke beweglich und gesund. Mit Kollagen und natürlichen entzündungshemmenden Inhaltsstoffen für ein aktives Leben in jedem Alter.',
    ingredients: ['Kollagen Typ II', 'Glucosamin', 'Chondroitin', 'MSM', 'Kurkuma-Extrakt'],
    benefits: [
      'Unterstützt Gelenkgesundheit',
      'Fördert Knorpelregeneration',
      'Reduziert Gelenkbeschwerden',
      'Verbessert Beweglichkeit',
      'Entzündungshemmende Wirkung'
    ],
    usage: 'Täglich 3 Kapseln mit einer Mahlzeit einnehmen. Für optimale Ergebnisse über mindestens 3 Monate einnehmen.'
  },
  {
    id: 6,
    name: 'Gut Health Pro',
    description: 'Probiotika für eine gesunde Darmflora',
    price: 45.90,
    priceFormatted: '45,90€',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9iaW90aWMlMjBzdXBwbGVtZW50fGVufDF8fHx8MTc0MDE4MzUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    badge: 'Top-Seller',
    category: 'Darmgesundheit',
    details: 'Gut Health Pro unterstützt deine Darmflora mit 20 Milliarden KBE pro Kapsel. Ein gesunder Darm ist die Grundlage für Immunsystem, Stimmung und Langlebigkeit.',
    ingredients: ['Lactobacillus acidophilus', 'Bifidobacterium lactis', 'Lactobacillus rhamnosus', 'Präbiotische Ballaststoffe', 'Verdauungsenzyme'],
    benefits: [
      'Fördert gesunde Darmflora',
      'Stärkt das Immunsystem',
      'Verbessert Verdauung',
      'Unterstützt Nährstoffaufnahme',
      'Reduziert Blähungen'
    ],
    usage: 'Täglich 1 Kapsel auf nüchternen Magen oder zu einer Mahlzeit einnehmen. Im Kühlschrank aufbewahren.'
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}
