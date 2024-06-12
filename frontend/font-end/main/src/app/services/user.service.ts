import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/test/';

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(this.apiUrl + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.apiUrl + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current-user`);
  }
  updateUserProfile(userId: number, updatedUser: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, updatedUser);
  }
  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('auth-user');
    return !!user;
  }
  getUserType(): string {
    const user = window.sessionStorage.getItem('auth-user');
    if (!user) {
      // Si aucun utilisateur n'est connecté, retournez 'guest' ou tout autre type que vous souhaitez utiliser pour les utilisateurs non connectés
      return 'admin';
    }

    const userData = JSON.parse(user);
    const userType = userData.role; // Supposons que le rôle de l'utilisateur est stocké dans une propriété 'role' du jeton

    // Logique pour mapper le rôle de l'utilisateur à un type d'utilisateur spécifique
    switch (userType) {
      case 'ROLE_ADMIN':
        return 'admin';
      case 'ROLE_MODERATOR':
        return 'moderator';
      default:
        return 'user';
    }
  }

}
