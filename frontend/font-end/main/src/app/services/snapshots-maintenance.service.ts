import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaintenanceSettings } from '../models/MaintenanceSettings';
import { Repository } from '../models/Repository';

@Injectable({
  providedIn: 'root'
})
export class SnapshotsMaintenanceService {
  private baseUrl = 'http://localhost:8081/api/maintenance';

  constructor(private http: HttpClient) {}

  getAllMaintenanceSettings(): Observable<MaintenanceSettings[]> {
    const url = `${this.baseUrl}/settings`;
    return this.http.get<MaintenanceSettings[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveMaintenanceSettings(settings: MaintenanceSettings): Observable<MaintenanceSettings> {
    const url = `${this.baseUrl}/settings`;
    return this.http.post<MaintenanceSettings>(url, settings)
      .pipe(
        catchError(this.handleError)
      );
  }
  getMaintenanceSettingsById(id: number): Observable<MaintenanceSettings> {
    const url = `${this.baseUrl}/settings/${id}`;
    return this.http.get<MaintenanceSettings>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addRepository(settingsId: number, repository: Repository): Observable<MaintenanceSettings> {
    const url = `${this.baseUrl}/settings/${settingsId}/repositories`;
    return this.http.post<MaintenanceSettings>(url, repository)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteRepository(settingsId: number, repositoryId: number): Observable<MaintenanceSettings> {
    const url = `${this.baseUrl}/settings/${settingsId}/repositories/${repositoryId}`;
    return this.http.delete<MaintenanceSettings>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

