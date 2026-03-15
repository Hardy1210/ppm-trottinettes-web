export type ServiceItem = {
  key?: string;
  _key?: string;
  title: string;
  description: string;
  priceLabel?: string;
  priceValue?: string;
  order?: number;
};

export const serviceListData: ServiceItem[] = [
  {
    key: 'diagnostic-de-panne',
    title: 'Diagnostic de panne',
    description:
      'Le diagnostic consiste à identifier de manière précise la ou les pannes sur votre trottinette électrique, incluant des tests sur l’électronique, la mécanique et le logiciel embarqué. Un technicien examine chaque composant et vous remet un rapport détaillé pour orienter la réparation à venir. Ce service est souvent obligatoire avant toute intervention technique.',
    priceLabel: 'Prix indicatif',
    priceValue: '20 - 30 €',
    order: 1,
  },
  {
    key: 'reparation-crevaison-changement-pneu',
    title: 'Réparation de crevaison / Changement de pneu',
    description:
      'Intervention sur les pneus pleins ou gonflables avec vérification de l’état général de la roue, démontage, remplacement ou réparation selon le besoin, puis remontage et contrôle final.',
    priceLabel: 'Prix indicatif',
    priceValue: '30 - 55 €',
    order: 2,
  },
  {
    key: 'remplacement-reparation-batterie',
    title: 'Remplacement ou réparation de batterie',
    description:
      'Diagnostic de la batterie, contrôle de l’autonomie, vérification des cellules et remplacement ou réparation lorsque cela est possible selon l’état du pack batterie.',
    priceLabel: 'Prix indicatif',
    priceValue: 'Sur devis',
    order: 3,
  },
  {
    key: 'changement-reparation-moteur',
    title: 'Changement ou réparation de moteur',
    description:
      'Inspection du moteur, recherche d’anomalies électriques ou mécaniques, réparation ciblée ou remplacement complet si nécessaire.',
    priceLabel: 'Prix indicatif',
    priceValue: 'Sur devis',
    order: 4,
  },
  {
    key: 'revision-complete-entretien-general',
    title: 'Révision complète et entretien général',
    description:
      'Contrôle global de la trottinette avec vérification des organes de sécurité, serrages, pneus, freins, transmission, structure et électronique embarquée.',
    priceLabel: 'Prix indicatif',
    priceValue: '30 - 70 €',
    order: 5,
  },
  {
    key: 'reglage-remplacement-freins',
    title: 'Réglage et remplacement des freins',
    description:
      'Réglage de tension, alignement, remplacement des plaquettes ou éléments usés, et vérification du bon freinage après intervention.',
    priceLabel: 'Prix indicatif',
    priceValue: '10 - 40 €',
    order: 6,
  },
  {
    key: 'reparation-electronique',
    title: 'Réparation de l’électronique',
    description:
      'Recherche de panne sur contrôleur, écran, câblage, capteurs ou connectiques liées au système électronique de la trottinette.',
    priceLabel: 'Prix indicatif',
    priceValue: '20 - 89 €',
    order: 7,
  },
  {
    key: 'pieces-accessoires',
    title: 'Pièces & Accessoires',
    description:
      'Fourniture ou remplacement de pièces et accessoires compatibles selon le modèle : poignées, garde-boue, éclairage, supports, visserie et autres éléments utiles.',
    priceLabel: 'Prix indicatif',
    priceValue: '15 - 69 €',
    order: 8,
  },
  {
    key: 'reparation-cablage-connecteurs',
    title: 'Réparation du câblage et des connecteurs',
    description:
      'Contrôle et remise en état des faisceaux, soudures, connecteurs et passages de câbles pour assurer une alimentation et une communication fiables.',
    priceLabel: 'Prix indicatif',
    priceValue: '20 - 49 €',
    order: 9,
  },
  {
    key: 'vente-trottinettes-pieces-accessoires',
    title: 'Vente de trottinettes, pièces et accessoires',
    description:
      'Conseil et vente de trottinettes électriques, pièces détachées et accessoires adaptés à l’usage, au budget et au modèle recherché.',
    priceLabel: 'Prix indicatif',
    priceValue: 'Sur devis',
    order: 10,
  },
];
