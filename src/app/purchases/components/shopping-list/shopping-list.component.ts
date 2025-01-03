import { Component, OnInit, inject } from '@angular/core';
import { ShoppingService } from '../../../_services/shopping.service'
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { ToastService } from '../../../_services/toast.service';

/**
 * Componente para mostrar la lista de compras.
 *
 * Este componente muestra los ítems en el carrito de compras y permite aumentar, disminuir o eliminar ítems.
 */
@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  /**
   * Servicio de compras para manejar el carrito de compras.
   */
  private shoppingService = inject(ShoppingService);
  /**
   * Servicio de almacenamiento local.
   */
  private LocalStorageService = inject(LocalStorageService);
  /**
   * Servicio de notificaciones emergentes.
   */
  private ToastService = inject(ToastService);
  /**
   * Observable para obtener los ítems del carrito de compras.
   */
  cartItems$ = this.shoppingService.cart$;
  /**
   * Precio total de los ítems en el carrito.
   */
  totalPrice: number = 0;
  /**
   * Suscripción al observable de ítems en el carrito.
   */
  private subscription: Subscription = new Subscription();
  /**
   * IDs de los productos en el carrito.
   */
  productsId: string[] = [];
  /**
   * Cantidades de los productos en el carrito.
   */
  productsQuantity: number[] = [];

  constructor(private router: Router) { }

  /**
   * Inicializa el componente y suscribe a los cambios en el carrito de compras.
   */
  ngOnInit(): void {
    this.subscription = this.cartItems$.subscribe(items => {
      this.totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    });
  }

  /**
   * Aumenta la cantidad de un ítem en el carrito.
   *
   * @param productId ID del producto.
   */
  increaseQuantity(productId: number) {
    this.shoppingService.updateQuantity(productId, 1);
  }

  /**
   * Disminuye la cantidad de un ítem en el carrito.
   *
   * @param productId ID del producto.
   */
  decreaseQuantity(productId: number) {
    this.shoppingService.updateQuantity(productId, -1);
  }

  /**
   * Elimina un ítem del carrito.
   *
   * @param productId ID del producto.
   */
  removeItem(productId: number) {
    this.shoppingService.removeFromCart(productId);
  }

  /**
   * Anula la suscripción al observable de ítems en el carrito.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Maneja el proceso de checkout.
   *
   * Verifica si el usuario está autenticado antes de proceder al checkout.
   * Si el usuario no está autenticado, muestra un mensaje de advertencia y redirige a la página de inicio de sesión.
   */
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
