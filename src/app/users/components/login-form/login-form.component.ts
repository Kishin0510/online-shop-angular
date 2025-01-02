import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];

  private AuthService = inject(AuthService);
  private LocalStorageService = inject(LocalStorageService);
  private ToastService = inject(ToastService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm();
  }

  loginForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  async login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    try {
      const response = await this.AuthService.login(this.form.value);

      if (response.token){
        this.LocalStorageService.setVariable('token', response.token);
        this.LocalStorageService.setVariable('user', response.user);
        this.LocalStorageService.updateLoginStatus(true, response.user.rol?.id === 1);
        console.log('Usuarios logueado:', this.LocalStorageService.getVariable('user'));
        this.ToastService.succes('Bienvenido ' + response.user.name);
        if (response.user.rol.id === 1) {
          this.router.navigate(['/admin/products']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        console.log('Error en login', response);
        this.error = true;
      }
    } catch (error: any) {
      this.error = true;
      this.errorMessage.push(error);
    }
  }
}
