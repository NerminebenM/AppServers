import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';
  private profilePhotoSubject = new BehaviorSubject<string | null>(null);
  profilePhoto$ = this.profilePhotoSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserId(): number {
    const user = window.sessionStorage.getItem('auth-user');
    if (!user) {
      throw new Error('User not authenticated.');
    }

    const userData = JSON.parse(user);
    return userData.id; // Supposons que l'ID de l'utilisateur est stocké dans userData
  }

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
  private handleError(error: any): Observable<never> {
    // Implémentez ici la gestion des erreurs
    console.error('An error occurred:', error);
    throw error;
  }
  updateUserProfile(userId: number, formData: FormData): Observable<any> {
    const url = `http://localhost:8081/api/users/profile/${userId}`;
    return this.http.put<any>(url, formData)
      .pipe(
        catchError(this.handleError), // Assurez-vous que handleError est bien défini
        tap(response => console.log(response)) // Log the response
      );
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('auth-user');
    return !!user;
  }
  getUserType(): string {
    const user = window.sessionStorage.getItem('auth-user');
    console.log('Session storage user:', user); // Log the session storage content
    if (!user) {
      return 'guest';
    }

    const userData = JSON.parse(user);
    console.log('Parsed user data:', userData); // Log parsed user data

    const userRoles = userData.roles;
    console.log('User roles:', userRoles); // Log user roles

    if (userRoles.includes('ROLE_ADMIN')) {
      return 'admin';
    } else if (userRoles.includes('ROLE_MODERATOR')) {
      return 'mod';
    } else {
      return 'user';
    }
  }

}
