import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../_services/toast.service';

/**
 * Componente para la barra de navegación.
 *
 * Este componente muestra la barra de navegación y maneja la lógica de autenticación y navegación.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  /**
   * Página actual.
   */
  currentPage: string;
  /**
   * Servicio de almacenamiento local.
   */
  private LLService = inject(LocalStorageService);
  /**
   * Servicio para mostrar notificaciones emergentes.
   */
  private ToastService = inject(ToastService);
  /**
   * Indica si el usuario está autenticado.
   */
  isLogged: boolean = false;
  /**
   * Indica si el usuario es administrador.
   */
  isAdmin: boolean = false;

  constructor(private router: Router) {
    this.currentPage = 'products';
  }
  /**
   * Inicializa el componente y suscribe a los cambios en el estado de autenticación.
   */
  ngOnInit(): void {
    this.LLService.isLoggedIn.subscribe(loggedIn => {
      this.isLogged = loggedIn;
    });
    console.log(this.isLogged);
    this.LLService.isAdmin.subscribe(admin => {
      this.isAdmin = admin;
    });
}
  /**
   * Cambia la página actual.
   *
   * @param page - La página a la que se quiere navegar.
   */
  changePage(page: string) {
    this.currentPage = page;
  }
  /**
   * Maneja el cierre de sesión del usuario.
   */
  logout() {
    this.LLService.removeValue('token');
    this.LLService.removeValue('user');
    this.LLService.updateLoginStatus(false, false);
    this.ToastService.warning('Sesión cerrada');
    this.router.navigate(['/']);
  }
}
