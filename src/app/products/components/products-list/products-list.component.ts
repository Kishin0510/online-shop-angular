import { Component, Input } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @Input() products: Product[] = [];

  constructor(private router: Router) {}

  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'price', label: 'Precio' },
    { key: 'stock', label: 'Stock' },
    { key: 'productType', label: 'Tipo de producto' },
    { key: 'imgURL', label: 'Imagen' },
  ];

  editProduct(product: Product) {
    console.log('Product:', product);
    this.router.navigate(['admin/products/edit', product.id]);
  }
}
