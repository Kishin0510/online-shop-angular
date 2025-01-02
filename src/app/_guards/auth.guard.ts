import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../_services/local-storage.service';
import { ToastService } from '../_services/toast.service';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const localService = inject(LocalStorageService);
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
