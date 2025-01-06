import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { editPassword } from '../../../_interfaces/usersDTO';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';

/**
 * Componente para el formulario de edición de contraseña.
 *
 * Este componente muestra un formulario para cambiar la contraseña del usuario.
 */
@Component({
  selector: 'app-edit-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-password-form.component.html',
  styleUrl: './edit-password-form.component.css'
})
export class EditPasswordFormComponent implements OnInit{
  /**
   * Formulario reactivo para cambiar la contraseña.
   */
  forms!: FormGroup;
  /**
   * Indica si hay un error en el formulario.
   */
  error: boolean = false;
  /**
   * Mensajes de error.
   */
  errorMessage: string[] = [];
  /**
   * Servicio para manejar la lógica de usuarios.
   */
  userService = inject(UserService);
  /**
   * Servicio de almacenamiento local.
   */
  LocalStorageService = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * Inicializa el componente y crea el formulario.
   */
  ngOnInit(): void {
    this.createForm();
  }
  /**
   * Crea el formulario reactivo para cambiar la contraseña.
   */
  createForm() {
    this.forms = this.fb.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      Confirmnewpassword: ['', Validators.required],
    });
  }
  /**
   * Maneja el envío del formulario para cambiar la contraseña.
   */
  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const newPassword: editPassword = {
        oldpassword: this.forms.value.oldpassword,
        newpassword: this.forms.value.newpassword,
        Confirmnewpassword: this.forms.value.Confirmnewpassword,
      };

      const response = await this.userService.editPassword(this.LocalStorageService.getVariable('user').id, newPassword);
      console.log('Response:', response);

      if(response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Password editado con éxito', response);
        this.router.navigate(['/edit']);
      }
      else {
        this.error = true;
        this.errorMessage = this.userService.getErrors();
        console.log('Error al editar el password:', this.errorMessage);
      }
    } catch (error: any) {
      console.error('Error al editar el password', error);
      this.error = true;
      this.errorMessage = error;
    }
  }

  /**
   * Indica si el campo de contraseña actual es inválido.
   */
  get oldpasswordInvalid() {
    return this.forms.get('oldpassword')?.invalid && this.forms.get('oldpassword')?.touched;
  }

  /**
   * Indica si el campo de nueva contraseña es inválido.
   */
  get newpasswordInvalid() {
    return this.forms.get('newpassword')?.invalid && this.forms.get('newpassword')?.touched;
  }

  /**
   * Indica si el campo de confirmación de nueva contraseña es inválido.
   */
  get ConfirmnewpasswordInvalid() {
    return this.forms.get('Confirmnewpassword')?.invalid && this.forms.get('Confirmnewpassword')?.touched;
  }
}
