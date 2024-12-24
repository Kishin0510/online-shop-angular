import { Component, Input } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @Input() products: Product[] = [];

  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'price', label: 'Precio' },
    { key: 'stock', label: 'Stock' },
    { key: 'productType', label: 'Tipo de producto' },
    { key: 'imgURL', label: 'Imagen' },
  ];
}
