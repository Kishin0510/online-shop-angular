import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environtment.development';
import { ResponseAPIGetUsers } from '../_interfaces/usersDTO';
import { editUser } from '../_interfaces/user-auth';

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

  getErrors(): string[] {
    return this.errors;
  }
}
