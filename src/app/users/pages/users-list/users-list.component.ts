import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../_services/user.service';
import { Result } from '../../../_interfaces/usersDTO';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { SearchButtonComponent } from '../../../products/components/search-button/search-button.component';
import { PageButtonComponent } from '../../../products/components/page-button/page-button.component';

/**
 * Componente para la lista de usuarios.
 *
 * Este componente muestra una lista de usuarios con opciones para buscar y paginar.
 */
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserListComponent, SearchButtonComponent, PageButtonComponent],
  providers: [UserService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  /**
   * Lista de usuarios a mostrar.
   */
  usersArray: Result[] = [];
  /**
   * Término de búsqueda para filtrar la lista de usuarios.
   */
  searchName: string = '';
  /**
   * Página actual de la lista de usuarios.
   */
  currentPage: number = 1;
  /**
   * Última página de la lista de usuarios.
   */
  lastPage: number = 1;
  /**
   * Servicio para obtener la información de los usuarios.
   */
  private userService = inject(UserService);

  ngOnInit(): void {
    this.getUsers();
  }
  /**
   * Obtiene la lista de usuarios desde el servicio.
   */
  getUsers() {
    this.userService.getAllUsers(this.searchName, this.currentPage, 50).then((response) => {
      if(response.result.length != 0) {
        this.usersArray = response.result;
        console.log(this.usersArray);
      } else {
        this.lastPage = this.currentPage - 1;
        this.currentPage = this.lastPage;
      }
    }).catch((error) => {
      console.error("Error obteniendo usuarios", error);
    });
  }
  /**
   * Maneja la búsqueda de usuarios.
   *
   * @param query - El término de búsqueda ingresado por el usuario.
   */
  searchQuery(query: string): void {
    this.searchName = query;
    this.currentPage = 1;
    this.getUsers();
  }
  /**
   * Maneja la paginación de usuarios.
   *
   * @param action - La acción de paginación ('next' o 'prev').
   */
  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getUsers();
  }
}
