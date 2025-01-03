import { Component, inject, Input } from '@angular/core';
import { Result } from '../../../_interfaces/usersDTO';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';

/**
 * Componente para mostrar una lista de usuarios.
 *
 * Este componente muestra una tabla con la lista de usuarios y permite editar el estado de un usuario.
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  /**
   * Lista de usuarios a mostrar.
   */
  @Input() users: Result[] = [];
  /**
   * Servicio para manejar la lógica de usuarios.
   */
  userService = inject(UserService);

  constructor(private router: Router) { }

  /**
   * Cabeceras de la tabla.
   */
  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'rut', label: 'RUT'},
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Correo' },
    { key: 'birthdate', label: 'Fecha de nacimiento' },
    { key: 'gender', label: 'Género' },
    { key: 'rol', label: 'Rol' },
    { key: 'active', label: 'Estado' },
  ];

  /**
   * Edita el estado de un usuario.
   *
   * @param user Usuario a editar.
   */
  editUserStatus(user: Result) {
    const newStatus = user.active ? 'false' : 'true';
    this.userService.changeStatus(user.id, newStatus).then(() => {
      console.log('Usuario editado');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin/users']);
      });
    });
  }

}
