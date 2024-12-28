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
    path: 'register',
    loadComponent: () => import('./users/pages/register-page/register-page.component').then((m) => m.RegisterPageComponent),
  },
  {
    path: 'edit',
    loadComponent: () => import('./users/pages/edit-user-page/edit-user-page.component').then((m) => m.EditUserPageComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/pages/admin-home-page/admin-home-page.component').then((m) => m.AdminHomePageComponent),
    children: [
      {
        path: 'create',
        loadComponent: () => import('./products/pages/create-product/create-product.component').then((m) => m.CreateProductComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./products/pages/admin-products-list/admin-products-list.component').then((m) => m.AdminProductsListComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./users/pages/users-list/users-list.component').then((m) => m.UsersListComponent),
      },
      {
        path: 'purchases',
        loadComponent: () => import('./purchases/pages/admin-purchases-list/admin-purchases-list.component').then((m) => m.AdminPurchasesListComponent),
      },
      {
        path: '',
        redirectTo: 'admin/products',
        pathMatch: 'full',
      }
    ]
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
