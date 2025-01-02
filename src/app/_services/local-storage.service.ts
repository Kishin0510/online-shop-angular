import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.getVariable('token') ? true : false);
  private adminSubject = new BehaviorSubject<boolean>(this.getVariable('user') ? (this.getVariable('user').rol?.id === 1) : false);

  isLoggedIn = this.loggedInSubject.asObservable();
  isAdmin = this.adminSubject.asObservable();

  constructor() {
    const user = this.getVariable('user');
    this.loggedInSubject.next(!!this.getVariable('token'));
    this.adminSubject.next(user ? (user.rol?.id === 1) : false);
  }

  setVariable (key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getVariable(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeValue(key: string){
    localStorage.removeItem(key);
  }


  updateLoginStatus(isLogged: boolean, isAdmin: boolean){
    this.loggedInSubject.next(isLogged);
    this.adminSubject.next(isAdmin);
  }


}
