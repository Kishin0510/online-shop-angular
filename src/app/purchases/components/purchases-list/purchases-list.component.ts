import { Component, inject, Input } from '@angular/core';
import { ResponseAPIGetPurchases, PurchaseProduct } from '../../../_interfaces/purchaseDTO';
import { CommonModule } from '@angular/common';
import { Product } from '../../../_interfaces/productDTO';

/**
 * Componente para mostrar una lista de compras.
 *
 * Este componente muestra una tabla con la lista de compras realizadas por los usuarios.
 */
@Component({
  selector: 'app-purchases-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases-list.component.html',
  styleUrl: './purchases-list.component.css'
})
export class PurchasesListComponent {
  /**
   * Lista de compras a mostrar.
   */
  @Input() purchases: ResponseAPIGetPurchases[] = [];
  /**
   * Lista de productos de las compras.
   */
  @Input() purchaseProducts: PurchaseProduct[] = [];
  /**
   * Lista de productos a mostrar.
   */
  @Input() products: Product[] = [];

  /**
   * Encabezados de la tabla de compras.
   */
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
