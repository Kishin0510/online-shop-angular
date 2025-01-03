import { Component, Input } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';
import { Router } from '@angular/router';

/**
 * Agrega el producto al carrito de compras.
 *
 * @param product - El producto a agregar al carrito.
 */
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  /**
   * Lista de productos a mostrar
   */
  @Input() products: Product[] = [];

  constructor(private router: Router) {}

  /**
   * Encabezados de la tabla de productos.
   */
  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'price', label: 'Precio' },
    { key: 'stock', label: 'Stock' },
    { key: 'productType', label: 'Tipo de producto' },
    { key: 'imgURL', label: 'Imagen' },
  ];

  /**
   * Navega a la página de edición del producto seleccionado.
   *
   * @param product - El producto a editar.
   */
  editProduct(product: Product) {
    console.log('Product:', product);
    this.router.navigate(['admin/products/edit', product.id]);
  }
}
