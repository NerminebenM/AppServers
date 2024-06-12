import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USER_KEY = 'auth-user';
  private readonly TOKEN_KEY = 'auth-token'; // Ajoutez cette clé

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  saveToken(token: string): void { // Méthode pour enregistrer le jeton JWT
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null { // Méthode pour récupérer le jeton JWT
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  updateUser(updatedUser: any): void {
    this.saveUser(updatedUser);
  }
}
