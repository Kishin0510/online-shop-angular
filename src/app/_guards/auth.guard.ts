import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';

/**
 * Guard para proteger rutas que requieren autenticación.
 *
 * Este guard verifica si el usuario está autenticado y tiene los permisos necesarios para acceder a la ruta.
 * Si el usuario no está autenticado o no tiene los permisos necesarios, se redirige a la página de productos y se muestra un mensaje de error.
 *
 * @param route - La ruta que se está intentando acceder.
 * @param state - El estado de la ruta que se está intentando acceder.
 * @returns `true` si el usuario está autenticado y tiene los permisos necesarios, `false` en caso contrario.
 */
export const authGuard: CanActivateFn = (route, state) => {

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


  if (localService.getVariable('token')) {
    const user = localService.getVariable('user');

    const requiredRole = route.data['role'] as string[];
    if (requiredRole && !requiredRole.includes(user.rol.name)) {
      router.navigate(['products']);
      toastService.error('No tienes permisos para acceder a esta página',30000);
      return false;
    }

    return true;
  } else {
    router.navigate(['products']);
    toastService.error('Necesitas iniciar sesión para acceder a esta página',3000);
    return false;
  }
}
