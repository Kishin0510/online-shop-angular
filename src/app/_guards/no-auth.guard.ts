import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';


export const noAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const localService = inject(LocalStorageService);
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
