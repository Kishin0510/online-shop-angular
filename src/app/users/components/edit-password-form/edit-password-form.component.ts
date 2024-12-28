import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { editPassword } from '../../../_interfaces/usersDTO';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';

@Component({
  selector: 'app-edit-password-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-password-form.component.html',
  styleUrl: './edit-password-form.component.css'
})
export class EditPasswordFormComponent implements OnInit{
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  userService = inject(UserService);
  LocalStorageService = inject(LocalStorageService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forms = this.fb.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      Confirmnewpassword: ['', Validators.required],
    });
  }

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

  get oldpasswordInvalid() {
    return this.forms.get('oldpassword')?.invalid && this.forms.get('oldpassword')?.touched;
  }

  get newpasswordInvalid() {
    return this.forms.get('newpassword')?.invalid && this.forms.get('newpassword')?.touched;
  }

  get ConfirmnewpasswordInvalid() {
    return this.forms.get('Confirmnewpassword')?.invalid && this.forms.get('Confirmnewpassword')?.touched;
  }
}
