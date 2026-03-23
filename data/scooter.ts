export interface Scooter {
  id: number;
  name: string;
  slug: string;
  status: 'neuf' | 'occasion';
  price: number | null;
  shortDescription: string;
  specs: {
    autonomie: string;
    vitesse: string;
    puissance: string;
    poids: string;
    pneus: string;
    freins: string;
  };
  images: string[];
  conditionNote?: string;
}

export const scooters: Scooter[] = [
  {
    id: 1,
    name: 'Glide City 350',
    slug: 'Glide-City-350',
    status: 'neuf',
    price: 299.99,
    shortDescription: 'Le best-seller urbain, confort et autonomie au top.',
    specs: {
      autonomie: '36V 10.4Ah',
      vitesse: '25 km/h',
      puissance: '350W',
      poids: '19,8 kg',
      pneus: '10×2.5 pouces',
      freins: 'disques avant et arrière',
    },
    images: [
      '/images/trottinettes/e-glide-city-350/1.webp',
      '/images/trottinettes/e-glide-city-350/2.webp',
      '/images/trottinettes/e-glide-city-350/3.webp',
    ],
  },
  {
    id: 2,
    name: 'Xiaomi Electric Scooter 4 Pro',
    slug: 'xiaomi-scooter-4-pro',
    status: 'neuf',
    price: 699,
    shortDescription:
      'Puissant et fiable, parfait pour les trajets quotidiens.',
    specs: {
      autonomie: '55 km',
      vitesse: '25 km/h',
      puissance: '700W',
      poids: '16,5 kg',
      pneus: '10" gonflables',
      freins: 'Disque + E-ABS',
    },
    images: [],
  },
  {
    id: 3,
    name: 'Dualtron Mini',
    slug: 'dualtron-mini',
    status: 'neuf',
    price: 1290,
    shortDescription: 'Compacte mais sportive, suspension premium.',
    specs: {
      autonomie: '50 km',
      vitesse: '32 km/h',
      puissance: '800W',
      poids: '20 kg',
      pneus: '8,5" tubeless',
      freins: 'Disque avant + arrière',
    },
    images: [],
  },
  {
    id: 4,
    name: 'Vsett 10+',
    slug: 'vsett-10-plus',
    status: 'neuf',
    price: 2190,
    shortDescription: 'La référence GT, double moteur, suspensions réglables.',
    specs: {
      autonomie: '90 km',
      vitesse: '60 km/h',
      puissance: '2 × 1400W',
      poids: '35 kg',
      pneus: '10" gonflables',
      freins: 'Disque hydraulique × 2',
    },
    images: [],
  },
  {
    id: 5,
    name: 'Ninebot F2 Plus',
    slug: 'ninebot-f2-plus',
    status: 'occasion',
    price: 349,
    shortDescription: 'Idéale pour débuter, légère et maniable.',
    specs: {
      autonomie: '40 km',
      vitesse: '25 km/h',
      puissance: '400W',
      poids: '15,8 kg',
      pneus: '10" anti-crevaison',
      freins: 'Tambour + régénératif',
    },
    images: [],
    conditionNote:
      'Très bon état, 800 km au compteur. Pneus et freins vérifiés. Batterie testée à 92% de capacité.',
  },
  {
    id: 6,
    name: 'Xiaomi Mi Scooter 3',
    slug: 'xiaomi-mi-scooter-3',
    status: 'occasion',
    price: 280,
    shortDescription: 'Classique fiable, parfait premier prix révisé.',
    specs: {
      autonomie: '30 km',
      vitesse: '25 km/h',
      puissance: '300W',
      poids: '13 kg',
      pneus: '8,5" gonflables',
      freins: 'Disque + E-ABS',
    },
    images: [],
    conditionNote:
      'Bon état général, quelques rayures cosmétiques. Révisée en atelier, pneus neufs montés.',
  },
  {
    id: 7,
    name: 'Kaabo Mantis 8',
    slug: 'kaabo-mantis-8',
    status: 'occasion',
    price: 590,
    shortDescription: "Sportive d'occasion, excellent rapport qualité/prix.",
    specs: {
      autonomie: '45 km',
      vitesse: '35 km/h',
      puissance: '800W',
      poids: '22 kg',
      pneus: '8" gonflables',
      freins: 'Disque avant + arrière',
    },
    images: [],
    conditionNote:
      'État correct, 2 500 km. Suspensions réglées, freins neufs, batterie à 88%.',
  },
  {
    id: 8,
    name: 'Inokim Quick 4',
    slug: 'inokim-quick-4',
    status: 'occasion',
    price: null,
    shortDescription: "Haut de gamme d'occasion, confort et finitions premium.",
    specs: {
      autonomie: '55 km',
      vitesse: '40 km/h',
      puissance: '600W',
      poids: '17 kg',
      pneus: '10" gonflables',
      freins: 'Disque hydraulique',
    },
    images: [],
    conditionNote:
      'Excellent état, 1 200 km. Première main, stockée en intérieur. Complète avec accessoires.',
  },
];
