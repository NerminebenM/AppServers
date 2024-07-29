import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  form: any = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        console.log('Login successful:', data); // Ajoutez des logs pour le succès de la connexion

        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.errorMessage = '';
        this.roles = this.storageService.getUser().roles;

        console.log('Roles after login:', this.roles); // Vérifiez les rôles après la connexion

        if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (this.roles.includes('ROLE_MODERATOR')) {
          this.router.navigate(['/mod']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: err => {
        console.error('Login error:', err); // Ajoutez des logs pour les erreurs
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion.';
        }
        this.isLoginFailed = true;
      }
    });
  }


  reloadPage(): void {
    window.location.reload();
  }
}
