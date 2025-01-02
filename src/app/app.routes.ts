import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth.guard';
import { noAuthGuard } from './_guards/no-auth.guard';
import { unauthGuard } from './_guards/unauth.guard';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./products/pages/products-home-page/products-home-page.component').then((m) => m.ProductsHomePageComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: 'auth',
    loadComponent: () => import('./users/pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    canActivate: [unauthGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./users/pages/register-page/register-page.component').then((m) => m.RegisterPageComponent),
    canActivate: [unauthGuard],
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
    canActivate: [noAuthGuard],
  },
  {
    path: 'shopping-address',
    loadComponent: () => import('./purchases/pages/shopping-address-page/shopping-address-page.component').then((m) => m.ShoppingAddressPageComponent),
    canActivate: [authGuard], data: { role: ['User'] }
  },
  {
    path: 'purchase-success',
    loadComponent: () => import('./purchases/pages/purchase-success-page/purchase-success-page.component').then((m) => m.PurchaseSuccessPageComponent),
    canActivate: [authGuard], data: { role: ['User'] }
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
