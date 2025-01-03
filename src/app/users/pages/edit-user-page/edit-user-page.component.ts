import { Component } from '@angular/core';
import { EditUserFormComponent } from '../../components/edit-user-form/edit-user-form.component';

/**
 * Componente para la página de edición de usuario.
 *
 * Este componente muestra el formulario para editar la información del usuario.
 */
@Component({
  selector: 'app-edit-user-page',
  standalone: true,
  imports: [EditUserFormComponent],
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.css'
})
export class EditUserPageComponent {

}
