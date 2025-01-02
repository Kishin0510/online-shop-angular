import { Component, inject, Input } from '@angular/core';
import { Result } from '../../../_interfaces/usersDTO';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';
import { Gender } from '../../../_interfaces/user-auth';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() users: Result[] = [];
  userService = inject(UserService);

  constructor(private router: Router) { }

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
