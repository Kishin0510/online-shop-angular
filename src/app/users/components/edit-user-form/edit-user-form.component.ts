import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { editUser } from '../../../_interfaces/user-auth';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent implements OnInit {
  forms!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  userService = inject(UserService);
  LocalStorageService = inject(LocalStorageService);
  userName = this.LocalStorageService.getVariable('user').name;
  userBirthdate = this.LocalStorageService.getVariable('user').birthdate;
  userGenderId = this.LocalStorageService.getVariable('user').gender.id;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forms = this.fb.group({
      name: [this.userName, Validators.required],
      birthdate: [this.userBirthdate, Validators.required],
      genderId: [this.userGenderId, Validators.required],
    });
  }

  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const user: editUser = {
        name: this.forms.value.name,
        birthdate: this.forms.value.birthdate,
        genderId: this.forms.value.genderId,
      };

      const response = await this.userService.editUser(this.LocalStorageService.getVariable('user').id, user);
      console.log('Response:', response);

      if(response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Usuario editado con éxito', response);
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
      console.log('Error al editar el usuario:', error);
    }
  }
}
