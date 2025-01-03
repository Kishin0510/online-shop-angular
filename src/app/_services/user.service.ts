import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environtment.development';
import { ResponseAPIGetUsers, editPassword } from '../_interfaces/usersDTO';
import { editUser, Gender } from '../_interfaces/user-auth';

/**
 * Servicio de usuarios para manejar la obtención y edición de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

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
   * Obtiene todos los usuarios según los parámetros de búsqueda.
   * @param query - La consulta de búsqueda.
   * @param pageNum - El número de página.
   * @param pageSize - El tamaño de la página.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async getAllUsers(query: string,pageNum: number,pagSize: number): Promise<ResponseAPIGetUsers> {
    try {
      const queryParam = new HttpParams().set('query', query).toString();
      const response = await firstValueFrom(this.http.get<ResponseAPIGetUsers>(`${this.baseUrl}/user/search/${pageNum}/${pagSize}?${queryParam}`));
      return Promise.resolve(response);
    } catch (error) {
      console.error("Error obteniendo usuarios", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  /**
   * Edita un usuario.
   * @param id - El ID del usuario.
   * @param user - El objeto con los datos del usuario a editar.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async editUser(id: number, user: editUser): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}/user/${id}`, user, {
        headers: {}, responseType: 'text' as 'json'
      }));
      console.log('Usuario en service, response:', response);
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error editando el usuario', error);

      if (error instanceof HttpErrorResponse) {
        const errorMessage = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }
      return Promise.reject(error);
    }
  }

  /**
   * Edita la contraseña de un usuario.
   * @param id - El ID del usuario.
   * @param newPassword - El objeto con la nueva contraseña.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async editPassword(id: number, newPassword: editPassword): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}/user/${id}/password/`, newPassword, {
        headers: {}, responseType: 'text' as 'json'
      }));
      console.log('Password en service, response:', response);
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error editando el password', error);

      if (error instanceof HttpErrorResponse) {
        const errorMessage = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }
      return Promise.reject(error);
    }
  }

  /**
   * Cambia el estado de un usuario.
   * @param id - El ID del usuario.
   * @param status - El nuevo estado del usuario.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async changeStatus(id: number, status: string): Promise<string> {
    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify(status);
      const response = await firstValueFrom(this.http.put<string>(`${this.baseUrl}/user/${id}/state`, body, { headers, responseType: 'text' as 'json' }));
      console.log('Cambiando estado del usuario, response:', response);
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error cambiando el estado del usuario', error);

      if (error instanceof HttpErrorResponse) {
        const errorMessage = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }
      return Promise.reject(error);
    }
  }

  /**
   * Obtiene la lista de géneros.
   * @returns Una promesa que resuelve con la lista de géneros o rechaza con un error.
   */
  async getGenders(): Promise<Gender[]> {
    try {
      const response = await firstValueFrom(this.http.get<Gender[]>(`${this.baseUrl}/user/genders`));
      return Promise.resolve(response);
    } catch(error) {
      console.error('Error obteniendo géneros', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(e);
    }
  }

  /**
   * Elimina un usuario.
   * @param id - El ID del usuario.
   * @returns Una promesa que resuelve con la respuesta de la API o rechaza con un error.
   */
  async deleteUser(id: number): Promise<string> {
    try {
      const response = await firstValueFrom(this.http.delete<string>(`${this.baseUrl}/user/delete/${id}`));
      console.log('Usuario eliminado con éxito', response);
      return Promise.resolve(response);
    } catch (error) {
      console.error('Error eliminando el usuario', error);

      if (error instanceof HttpErrorResponse) {
        const errorMessage = typeof error.error === 'string' ? error.error : error.message;
        this.errors.push(errorMessage);
      }
      return Promise.reject(error);
    }
  }

  /**
   * Obtiene los errores.
   * @returns Lista de errores.
   */
  getErrors(): string[] {
    return this.errors;
  }
}
