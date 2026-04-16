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
      "Réactif et professionnel. J'ai plusieurs fois emmené ma trottinette et à chaque fois les réparations étaient rapides et propres. Petit plus, on récupère la trottinette nettoyée comme neuve.",
    name: 'MZt.L.',
    role: 'CLIENT PARTICULIER',
    avatar: '/images/testimonials/user44.png',
  },
  {
    id: 2,
    quote:
      'Merci pour la réparation de la batterie de ma vieille visseuse de 2016 (pour info : pièce introuvable dans le commerce). Depuis, elle fonctionne encore mieux qu’avant, une journée complète à visser et percer dans du bois sans recharger, c’est super. Merci encore.',
    name: 'Rogerio',
    role: 'CLIENT PARTICULIER',
    avatar: '/images/testimonials/user66.png',
  },
  {
    id: 3,
    quote: 'Efficacité, rapidité disponibilité!!',
    name: 'Fabricio.',
    role: 'CLIENT RÉGULIER',
    avatar: '/images/testimonials/user55.png',
  },
];
