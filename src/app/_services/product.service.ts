import { environment } from './../../environments/environtment.development';
import { inject, Injectable } from '@angular/core';
import { Product, ResponseAPIGetProduct, productType } from '../_interfaces/productDTO';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

/**
 * Servicio de productos para manejar la obtención y creación de productos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   * URL base de la API.
   */
  private baseUrl: string = environment.apiUrl;
  /**
   * Lista de errores.
   */
  public errors: string[] = [];
  /**
   * Cliente HTTP.
   */
  private http = inject(HttpClient);

  /**
   * Obtiene todos los productos disponibles.
   * @param query - Parámetro de búsqueda.
   * @param order - Parámetro de ordenamiento.
   * @param pageNum - Número de página.
   * @param pagSize - Tamaño de página.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
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

  /**
   * Obtiene todos los productos.
   * @param query - Parámetro de búsqueda.
   * @param pageNum - Número de página.
   * @param pagSize - Tamaño de página.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error
   */
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

  /**
   * Crea un nuevo producto.
   * @param product - Objeto que contiene la información del producto a crear.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
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

  /**
   * Edita un producto.
   * @param id - ID del producto a editar.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
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

  /**
   * Obtiene un producto por su id.
   * @param id - ID del producto.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
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

  /**
   * Obtiene los tipos de producto.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error
   */
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

  /**
   * Obtiene los errores.
   * @returns Una lista de errores.
   */
  getErrors(): string[] {
    return this.errors;
  }
}
