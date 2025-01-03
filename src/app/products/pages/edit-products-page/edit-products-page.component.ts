import { Component, OnInit } from '@angular/core';
import { EditProductFormComponent } from '../../components/edit-product-form/edit-product-form.component';

/**
 * Componente para la página de edición de productos
 */
@Component({
  selector: 'app-edit-products-page',
  standalone: true,
  imports: [EditProductFormComponent],
  templateUrl: './edit-products-page.component.html',
  styleUrl: './edit-products-page.component.css'
})
export class EditProductsPageComponent {


}
