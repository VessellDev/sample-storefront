export interface ProductType {
  id: number;
  name: string;
  slug: string;
  images: [
    {
      asset: {
        url: string;
      };
    }
  ];
  price: {
    minPrice: number;
  };
}
