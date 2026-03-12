export type TestimonialItem = {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'Un atelier sérieux et réactif. Diagnostic rapide et explications claires à chaque étape. On sent une vraie expertise technique et un vrai souci de la qualité du travail.',
    name: 'Marc D.',
    role: 'CLIENT PARTICULIER',
    avatar: '/images/testimonials/marc.webp',
  },
  {
    id: 2,
    quote:
      'Service professionnel et délais respectés, ce qui est rare dans le domaine de la réparation. Intervention propre et efficace avec des conseils utiles pour l’entretien de la trottinette.',
    name: 'Sophie L.',
    role: 'UTILISATRICE QUOTIDIENNE',
    avatar: '/images/testimonials/sophie.webp',
  },
  {
    id: 3,
    quote:
      'Très bonne expérience du premier contact jusqu’à la récupération de la trottinette. Travail soigné, prix cohérents et communication transparente tout au long de l’intervention.',
    name: 'Julien R.',
    role: 'CLIENT RÉGULIER',
    avatar: '/images/testimonials/julien.webp',
  },
];
