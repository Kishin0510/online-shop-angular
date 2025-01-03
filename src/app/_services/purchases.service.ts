import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environtment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetPurchases } from '../_interfaces/purchaseDTO';
import { ShoppingCart } from '../_interfaces/shoppingCart';

/**
 * Servicio de compras para manejar la obtención y creación de compras.
 */
@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  /**
   * URL base de la API.
   */
  private baseUrl: string = environment.apiUrl;
  /**
   * Lista de errores.
   */
  private errors: string[] = [];
  /**
   * Cliente HTTP.
   */
  private http = inject(HttpClient);

  /**
   * Obtiene todas las compras.
   * @param pageNum - Número de página.
   * @param pagSize - Tamaño de página.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async getAllPurchases(pageNum: number, pagSize: number): Promise<ResponseAPIGetPurchases[]> {
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIGetPurchases[]>(`${this.baseUrl}/purchase/${pageNum}/${pagSize}`));
      return Promise.resolve(response);
    } catch (error) {
      console.error("Error obteniendo compras", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  /**
   * Obtiene las compras con opción de buscar por nombre de usuario y fecha.
   * @param name - Nombre del usuario.
   * @param date - Fecha de la compra.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async getPurchaseQuery(name: string, date: string): Promise<ResponseAPIGetPurchases[]> {
    try {
      const queryParam = new HttpParams().set('name', name).set('date', date);
      const response = await firstValueFrom(this.http.get<ResponseAPIGetPurchases[]>(`${this.baseUrl}/purchase/search?${queryParam}`));
      return Promise.resolve(response);
    } catch (error) {
      console.error("Error obteniendo compras", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  /**
   * Agrega una nueva compra.
   * @param shoppingCart - Objeto que contiene la información de la compra.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async addPurchase(shoppingCart: ShoppingCart): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.post<string>(`${this.baseUrl}/purchase`, shoppingCart,
        { headers: {}, responseType: 'text' as 'json'}
      ));
      console.log("Compra en service, response:", response);
      return Promise.resolve(response);
    } catch (error) {
      console.error("Error agregando compra", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  /**
   * Obtiene la lista de errores.
   * @returns Lista de errores.
   */
  getErrors(): string[] {
    return this.errors;
  }
}
