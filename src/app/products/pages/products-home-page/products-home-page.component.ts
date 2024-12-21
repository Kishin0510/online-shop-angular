import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { OrderButtonComponent } from '../../components/order-button/order-button.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../_interfaces/productDTO';

@Component({
  selector: 'app-products-home-page',
  standalone: true,
  imports: [ProductCardComponent,SearchButtonComponent,OrderButtonComponent, CommonModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './products-home-page.component.html',
  styleUrl: './products-home-page.component.css'
})
export class ProductsHomePageComponent implements OnInit {

  currentPage = 1;
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts(this.currentPage, 10).then((response) => {
      this.products = response.result;
      console.log(this.products);
    }).catch((error) => {
      console.error("Error obteniendo productos", error);
    });
  }

  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev') {
      this.currentPage--;
    }
    this.getProducts();
  }
}

