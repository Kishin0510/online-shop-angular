import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';
import { ShoppingService } from '../../../_services/shopping.service';
import { CartItem } from '../../../_interfaces/shoppingCart';

/**
 * Maneja el evento de clic en el botón.
 *
 * Emite el evento `clickButton` con la acción de paginación.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  /**
   * Producto a mostrar.
   */
  @Input() product!: Product;

  /**
   * Servicio de compras para manejar el carrito de compras.
   */
  shoppingService = inject(ShoppingService);

  /**
   * Agrega el producto al carrito de compras.
   *
   * @param product - El producto a agregar al carrito.
   */
  addToCart(product: Product) {
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      productType: product.productType,
      quantity: 1,
      imgURL: product.imgURL,
    }
    this.shoppingService.addToCart(cartItem);
  }
}
