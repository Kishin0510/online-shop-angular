import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ShoppingService } from '../../../_services/shopping.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCart } from '../../../_interfaces/shoppingCart';
import { PurchasesService } from '../../../_services/purchases.service';

@Component({
  selector: 'app-shopping-address',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-address.component.html',
  styleUrl: './shopping-address.component.css'
})
export class ShoppingAddressComponent implements OnInit {
  private shoppingService = inject(ShoppingService);
  private purchasesService = inject(PurchasesService);
  cartItems$ = this.shoppingService.cart$;

  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  productsId: number[] = [];
  productsQuantity: number[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.storeProductDetails();
    console.log('Productos en carrito:', this.productsId);
  }

  createForm() {
    this.forms = this.fb.group({
      Country: ['', Validators.required],
      City: ['', Validators.required],
      Commune: ['', Validators.required],
      Street: ['', Validators.required],
    });
  }

  storeProductDetails() {
    this.cartItems$.subscribe(items => {
      this.productsId = items.map(item => item.productId);
      this.productsQuantity = items.map(item => item.quantity);
    }).unsubscribe();
  }

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
      }

    } catch (error: any) {
      this.error = true;
      this.errorMessage.push(error.message);

    }
  }
}
