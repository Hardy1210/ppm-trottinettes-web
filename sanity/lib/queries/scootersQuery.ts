import { groq } from 'next-sanity';

export const scootersQuery = groq`
  *[_type == "scooter"] | order(name asc)[$start...$end]{
    _id,
    name,
    "slug": slug.current,
    status,
    price,
    shortDescription,
    specs,
    conditionNote,
    "images": images[].asset->url
  }
`;
