import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';

/**
 * Guard para proteger rutas que requieren autenticación.
 *
 * Este guard verifica si el usuario es no autenticado y si lo es, si tiene los permisos necesarios para acceder a la ruta.
 * Si el usuario no tiene los permisos necesarios, se redirige a la página de productos y se muestra un mensaje de error.
 *
 * @param route - La ruta que se está intentando acceder.
 * @param state - El estado de la ruta que se está intentando acceder.
 * @returns `true` si el usuario está autenticado y tiene los permisos necesarios, `false` en caso contrario.
 */
export const noAuthGuard: CanActivateFn = (route, state) => {

  /**
   * Servicio de enrutamiento de Angular.
   */
  const router = inject(Router);
  /**
   * Servicio de almacenamiento local.
   */
  const localService = inject(LocalStorageService);
  /**
   * Servicio para mostrar notificaciones emergentes.
   */
  const toastService = inject(ToastService);

  const token = localService.getVariable('token');
  const user = localService.getVariable('user');

  if (!token) {
    // Usuario no autenticado
    return true;
  }

  if (user && user.rol.name === 'Admin') {
    // Usuario autenticado y es administrador
    router.navigate(['admin/products']);
    toastService.error('No tienes permisos para acceder a esta página', 3000);
    return false;
  }

  // Usuario autenticado pero no es administrador
  return true;
}
