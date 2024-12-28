export interface ResponseAPIGetPurchases {
  id:               number;
  purchaseDate:     Date;
  totalPrice:       number;
  country:          string;
  city:             string;
  commune:          string;
  street:           string;
  userId:           number;
  purchaseProducts: PurchaseProduct[];
}

export interface PurchaseProduct {
  productId: number;
  quantity:  number;
}
