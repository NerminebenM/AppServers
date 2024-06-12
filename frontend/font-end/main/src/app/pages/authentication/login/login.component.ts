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
        // Enregistrez les informations utilisateur dans le service de stockage
        this.storageService.saveUser(data);

        // Réinitialisez les indicateurs d'erreur de connexion
        this.isLoginFailed = false;
        this.errorMessage = '';

        // Obtenez les rôles de l'utilisateur connecté
        this.roles = this.storageService.getUser().roles;

        console.log('Roles:', this.roles); // Ajoutez cette ligne pour déboguer les rôles

        // Redirection en fonction du rôle de l'utilisateur
        if (this.roles.includes('ROLE_ADMIN')) {
          // Si l'utilisateur est un administrateur, naviguez vers le tableau de bord administrateur
          this.router.navigate(['/admin']);
        } else if (this.roles.includes('ROLE_MODERATOR')) {
          // Si l'utilisateur est un modérateur, naviguez vers le tableau de bord du modérateur
          this.router.navigate(['/mod']);
        } else {
          // Par défaut, naviguez vers le tableau de bord de l'utilisateur
          this.router.navigate(['/user']);
        }
      },
      error: err => {
        // Vérifiez si err.error est défini avant d'accéder à sa propriété message
        if (err.error && err.error.message) {
          // En cas d'erreur lors de la connexion, affichez un message d'erreur
          this.errorMessage = err.error.message;
        } else {
          // Si err.error n'est pas défini ou ne contient pas de propriété message, utilisez un message d'erreur par défaut
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
