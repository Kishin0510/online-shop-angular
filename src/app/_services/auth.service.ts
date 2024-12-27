import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environtment.development';
import { ResponseAPI } from '../_interfaces/user-auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.apiUrl;
  public errors: string[] = [];
  private http = inject(HttpClient);

  async login(form: any): Promise<ResponseAPI> {
    try {
      const response = await firstValueFrom(this.http.post<ResponseAPI>(`${this.baseURL}/auth/login`, form));
      return Promise.resolve(response);
    } catch(error) {
      console.log('Error en login', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }

}
