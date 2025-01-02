import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { editUser, Gender } from '../../../_interfaces/user-auth';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';

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

  genders: Gender[] = [];
  genderNames: string[] = [];

  userRut = this.LocalStorageService.getVariable('user').rut;
  userEmail = this.LocalStorageService.getVariable('user').email;
  userName = this.LocalStorageService.getVariable('user').name;
  userBirthdate = this.LocalStorageService.getVariable('user').birthdate;
  userGender = this.LocalStorageService.getVariable('user').gender.type;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.userService.getGenders().then(genders => {
      this.genders = genders;
      this.genderNames = genders.map(gender => gender.type);
    });
  }

  createForm() {
    this.forms = this.fb.group({
      name: [this.userName, Validators.required],
      birthdate: [this.userBirthdate, Validators.required],
      gender: [this.userGender, Validators.required],
    });
  }

  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const genderId = this.genders.find((gender) => gender.type === this.forms.value.gender?.value)?.id || 1;
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
}
