import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente de la página de inicio del administrador.
 */
@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {

}
