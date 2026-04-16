import type { MetadataRoute } from 'next';

const BASE_URL = 'https://pilespowermobilite.fr';
//attention , il faut aussi pour sanity
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
