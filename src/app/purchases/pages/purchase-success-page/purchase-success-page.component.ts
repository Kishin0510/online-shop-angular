import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-success-page',
  standalone: true,
  imports: [],
  templateUrl: './purchase-success-page.component.html',
  styleUrl: './purchase-success-page.component.css'
})
export class PurchaseSuccessPageComponent {

  constructor(private router: Router) { }

  goToStore(): void {
    this.router.navigate(['/products']);
  }
}
