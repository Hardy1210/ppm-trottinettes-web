import HomeClient from './HomeClient';

import { client } from '@/sanity/lib/client';
import { serviceListSectionQuery } from '@/sanity/lib/queries/serviceListQuery';

export default async function Home() {
  const serviceSection = await client.fetch(serviceListSectionQuery);

  return (
    <>
      <HomeClient serviceSection={serviceSection} />
    </>
  );
}
