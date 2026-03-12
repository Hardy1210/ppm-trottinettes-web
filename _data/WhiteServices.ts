export type ShowcaseItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  meta?: string;
};

export const servicesItems: ShowcaseItem[] = [
  {
    title: 'Diagnostic Technique',
    description:
      'Diagnostic complet permettant d’identifier précisément les pannes électroniques, mécaniques ou logicielles. Chaque contrôle permet d’orienter efficacement la réparation avant toute intervention.',
    image: '/images/services/diagnostic-scooter.webp',
    imageAlt: 'Diagnostic technique de trottinette électrique',
    meta: 'Détection • Analyse • Rapport',
  },
  {
    title: 'Maintenance & Réparation',
    description:
      'Entretien, réparation ou remplacement des composants essentiels (pneus, batterie, moteur, freins, électronique) pour garantir sécurité et performance.',
    image: '/images/services/maintenance-scooter.webp',
    imageAlt: 'Maintenance et réparation de trottinette électrique',
    meta: 'Réglage • Réparation • Remplacement',
  },
  {
    title: 'Vente',
    description:
      'Vente de trottinettes électriques, pièces détachées et accessoires certifiés avec conseils adaptés à votre modèle. Nous proposons des solutions fiables pour améliorer performance, sécurité et confort d’utilisation.',
    image: '/images/services/vente-batterie.webp',
    imageAlt: 'Batterie pour trottinette électrique',
    meta: 'Conseils • Produits • Garantie',
  },
  {
    title: 'Accessoires & Équipements',
    description:
      'Installation et remplacement d’accessoires et pièces complémentaires conformes aux normes constructeur pour améliorer confort, sécurité et durabilité.',
    image: '/images/services/accessoires-garde-boue.webp',
    imageAlt: 'Accessoires et équipements pour trottinette électrique',
    meta: 'Pièces • Accessoires • Équipements',
  },
];
