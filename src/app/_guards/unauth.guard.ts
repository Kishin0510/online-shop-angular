import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';


export const unauthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const localService = inject(LocalStorageService);
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
