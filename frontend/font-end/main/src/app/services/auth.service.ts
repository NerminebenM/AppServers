import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string;
  private userRoles: string[] = [];

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.authToken = localStorage.getItem('authToken') || '';
    this.userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap(response => {
        const token = response.accessToken;
        const roles = response.roles;
        if (token && roles) {
          this.storageService.saveToken(token);
          this.storageService.saveUser(response);
          localStorage.setItem('userRoles', JSON.stringify(roles));
          this.userRoles = roles;
          console.log('Token and roles saved:', token, roles); // Ajoutez ce log

          // Mettre à jour le statut de l'utilisateur à 'online'
          this.updateUserStatus(username, 'online').subscribe();
        } else {
          throw new Error('Token or roles are missing in response');
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }

  logout(username: string): Observable<any> {
    this.storageService.clean();
    localStorage.removeItem('userRoles');
    this.userRoles = [];
    // Mettre à jour le statut de l'utilisateur à 'offline'
    return this.http.post(AUTH_API + 'signout', { username }, httpOptions);
  }

  getUserId(): number {
    // Assume the user ID is stored in local storage, adapt as needed
    return Number(localStorage.getItem('userId'));
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getUser();
  }

  getToken(): string | null {
    return this.storageService.getToken();
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

  private updateUserStatus(username: string, status: string): Observable<any> {
    return this.http.post(AUTH_API + 'status', { username, status }, httpOptions);
  }
}
