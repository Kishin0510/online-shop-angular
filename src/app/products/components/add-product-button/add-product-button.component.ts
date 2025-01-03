import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente para el botón de agregar producto.
 *
 * Este componente muestra un botón que, al hacer clic, navega a la página de creación de productos.
 */
@Component({
  selector: 'app-add-product-button',
  standalone: true,
  imports: [],
  templateUrl: './add-product-button.component.html',
  styleUrl: './add-product-button.component.css'
})
export class AddProductButtonComponent {
  constructor(private router: Router) { }

  /**
   * Navega a la página de creación de productos.
   */
  navigateToCreateProduct(): void {
    this.router.navigate(['/admin/create']);
  }
}
