import { Component } from '@angular/core';
import { EditPasswordFormComponent } from '../../components/edit-password-form/edit-password-form.component';

/**
 * Componente para la página de edición de contraseña.
 *
 * Este componente muestra el formulario para cambiar la contraseña del usuario.
 */
@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [EditPasswordFormComponent],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {

}
