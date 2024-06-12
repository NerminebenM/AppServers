import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8081/data'; 
  constructor(private http: HttpClient) {}

  getSalesOverviewData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sales-overview`);
  }

  getYearlyChartData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/yearly-chart`);
  }

  getMonthlyChartData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/monthly-chart`);
  }
}
