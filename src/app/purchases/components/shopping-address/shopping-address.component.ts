import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ShoppingService } from '../../../_services/shopping.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../../../_interfaces/shoppingCart';
import { PurchasesService } from '../../../_services/purchases.service';
import { Router } from '@angular/router';

/**
 * Componente para manejar la dirección de envío en el proceso de compra.
 *
 * Este componente muestra un formulario para ingresar la dirección de envío y manejar la lógica de la compra.
 */
@Component({
  selector: 'app-shopping-address',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-address.component.html',
  styleUrl: './shopping-address.component.css'
})
export class ShoppingAddressComponent implements OnInit {
  /**
   * Servicio de compras para manejar el carrito de compras.
   */
  private shoppingService = inject(ShoppingService);
  /**
   * Servicio de compras para manejar las compras.
   */
  private purchasesService = inject(PurchasesService);
  /**
   * Observable para obtener los ítems del carrito de compras.
   */
  cartItems$ = this.shoppingService.cart$;
  /**
   * Formulario reactivo para ingresar la dirección de envío.
   */
  forms!: FormGroup;
  /**
   * Indica si hay un error en el formulario.
   */
  error: boolean = false;
  /**
   * Mensajes de error.
   */
  errorMessage: string[] = [];
  /**
   * IDs de los productos en el carrito.
   */
  productsId: number[] = [];
  /**
   * Cantidades de los productos en el carrito.
   */
  productsQuantity: number[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}
  /**
   * Inicializa el componente, crea el formulario y llama a la función "storeProductDetails".
   */
  ngOnInit(): void {
    this.createForm();
    this.storeProductDetails();
    console.log('Productos en carrito:', this.productsId);
  }

  /**
   * Crea el formulario reactivo para ingresar la dirección de envío.
   */
  createForm() {
    this.forms = this.fb.group({
      Country: ['', Validators.required],
      City: ['', Validators.required],
      Commune: ['', Validators.required],
      Street: ['', Validators.required],
    });
  }

  /**
   * Obtiene los detalles de los productos en el carrito.
   */
  storeProductDetails() {
    this.cartItems$.subscribe(items => {
      this.productsId = items.map(item => item.productId);
      this.productsQuantity = items.map(item => item.quantity);
    }).unsubscribe();
  }

  /**
   * Maneja el envío del formulario para completar la compra.
   */
  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const shoppingCart: ShoppingCart = {
        ProductIds: this.productsId,
        Quantities: this.productsQuantity,
        Country: this.forms.value.Country,
        City: this.forms.value.City,
        Commune: this.forms.value.Commune,
        Street: this.forms.value.Street,
      };
      const response = await this.purchasesService.addPurchase(shoppingCart);
      if (response) {
        this.shoppingService.clearCart();
        this.router.navigate(['/purchase-success']);
      }

    } catch (error: any) {
      this.error = true;
      this.errorMessage.push(error.message);

    }
  }
}
