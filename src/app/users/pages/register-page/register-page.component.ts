import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

/**
 * Componente para la página de registro de usuario.
 *
 * Este componente muestra el formulario para que los usuarios se registren.
 */
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
