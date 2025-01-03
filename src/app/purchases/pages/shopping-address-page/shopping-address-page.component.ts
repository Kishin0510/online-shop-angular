import { Component } from '@angular/core';
import { ShoppingAddressComponent } from '../../components/shopping-address/shopping-address.component';

/**
 * Componente para la página de dirección de envío.
 */
@Component({
  selector: 'app-shopping-address-page',
  standalone: true,
  imports: [ShoppingAddressComponent],
  templateUrl: './shopping-address-page.component.html',
  styleUrl: './shopping-address-page.component.css'
})
export class ShoppingAddressPageComponent {

}
