import { Component, Input } from '@angular/core';
import { Result } from '../../../_interfaces/usersDTO';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() users: Result[] = [];

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
}
