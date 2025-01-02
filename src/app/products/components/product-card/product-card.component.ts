import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';
import { ShoppingService } from '../../../_services/shopping.service';
import { CartItem } from '../../../_interfaces/shoppingCart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  shoppingService = inject(ShoppingService);

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
