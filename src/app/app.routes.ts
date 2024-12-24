import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./products/pages/products-home-page/products-home-page.component').then((m) => m.ProductsHomePageComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./users/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./products/pages/admin-products-list/admin-products-list.component').then((m) => m.AdminProductsListComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '**',
    redirectTo: 'products',

  }
];
