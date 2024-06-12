import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  // Method to retrieve the list of employees from the API
  getEmployees(): Observable<Employee[]> {
    if (this.authService.isLoggedIn()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      return this.http.get<Employee[]>(`${this.apiUrl}/all`, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      // Handle unauthorized access (e.g., redirect to login)
      return throwError('Unauthorized access');
    }
  }

  searchEmployees(query:string):Observable<Employee[]>{
    if(this.authService.isLoggedIn()){//verif authentification
      const headers =new HttpHeaders().set('Authorization','Bearer ${this.authService.getToken()}');
      const params=new HttpParams().set('query',query);//construction de la requete http
      return this.http.get<Employee[]>(`${this.apiUrl}/search`,{headers,params})
      .pipe(
        catchError(this.handleError)
      );
    } else{
      return throwError('Unauthorized access')
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


  editEmployee(matricule: string, updatedEmployee: Employee): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put<any>(`${this.apiUrl}/update/${matricule}`, updatedEmployee, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteEmployee(matricule: string): Observable<any> {
    if (this.authService.isLoggedIn()) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
      return this.http.delete<any>(`${this.apiUrl}/delete/${matricule}`, { headers })
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return throwError('Unauthorized access');
    }
  }
}