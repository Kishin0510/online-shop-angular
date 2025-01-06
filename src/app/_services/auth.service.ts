import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environtment.development';
import { ResponseAPI, ResponseAPIRegister } from '../_interfaces/user-auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { addUser } from '../_interfaces/usersDTO';

/**
 * Servicio de autenticación para manejar el inicio de sesión y registro de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * URL base de la API.
   */
  private baseURL: string = environment.apiUrl;
  /**
   * Lista de errores.
   */
  public errors: string[] = [];
  /**
   * Cliente HTTP.
   */
  private http = inject(HttpClient);

    /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param form - Objeto que contiene las credenciales de inicio de sesión.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async login(form: any): Promise<ResponseAPI> {
    try {
      this.errors = [];
      const response = await firstValueFrom(this.http.post<ResponseAPI>(`${this.baseURL}/auth/login`, form));
      return Promise.resolve(response);
    } catch(error) {
      let e = error as HttpErrorResponse;
      console.log('Error en login', e.error.message);
      this.errors.push(e.error.message);
      return Promise.reject(this.errors);
    }
  }

    /**
   * Registra un nuevo usuario.
   * @param user - Objeto que contiene la información del usuario a registrar.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async registerUser(user: addUser): Promise<ResponseAPIRegister> {
    try {
      this.errors = [];
      const response = await firstValueFrom(this.http.post<ResponseAPIRegister>(`${this.baseURL}/auth/register`, user));
      console.log('Usuario en service, response:', response);
      return Promise.resolve(response);
     } catch (error) {
      let e = error as HttpErrorResponse;
      this.errors.push(e.error.message);
      return Promise.reject(this.errors);
     }
  }

}
