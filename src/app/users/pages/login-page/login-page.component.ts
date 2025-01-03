import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

/**
 * Componente para la página de inicio de sesión.
 *
 * Este componente muestra el formulario para que los usuarios inicien sesión.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
