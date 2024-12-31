export interface ResponseAPIGetPurchases {
  id:               number;
  purchaseDate:     string;
  totalPrice:       number;
  country:          string;
  city:             string;
  commune:          string;
  street:           string;
  userId:           number;
  userName:         string;
  purchaseProducts: PurchaseProduct[];
}

export interface PurchaseProduct {
  productId: number;
  productName: string;
  quantity:  number;
}
