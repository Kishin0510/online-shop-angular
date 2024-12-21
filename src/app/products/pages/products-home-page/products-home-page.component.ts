import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { OrderButtonComponent } from '../../components/order-button/order-button.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_interfaces/productDTO';
import { PageButtonComponent } from '../../components/page-button/page-button.component';

@Component({
  selector: 'app-products-home-page',
  standalone: true,
  imports: [ProductCardComponent,SearchButtonComponent,OrderButtonComponent, CommonModule, HttpClientModule, PageButtonComponent],
  providers: [ProductService],
  templateUrl: './products-home-page.component.html',
  styleUrl: './products-home-page.component.css'
})
export class ProductsHomePageComponent implements OnInit {

  currentPage = 1;
  products: Product[] = [];
  lastPage = 1;
  searchTerm = '';
  searchOrder = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

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

  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getProducts();
  }

  searchQuery(query: string): void {
    this.searchTerm = query;
    this.currentPage = 1;
    this.getProducts();
  }
}

