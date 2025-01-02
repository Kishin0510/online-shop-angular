import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, ShoppingCart } from '../_interfaces/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromLocalStorage());
  cart$ = this.cartSubject.asObservable();

  private loadCartFromLocalStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToLocalStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }

  addToCart(product: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.find(item => item.productId === product.productId);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      currentCart.push(product);
    }

    this.cartSubject.next([...currentCart]);
    this.saveCartToLocalStorage(currentCart);
  }

  removeFromCart(productId: number) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(item => item.productId !== productId);
    this.cartSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  updateQuantity(productId: number, quantity: number) {
    const currentCart = this.cartSubject.getValue();
    const item = currentCart.find(item => item.productId === productId);

    if (item) {
      item.quantity += quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartSubject.next([...currentCart]);
        this.saveCartToLocalStorage(currentCart);
      }
    }
  }
}
