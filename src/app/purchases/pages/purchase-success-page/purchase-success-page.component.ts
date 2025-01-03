import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente para la página de éxito de compra.
 *
 * Este componente muestra un mensaje de éxito después de completar una compra y permite navegar de vuelta a la tienda.
 */
@Component({
  selector: 'app-purchase-success-page',
  standalone: true,
  imports: [],
  templateUrl: './purchase-success-page.component.html',
  styleUrl: './purchase-success-page.component.css'
})
export class PurchaseSuccessPageComponent {

  constructor(private router: Router) { }

  /**
   * Navega a la tienda.
   */
  goToStore(): void {
    this.router.navigate(['/products']);
  }
}
