import { environment } from './../../environments/environtment.development';
import { inject, Injectable } from '@angular/core';
import { Product, ResponseAPIGetProduct, productType } from '../_interfaces/productDTO';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.apiUrl;
  public errors: string[] = [];
  private http = inject(HttpClient);

  async getAllProducts(query: string, order: string ,pageNum: number,pagSize: number ): Promise<ResponseAPIGetProduct> {
    try {
      const queryParam = new HttpParams().set('query', query).set('order', order);
      const response = await firstValueFrom(this.http.get<ResponseAPIGetProduct>(`${this.baseUrl}/product/available/${pageNum}/${pagSize}?${queryParam}`));
      return Promise.resolve(response);

    } catch (error) {
      console.error("Error obteniendo productos", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  async getAllProductData(query: string, pageNum: number, pagSize: number): Promise<ResponseAPIGetProduct> {
    try {
      const queryParam = new HttpParams().set('query', query);
      const response = await firstValueFrom(this.http.get<ResponseAPIGetProduct>(`${this.baseUrl}/product/search/${pageNum}/${pagSize}?${queryParam}`));
      return Promise.resolve(response);
    } catch (error) {
      console.error("Error obteniendo productos", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  async createProduct(product: FormData): Promise<string>{
    try {
      const response = await firstValueFrom(this.http.post<string>(`${this.baseUrl}/product`, product, {
        headers: {}, responseType: 'text' as 'json'
      }));
      console.log('Producto en service, response:', response);
      return Promise.resolve(response);

    } catch (error) {
      console.error('Error creando el producto', error);

      if(error instanceof HttpErrorResponse){
        const errorMessage = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }
      return Promise.reject(error);
    }
  }
  async editProduct(id: number, editedProduct: FormData): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}/product/${id}`, editedProduct, {
        headers: {}, responseType: 'text' as 'json'
      }));
      console.log('Producto editado con éxito', response);
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error editando el producto', error);

      if(error instanceof HttpErrorResponse){
        const errorMessage = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }
      return Promise.reject(error);
    }
  }
  async getProductById(id: number): Promise<Product> {
    try {
      const response = await firstValueFrom(this.http.get<Product>(`${this.baseUrl}/product/${id}`));
      console.log('Producto obtenido con éxito', response);
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error obteniendo el producto', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  async getProductTypes(): Promise<productType[]> {
    try {
      const response = await firstValueFrom(this.http.get<productType[]>(`${this.baseUrl}/product/types`));
      console.log('Tipos de producto obtenidos con éxito', response);
      return Promise.resolve(response);
    } catch(error){
      console.error('Error obteniendo tipos de producto', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  getErrors(): string[] {
    return this.errors;
  }
}
