import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth.guard';

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
    canActivate: [authGuard], data: { role: ['User', 'Admin'] }
  },
  {
    path: 'password',
    loadComponent: () => import('./users/pages/edit-password/edit-password.component').then((m) => m.EditPasswordComponent),
    canActivate: [authGuard], data: { role: ['User', 'Admin'] }
  },
  {
    path: 'cart',
    loadComponent: () => import('./purchases/pages/shopping-cart-page/shopping-cart-page.component').then((m) => m.ShoppingCartPageComponent),
  },
  {
    path: 'shopping-address',
    loadComponent: () => import('./purchases/pages/shopping-address-page/shopping-address-page.component').then((m) => m.ShoppingAddressPageComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/pages/admin-home-page/admin-home-page.component').then((m) => m.AdminHomePageComponent),
    canActivate: [authGuard], data: { role: ['Admin'] },
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
        path: 'products/edit/:id',
        loadComponent: () => import('./products/pages/edit-products-page/edit-products-page.component').then((m) => m.EditProductsPageComponent),
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
