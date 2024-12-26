import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-button',
  standalone: true,
  imports: [],
  templateUrl: './add-product-button.component.html',
  styleUrl: './add-product-button.component.css'
})
export class AddProductButtonComponent {
  constructor(private router: Router) { }

  navigateToCreateProduct(): void {
    this.router.navigate(['/admin/create']);
  }
}
