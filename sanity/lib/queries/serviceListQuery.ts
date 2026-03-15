import { groq } from 'next-sanity';

export const serviceListSectionQuery = groq`
  *[_type == "serviceListSection"][0]{
    title,
    intro,
    footnote,
    services[]{
      _key,
      title,
      description,
      priceLabel,
      priceValue,
      order
    }
  }
`;
