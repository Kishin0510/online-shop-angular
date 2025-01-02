import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  currentPage: string;
  private LLService = inject(LocalStorageService);
  private ToastService = inject(ToastService);
  isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router) {
    this.currentPage = 'products';
  }

  ngOnInit(): void {
    this.LLService.isLoggedIn.subscribe(loggedIn => {
      this.isLogged = loggedIn;
    });
    console.log(this.isLogged);
    this.LLService.isAdmin.subscribe(admin => {
      this.isAdmin = admin;
    });
}

  changePage(page: string) {
    this.currentPage = page;
  }

  logout() {
    this.LLService.removeValue('token');
    this.LLService.removeValue('user');
    this.LLService.updateLoginStatus(false, false);
    this.ToastService.warning('Sesión cerrada');
    this.router.navigate(['/']);
  }
}
