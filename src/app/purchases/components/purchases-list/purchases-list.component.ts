import { Component, inject, Input } from '@angular/core';
import { ResponseAPIGetPurchases, PurchaseProduct } from '../../../_interfaces/purchaseDTO';
import { CommonModule } from '@angular/common';
import { Product } from '../../../_interfaces/productDTO';

@Component({
  selector: 'app-purchases-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases-list.component.html',
  styleUrl: './purchases-list.component.css'
})
export class PurchasesListComponent {
  @Input() purchases: ResponseAPIGetPurchases[] = [];
  @Input() purchaseProducts: PurchaseProduct[] = [];
  @Input() products: Product[] = [];

  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'purchaseDate', label: 'Fecha' },
    { key: 'totalPrice', label: 'Precio Total' },
    { key: 'country', label: 'País' },
    { key: 'city', label: 'Ciudad' },
    { key: 'commune', label: 'Comuna' },
    { key: 'street', label: 'Calle' },
    { key: 'userId', label: 'ID Usuario' },
    { key: 'userName', label: 'Nombre Usuario' },
    { key: 'purchaseProducts', label: 'Productos' },
  ];


}
