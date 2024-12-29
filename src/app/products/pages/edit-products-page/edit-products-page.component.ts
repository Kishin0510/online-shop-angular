import { Component, OnInit } from '@angular/core';
import { EditProductFormComponent } from '../../components/edit-product-form/edit-product-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-products-page',
  standalone: true,
  imports: [EditProductFormComponent],
  templateUrl: './edit-products-page.component.html',
  styleUrl: './edit-products-page.component.css'
})
export class EditProductsPageComponent {


}
