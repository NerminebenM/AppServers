import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Employee } from './employee-model';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog-component/edit-employee-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8081/api/employees';

  constructor(private http: HttpClient, private authService: AuthService,private dialog: MatDialog,) { }
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // Method to retrieve the list of employees from the API
  getEmployees(): Observable<Employee[]> {
    const headers = this.getHeaders();
    return this.http.get<any>('http://localhost:8081/api/users/all')
      .pipe(
        catchError(this.handleError)
      );
  }


  addEmployeeWithUser(employee: Employee, username: string, email: string, password: string): Observable<any> {
    const headers = this.getHeaders();
    const payload = { employee, username, email, password };
    return this.http.post<any>('http://localhost:8081/api/auth/signup', payload, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  searchEmployees(query: string): Observable<Employee[]> {
    if (this.authService.isLoggedIn()) { // vérification de l'authentification
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      const params = new HttpParams().set('username', query); // construction de la requête http
      return this.http.get<Employee[]>('http://localhost:8081/api/users/search', { headers, params })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return throwError('Unauthorized access');
    }
  }


  uploadCsvFile(file: File): Observable<any> {
    if (this.authService.isLoggedIn()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(`${this.apiUrl}/add`, formData, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  // Add other methods for employee management (if needed)

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }





  editEmployee(username: string, updatedEmployee: Employee): Observable<any> {
    if (this.authService.isLoggedIn()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `http://localhost:8081/api/users/update/${username}`;
      return this.http.put<any>(url, updatedEmployee, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return throwError('Unauthorized access');
    }
  }
  deleteEmployee(username: string): Observable<any> {
    if (this.authService.isLoggedIn()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      const url = `http://localhost:8081/api/users/delete/${username}`;
      return this.http.delete<any>(url, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return throwError('Unauthorized access');
    }
  }

}
