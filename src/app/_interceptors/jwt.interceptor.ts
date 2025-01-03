import { LocalStorageService } from './../_services/local-storage.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

/**
 * Interceptor para agregar el token JWT a las solicitudes HTTP.
 *
 * Este interceptor se asegura de que todas las solicitudes HTTP incluyan el token JWT en el encabezado de autorización,
 * si el token está presente en el almacenamiento local.
 *
 * @param req - La solicitud HTTP saliente.
 * @param next - El siguiente interceptor en la cadena de interceptores.
 * @returns La solicitud HTTP con el encabezado de autorización agregado, si el token está presente.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getVariable('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }
  return next(req);
};
