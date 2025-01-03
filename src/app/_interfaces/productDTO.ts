export interface ResponseAPIGetProduct {
  result:                  Product[];
  id:                      number;
  exception:               null;
  status:                  number;
  isCanceled:              boolean;
  isCompleted:             boolean;
  isCompletedSuccessfully: boolean;
  creationOptions:         number;
  asyncState:              null;
  isFaulted:               boolean;
}

export interface Product {
  id:          number;
  name:        string;
  price:       number;
  stock:       number;
  imgURL:      string;
  productType: string;
}

export interface addProduct {
  Name:         string;
  Price:        number;
  Stock:        number;
  Image:        File;
  ProductTypeId: number;
}

export interface productType {
  id:   number;
  type: string;
}
