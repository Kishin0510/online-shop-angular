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

  /**
   * Inicializa el componente y crea el formulario.
   * @param fb - Constructor de formularios.
   * @param router - Enrutador de la aplicación.
   */
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm();
  }

  // Variables para la fecha de nacimiento en el formulario de registro.
  /**
   * Días del mes.
   */
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  /**
   * Meses del año.
   */
  months = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
  ];
  /**
   * Años desde el año actual hasta 100 años atrás.
   */
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  /**
   * Crea el formulario reactivo para el registro de usuario.
   */
  registerForm() {
    this.form = this.fb.group({
      rut: ['', [Validators.required, Validators.pattern(/^\d{8}-[kK0-9]{1}$/)]],
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      Email: ['', [Validators.required, Validators.email]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      GenderId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      ConfirmPassword: ['', [Validators.required]],
    },{
      validators: [this.passwordMatchValidator, this.validateBirthdate],
    });
    
    
  }

  /**
   * Valida que las contraseñas coincidan.
   * @param group - Grupo de controles del formulario.
   */
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('ConfirmPassword')?.value;
    if (password !== confirmPassword) {
      group.get('ConfirmPassword')?.setErrors({ mismatch: true });
    } else {
      group.get('ConfirmPassword')?.setErrors(null);
    }
  }

  /**
   * Valida la fecha de nacimiento.
   * @param group - Grupo de controles del formulario.
   * @returns Un objeto con errores si la fecha es inválida.
   */
  validateBirthdate: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const day = group.get('day')?.value;
    const month = group.get('month')?.value;
    const year = group.get('year')?.value;
  
    if (!day || !month || !year) {
      return { incompleteDate: true };
    }
  
    const birthdate = new Date(year, month - 1, day);
    const isValid = birthdate.getFullYear() === +year &&
                    birthdate.getMonth() === month - 1 &&
                    birthdate.getDate() === +day;
  
    return isValid ? null : { invalidDate: true };
  };

  /**
   * Indica si las contraseñas no coinciden.
   */
  get passwordMatch() {
    const confirmPassword = this.form.get('ConfirmPassword');
    return confirmPassword?.hasError('mismatch') && confirmPassword?.touched;
  }
  /**
   * Indica si el campo rut es inválido y ha sido tocado.
   */
  get rutValidate() {
    return this.form.get('rut')?.invalid && this.form.get('rut')?.touched;
  }

  /**
   * Indica si el campo nombre es inválido y ha sido tocado.
   */
  get nameValidate() {
    return this.form.get('name')?.invalid && this.form.get('name')?.touched;
  }

  /**
   * Indica si el campo de correo electrónico es inválido y ha sido tocado.
   */
  get emailValidate() {
    return this.form.get('Email')?.invalid && this.form.get('Email')?.touched;
  }

  /**
   * Indica si el campo id de genero es inválido y ha sido tocado.
   */
  get GenderIdValidate() {
    return this.form.get('GenderId')?.invalid && this.form.get('GenderId')?.touched;
  }

  /**
   * Indica si el campo de contraseña es inválido y ha sido tocado.
   */
  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  /**
   * Indica si el campo de confirmación de contraseña es inválido y ha sido tocado.
   */
  get ConfirmPasswordValidate() {
    return this.form.get('ConfirmPassword')?.invalid && this.form.get('ConfirmPassword')?.touched;
  }
  
  /**
   * Registra un usuario en la base de datos si esta todo bien.
   */
  async register() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control) {
        control.setErrors(null);
        }
    });
    return;
    }
    try {
      const day = this.form.value.day;
      const month = this.form.value.month;
      const year = this.form.value.year;
      const birthdate = `${year}-${month}-${day}`;
      const user: addUser = {
        rut: this.form.value.rut,
        name: this.form.value.name,
        birthday: birthdate,
        Email: this.form.value.Email,
        GenderId: this.form.value.GenderId,
        password: this.form.value.password,
        ConfirmPassword: this.form.value.ConfirmPassword,
       }
      const response = await this.AuthService.registerUser(user);
      if (response.token){
        this.LocalStorageService.setVariable('token', response.token);
        this.LocalStorageService.setVariable('user', response.user);
        this.LocalStorageService.updateLoginStatus(true, response.user.rol?.id === 1);
        console.log('Usuarios registrado:', this.LocalStorageService.getVariable('user'));

        this.router.navigate(['/']);
      } else {
        console.log('Error en registro', response);
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage = error;
    }
  }
}
