import { Component, inject } from '@angular/core';
import { addUser } from '../../../_interfaces/usersDTO';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { ResponseAPIRegister } from '../../../_interfaces/user-auth';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';

/**
 * Componente para el formulario de registro de usuario.
 *
 * Este componente muestra un formulario para que los usuarios se registren.
 */
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService, LocalStorageService],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  /**
   * Formulario reactivo para el registro de usuario.
   */
  form!: FormGroup;
  /**
   * Indica si hay un error al registrarse.
   */
  registerAlert: boolean = false;
  /**
   * Indica si hay un error en el formulario.
   */
  error: boolean = false;
  /**
   * Mensajes de error.
   */
  errorMessage: string[] = [];
  /**
   * Servicio de autenticación.
   */
  private AuthService = inject(AuthService);
  /**
   * Servicio de almacenamiento local.
   */
  private LocalStorageService = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm();
  }

  /**
   * Crea el formulario reactivo para el registro de usuario.
   */
  registerForm() {
    this.form = this.fb.group({
      rut: ['', Validators.required],
      name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      GenderId: ['', Validators.required],
      password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
  }

  get rutValidate() {
    return this.form.get('rut')?.invalid && this.form.get('rut')?.touched;
  }
  get nameValidate() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  get emailValidate() {
    return this.form.get('Email')?.invalid && this.form.get('Email')?.touched;
  }

  get birthdateValidate() {
    return this.form.get('birthdate')?.invalid && this.form.get('birthdate')?.touched;
  }

  get GenderIdValidate() {
    return this.form.get('GenderId')?.invalid && this.form.get('GenderId')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  get ConfirmPasswordValidate() {
    return this.form.get('ConfirmPassword')?.invalid && this.form.get('ConfirmPassword')?.touched;
  }

  /**
   * Registra un usuario en la base de datos si esta todo bien.
   */
  async register() {
    this.error = false;
    this.errorMessage = [];
    Object.keys(this.form.controls).forEach(field => {
    const control = this.form.get(field);
    if (control) {
      control.setErrors(null);
    }
    });
    if (this.form.invalid) return;
    try {
      const user: addUser = {
        rut: this.form.value.rut,
        name: this.form.value.name,
        birthday: this.form.value.birthdate,
        Email: this.form.value.Email,
        GenderId: this.form.value.GenderId,
        password: this.form.value.password,
        ConfirmPassword: this.form.value.ConfirmPassword,
       }
      const response = await this.AuthService.registerUser(user);
      if (response.token){
        this.LocalStorageService.setVariable('token', response.token);
        this.LocalStorageService.setVariable('user', response.user);
        console.log('Usuarios registrado:', this.LocalStorageService.getVariable('user'));

        this.router.navigate(['/']);
      } else {
        console.log('Error en registro', response);
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage = error;
      error.forEach((err: string) => {
        const field = err.split(':')[0];
        const message = err.split(':')[1];

        const formControl = this.form.get(field);

        if (formControl) {
          formControl.setErrors({ serverError: message.trim() });
        } 
      });
    }
  }
}
