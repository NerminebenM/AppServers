import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      console.log('User is logged in'); // Ajoutez ce log

      return true; // L'utilisateur est authentifié, permettez-lui d'accéder à la route
    } else {
      this.router.navigate(['/login']); // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      return false; // Empêchez l'accès à la route
    }
  }
}
