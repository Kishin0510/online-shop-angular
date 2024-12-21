import { environment } from './../../environments/environtment.development';
import { inject, Injectable } from '@angular/core';
import { Product, ResponseAPIGetProduct } from '../_interfaces/productDTO';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.apiUrl;
  public errors: string[] = [];
  private http = inject(HttpClient);

  async getAllProducts(pageNum: number,pagSize: number ): Promise<ResponseAPIGetProduct> {
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIGetProduct>(`${this.baseUrl}/product/available/${pageNum}/${pagSize}`));
      return Promise.resolve(response);

    } catch (error) {
      console.error("Error obteniendo productos", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }
}
