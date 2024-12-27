import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentPage: string;
  private LLService = inject(LocalStorageService);
  isLogged: boolean = this.LLService.getVariable('token') ? true : false;

  constructor(private router: Router) {
    this.currentPage = 'products';
  }

  changePage(page: string) {
    this.currentPage = page;
  }

  logout() {
    this.LLService.removeValue('token');
    this.LLService.removeValue('user');
    this.router.navigate(['/']);
  }
}
