import { Component } from '@angular/core';
import { EditPasswordFormComponent } from '../../components/edit-password-form/edit-password-form.component';

@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [EditPasswordFormComponent],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css'
})
export class EditPasswordComponent {

}
