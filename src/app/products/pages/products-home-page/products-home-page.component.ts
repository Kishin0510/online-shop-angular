import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SearchButtonComponent } from '../../components/search-button/search-button.component';
import { OrderButtonComponent } from '../../components/order-button/order-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-home-page',
  standalone: true,
  imports: [ProductCardComponent,SearchButtonComponent,OrderButtonComponent, CommonModule],
  templateUrl: './products-home-page.component.html',
  styleUrl: './products-home-page.component.css'
})
export class ProductsHomePageComponent {

}
