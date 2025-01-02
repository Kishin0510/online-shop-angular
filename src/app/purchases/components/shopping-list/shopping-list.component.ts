import { Component, OnInit, inject } from '@angular/core';
import { ShoppingService } from '../../../_services/shopping.service'
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  providers: [ShoppingService],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  private shoppingService = inject(ShoppingService);
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
    this.router.navigate(['/shopping-address']);
  }

}
