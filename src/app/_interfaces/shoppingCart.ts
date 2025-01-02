
export interface CartItem {
  productId: number,
  name: string,
  price: number,
  productType: string,
  quantity: number;
  imgURL: string;
}

export interface ShoppingCart {
  ProductIds: number[];
  Quantities: number[];
  Country: string;
  City: string;
  Commune: string;
  Street: string;
}
