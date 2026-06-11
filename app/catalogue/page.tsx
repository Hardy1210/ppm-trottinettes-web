import { client } from '@/sanity/lib/client';
import { scootersQuery } from '@/sanity/lib/queries/scootersQuery';
import { sparePartsQuery } from '@/sanity/lib/queries/sparePartsQuery';
import type { Metadata } from 'next';
import CataloguePageClient from './CataloguePageClient';
import type { CatalogueScooter, CatalogueSparePart } from './catalogue.type';

const BASE_URL = 'https://pilespowermobilite.fr';

export const metadata: Metadata = {
  title: 'Catalogue Trottinettes & Pièces Détachées',
  description:
    "Découvrez notre catalogue de trottinettes électriques neuves et d'occasion à Dijon, ainsi que nos pièces détachées compatibles toutes marques — Piles Power Mobilité.",

  alternates: {
    canonical: `${BASE_URL}/catalogue`,
  },

  openGraph: {
    title: 'Catalogue Trottinettes & Pièces Détachées | Piles Power Mobilité',
    description:
      "Trottinettes électriques neuves et d'occasion + pièces détachées toutes marques. Disponible en boutique à Dijon.",
    url: `${BASE_URL}/catalogue`,
    images: [
      {
        url: '/images/bannierr.jpg',
        width: 1200,
        height: 630,
        alt: 'Catalogue trottinettes électriques Piles Power Mobilité Dijon',
      },
    ],
  },
};
export default async function CataloguePage() {
  // LOGICA PARA LIMITAR MAXIMO _ PRODUCTOS QUE ABSOLUTAMNETE SE DEBE DEFINIR EN
  //     /sanity/lib/queries/scooterQueries.ts
  const scooters = await client.fetch<CatalogueScooter[]>(scootersQuery, {
    start: 0,
    end: 8,
  }, { next: { revalidate: 3600 } }
);

  const spareParts = await client.fetch<CatalogueSparePart[]>(
  sparePartsQuery,
  {},
  { next: { revalidate: 3600 } }
);

  return (
    <>
      {/* BreadcrumbList — supporté par Google Rich Results */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: 'https://pilespowermobilite.fr',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Catalogue',
                item: 'https://pilespowermobilite.fr/catalogue',
              },
            ],
          }),
        }}
      />
      <CataloguePageClient scooters={scooters} spareParts={spareParts} />
    </>
  );
}
