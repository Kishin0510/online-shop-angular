import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { OrderButtonComponent } from '../../components/order-button/order-button.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_interfaces/productDTO';
import { PageButtonComponent } from '../../components/page-button/page-button.component';


/**
 * Componente para la página principal de productos.
 *
 * Este componente muestra una lista de productos con opciones para buscar, ordenar y paginar.
 */
@Component({
  selector: 'app-products-home-page',
  standalone: true,
  imports: [ProductCardComponent,SearchButtonComponent,OrderButtonComponent, CommonModule, HttpClientModule, PageButtonComponent],
  providers: [ProductService],
  templateUrl: './products-home-page.component.html',
  styleUrl: './products-home-page.component.css'
})
export class ProductsHomePageComponent implements OnInit {

  /**
   * Página actual de la lista de productos.
   */
  currentPage = 1;

  /**
   * Lista de productos a mostrar.
   */
  products: Product[] = [];

  /**
   * Última página de la lista de productos.
   */
  lastPage = 1;

  /**
   * Término de búsqueda para filtrar la lista de productos.
   */
  searchTerm = '';

  /**
   * Orden de búsqueda para filtrar la lista de productos.
   */
  searchOrder = '';

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
    this.productService.getAllProducts(this.searchTerm, this.searchOrder,this.currentPage, 10).then((response) => {
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
   * Maneja el evento de cambio de página.
   *
   * @param direction - La dirección del cambio de página.
   */
  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getProducts();
  }

  /**
   * Maneja el evento de búsqueda de productos.
   *
   * @param query - La query de búsqueda.
   */
  searchQuery(query: string): void {
    this.searchTerm = query;
    this.currentPage = 1;
    this.getProducts();
  }

  /**
   * Maneja el evento de orden de búsqueda de productos.
   *
   * @param order - La dirección del orden de búsqueda.
   */
  orderQuery(order: 'asc' | 'desc'): void {
    this.searchOrder = order;
    this.currentPage = 1;
    this.getProducts();
  }
}

