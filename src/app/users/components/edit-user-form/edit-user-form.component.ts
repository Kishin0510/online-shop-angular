import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { editUser, Gender } from '../../../_interfaces/user-auth';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';
import { UserDeleteButtonComponent } from '../user-delete-button/user-delete-button.component';

/**
 * Componente para el formulario de edición de usuario.
 *
 * Este componente muestra un formulario para editar la información del usuario.
 */
@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, UserDeleteButtonComponent],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent implements OnInit {
  /**
   * Formulario reactivo para editar la información del usuario.
   */
  forms!: FormGroup
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

  /**
   * Lista de géneros disponibles.
   */
  genders: Gender[] = [];
  /**
   * Nombres de los géneros disponibles.
   */
  genderNames: string[] = [];

  /**
   * Rut del usuario.
   */
  userRut = this.LocalStorageService.getVariable('user').rut;
  /**
   * Correo del usuario.
   */
  userEmail = this.LocalStorageService.getVariable('user').email;
  /**
   * Nombre del usuario.
   */
  userName = this.LocalStorageService.getVariable('user').name;
  /**
   * Fecha de nacimiento del usuario.
   */
  userBirthdate = this.formatDate(this.LocalStorageService.getVariable('user').birthdate);
  /**
   * Género del usuario.
   */
  userGender = this.LocalStorageService.getVariable('user').gender.type;

  /**
   * ID del rol del usuario.
   */
  userRolID = this.LocalStorageService.getVariable('user').rol.id;

  /**
   * Constructor del componente.
   * @param fb - Servicio para crear formularios reactivos.
   * @param router - Servicio para manejar la navegación entre páginas.
   */
  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * Inicializa el componente y crea el formulario.
   */
  ngOnInit(): void {
    this.createForm();
    this.userService.getGenders().then(genders => {
      this.genders = genders;
      this.genderNames = genders.map(gender => gender.type);
    });
  }
  /**
   * Crea el formulario reactivo para editar la información del usuario.
   */
  createForm() {
    this.forms = this.fb.group({
      name: [this.userName, Validators.required],
      birthdate: [this.userBirthdate, Validators.required],
      gender: [this.userGender, Validators.required],
    });
  }
  /**
   * Maneja el envío del formulario para editar la información del usuario.
   */
  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const genderId = this.genders.find((gender) => gender.type === this.forms.value.gender)?.id || 1;
      const user: editUser = {
        name: this.forms.value.name,
        birthdate: this.forms.value.birthdate,
        genderId: genderId,
      };

      const response = await this.userService.editUser(this.LocalStorageService.getVariable('user').id, user);
      console.log('Response:', response);

      if(response) {
        this.error = false;
        this.errorMessage = [];
        const storedUser = this.LocalStorageService.getVariable('user') || {};
        storedUser.name = user.name;
        storedUser.birthdate = user.birthdate;
        storedUser.gender.type = this.forms.value.gender;
        this.LocalStorageService.setVariable('user', storedUser);
        console.log('Usuario editado con éxito', response);
        if (this.LocalStorageService.getVariable('user').rol.id === 1) {
          this.router.navigate(['/admin/users']);
        } else {
          this.router.navigate(['/products']);
        }
      }
      else {
        this.error = true;
        this.errorMessage = this.userService.getErrors();
        console.log('Error al editar el usuario:', this.errorMessage);
      }

    } catch (error: any) {
      console.error('Error al editar el usuario', error);
      this.error = true;
      this.errorMessage = error;
    }
  }

  /**
   * Formatea una fecha en un string.
   * @param date - La fecha a formatear.
   * @returns La fecha formateada.
   */
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split('T')[0];
  }
}
