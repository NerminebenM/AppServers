import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserId() : number {
    const user = window.sessionStorage.getItem('auth-user');
    if (!user) {
      throw new Error('User not authenticated.');
    }

    const userData = JSON.parse(user);
    return userData.id; // Supposons que l'ID de l'utilisateur est stocké dans userData
  
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8081/api/users';

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
    return this.http.get<any>('http://localhost:8081/api/test/current-user');
  }

  updateUserProfile(id: number, updatedUser: any, photo: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', updatedUser.username);
    formData.append('email', updatedUser.email);
    formData.append('motDePasse', updatedUser.password); // Assurez-vous que la clé correspond à ce que le backend attend

    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    return this.http.put<any>(`${this.apiUrl}/profile/${id}`, formData);
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('auth-user');
    return !!user;
  }

  getUserType(): string {
    const user = window.sessionStorage.getItem('auth-user');
    if (!user) {
      return 'guest';
    }

    const userData = JSON.parse(user);
    const userType = userData.role;

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