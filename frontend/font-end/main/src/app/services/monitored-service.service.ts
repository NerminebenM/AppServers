import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoredService } from '../models/monitored-service.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoredServiceService {
  private baseUrl = 'http://localhost:8081/api/services';

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<MonitoredService[]> {
    return this.http.get<MonitoredService[]>(`${this.baseUrl}/allservers`);
  }

  getServiceById(id: number): Observable<MonitoredService> {
    return this.http.get<MonitoredService>(`${this.baseUrl}/${id}`);
  }

  saveService(service: MonitoredService): Observable<MonitoredService[]> {
    return this.http.post<MonitoredService[]>(`${this.baseUrl}/saveservices`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getServicesByStatus(status: string): Observable<MonitoredService[]> {
    return this.http.get<MonitoredService[]>(`${this.baseUrl}/status/${status}`);
  }

  getServicesByServer(serverId: number): Observable<MonitoredService[]> {
    return this.http.get<MonitoredService[]>(`${this.baseUrl}/server/${serverId}`);
  }

  checkServiceStatus(id: number): Observable<MonitoredService> {
    return this.http.get<MonitoredService>(`${this.baseUrl}/check/${id}`);
  }

  getServiceStatusTrend(): Observable<Map<string, number[]>> {
    return this.http.get<Map<string, number[]>>(`${this.baseUrl}/service-status-trend`);
  }

  getServiceStatusDistribution(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/service-status-distribution`);
  }

  updateService(id: number, service: MonitoredService): Observable<MonitoredService> {
    return this.http.put<MonitoredService>(`${this.baseUrl}/${id}`, service);
  }
}
