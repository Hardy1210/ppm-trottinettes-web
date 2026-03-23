import { client } from '@/sanity/lib/client';
import { scootersQuery } from '@/sanity/lib/queries/scootersQuery';
import { sparePartsQuery } from '@/sanity/lib/queries/sparePartsQuery';
import CataloguePageClient from './CataloguePageClient';
import type { CatalogueScooter, CatalogueSparePart } from './catalogue.type';

export default async function CataloguePage() {
  const scooters = await client.fetch<CatalogueScooter[]>(scootersQuery, {
    start: 0,
    end: 8,
  });

  const spareParts = await client.fetch<CatalogueSparePart[]>(sparePartsQuery);

  return <CataloguePageClient scooters={scooters} spareParts={spareParts} />;
}
