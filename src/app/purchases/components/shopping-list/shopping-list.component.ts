import { Component, OnInit, inject } from '@angular/core';
import { ShoppingService } from '../../../_services/shopping.service'
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  private shoppingService = inject(ShoppingService);
  private LocalStorageService = inject(LocalStorageService);
  private ToastService = inject(ToastService);
  cartItems$ = this.shoppingService.cart$;
  totalPrice: number = 0;
  private subscription: Subscription = new Subscription();
  productsId: string[] = [];
  productsQuantity: number[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.cartItems$.subscribe(items => {
      this.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    });
  }

  increaseQuantity(productId: number) {
    this.shoppingService.updateQuantity(productId, 1);
  }

  decreaseQuantity(productId: number) {
    this.shoppingService.updateQuantity(productId, -1);
  }

  removeItem(productId: number) {
    this.shoppingService.removeFromCart(productId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkout() {
    const token = this.LocalStorageService.getVariable('token');
    if (!token) {
      this.ToastService.warning('Debes iniciar sesión para continuar');
      this.router.navigate(['/auth']);
      return;
    }
    this.router.navigate(['/shopping-address']);
  }

}
