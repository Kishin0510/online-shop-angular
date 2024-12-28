import { Component, inject } from '@angular/core';
import { addUser } from '../../../_interfaces/usersDTO';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { ResponseAPIRegister } from '../../../_interfaces/user-auth';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService, LocalStorageService],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  form!: FormGroup;
  registerAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];

  private AuthService = inject(AuthService);
  private LocalStorageService = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm();
  }

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

  async register() {
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
        this.error = true;
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage.push(error);
    }
  }
}
