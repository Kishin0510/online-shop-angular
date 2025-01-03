import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';

/**
 * Guard para proteger rutas que solo deben ser accesibles por usuarios no autenticados.
 *
 * Este guard verifica si el usuario no está autenticado. Si el usuario está autenticado,
 * se redirige a la página principal y se muestra un mensaje de error.
 *
 * @param route - La ruta que se está intentando acceder.
 * @param state - El estado de la ruta que se está intentando acceder.
 * @returns `true` si el usuario no está autenticado, `false` en caso contrario.
 */
export const unauthGuard: CanActivateFn = (route, state) => {

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

  if (user && token) {
    // Usuario autenticado
    router.navigate(['']);
    toastService.error('No tienes permisos para acceder a esta página', 3000);
    return false;
  }

  // Usuario no autenticado
  return true;
}
