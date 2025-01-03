import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';
import { ProductService } from '../../../_services/product.service';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { PageButtonComponent } from '../../components/page-button/page-button.component';
import { AddProductButtonComponent } from '../../components/add-product-button/add-product-button.component';

/**
 * Componente para la lista de productos en la vista de administración.
 *
 * Este componente muestra una lista de productos con opciones para buscar, paginar y agregar nuevos productos.
 */
@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [ProductsListComponent, SearchButtonComponent, PageButtonComponent, AddProductButtonComponent],
  templateUrl: './admin-products-list.component.html',
  styleUrl: './admin-products-list.component.css'
})
export class AdminProductsListComponent implements OnInit {

  /**
   * Página actual de la lista de productos.
   */
  currentPage = 1;

  /**
   * Última página de la lista de productos.
   */
  lastPage = 1;

  /**
   * Término de búsqueda para filtrar la lista de productos.
   */
  searchName = '';

  /**
   * Lista de productos a mostrar.
   */
  protected products: Product[] = [];

  constructor(private productService: ProductService) { }

  /**
   * Inicializa el componente y carga los productos.
   */
  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Obtiene la lista de productos desde el servicio.
   */
  getProducts(): void {
    this.productService.getAllProductData(this.searchName, this.currentPage, 50).then((response) => {
      if(response.result.length != 0) {
        this.products = response.result;
        console.log(this.products);
      } else {
        this.lastPage = this.currentPage - 1;
        this.currentPage = this.lastPage;
      }
    }).catch((error) => {
      console.error("Error obteniendo productos", error);
    });
  }

  /**
   * Maneja el evento de búsqueda de productos.
   *
   * @param query - La query de búsqueda.
   */
  searchQuery(query: string): void {
    this.searchName = query;
    this.currentPage = 1;
    this.getProducts();
  }

  /**
   * Cambia la página de la lista de productos.
   *
   * @param direction - La dirección de la página a cambiar.
   */
  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getProducts();
  }

}
