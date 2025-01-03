import { ToastService } from './../../../_services/toast.service';
import { Component, inject } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
/**
 * Componente para el botón de eliminación de usuario.
 *
 * Este componente muestra un botón que, al hacer clic, elimina al usuario actual.
 */
@Component({
  selector: 'app-user-delete-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-delete-button.component.html',
  styleUrl: './user-delete-button.component.css'
})
export class UserDeleteButtonComponent {

  /**
   * Servicio de usuario.
   */
  private userService = inject(UserService);
  /**
   * Servicio de almacenamiento local.
   */
  private localStorageService = inject(LocalStorageService);
  /**
   * Router para la navegación.
   */
  private router = inject(Router);
  /**
   * Servicio de notificaciones emergentes.
   */
  private toastService = inject(ToastService);

  /**
   * Elimina al usuario actual.
   */
  async deleteUser() {
    try {
      const response = await this.userService.deleteUser(this.localStorageService.getVariable('user').id)
      console.log(response);
      if (response) {
        this.localStorageService.updateLoginStatus(false,false);
        this.toastService.succes('Usuario eliminado correctamente');
        this.router.navigate(['/login']);
      }

    } catch (error) {
      this.toastService.error('Error al eliminar el usuario');

    }
  }

}
