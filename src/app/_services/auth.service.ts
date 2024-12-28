import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environtment.development';
import { ResponseAPI, ResponseAPIRegister } from '../_interfaces/user-auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { addUser } from '../_interfaces/usersDTO';

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

  async registerUser(user: addUser): Promise<ResponseAPIRegister> {
    try {
      console.log('Usuario en service:', user);

      const response = await firstValueFrom(this.http.post<ResponseAPIRegister>(`${this.baseURL}/auth/register`, user));
      console.log('Usuario en service, response:', response);
      return Promise.resolve(response);
     } catch (error) {

      console.error('Error creando el usuario', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
     }
  }

}
