// src/app/components/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { User } from '../models/user';
import { EmployeeService } from '../services/EmployeeService';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId: number | undefined;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService,private employeeservice: EmployeeService, private location: Location) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo: [''],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.userId = user.id;
      this.profileForm.patchValue({
        username: user.username,
        email: user.email,
        photo: user.photo,
        password: '' // Vous pouvez gérer le mot de passe différemment
      });
      this.previewUrl = user.photo;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.userId !== undefined) {
      const formData = new FormData();
      formData.append('username', this.profileForm.get('username')?.value);
      formData.append('email', this.profileForm.get('email')?.value);
      formData.append('password', this.profileForm.get('password')?.value);

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      } else {
        formData.append('photo', this.profileForm.get('photo')?.value);
      }

      console.log('FormData:', formData);

      this.userService.updateUserProfile(this.userId, formData).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.successMessage = 'Profil mis à jour avec succès';
          this.errorMessage = null;
        },
        error: (err) => {
          console.log('Error:', err);
          this.errorMessage = 'Erreur lors de la mise à jour du profil : ' + err.error.message;
          this.successMessage = null;
          console.error('Erreur lors de la mise à jour du profil', err);
        }
      });
    } else {
      console.log('Form invalid or userId is undefined');
    }
  }


  goBack() {
    this.location.back();
  }
}
