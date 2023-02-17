interface Source {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export interface IProduct {
  SKU: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const productsParser = (products: Source[]) => {
  const parsed: IProduct[] = products.map((item) => ({
    SKU: `SKU-${item.id}`,
    name: item.title,
    description: item.description,
    price: item.price,
    image: item.images[0],
  }));
  return parsed;
};
