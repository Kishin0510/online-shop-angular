import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio para manejar el almacenamiento local del usuario y su token
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Subject para almacenar el estado de la sesión del usuario.
   */
  private loggedInSubject = new BehaviorSubject<boolean>(this.getVariable('token') ? true : false);
  /**
   * Subject para almacenar el estado de administrador del usuario.
   */
  private adminSubject = new BehaviorSubject<boolean>(this.getVariable('user') ? (this.getVariable('user').rol?.id === 1) : false);

  /**
   * Observable para saber si el usuario está autenticado.
   */
  isLoggedIn = this.loggedInSubject.asObservable();

  /**
   * Observable para saber si el usuario es administrador.
   */
  isAdmin = this.adminSubject.asObservable();

  constructor() {
    const user = this.getVariable('user');
    this.loggedInSubject.next(!!this.getVariable('token'));
    this.adminSubject.next(user ? (user.rol?.id === 1) : false);
  }

  /**
   * Guarda una variable en el almacenamiento local.
   * @param key - La clave bajo la cual se almacenará el valor.
   * @param value - El valor a almacenar.
   */
  setVariable (key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtiene una variable del almacenamiento local.
   * @param key - La clave de la variable a obtener.
   * @returns El valor almacenado o null si no existe.
   */
  getVariable(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Elimina una variable del almacenamiento local.
   * @param key - La clave de la variable a eliminar.
   */
  removeValue(key: string){
    localStorage.removeItem(key);
  }

  /**
   * Actualiza el estado de la sesión del usuario.
   * @param isLogged - Indica si el usuario está autenticado.
   * @param isAdmin - Indica si el usuario es administrador.
   */
  updateLoginStatus(isLogged: boolean, isAdmin: boolean){
    this.loggedInSubject.next(isLogged);
    this.adminSubject.next(isAdmin);
  }


}
