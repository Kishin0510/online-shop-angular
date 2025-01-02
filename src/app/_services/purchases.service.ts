import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environtment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIGetPurchases } from '../_interfaces/purchaseDTO';
import { ShoppingCart } from '../_interfaces/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private baseUrl: string = environment.apiUrl;
  private errors: string[] = [];
  private http = inject(HttpClient);

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

  getErrors(): string[] {
    return this.errors;
  }
}
