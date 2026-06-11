import type { MetadataRoute } from 'next';

const BASE_URL = 'https://pilespowermobilite.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
       lastModified: new Date('2026-06-11'), 
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalogue`,
       lastModified: new Date('2026-06-11'), 
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
       lastModified: new Date('2026-06-11'), 
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
