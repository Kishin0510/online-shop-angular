import { Injectable } from '@angular/core';
import { productType } from '../_interfaces/productDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {
  private productTypes: productType[] = [];

  setProductTypes(productTypes: productType[]){
    this.productTypes = productTypes;
  }

  getProductTypes(): productType[] | null {
    return this.productTypes;
  }

  clearProductTypes() {
    this.productTypes = [];
  }

}
