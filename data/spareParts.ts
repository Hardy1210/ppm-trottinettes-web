export interface SparePart {
  id: number;
  title: string;
  description: string;
  price: number | null;
  image: string;
  buttonLabel?: string;
}

export const spareParts: SparePart[] = [
  {
    id: 1,
    title: 'Pneu 10" tubeless',
    description:
      'Pneu de remplacement compatible avec la plupart des trottinettes 10 pouces.',
    price: 29,
    image: '',
  },
  {
    id: 2,
    title: 'Chambre à air 8.5"',
    description:
      'Chambre à air renforcée anti-crevaison pour roues 8.5 pouces.',
    price: 12,
    image: '',
  },
  {
    id: 3,
    title: 'Plaquettes de frein',
    description:
      'Jeu de plaquettes de frein à disque, compatibilité universelle.',
    price: 15,
    image: '',
  },
  {
    id: 4,
    title: 'Chargeur 42V 2A',
    description:
      'Chargeur de remplacement universel 42V pour batteries lithium.',
    price: 35,
    image: '',
  },
  {
    id: 5,
    title: 'Poignées ergonomiques',
    description:
      'Paire de poignées antidérapantes en caoutchouc, confort amélioré.',
    price: 18,
    image: '',
  },
  {
    id: 6,
    title: 'Béquille renforcée',
    description: 'Béquille latérale en aluminium, réglable et résistante.',
    price: 22,
    image: '',
  },
  {
    id: 7,
    title: 'Garde-boue arrière',
    description: 'Garde-boue de remplacement avec support intégré.',
    price: 19,
    image: '',
  },
  {
    id: 8,
    title: 'Kit éclairage LED',
    description: 'Feu avant + feu arrière LED rechargeable USB, waterproof.',
    price: 45,
    image: '',
  },
];
