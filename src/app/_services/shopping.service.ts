import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, ShoppingCart } from '../_interfaces/shoppingCart';

/**
 * Servicio de compras para manejar la obtención y creación de compras.
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  /**
   * Subject para almacenar el carrito de compras.
   */
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromLocalStorage());
  /**
   * Observable para saber el estado del carrito de compras.
   */
  cart$ = this.cartSubject.asObservable();

  /**
   * Carga el carrito de compras desde el almacenamiento local.
   * @returns un arreglo de CartItem que representa el carrito de compras.
   */
  private loadCartFromLocalStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  /**
   * Guarda el carrito de compras en el almacenamiento local.
   * @param cart - El carrito de compras a guardar.
   */
  private saveCartToLocalStorage(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * Limpia el carrito de compras.
   */
  clearCart() {
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }

  /**
   * Agrega un producto al carrito de compras.
   * @param product - El producto a agregar al carrito.
   */
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

  /**
   * Elimina un producto del carrito de compras.
   * @param productId - El ID del producto a eliminar.
   */
  removeFromCart(productId: number) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(item => item.productId !== productId);
    this.cartSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  /**
   * Actualiza la cantidad de un producto en el carrito de compras.
   * @param productId - El ID del producto a actualizar.
   * @param quantity - La cantidad a agregar o restar al producto.
   */
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
