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
  constructor(private http: HttpClient, private storageService: StorageService) {
    this.authToken = localStorage.getItem('authToken') || '';
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap(response => {
        const token = response.accessToken;
        if (token) {
          this.storageService.saveToken(token);
          this.storageService.saveUser(response);
        } else {
          throw new Error('Token is missing in response');
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }

  logout(): Observable<any> {
    this.storageService.clean();
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getUser();
  }
  getToken(): string | null {
    return this.storageService.getToken();
  }
}
