import { groq } from 'next-sanity';

export const sparePartsQuery = groq`
  *[_type == "sparePart"] | order(title asc){
    _id,
    title,
    description,
    price,
    buttonLabel,
    "image": image.asset->url
  }
`;
