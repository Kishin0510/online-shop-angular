import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environtment.development';
import { ResponseAPIGetUsers, editPassword } from '../_interfaces/usersDTO';
import { editUser, Gender } from '../_interfaces/user-auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.apiUrl;
  public errors: string[] = [];
  private http = inject(HttpClient);

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

  getErrors(): string[] {
    return this.errors;
  }
}
