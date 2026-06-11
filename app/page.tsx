import HomeClient from './HomeClient';

import { client } from '@/sanity/lib/client';
import { serviceListSectionQuery } from '@/sanity/lib/queries/serviceListQuery';
import type { Metadata } from 'next';

const BASE_URL = 'https://pilespowermobilite.fr';

export const metadata: Metadata = {
  title: 'Réparation Trottinette Électrique Dijon | Piles Power Mobilité',
  description:
    "Expert en réparation, entretien et vente de trottinettes électriques à Dijon. Pièces détachées, trottinettes neuves et d'occasion. Devis rapide — PPM Dijon.",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    title: 'Réparation Trottinette Électrique Dijon | Piles Power Mobilité',
    description:
      "Expert en réparation et vente de trottinettes électriques à Dijon. Pièces détachées, neuves et d'occasion — PPM.",
    url: BASE_URL,
    images: [
      {
        url: '/images/bannierr.jpg',
        width: 1200,
        height: 630,
        alt: 'Piles Power Mobilité - Réparation trottinette électrique Dijon',
      },
    ],
  },
};

export default async function Home() {
 const serviceSection = await client.fetch(
    serviceListSectionQuery,
    {},
    { next: { revalidate: 3600 } }
  );

  return (
    <>
      {/* Schema JSON-LD Services */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Réparation de trottinettes électriques',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Piles Power Mobilité',
              '@id': 'https://pilespowermobilite.fr',
            },
            areaServed: {
              '@type': 'City',
              name: 'Dijon',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Services PPM',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Réparation trottinette électrique',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Entretien trottinette électrique',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Vente pièces détachées trottinette',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Vente trottinettes neuves et occasion',
                  },
                },
              ],
            },
          }),
        }}
      />
      <HomeClient serviceSection={serviceSection} />
    </>
  );
}
