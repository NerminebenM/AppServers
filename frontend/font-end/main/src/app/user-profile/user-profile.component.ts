import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

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

  constructor(private fb: FormBuilder, private userService: UserService, private location: Location) {
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
    this.userService.getCurrentUser().subscribe(user => {
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
      const updatedUser = {
        ...this.profileForm.value,
        id: this.userId
      };

      this.userService.updateUserProfile(this.userId, updatedUser, this.selectedFile).subscribe({
        next: (response) => {
          this.successMessage = 'Profil mis à jour avec succès';
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la mise à jour du profil : ' + err.error.message;
          this.successMessage = null;
          console.error('Erreur lors de la mise à jour du profil', err);
        }
      });
    }
  }


  goBack() {
    this.location.back();
  }
}
