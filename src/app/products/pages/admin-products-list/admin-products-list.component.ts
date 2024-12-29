import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../_interfaces/productDTO';
import { ProductService } from '../../../_services/product.service';
import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { PageButtonComponent } from '../../components/page-button/page-button.component';
import { AddProductButtonComponent } from '../../components/add-product-button/add-product-button.component';


@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [ProductsListComponent, SearchButtonComponent, PageButtonComponent, AddProductButtonComponent],
  templateUrl: './admin-products-list.component.html',
  styleUrl: './admin-products-list.component.css'
})
export class AdminProductsListComponent implements OnInit {

  currentPage = 1;
  lastPage = 1;
  searchName = '';
  protected products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

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

  searchQuery(query: string): void {
    this.searchName = query;
    this.currentPage = 1;
    this.getProducts();
  }

  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getProducts();
  }

}
