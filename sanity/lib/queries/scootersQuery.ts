import { groq } from 'next-sanity';
// LOGICA PARA LIMITAR MAXIMO _ PRODUCTOS QUE ABSOLUTAMNETE SE DEBE DEFINIR EN
//     /catalogue/page.tsx server
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
