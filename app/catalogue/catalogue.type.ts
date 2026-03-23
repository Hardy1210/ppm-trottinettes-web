export type CatalogueScooter = {
  _id: string;
  name: string;
  slug: string;
  status: 'neuf' | 'occasion';
  price: number | null;
  shortDescription: string;
  specs: {
    autonomie: string;
    vitesse: string;
    puissance: string;
    poids: string;
    pneus: string;
    freins: string;
  };
  images: string[];
  conditionNote?: string;
};

export type CatalogueSparePart = {
  _id: string;
  title: string;
  description: string;
  price: number | null;
  image: string;
  buttonLabel?: string;
};
