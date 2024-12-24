import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./products/pages/products-home-page/products-home-page.component').then((m) => m.ProductsHomePageComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./users/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    pathMatch: 'full',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    redirectTo: 'home',

  }
];
