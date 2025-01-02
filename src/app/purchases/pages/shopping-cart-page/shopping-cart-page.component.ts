import { Component } from '@angular/core';
import { ShoppingListComponent } from '../../components/shopping-list/shopping-list.component';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [ShoppingListComponent],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css'
})
export class ShoppingCartPageComponent {

}
